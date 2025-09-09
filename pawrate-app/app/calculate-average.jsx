import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";

export default function CalculateAverage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dogID = await AsyncStorage.getItem("dogId");
        const response = await fetch(
          `http://192.168.0.150:8000/sessions/dog/${dogId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to retrieve data from backend");
        }
        const savedSessions = await response.json();
        console.log(savedSessions);
        setSessions(savedSessions);
      } catch (error) {
        console.error("Error fetching sessions", error);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  //   const [loading, setLoading] = useState(true);
  //   const [startDate, setStartDate] = useState("");
  //   const [endDate, setEndDate] = useState("");

  //   const getAverage = async () => {
  //     if (!startDate.trim() || !endDate.trim()) {
  //       Alert.alert(
  //         "Missing Info",
  //         "Please choose both a start date and an end date."
  //       ); //alert will not work on web
  //       return;
  //     }

  //     try {
  //       const dogId = await AsyncStorage.getItem("dogId");
  //       const response = await fetch(
  //         `http://192.168.0.150:8000/sessions/dog/${dogId}`,
  //         {
  //           method: "GET",
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to retrieve data from backend");
  //       }

  //       const sessions = await response.json();
  //       console.log(sessions);

  //         const savedDog = await response.json();
  //         console.log(savedDog)
  //         await AsyncStorage.setItem('dogId', savedDog.id.toString());
  //     } catch (error) {
  //       console.error("Error calculating average:", error);
  //       Alert.alert("Error", "Could not calculate average. Please try again.");
  //     }
  //   };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading sessions...</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>
            Please input the desired start and end dates for the time period you
            wish to average.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Start:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter a start date"
              placeholderTextColor="#96CEB4"
              //   value={startDate}
              //   onChangeText={setStartDate}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>End:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter an end date"
              placeholderTextColor="#96CEB4"
              //   value={endDate}
              //   onChangeText={setEndDate}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              //   onPress={getAverage}
              style={styles.button}
              accessibilityRole="link"
              importantForAccessibility="yes"
            >
              <Text style={styles.buttonText}>Get average!</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FED2E2",
    fontSize: 18,
    fontWeight: "600",
  },
});
