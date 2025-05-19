import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import TabBar from "../components/TabBar";

//one tab for each page
//name is the name of the tab file. Eg. name="social" would path to social.tsx
//options -> headershowm: false by default to remove the pesky header text at the top of page. change to true to see what it looks like
const _layout = () => {
  return (
    <Tabs
      //set initial route as Inventory page
      initialRouteName="inventory"
      //custom TabBar used in place of pre-defined Tab
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        animation: "shift", //enable sliding animation when switching tabs
      }}
    >
      <Tabs.Screen
        name="social"
        options={{
          headerShown: false,
          title: "Social",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          headerShown: false,
          title: "Maps",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          headerShown: false,
          title: "Camera",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          headerShown: false,
          title: "Inventory",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="archive" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          headerShown: false,
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar-o" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
