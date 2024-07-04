import { useEffect, useMemo, useState } from 'react'
import { db } from '../data/db'
import type { Guitar, CartItem } from "../types"

export const useCart = () => {

  const initialCart = () : CartItem[] => {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_QUANTITY = 5
  const MIN_QUANTITY = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item : Guitar) {

    const itemExist = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExist >= 0) {
      const updatedCart = [...cart]
      if (updatedCart[itemExist].quantity >= MAX_QUANTITY) return
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      const newItem : CartItem = {
        ...item,
        quantity: 1
      }
      setCart([...cart, newItem])
    }

  }

  function removeFromCart(id : Guitar['id']) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id : Guitar['id']) {
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

  function decreaseQuantity(id : Guitar['id']) {
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

  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = () => cart.reduce((total, item) => total + (item.quantity * item.price), 0)

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }

}