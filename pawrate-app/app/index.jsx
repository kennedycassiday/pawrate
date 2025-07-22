import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to PawRate!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a59c32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#4f5338',
    fontSize: 24,
      fontWeight: 'bold',
  },
});
