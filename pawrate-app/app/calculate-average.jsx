import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { parseISO, format } from 'date-fns';
import { router } from "expo-router";

export default function CalculateAverage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dogId = await AsyncStorage.getItem("dogId");
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
        setSessions(savedSessions);
        console.log("Sessions", savedSessions);
        processAvailableDates(savedSessions);
      } catch (error) {
        console.error("Error fetching sessions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Conventional approach: Pure function that doesn't mutate original data
  const processAvailableDates = (sessionsData) => {
    if (!sessionsData || sessionsData.length === 0) {
      setAvailableDates([]);
      return;
    }

    // Create a copy and sort (doesn't mutate original)
    const sortedSessions = [...sessionsData].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    // Extract unique dates and convert Set to Array
    const uniqueDates = Array.from(
      new Set(
        sortedSessions.map(s => format(new Date(s.timestamp), 'PPPP'))
      )
    );

    setAvailableDates(uniqueDates);
    console.log("Available Dates", uniqueDates);
  };


  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading sessions...</Text>
        </View>
      ) : (
        <>
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
        </>
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
