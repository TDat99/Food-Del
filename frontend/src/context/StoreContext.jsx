import { createContext, useEffect, useState } from "react";
import { food_list as static_food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState(static_food_list); // <-- state trùng tên với FoodDisplay
  const url = "https://backend-xyz.onrender.com";
  const [token, setToken] = useState("");

  // Thêm vào giỏ
  const addToCart = (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: (prev[itemID] || 0) + 1,
    }));
  };

  // Giảm số lượng / xóa khỏi giỏ
  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: Math.max((prev[itemID] || 0) - 1, 0),
    }));
  };

  // Tính tổng tiền
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      const qty = cartItems[id];
      if (qty > 0) {
        const itemInfo = food_list.find((product) => product._id === id);
        if (itemInfo) {
          totalAmount += itemInfo.price * qty;
        }
      }
    }
    return totalAmount;
  };

  // Lấy danh sách món ăn từ backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      // tuỳ backend có field success hay không, nhưng setFoodList(data) là đủ
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) setToken(savedToken);
    };
    loadData();
  }, []);

  const contextValue = {
    food_list,          // <-- để FoodDisplay dùng được y nguyên
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
