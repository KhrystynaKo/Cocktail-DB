import { useState } from "react";
import useFetch from "./useFetch";
import AsyncStorage from "@react-native-community/async-storage";

export const useFilter = () => {
  const { categories, setCategories } = useFetch("list", "list");
  const [newCategoryList, setNewCategoryList] = useState([]);

  const filterActiveCategories = () => {
    const filterCategories = categories.filter((item) => item.active === true);
    setNewCategoryList(filterCategories);
  };

  const activeFilter = (value) => {
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
