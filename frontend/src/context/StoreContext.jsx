import { createContext, useState } from 'react'
import { food_list } from '../assets/assets'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([])
  const url = 'http://localhost:4000/' // base URL backend
  const [token, setToken] = useState('')

  const addToCart = (itemID) => {
    if (!cartItems[itemID]) {
      setCartItems((prev) => ({ ...prev, [itemID]: 1 }))
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemID]: cartItems[itemID] + 1,
      }))
    }
  }

  const removeFromCart = (itemID) => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: cartItems[itemID] - 1,
    }))
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item)
        totalAmount += itemInfo.price * cartItems[item]
      }
    }
    return totalAmount
  }

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
