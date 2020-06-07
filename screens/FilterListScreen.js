import React from "react";
import useFetch from "../hooks/useFetch";
import { StyleSheet, SafeAreaView, FlatList, Button } from "react-native";
import FilterItem from "../components/FilterItem";
import useFilter from "../hooks/useFilter";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const FilterListScreen = ({ navigation }) => {
  const { activeFilter, filterActiveCategories } = useFilter();
  const { categories } = useFetch("list", "list");
  const button = () => {
    filterActiveCategories();
    navigation.navigate("Drinks");
  };

  return (
    <SafeAreaView>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => (
          <FilterItem item={item} activeFilter={activeFilter} key={index} />
        )}
        keyExtractor={(item) => item.strCategory}
      />
      <Button title='Apply' onPress={() => button()} />
    </SafeAreaView>
  );
};

export default FilterListScreen;
