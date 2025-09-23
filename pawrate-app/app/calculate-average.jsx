import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import {
  format,
  parse,
  parseISO,
  startOfDay,
  endOfDay,
  isWithinInterval,
} from "date-fns";
import DropDownPicker from "react-native-dropdown-picker";
import { router } from "expo-router";

export default function CalculateAverage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState([]);

  // state for start date dropdown
  const [startOpen, setStartOpen] = useState(false);
  const [startValue, setStartValue] = useState(null);

  // state for end date dropdown
  const [endOpen, setEndOpen] = useState(false);
  const [endValue, setEndValue] = useState(null);

  // When opening one dropdown, close the other
  const onOpenStart = useCallback(() => setEndOpen(false), []);
  const onOpenEnd = useCallback(() => setStartOpen(false), []);

  const parseSessionTime = (ts) => {
    const hasZone = /Z|[+-]\d\d:?\d\d$/.test(ts);
    return parseISO(hasZone ? ts : `${ts}Z`);
  };

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
        processAvailableDates(savedSessions);
      } catch (error) {
        console.error("Error fetching sessions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const processAvailableDates = (sessionsData) => {
    if (!sessionsData || sessionsData.length === 0) {
      setAvailableDates([]);
      return;
    }

    const sortedSessions = [...sessionsData].sort(
      (a, b) =>
        parseSessionTime(a.timestamp).getTime() -
        parseSessionTime(b.timestamp).getTime()
    );

    const uniqueDayKeys = Array.from(
      new Set(
        sortedSessions.map((s) =>
          format(parseSessionTime(s.timestamp), "yyyy-MM-dd")
        )
      )
    );

    const items = uniqueDayKeys.map((ymd) => {
      const d = parse(ymd, "yyyy-MM-dd", new Date());
      return {
        label: format(d, "MMMM do, yyyy"),
        value: ymd,
      };
    });

    setAvailableDates(items);
  };

  const getAverage = () => {
    if (!startValue || !endValue) {
      Alert.alert(
        "Missing Selection",
        "Please select both start and end dates."
      );
      return;
    }
    const startDay = parse(startValue, "yyyy-MM-dd", new Date());
    const endDay = parse(endValue, "yyyy-MM-dd", new Date());
    console.log("Start:End", startDay, endDay);
    if (startDay > endDay) {
      Alert.alert(
        "Invalid Range",
        "End date must be on or after the start date."
      );
      return;
    }
    const sessionsInRange = sessions.filter((s) => {
      const when = parseSessionTime(s.timestamp);
      return isWithinInterval(when, { start: startDay, end: endDay });
    });
    if (sessionsInRange.length === 0) {
      Alert.alert("No Data", "No sessions found in the selected range.");
      return;
    }
    const numbers = sessionsInRange.map((num) => num.rate_bpm);
    console.log("BPM values:", numbers);
    const sum = numbers.reduce((a, b) => a + b, 0);
    const average = (sum / numbers.length).toFixed(1);
    console.log("Average:", average)

    Alert.alert(
      "Average",
      `${average} (from ${numbers.length} session${numbers.length === 1 ? "" : "s"})`
    );
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
          <View
            style={[
              styles.inputContainer,
              {
                position: "relative",
                zIndex: startOpen ? 2000 : 1000, // iOS
                elevation: startOpen ? 12 : 0, // Android
              },
            ]}
          >
            <Text style={styles.inputLabel}>Start:</Text>
            <DropDownPicker
              open={startOpen}
              value={startValue}
              items={availableDates}
              setOpen={setStartOpen}
              setValue={setStartValue}
              setItems={setAvailableDates}
              placeholder="Select a start date"
              placeholderStyle={styles.dropdownPlaceholder}
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                { zIndex: 3000, elevation: 16 },
              ]}
              itemStyle={styles.dropdownItem}
              labelStyle={styles.dropdownItemText}
              textStyle={styles.dropdownItemText}
              onOpen={onOpenStart}
              arrowIconStyle={{
                tintColor: "#96CEB4",
              }}
              tickIconStyle={{
                tintColor: "#8F87F1",
              }}
              zIndex={3000}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              {
                position: "relative",
                zIndex: endOpen ? 2000 : 500, // lower when closed
                elevation: endOpen ? 12 : 0,
              },
            ]}
          >
            <Text style={styles.inputLabel}>End:</Text>
            <DropDownPicker
              open={endOpen}
              value={endValue}
              items={availableDates}
              setOpen={setEndOpen}
              setValue={setEndValue}
              setItems={setAvailableDates}
              placeholder="Select an end date"
              placeholderStyle={styles.dropdownPlaceholder}
              listMode="SCROLLVIEW"
              style={styles.dropdown}
              dropDownContainerStyle={[
                styles.dropdownContainer,
                { zIndex: 3000, elevation: 16 },
              ]}
              zIndex={2500}
              itemStyle={styles.dropdownItem}
              labelStyle={styles.dropdownItemText}
              textStyle={styles.dropdownItemText}
              onOpen={onOpenEnd}
              arrowIconStyle={{
                tintColor: "#96CEB4",
              }}
              tickIconStyle={{
                tintColor: "#8F87F1",
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={getAverage}
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
    marginBottom: 40,
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
  dropdown: {
    backgroundColor: "#FED2E2",
    borderColor: "#96CEB4",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    minHeight: 50,
    maxWidth: "70%",
  },
  dropdownContainer: {
    backgroundColor: "#FED2E2",
    borderColor: "#96CEB4",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#96CEB4",
  },
  dropdownItemText: {
    color: "#96CEB4",
    fontSize: 16,
  },
  dropdownPlaceholder: {
    color: "#96CEB4",
    fontSize: 16,
  },
});
