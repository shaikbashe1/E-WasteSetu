import 'package:flutter/material.dart';
import 'presentation/onboarding/registration_screen.dart';

void main() {
  runApp(const KabadiwalaApp());
}

class KabadiwalaApp extends StatelessWidget {
  const KabadiwalaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kabadiwala',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
        useMaterial3: true,
      ),
      home: const RegistrationScreen(),
    );
  }
}