import { useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

const initialState = {
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return { error: null, loading: true };

    case "SUCCESS":
      return {
        loading: false,
        error: null,
      };

    case "ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const useFetch = (category) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch({
      type: "REQUEST",
    });

    fetch(`${API_URL}filter.php?c=${category}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((json) => {
        const newData = json.drinks;
        console.log(category);
        setData(newData);
        dispatch({ type: "SUCCESS" });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: {
            url: error.url,
            status: error.status,
            statusText: error.statusText ? error.statusText : "Something wrong",
          },
        });
      });
  }, [category]);

  useEffect(() => {
    dispatch({
      type: "REQUEST",
    });

    fetch(`${API_URL}list.php?c=list`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((json) => {
        const newData = json.drinks;
        newData.map((item) => {
          item.active = true;
        });
        const jsonValue = JSON.stringify(newData);
        AsyncStorage.setItem("@storage_Key", jsonValue);

        const jsonValu = AsyncStorage.getItem("@storage_Key");

        jsonValu
          ? setCategories(newData)
          : setCategories(JSON.parse(jsonValue));
        dispatch({ type: "SUCCESS" });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: {
            url: error.url,
            status: error.status,
            statusText: error.statusText ? error.statusText : "Something wrong",
          },
        });
      });
  }, []);

  return { state, data, setData, categories, setCategories };
};

export default useFetch;
