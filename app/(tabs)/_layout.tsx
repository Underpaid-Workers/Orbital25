import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import AltHeaderTab from "../components/main/AltHeaderBar";
import HeaderBar from "../components/main/HeaderBar";
import TabBar from "../components/main/TabBar";

//one tab for each page
//name is the name of the tab file. Eg. name="social" would path to social.tsx
//options -> headershowm: false by default to remove the pesky header text at the top of page. change to true to see what it looks like
export default function _layout() {
  const altHeaderTabs = ["camera", "entry/submitEntry", "entry/[id]"];

  return (
    <Tabs
      //set initial route as Inventory page
      initialRouteName="inventory"
      backBehavior="history"
      //custom TabBar used in place of pre-defined Tab
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        header: (props) =>
          altHeaderTabs.includes(props.route.name) ? (
            <AltHeaderTab {...props} />
          ) : (
            <HeaderBar {...props} />
          ),
      }}
    >
      <Tabs.Screen
        name="social"
        options={{
          title: "Social",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: "Maps",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "Camera",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="archive" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calendar-o" size={size} color={color} />
          ),
        }}
      />
      {/* custom settings for submit and view entry to remove default header tab. A different header tab is used */}
      <Tabs.Screen name="entry/submitEntry" />
      <Tabs.Screen name="entry/[id]" />
    </Tabs>
  );
}
