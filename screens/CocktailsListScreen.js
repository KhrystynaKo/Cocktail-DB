import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import useFetch from "../hooks/useFetch";
import useDrinks from "../hooks/useDrinks";
import CocktailCard from "../components/CocktailCard";

const CocktailsListScreen = () => {
  const { category, changeCategory } = useDrinks();
  const { drinks, loading } = useFetch("filter", category);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Text>The End</Text>
      </View>
    );
  };
  console.log(drinks);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.category}>{category}</Text>
        {loading ? (
          <ActivityIndicator size='large' color='#5bcbea' />
        ) : (
          <FlatList
            data={drinks}
            renderItem={({ item }) => (
              <CocktailCard item={item} key={item.idDrink} />
            )}
            keyExtractor={(item) => item.idDrink}
            onEndReached={changeCategory}
            onEndReachedThreshold={1}
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
});

export default CocktailsListScreen;
