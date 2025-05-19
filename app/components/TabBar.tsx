import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";

//returns a custom TabBar
//

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        //special Touchable for Camera tab
        return route.name === "camera" ? (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.cameraTab}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: "white",
                size: 40,
              })}
          </TouchableOpacity>
        ) : (
          //default Touchable for tabs
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? colors.tabSelected : colors.tab,
                size: 24,
              })}
            <Text
              style={{ color: isFocused ? colors.tabSelected : colors.tab }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    //styling of whole tab bar
    flexDirection: "row",
    backgroundColor: colors.tabBar,
    overflowX: "hidden",
    height: 60,
    bottom: 10,
    marginHorizontal: 16,
    borderRadius: 15,
    borderCurve: "continuous",
  },
  tab: {
    //default styling of tabs
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.tabBar,
    borderRadius: 15,
    borderCurve: "continuous",
  },
  cameraTab: {
    //specific styling of Camera tab
    flex: 1,
    bottom: 35,
    width: 100,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "black",
  },
});
