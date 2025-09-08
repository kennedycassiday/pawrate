import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function GraphView() {
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(254, 210, 226, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Resting Respiratory Rate"],
  });

  const chartConfig = {
    backgroundColor: "#8F87F1",
    backgroundGradientFrom: "#8F87F1",
    backgroundGradientTo: "#96CEB4",
    decimalPlaces: 0, // No decimal places
    color: (opacity = 1) => `rgba(254, 210, 226, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(254, 210, 226, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#FED2E2",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dogId = await AsyncStorage.getItem("dogId");
        const response = await fetch(
          `http://192.168.0.150:8000/sessions/dog/${dogId}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }

        const sessions = await response.json();
        console.log(sessions)
        setSessionData(sessions);

        // Process data for chart
        const sorted = sessions.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        const labels = sorted.map((s) =>
          format(new Date(s.timestamp), "MMM d, h:mm a")
        );
        const formatData = sorted.map((s) => s.breath_count);

        setChartData({
          labels: labels,
          datasets: [
            {
              data: formatData,
              color: (opacity = 1) => `rgba(254, 210, 226, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: ["Resting Respiratory Rate"],
        });
      } catch (error) {
        console.error("Error fetching sessions:", error);
        // Could set an error state here
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Graph View</Text> */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading sessions...</Text>
        </View>
      ) : chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
        <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <LineChart
          data={chartData}
          width={Math.max(Dimensions.get('window').width, chartData.labels.length * 120)}
          // width={Dimensions.get("window").width - 60}
          height={Dimensions.get('window').height * 0.4}
          chartConfig={chartConfig}
        />
        </ScrollView>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No valid data to display</Text>
        </View>
      )}
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
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLabel: {
    color: "#FED2E2",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
    marginRight: 15,
    minWidth: 60,
  },
  textInput: {
    backgroundColor: "#FED2E2",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#96CEB4",
    color: "#000",
    flex: 1,
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
});
