import { Tabs } from "expo-router";
import React from "react";

//one tab for each page
//name is the name of the tab file. Eg. name="social" would path to social.tsx
//options -> headershowm: false by default to remove the pesky header text at the top of page. change to true to see what it looks like
const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="social"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
