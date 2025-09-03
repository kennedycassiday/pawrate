import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export default function ListView() {
    const [sessionData, setSessionData] = useState([]);
    const formatDate = (timestamp) => format(new Date(timestamp), 'Pp');


    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
            <Text style={styles.text}>{ formatDate(item.timestamp) }, { item.rate_bpm } breaths per minute</Text>
        </View>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dogId = await AsyncStorage.getItem('dogId');
                const response = await fetch(`http://192.168.0.150:8000/sessions/dog/${dogId}`, {
              method: 'GET',});

              if (!response.ok) {
                throw new Error('Failed to fetch sessions');
              }
              const sessions = await response.json();
              console.log(sessions)
              setSessionData(sessions);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>List View</Text>
            <FlatList
            data={sessionData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
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
