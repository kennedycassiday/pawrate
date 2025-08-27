import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";

export default function BeginSession() {
  const [count, setCount] = useState(0);
  console.log(count);
  const [timerStarted, setTimerStarted] = useState(false);
  const countRef = useRef(count);
  const timerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const handlePress = () => {
    setCount((current) => current + 1);

    if (!timerStarted) {
      // check if timer has started
      setTimerStarted(true); // set timerStarted to true so that it doesn't start again on future presses

      timerRef.current = setTimeout(() => {
        const finalCount = countRef.current;
        router.push({
          pathname: '/end-session',
          params: { count: finalCount },
        });
      }, 15000);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current); // Clean up timer
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
        <Octicons name="feed-heart" size={200} color="#FED2E2" />
      </TouchableOpacity>
      <Text style={styles.text}>The timer will begin on your first tap.</Text>
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
  iconContainer: {
    padding: 8,
  },
});
