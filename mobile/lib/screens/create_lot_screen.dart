import 'package:flutter/material.dart';

class CreateLotScreen extends StatelessWidget {
  const CreateLotScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sell E-Waste')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('AI Suggests: PCB', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            const Text('Confidence: 82%'),
            const SizedBox(height: 20),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Approximate Weight (kg)',
                border: OutlineInputBorder(),
              ),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Save lot locally to SQLite and add to sync queue
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Lot Saved Offline')));
                Navigator.pop(context);
              },
              child: const Text('SAVE LOT'),
            )
          ],
        ),
      ),
    );
  }
}\n