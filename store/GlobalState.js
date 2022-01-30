import { createContext, useReducer, useEffect } from "react";
import { getData } from "../utils/fetchData";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {}, cart: [], modal: {} };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }
  }, []);

  useEffect(() => {
    const cart_storage = JSON.parse(localStorage.getItem("cart_storage"));
    if (cart_storage) dispatch({ type: "ADD_CART", payload: cart_storage });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_storage", JSON.stringify(cart));
  }, [cart]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
