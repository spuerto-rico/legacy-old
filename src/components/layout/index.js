import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import styles from "./styles";

const layout = ({ children }) => {
  return <SafeAreaView style={styles.wrapper}>{children}</SafeAreaView>;
};

export default layout;
