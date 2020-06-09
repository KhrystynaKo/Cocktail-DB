import React from "react";
import useFetch from "../hooks/useFetch";
import { StyleSheet, SafeAreaView, FlatList, Button } from "react-native";
import FilterItem from "../components/FilterItem";
import useFilter from "../hooks/useFilter";

const FilterListScreen = ({ navigation }) => {
  const { activeFilter, filterActiveCategories } = useFilter();
  const { filters } = useFetch("list", "list");
  const button = () => {
    filterActiveCategories();
    navigation.push("Drinks");
  };

  return (
    <SafeAreaView>
      <FlatList
        data={filters}
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
