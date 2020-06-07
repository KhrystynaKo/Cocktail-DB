import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const CocktailCard = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.strDrinkThumb }} />
      <Text style={styles.text}>{item.strDrink}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: 120,
    height: 120,
  },
  text: {
    paddingLeft: 15,
    fontSize: 18,
  },
});

export default CocktailCard;
