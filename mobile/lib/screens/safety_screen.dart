import 'package:flutter/material.dart';

class SafetyScreen extends StatelessWidget {
  const SafetyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Safety Instructions')),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: const [
          ListTile(
            leading: Icon(Icons.warning, color: Colors.red, size: 40),
            title: Text('Do not burn cables'),
            subtitle: Text('Burning cables releases toxic fumes.'),
          ),
          ListTile(
            leading: Icon(Icons.visibility, color: Colors.blue, size: 40),
            title: Text('Wear protective gear'),
            subtitle: Text('Use gloves and safety glasses.'),
          ),
          ListTile(
            leading: Icon(Icons.health_and_safety, color: Colors.green, size: 40),
            title: Text('Handle batteries carefully'),
            subtitle: Text('Leaking batteries can cause chemical burns.'),
          ),
        ],
      ),
    );
  }
}
