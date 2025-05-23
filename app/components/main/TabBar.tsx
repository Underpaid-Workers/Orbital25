import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../theme/colors";

//returns a custom TabBar
//

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  //temporary workaround for hiding "entry" folder from TabBar.
  //change this if changing tab routes!
  const tabs = ["social", "maps", "camera", "inventory", "events"];
  return (
    <View style={styles.tabBar}>
      {state.routes
        .filter((x) => tabs.includes(x.name))
        .map((route, index) => {
          const { options } = descriptors[route.key];
          const isSelected = state.index === index;

          //hook to change color of tab on selection
          const onFocusColour = () =>
            isSelected ? colors.tabSelected : colors.tab;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isSelected && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          //special Touchable for Camera tab
          return route.name === "camera" ? (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.cameraTab}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isSelected,
                  color: "white",
                  size: 40,
                })}
            </TouchableOpacity>
          ) : (
            //default Touchable for tabs
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={{
                height: "100%",
                flex: 0.5,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isSelected
                  ? colors.tabSelectedBackground
                  : "transparent",
              }}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isSelected,
                  color: onFocusColour(),
                  size: 24,
                })}
              <Text style={{ color: onFocusColour() }}>{options.title}</Text>
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
    backgroundColor: colors.primary,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
  },
  cameraTab: {
    //specific styling of Camera tab
    bottom: 35,
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderCurve: "circular",
    backgroundColor: "black",
  },
});
