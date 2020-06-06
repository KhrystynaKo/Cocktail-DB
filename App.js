import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";

import CocktailsListScreen from "./screens/CocktailsListScreen";
import FilterListScreen from "./screens/FilterListScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Drinks'
          component={CocktailsListScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Icon
                onPress={() => navigation.navigate("Filters")}
                name='filter'
                size={35}
                color='black'
              />
            ),
          })}
        />
        <Stack.Screen name='Filters' component={FilterListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
