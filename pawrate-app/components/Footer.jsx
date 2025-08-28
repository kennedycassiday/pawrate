import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Link href="/home" asChild>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="home" size={24} color="#FED2E2" />
        </TouchableOpacity>
      </Link>
      <Text style={styles.footerText}>PawRate © 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#8F87F1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#FED2E2',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    padding: 8,
  },
  footerText: {
    color: '#FED2E2',
    fontSize: 14,
    fontWeight: '500',
  },
});
