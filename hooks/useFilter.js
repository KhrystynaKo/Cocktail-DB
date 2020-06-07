import { useState } from "react";
import useFetch from "./useFetch";
import AsyncStorage from "@react-native-community/async-storage";

export const useFilter = () => {
  const { categories, setCategories } = useFetch();
  const [newCategoryList, setNewCategoryList] = useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {}
  };

  const filterActiveCategories = () => {
    const filterCategories = categories.filter((item) => item.active === true);
    setCategories(filterCategories);
    storeData(filterCategories);
  };

  console.log(categories);

  const activeFilter = (value) => {
    console.log(value);
    setCategories(
      categories.map((item) => {
        if (item.strCategory === value) {
          item.active = !item.active;
        }
        return item;
      })
    );
  };
  return { categories, activeFilter, filterActiveCategories, newCategoryList };
};

export default useFilter;
