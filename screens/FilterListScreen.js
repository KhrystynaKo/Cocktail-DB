import React from "react";
import useFetch from "../hooks/useFetch";
import { StyleSheet, SafeAreaView, FlatList, Button } from "react-native";
import FilterItem from "../components/FilterItem";
import useFilter from "../hooks/useFilter";

const FilterListScreen = () => {
  const { activeFilter, filterActiveCategories } = useFilter();
  const { data } = useFetch("list", "list");

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <FilterItem item={item} activeFilter={activeFilter} key={index} />
        )}
        keyExtractor={(item) => item.strCategory}
      />
      <Button title='Apply' onPress={() => filterActiveCategories()} />
    </SafeAreaView>
  );
};

export default FilterListScreen;
