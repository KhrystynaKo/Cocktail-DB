import { useEffect, useReducer, useState } from "react";

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

const useFetch = (pathname, options) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch({
      type: "REQUEST",
    });

    fetch(`${API_URL}${pathname}.php?c=${options}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((json) => {
        const newData =
          pathname === "filter" ? data.concat(json.drinks) : json.drinks;
        pathname === "list"
          ? newData.map((item) => {
              item.active = true;
            })
          : "";
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
  }, [pathname, options]);

  return { state, dispatch, data, setData };
};

export default useFetch;
