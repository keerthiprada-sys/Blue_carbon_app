import 'package:flutter/material.dart';

void main() {
  runApp(const BlueCarbonApp());
}

class BlueCarbonApp extends StatelessWidget {
  const BlueCarbonApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Blue Carbon Registry',
      theme: ThemeData(primarySwatch: Colors.green),
      home: const LoginScreen(),
    );
  }
}

// ------------------ LOGIN ------------------
class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Blue Carbon Registry")),
      body: Center(
        child: ElevatedButton(
          child: const Text("Login (Demo)"),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const KycScreen()),
            );
          },
        ),
      ),
    );
  }
}

// ------------------ KYC ------------------
class KycScreen extends StatelessWidget {
  const KycScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("KYC Verification")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ElevatedButton(onPressed: () {}, child: const Text("Upload Aadhaar")),
            ElevatedButton(onPressed: () {}, child: const Text("Upload PAN")),
            ElevatedButton(onPressed: () {}, child: const Text("Upload Land Record")),
            const SizedBox(height: 20),
            ElevatedButton(
              child: const Text("Submit KYC"),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const PlantationScreen()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

// ------------------ PLANTATION ------------------
class PlantationScreen extends StatelessWidget {
  const PlantationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final TextEditingController saplingController = TextEditingController();
    final TextEditingController notesController = TextEditingController();

    return Scaffold(
      appBar: AppBar(title: const Text("Plantation Submission")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(
              controller: saplingController,
              decoration: const InputDecoration(labelText: "Number of Saplings"),
              keyboardType: TextInputType.number,
            ),
            TextField(
              controller: notesController,
              decoration: const InputDecoration(labelText: "Notes"),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              child: const Text("Submit Plantation"),
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text("Plantation submitted (demo)!")),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
