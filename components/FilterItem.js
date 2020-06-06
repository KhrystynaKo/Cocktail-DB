import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const FilterItem = ({ item, activeFilter }) => {
  const [isSelected, setSelection] = useState(true);

  const filterActive = (category) => {
    isSelected ? setSelection(false) : setSelection(true);
    activeFilter(category);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>{item.strCategory}</Text>
        {isSelected ? (
          <Icon
            onPress={() => filterActive(item.strCategory)}
            name='check'
            size={35}
            color='black'
          />
        ) : (
          <Icon
            onPress={() => filterActive(item.strCategory)}
            name='check'
            size={35}
            color='white'
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FilterItem;
