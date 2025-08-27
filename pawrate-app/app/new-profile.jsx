import { View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { Link } from 'expo-router';

export default function NewProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Let's get your dog's profile set-up!
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your dog's name"
          placeholderTextColor="#96CEB4"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Breed:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your dog's breed"
          placeholderTextColor="#96CEB4"
        />
      </View>

      <View style={styles.buttonContainer}>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}
        accessibilityRole="link"
        importantForAccessibility="yes">
          <Text style={styles.buttonText}>Submit!</Text>
        </TouchableOpacity>
        </Link>
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
    paddingHorizontal: 20,
  },
  text: {
    color: "#FED2E2",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLabel: {
    color: "#FED2E2",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
    marginRight: 15,
    minWidth: 60,
  },
  textInput: {
    backgroundColor: "#FED2E2",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#96CEB4",
    color: "#000",
    flex: 1,
  },
  buttonContainer: {
    width: "50%",
    gap: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#96CEB4",
  },
  buttonText: {
    color: "#FED2E2",
    fontSize: 18,
    fontWeight: "bold",
  },
});
