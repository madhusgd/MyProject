import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Alert, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-async-storage/async-storage";

import FAB from 'react-native-fab'
/**
 * Show the job details in webview
 * @param {} param0 
 * @returns 
 */
const JobDetails = ({ navigation, route }) => {

  const payloadVal = route.params.payload;
  const url = route.params.payload.url

  console.log("Payload", payloadVal.title);

  /**
   * To save the selected job into local cache
   * @param item - item to be saved 
   */
   const addToSavedItems = async (item) => {
    try {
      console.log(item.id + "-", "Key");
      const res = await AsyncStorage.setItem("key-" + item.id, JSON.stringify(item));
      Alert.alert('Saved', 'Successfully saved for later..');
    } catch (error) {
      console.log("Failed to save the item", error);
    }
  }

  /**
   * 
   * @returns To return the acitivty indicator
   */
  const ActivityIndicatorElement = () => {
    return (
      <ActivityIndicator
        color="green"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <WebView
          javaScriptEnabled={true}
          renderLoading={ActivityIndicatorElement}
          startInLoadingState={true}
          source={{ uri: url }}
          style={{ marginTop: 1 }
          }
        />
        <FAB buttonColor="green"
          iconTextColor="#FFFFFF"
          onClickAction={() => { addToSavedItems(payloadVal) }}
          visible={true}
        />
      </View>
    </SafeAreaView>
  )

}

/**
 * Declaration of styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default JobDetails