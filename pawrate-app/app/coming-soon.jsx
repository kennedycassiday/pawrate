import { View, Text, StyleSheet } from 'react-native';

export default function ComingSoon() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Feature in progress.</Text>
            <Text style={styles.text}>Check back soon!</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8F87F1',
      },
      text: {
        color: '#FED2E2',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
      },
});
