import 'package:flutter/material.dart';
import 'create_lot_screen.dart';
import 'safety_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hello, Collector'),
        actions: const [
          Icon(Icons.wifi, color: Colors.green), // Offline status indicator
          SizedBox(width: 16),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Card(
              child: Padding(
                padding: EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('Total Earnings', style: TextStyle(fontSize: 18)),
                    Text('\$150.00', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.green)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(double.infinity, 80),
                backgroundColor: Colors.green.shade100,
              ),
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const CreateLotScreen()));
              },
              icon: const Icon(Icons.add_a_photo, size: 40),
              label: const Text('CREATE NEW LOT', style: TextStyle(fontSize: 24)),
            ),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(double.infinity, 60),
                backgroundColor: Colors.orange.shade100,
              ),
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (_) => const SafetyScreen()));
              },
              icon: const Icon(Icons.warning, size: 30),
              label: const Text('Safety Instructions', style: TextStyle(fontSize: 20)),
            ),
          ],
        ),
      ),
    );
  }
}