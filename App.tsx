import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-native-reanimated";

import Home from "./components/Home";
import Notes from "./components/Notes/list";

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              let iconName = "record";

              if (route.name === "Record") {
                iconName = "record-vinyl";
              } else if (route.name === "History") {
                iconName = "history";
              }
              return <FontAwesome5 name={iconName} size={24} color="black" />;
            },
          })}
        >
          <Tab.Screen name="Record" component={Home} />
          <Tab.Screen name="History" component={Notes} />
        </Tab.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
