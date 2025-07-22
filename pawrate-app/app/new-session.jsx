import {View, Text, StyleSheet} from 'react-native'

export default function NewSession () {
    return (
    <View style={styles.container}>
        <Text style={styles.text}>On the following screen,
tap once for every breath.
A breath includes one inhale
 and one exhale.</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#a59c32',
    },
    text: {
        color: '#4f5338',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });
