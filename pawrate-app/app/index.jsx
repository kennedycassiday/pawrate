import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Respiratory Rate Monitor</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.button1]}>
          <Text style={styles.buttonText}>New Session</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.button2]}>
          <Text style={styles.buttonText}>View Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.button3]}>
          <Text style={styles.buttonText}>Email/Download Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.button4]}>
          <Text style={styles.buttonText}>Reminders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8F87F1',
  },
  text: {
    color: '#FED2E2',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    gap: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button1: {
    backgroundColor: '#96CEB4',
  },
  button2: {
    backgroundColor: '#96CEB4',
  },
  button3: {
    backgroundColor: '#96CEB4',
  },
  button4: {
    backgroundColor: '#96CEB4',
  },
  buttonText: {
    color: '#FED2E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

// export default function HomeScreen() {
//   return (
//     <View className="flex-1 items-center justify-center bg-pink-200">
//       <Text className="text-3xl font-bold text-purple-700">Tailwind ✅</Text>
//     </View>
//   );
// }
