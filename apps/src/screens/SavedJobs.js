import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Alert, Text, FlatList } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

/**
 * To show the list of saved jobs
 * @param {*} param0 
 * @returns 
 */
const SavedJobs = ({ navigation, route }) => {
  const [jobs, setJobs] = useState([]);
  const [isEmptyList, setIsEmptyList] = useState(false);

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "lightgrey",
        }}
      />
    );
  };

  // render the list item
  const renderJob = ({ item, index }) => {
    const data = JSON.parse(item);
    const date = data.time
    var time = moment(date * 1000).format("DD-MM-YYYY");
    return (
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <View>
          <Text style={{ fontSize: 14, color: 'black' }}>
            {data.title}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
          <View style={{ marginTop: 5, marginBottom: 5, alignItems: "flex-start" }}>
            <Text style={{ fontSize: 14, color: 'black', fontStyle: "italic" }}>
              Posted at {time + ""}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  /**
   * To fetch the saved items from local storage
   */
  const getSavedItems = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      if (keys != null && keys.length > 0) {
        setIsEmptyList(false);
        console.log("Keys are available", keys);

        const results = [];
        await Promise.all(keys.map(async (key) => {
          const contents = await AsyncStorage.getItem(key)
          //console.log(contents)
          results.push(contents)
        }));
        results && results.length ? setJobs(results) : null
      } else {
        console.log("No saved items")
        setIsEmptyList(true);
      }
    } catch (error) {
      console.log("Failed to get the item", error);
    }
  }

  useEffect(() => {
    getSavedItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        {isEmptyList ? (
          <Text style={styles.emptyList}> No saved items available.</Text>
        ) : (
          <FlatList
            data={jobs}
            renderItem={renderJob}
            keyExtractor={item => `skey-${JSON.parse(item).id}`}
            ItemSeparatorComponent={renderSeparator}
          />
        )}
    </SafeAreaView>
  );
}

/**
 * Declaration of styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  emptyList: {
    width: '100%',
    padding: 20,
    color: 'green',
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default SavedJobs