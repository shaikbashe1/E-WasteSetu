import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'home_screen.dart';

class LanguageScreen extends StatelessWidget {
  const LanguageScreen({super.key});

  void _selectLanguage(BuildContext context, String lang) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('lang', lang);
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const HomeScreen()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Choose your language')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          ElevatedButton(
            style: ElevatedButton.styleFrom(padding: const EdgeInsets.all(20)),
            onPressed: () => _selectLanguage(context, 'hi'),
            child: const Text('🇮🇳 हिंदी', style: TextStyle(fontSize: 24)),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
             style: ElevatedButton.styleFrom(padding: const EdgeInsets.all(20)),
            onPressed: () => _selectLanguage(context, 'mr'),
            child: const Text('🇮🇳 मराठी', style: TextStyle(fontSize: 24)),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
             style: ElevatedButton.styleFrom(padding: const EdgeInsets.all(20)),
            onPressed: () => _selectLanguage(context, 'en'),
            child: const Text('🇬🇧 English', style: TextStyle(fontSize: 24)),
          ),
        ],
      ),
    );
  }
}\n