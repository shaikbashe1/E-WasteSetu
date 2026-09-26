import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DBHelper {
  static Database? _db;
  static const int _version = 1;

  static Future<Database> getDatabase() async {
    if (_db != null) return _db!;
    String path = join(await getDatabasesPath(), 'kabadiwala.db');
    _db = await openDatabase(
      path,
      version: _version,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE lots(
            local_id INTEGER PRIMARY KEY AUTOINCREMENT,
            server_id TEXT,
            lot_ref TEXT UNIQUE,
            material TEXT,
            sub_category TEXT,
            weight REAL,
            condition TEXT,
            source_type TEXT,
            photos TEXT,
            estimated_value_low REAL,
            estimated_value_high REAL,
            status TEXT DEFAULT 'DRAFT',
            sync_status TEXT DEFAULT 'PENDING',
            created_at TEXT,
            updated_at TEXT,
            version INTEGER DEFAULT 1,
            retry_count INTEGER DEFAULT 0
          )
        ''');
        await db.execute('''
          CREATE TABLE transactions(
            local_id INTEGER PRIMARY KEY AUTOINCREMENT,
            server_id TEXT,
            lot_id INTEGER,
            recycler_id INTEGER,
            quoted_price REAL,
            final_price REAL,
            gps_location TEXT,
            handover_ref TEXT,
            payment_status TEXT DEFAULT 'PENDING',
            status TEXT DEFAULT 'PENDING',
            timestamp TEXT,
            sync_status TEXT DEFAULT 'PENDING',
            created_at TEXT,
            updated_at TEXT,
            version INTEGER DEFAULT 1,
            retry_count INTEGER DEFAULT 0
          )
        ''');
        await db.execute('''
          CREATE TABLE recyclers(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            facility_name TEXT,
            auth_status TEXT DEFAULT 'PENDING',
            auth_details TEXT,
            location TEXT,
            contact TEXT,
            accepted_materials TEXT,
            pickup_available INTEGER DEFAULT 0,
            offered_rates TEXT
          )
        ''');
      },
    );
    return _db!;
  }
}