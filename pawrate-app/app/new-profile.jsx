import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { router } from "expo-router";

export default function NewProfile() {

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');

  const createProfile = async () => {
    if (!name.trim() || !breed.trim()) {
      Alert.alert("Missing Info", "Please enter both name and breed.");   //alert will not work on web
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        breed: breed.trim(),
      })
    });

      if (!response.ok) {
        throw new Error('Failed to save profile to backend');
      }

      const savedDog = await response.json();
      console.log(savedDog)
      // await AsyncStorage.setItem('dogId', savedDog.id.toString());

      router.replace('/home');

    } catch (error) {
      console.error("Error saving dog profile:", error);
      Alert.alert("Error", "Could not save profile. Please try again.");
    }
  }

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
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Breed:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your dog's breed"
          placeholderTextColor="#96CEB4"
          value={breed}
          onChangeText={setBreed}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={createProfile} style={styles.button}
        accessibilityRole="link"
        importantForAccessibility="yes">
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
