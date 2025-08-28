import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function EntryPoint() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDogId = async () => {
      try {
        const dogId = await AsyncStorage.getItem("dogId");
        if (dogId) {
          router.replace("/home");
        } else {
          router.replace("/new-profile");
        }
      } catch (error) {
        console.error("Error checking dog ID:", error);
        router.replace("/new-profile");
      }
    };
    checkDogId();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>PawRate</Text>
        <ActivityIndicator
          size="large"
          color="#96CEB4"
          style={styles.spinner}
        />
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8F87F1",
  },
  title: {
    color: "#FED2E2",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    color: "#FED2E2",
    fontSize: 18,
    marginTop: 20,
  },
  spinner: {
    marginVertical: 20,
  },
});
