import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Pressable} from 'react-native';
import { useLocalSearchParams, useRouter} from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';

export default function EndSession() {
  const { count } = useLocalSearchParams();
  const router = useRouter();
  const saveSession = () => {
    console.log("session saved!")
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Octicons name="issue-closed" size={200} color="#FED2E2" />
      </View>
      <Text style={styles.text}>{(count * 4) || 0} breaths per minute</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={saveSession}>
          <Text style={styles.buttonText}>Save Session</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.push('/begin-session')}>
          <Text style={styles.buttonText}>Start Over</Text>
        </Pressable>
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
      iconContainer: {
        padding: 8,
      },
      buttonContainer: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
      },
      button: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
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
        flex: 1,
        minHeight: 50,
      },
      buttonText: {
        color: "#FED2E2",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
      },
    });
