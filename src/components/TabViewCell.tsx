import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

interface TabViewCellProps {
  focused: boolean;
  source: any;
  label: string;
}

const TabViewCell: React.FC<TabViewCellProps> = ({
  focused,
  source,
  label,
}) => {
  //console.log(focused);

  return (
    <View style={styles.tabContainer}>
      <Image style={styles.icon} source={source} />
      <View style={focused && styles.activeLabel}>
        <Text style={[styles.label, focused && styles.activeLabel]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

export default TabViewCell;

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: "center",
    ...Platform.select({
      android: {
        top: 0,
      },
      ios: {
        top: 10,
      },
      default: {
        top: 0,
      },
    }),
  },

  label: {
    fontSize: 12,
    color: Colors.titleColor,
    paddingBottom: 5,
    // marginBottom: 2,
  },
  activeLabel: {
    color: Colors.titleColor,
    width: 50,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
