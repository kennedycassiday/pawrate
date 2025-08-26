import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';

export default function BeginSession() {
    const [timesPressed, setTimesPressed] = useState(0)
    // console.log(timesPressed)


    return (
        <View style={styles.container}>
            <Pressable
            onPress={() => {
                setTimesPressed(current => current + 1);
            }}
            style={styles.iconContainer}>
              <Octicons name="feed-heart" size={200} color="#FED2E2" />
            </Pressable>
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
      iconContainer: {
        padding: 8,
      },
    });




//import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import Octicons from '@expo/vector-icons/Octicons';

// export default function BeginSession() {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.iconContainer}>
//         <Octicons name="feed-heart" size={200} color="#FED2E2" />
//       </TouchableOpacity>
//       <Text style={styles.text}>The timer will begin on your first tap.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#8F87F1",
//     paddingHorizontal: 20,
//   },
//   text: {
//     color: "#FED2E2",
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 40,
//     textAlign: "center",
//   },
//   iconContainer: {
//     padding: 8,
//   },
// });
