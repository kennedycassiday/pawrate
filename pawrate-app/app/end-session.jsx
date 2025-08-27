import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';

export default function EndSession() {
  const { count } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Octicons name="issue-closed" size={200} color="#FED2E2" />
      </TouchableOpacity>
      <Text style={styles.text}>{(count * 4) || 0} breaths per minute</Text>
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
