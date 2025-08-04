import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function BeginSession() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>The timer will begin on your first tap.</Text>
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
  });
