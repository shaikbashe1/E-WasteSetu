import 'package:flutter/material.dart';
import 'create_lot_screen.dart';

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
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _buildMenuCard(Icons.currency_rupee, "Today's Prices"),
                  _buildMenuCard(Icons.factory, "Find Recycler"),
                  _buildMenuCard(Icons.history, "My Transactions"),
                  _buildMenuCard(Icons.warning, "Safety"),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuCard(IconData icon, String title) {
    return Card(
      elevation: 4,
      child: InkWell(
        onTap: () {},
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 50, color: Colors.green),
            const SizedBox(height: 10),
            Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}\n