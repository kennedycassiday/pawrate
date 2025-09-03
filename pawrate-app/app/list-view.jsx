import { Text, View, StyleSheet } from 'react-native';

export default function ListView() {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>List View</Text>
        </View>
    )
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
  });
