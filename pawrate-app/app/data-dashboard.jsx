import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Link } from "expo-router";

export default function DataDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Data Dashboard</Text>

      <View style={styles.buttonContainer}>
        <Link href="/graph-view" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Graph View</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/list-view" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>List View</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Calculate Average</Text>
        </TouchableOpacity>
        <Link href="/manual-reading" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Manual Reading</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Email/Download Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8F87F1",
  },
  text: {
    color: "#FED2E2",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "80%",
    gap: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#96CEB4",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonText: {
    color: "#FED2E2",
    fontSize: 18,
    fontWeight: "bold",
  },
});
