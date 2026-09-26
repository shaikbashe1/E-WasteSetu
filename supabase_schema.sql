-- Supabase Schema for E-WasteSetu

-- Create ENUM types for strong typing
CREATE TYPE profile_role AS ENUM ('collector', 'recycler', 'admin');
CREATE TYPE profile_status AS ENUM ('pending', 'active', 'suspended', 'rejected');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');

-- 1. Profiles Table (Linked to auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    email TEXT,
    preferred_language TEXT DEFAULT 'en',
    role profile_role,
    status profile_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can read own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 2. Collectors Table
CREATE TABLE collectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    collector_id TEXT UNIQUE NOT NULL,
    operating_area TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE collectors ENABLE ROW LEVEL SECURITY;

-- Collectors Policies
CREATE POLICY "Collectors can read own data" ON collectors
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Collectors can update own data" ON collectors
    FOR UPDATE USING (auth.uid() = profile_id);

-- 3. Recyclers Table
CREATE TABLE recyclers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    recycler_id TEXT UNIQUE NOT NULL,
    facility_name TEXT,
    facility_location TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    materials_accepted JSONB,
    authorization_number TEXT,
    authorization_document_url TEXT,
    contact_phone TEXT,
    pickup_available BOOLEAN DEFAULT false,
    service_area TEXT,
    verification_status verification_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE recyclers ENABLE ROW LEVEL SECURITY;

-- Recyclers Policies
CREATE POLICY "Recyclers can read own data" ON recyclers
    FOR SELECT USING (auth.uid() = profile_id);
    
CREATE POLICY "Public can read verified recyclers" ON recyclers
    FOR SELECT USING (verification_status = 'verified');

CREATE POLICY "Recyclers can update own pending data" ON recyclers
    FOR UPDATE USING (auth.uid() = profile_id AND verification_status = 'pending');

-- 4. Admin Users Table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admin Policies
CREATE POLICY "Admins can read admin list" ON admin_users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
        )
    );


-- Trigger to automatically create a profile when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role, status)
    VALUES (new.id, new.email, 'collector', 'pending'); -- Default role
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_collectors_updated_at BEFORE UPDATE ON collectors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_recyclers_updated_at BEFORE UPDATE ON recyclers FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
