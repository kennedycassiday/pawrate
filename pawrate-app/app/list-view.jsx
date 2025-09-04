import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export default function ListView() {
    const [sessionData, setSessionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const formatDate = (timestamp) => format(new Date(timestamp), 'MMM dd, yyyy');
    const formatTime = (timestamp) => format(new Date(timestamp), 'h:mm a');

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listItemCard}>
                <View style={styles.listItemHeader}>
                    <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
                </View>
                <View style={styles.listItemContent}>
                    <Text style={styles.timeText}>{formatTime(item.timestamp)}</Text>
                    <View style={styles.rateContainer}>
                        <Text style={styles.rateNumber}>{item.rate_bpm}</Text>
                        <Text style={styles.rateLabel}>breaths/min</Text>
                    </View>
                </View>
            </View>
        )
    }

    const renderEmptyState = () => {
        return (
            <View style={styles.emptyStateContainer}>
                <Text style={styles.emptyStateTitle}>No Sessions Yet</Text>
                <Text style={styles.emptyStateText}>Start a new session to track your dog's respiratory rate</Text>
            </View>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Session History</Text>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Loading sessions...</Text>
                </View>
            ) : (
                <FlatList
                    data={sessionData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={renderEmptyState}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#8F87F1",
      paddingHorizontal: 20,
      paddingTop: 60,
    },
    headerText: {
      color: "#FED2E2",
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 30,
      textAlign: "center",
    },
    listContainer: {
      paddingBottom: 20,
    },
    listItemCard: {
      backgroundColor: "#FED2E2",
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    listItemHeader: {
      marginBottom: 12,
    },
    dateText: {
      color: "#8F87F1",
      fontSize: 16,
      fontWeight: "bold",
    },
    listItemContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    timeText: {
      color: "#8F87F1",
      fontSize: 14,
      opacity: 0.8,
    },
    rateContainer: {
      alignItems: "center",
    },
    rateNumber: {
      color: "#8F87F1",
      fontSize: 32,
      fontWeight: "bold",
      lineHeight: 36,
    },
    rateLabel: {
      color: "#8F87F1",
      fontSize: 12,
      fontWeight: "600",
      opacity: 0.8,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      color: "#FED2E2",
      fontSize: 18,
      fontWeight: "600",
    },
    emptyStateContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 60,
    },
    emptyStateTitle: {
      color: "#FED2E2",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 12,
      textAlign: "center",
    },
    emptyStateText: {
      color: "#FED2E2",
      fontSize: 16,
      textAlign: "center",
      opacity: 0.8,
      paddingHorizontal: 20,
    },
  });
