import { useEffect, useState } from 'react'
import { db } from '../data/db'

export const useCart = () => {

  const initialCart = () => {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_QUANTITY = 5
  const MIN_QUANTITY = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {

    const itemExist = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExist >= 0) {
      const updatedCart = [...cart]
      if (updatedCart[itemExist].quantity >= MAX_QUANTITY) return
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }

  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_QUANTITY) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_QUANTITY) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  }

}