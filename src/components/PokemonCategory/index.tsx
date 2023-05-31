import {ActivityIndicator, StyleSheet, View, Text} from "react-native";
import React from "react";

export function Category({category}) {
  return (
    <View style={styles.container}>
        <Text>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
  }
})