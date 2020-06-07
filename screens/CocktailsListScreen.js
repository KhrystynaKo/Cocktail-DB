import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import useFetch from "../hooks/useFetch";
import useFilter from "../hooks/useFilter";

import CocktailCard from "../components/CocktailCard";

const CocktailsListScreen = () => {
  const { categories } = useFetch("list", "list");
  const [numOfCategory, setNumOfCategory] = useState(0);
  const [category, setCategory] = useState("Cocktail");

  const changeCategory = () => {
    const nextNum = numOfCategory + 1;
    nextNum < categories.length ? setNumOfCategory(nextNum) : "";
  };

  useEffect(() => {
    let newCategory;
    categories.length >= 1
      ? (newCategory = categories[numOfCategory].strCategory)
      : "";
    console.log(newCategory);
    setCategory(newCategory);
  }, [numOfCategory, categories]);

  const { data, state } = useFetch("filter", category);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Text>The End</Text>
      </View>
    );
  };
  console.log(data);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.category}>{category}</Text>
        {state.loading ? (
          <ActivityIndicator size='large' color='#5bcbea' />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <CocktailCard item={item} key={item.idDrink} />
            )}
            keyExtractor={(item) => item.idDrink}
            onEndReached={changeCategory}
            onEndReachedThreshold={0.3}
            ListFooterComponent={renderFooter}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 70,
  },
  footer: {
    height: 50,
    backgroundColor: "#cccccc",
  },
  category: {
    padding: 10,
    fontSize: 15,
  },
  error: {
    // fontSize: 20,
    // color: "red",
  },
});

export default CocktailsListScreen;
