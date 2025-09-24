import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Respiratory Rate Monitor</Text>

      <View style={styles.buttonContainer}>
      <Link href="/new-session" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>New Session</Text>
        </TouchableOpacity>
        </Link>
      <Link href="/data-dashboard" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Data</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/coming-soon" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Email/Download Data</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/coming-soon" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reminders</Text>
        </TouchableOpacity>
      </Link>


        {/* <Link href="/new-profile" asChild>
          <TouchableOpacity style={{
            paddingVertical: 15,
            paddingHorizontal: 30,
            backgroundColor: '#FF13F0',
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
          }}>
            <Text style={styles.buttonText}>New Profile (Dev)</Text>
          </TouchableOpacity>
        </Link> */}
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
    backgroundColor: '#96CEB4',
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

  buttonText: {
    color: '#FED2E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
