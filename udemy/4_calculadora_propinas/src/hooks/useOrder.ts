
import { useState } from "react"
import { MenuItem, OrderItem } from "../types"

export default function useOrder() {

    const [order, setOrder] = useState<OrderItem[]>([])

    const addItem = (item: MenuItem) => {

        const itemExist = order.findIndex(orderItem => orderItem.id === item.id)

        if (itemExist >= 0) {
            const updatedOrder = [...order]
            updatedOrder[itemExist].quantity++
            setOrder(updatedOrder)
        }
        else {
            const newItem: OrderItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order, newItem])
        }

    }

    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    return {
        order,
        addItem,
        removeItem
    }

}