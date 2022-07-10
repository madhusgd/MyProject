import React from "react";
import { StyleSheet, View, Button, Alert} from 'react-native'

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * To delete all the saved jobs from local cache
 */
const deleteSavedJobs = async() => {
  await AsyncStorage.clear();
  Alert.alert("Alert","Deleted successfully..")
}

const Home = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
    <View style={[{ width: "80%", margin: 10}]}>
        <Button color="green" title="Find your job here" onPress={() => navigation.navigate('JobsList', { name: 'JobsList' })}></Button>
        <View style={styles.viewspace} />
        <Button color="green" title="Saved Jobs" onPress={() => navigation.navigate('SavedJobs', { name: 'Dummy Wish List' })}></Button>
        <View style={styles.viewspace} />
        <Button color="green" title="Delete Jobs" onPress={() => deleteSavedJobs()}></Button>
    </View>
    </View>
  )
}

/**
 * Declaration of styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewspace: {
    width: '100%',
    height: 20,
  },
  button: {
    width: '50%',
    backgroundColor: 'green',
    borderColor: 'blue',
    borderWidth: 5,
    borderRadius: 15       
 }
});

export default Home