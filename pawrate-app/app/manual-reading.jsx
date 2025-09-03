import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { router } from "expo-router";

export default function ManualReading() {
    const [bpm, setBpm] = useState('')

  const createReading = async () => {
    if (!bpm.trim()) {
        Alert.alert("Missing Information", "Please enter resting respiratory rate.");   //alert will not work on web
        return;
    }

    try {
        const dogId = await AsyncStorage.getItem('dogId');
        const currentTimestamp = new Date().toISOString();

        const response = await fetch('http://192.168.0.150:8000/sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "dog_id": dogId,
            "timestamp": currentTimestamp,
            "breath_count": bpm / 4,
            "duration_secs": 15,
            "rate_bpm": bpm
        })
    });
    if (!response.ok) {
        throw new Error('Failed to save session to backend');
      }

      const savedSession = await response.json();
      console.log(savedSession)

      Alert.alert(
          "Success",
          "Session saved!",
          [
            {
              text: "OK",
              onPress: () => router.replace('/home')
            }
          ]
        );

    } catch (error) {
      console.error("Error saving breathing session:", error);
      Alert.alert("Error", "Could not save session. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Manual Reading</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter breathing rate per minute"
          placeholderTextColor="#96CEB4"
            value={bpm}
            onChangeText={setBpm}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={createReading}
          style={styles.button}
          accessibilityRole="link"
          importantForAccessibility="yes"
        >
          <Text style={styles.buttonText}>Submit!</Text>
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
