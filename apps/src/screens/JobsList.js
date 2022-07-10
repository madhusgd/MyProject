import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Alert, Text, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import Axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import { baseUrl } from "../utils/Constants";

export const newStoriesUrl = `${baseUrl}jobstories.json`;
export const jobUrl = `${baseUrl}item/`;

/**
 * Component to show list of jobs
 * @param {} param0 
 * @returns 
 */
const JobsList = ({ navigation, route }) => {

  const [jobIds, setJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

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

  /**
   * handling list item click action 
   * @param {*} item 
   */ 
  const getListViewItem = (item) => {
    navigation.navigate('JobDetail', { name: 'Madhu', payload: item })
  }

  /**
   * Save the item to local storage
   * @param {Item to be saved} item 
   */
  const addToSavedItems = async (item) => {
    try {
      const res = await AsyncStorage.setItem("key:" + item.id, JSON.stringify(item));
      Alert.alert('Saved', 'Successfully saved for later..');
    } catch (error) {
      console.log("Failed to save the item", error);
    }
  }

  /**
   * render the list item
   * @param {*} param0 
   * @returns 
   */
  const renderJob = ({ item, index }) => {
    const date = item.time;
    var formattedDate = moment(date * 1000).format("DD-MM-YYYY");
    return (
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <TouchableOpacity onPress={() => getListViewItem(item)}>
          <View>
            <Text style={{ fontSize: 14, color: 'black' }}>
              {item.title}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <View style={{ marginTop: 5, marginBottom: 5, alignItems: "flex-start" }}>
              <Text style={{ fontSize: 14, color: 'black', fontStyle: "italic" }}>
                Posted at {formattedDate + ""}
              </Text>
            </View>
            <View style={{ marginTop: 5, marginBottom: 5, alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={() => addToSavedItems(item)}
              >
                <Text style={{ fontSize: 14, color: 'green', fontStyle: "italic" }}>Save for later</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  const renderFooter = () => {
    return (
      <View style={{
        height: 44,
        width: "100%",
        backgroundColor: "green",
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ fontSize: 24, color: 'white' }}> Loading... </Text>
      </View>
    );
  }

  // To fetch the Job ID's
  const getJobs = async () => {
    try {
      const { data: ids } = await Axios.get(newStoriesUrl).
        then(({ data }) => {
          setJobIds(data)
        });
    } catch (error) {
      console.log("getJobIdsError: ", error);
    }
  };

  // To fetch the Job details based on JobId
  const getJobDetails = async (list) => {
    const results = [];
    await Promise.all(list.map(async (key) => {
      const contents = await Axios.get(`${jobUrl + key}.json`)
      results.push(contents.data)
      setLoading(false);
    }));
    results && results.length ? setJobs(results) : null
  };

  useEffect(() => {
    setLoading(true);
    getJobs();
  }, []);

  useEffect(() => {
    console.log("Array Length: ", jobIds.length);
    const list = Array.from(jobIds).slice(0, jobIds.length);
    getJobDetails(list);
  }, [jobIds]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, paddingHorizontal: 2 }}>
        <View style={{ flex: 1, marginTop: 8 }}>
          {loading ? (
            <ActivityIndicator
              color="green"
              size="large"
              style={styles.activityIndicatorStyle}
              visible={loading}
            />
          ) : (

            <FlatList
              data={jobs}
              renderItem={renderJob}
              keyExtractor={item => `key-${item.id}`}
              ItemSeparatorComponent={renderSeparator}
            />
          )}
        </View>
      </View>
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
    padding: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default JobsList