import { useState } from "react";
import useFetch from "./useFetch";

export const useFilter = () => {
  const { data } = useFetch("list", "list");
  const [categories, setCategories] = useState([
    { strCategory: "Ordinary Drink", active: true },
    { strCategory: "Soft Drink / Soda", active: true },
    {
      strCategory: "Milk / Float / Shake",
      active: true,
    },
    { strCategory: "Other/Unknown", active: true },
    { strCategory: "Cocoa", active: true },
    { strCategory: "Shot", active: true },
    { strCategory: "Coffee / Tea", active: true },
    { strCategory: "Homemade Liqueur", active: true },
    {
      strCategory: "Punch / Party Drink",
      active: true,
    },
    { strCategory: "Beer", active: true },
    { strCategory: "Soft Drink / Soda", active: true },
  ]);

  const filterActiveCategories = () => {
    setCategories(categories.filter((item) => item.active === true));
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
  return { data, categories, activeFilter, filterActiveCategories };
};

export default useFilter;
