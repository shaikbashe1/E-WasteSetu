import 'package:http/http.dart' as http;
import 'dart:convert';

class SyncService {
  static const String apiUrl = 'http://localhost:8000/sync';

  static Future<void> syncOfflineData() async {
    // In a real implementation, read from SQLite 'lots' table where synced = 0
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        "device_id": "device_001",
        "operations": []
      }),
    );
    if (response.statusCode == 200) {
      print('Sync successful');
    }
  }
}\n