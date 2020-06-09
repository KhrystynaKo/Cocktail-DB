import useFetch from "./useFetch";
import AsyncStorage from "@react-native-community/async-storage";

export const useFilter = () => {
  const { filters, dispatch } = useFetch("list", "list");

  const storeFilters = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@drink", jsonValue);
    } catch (e) {}
  };
  const storeActiveFilters = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@activeCategories", jsonValue);
    } catch (e) {}
  };

  const filterActiveCategories = () => {
    const filterCategories = filters.filter((item) => item.active === true);
    storeActiveFilters(filterCategories);
  };

  const activeFilter = (value) => {
    const toggledCategories = filters.map((item) => {
      if (item.strCategory === value) {
        item.active = !item.active;
      }
      return item;
    });
    dispatch({ type: "SUCCESS_FILTERS", payload: toggledCategories });
    storeFilters(toggledCategories);
  };
  return { activeFilter, filterActiveCategories };
};

export default useFilter;
