import { useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import useFetch from "../hooks/useFetch";

const initialState = {
  numOfCategory: 0,
  category: null,
  newFilterList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NUM":
      return { ...state, numOfCategory: action.payload };

    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "SET_NEW_FILTERS":
      return {
        ...state,
        newFilterList: action.payload,
      };

    default:
      return state;
  }
};

const useDrinks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { filters } = useFetch("list", "list");
  useFetch("filter", state.category);

  const getActiveFilters = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@activeCategories");
      if (jsonValue != null) {
        dispatch({ type: "SET_NEW_FILTERS", payload: JSON.parse(jsonValue) });
        dispatch({
          type: "SET_CATEGORY",
          payload: JSON.parse(jsonValue)[0].strCategory,
        });
      } else dispatch({ type: "SET_CATEGORY", payload: "Ordinary Drink" });
    } catch (e) {}
  };

  useEffect(() => {
    getActiveFilters();
  }, []);

  const updatedCategories = (categorieslist) => {
    const nextNum = state.numOfCategory + 1;
    nextNum < categorieslist.length
      ? dispatch({ type: "SET_NUM", payload: nextNum })
      : "";

    categorieslist.length >= 1
      ? dispatch({
          type: "SET_CATEGORY",
          payload: categorieslist[state.numOfCategory].strCategory,
        })
      : "";
  };
  console.log(state.category);

  const changeCategory = () => {
    state.newFilterList.length >= 1
      ? updatedCategories(state.newFilterList)
      : updatedCategories(filters);
  };

  return { ...state, changeCategory };
};

export default useDrinks;
