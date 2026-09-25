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
      onCreate: (db, version) {
        db.execute('''
          CREATE TABLE lots(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            material TEXT,
            weight REAL,
            synced INTEGER DEFAULT 0
          )
        ''');
      },
    );
    return _db!;
  }
}\n