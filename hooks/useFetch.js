import { useEffect, useReducer } from "react";

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

const initialState = {
  loading: false,
  error: null,
  drinks: [],
  filters: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return { error: null, loading: true };

    case "SUCCESS_DRINKS":
      return {
        ...state,
        loading: false,
        drinks: action.payload,
      };

    case "SUCCESS_FILTERS":
      return {
        ...state,
        loading: false,
        filters: action.payload,
      };
    case "ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const useFetch = (pathname, options) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "REQUEST",
    });
    const url = `${API_URL}${pathname}.php?c=${options}`;

    fetch(url)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((json) => {
        const newData = json.drinks;
        pathname === "list"
          ? newData.map((item) => {
              item.active = true;
            })
          : "";
        dispatch({ type: "SUCCESS_FILTERS", payload: newData });
        dispatch({ type: "SUCCESS_DRINKS", payload: newData });
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
  }, [pathname, options]);

  return { ...state, dispatch };
};

export default useFetch;
