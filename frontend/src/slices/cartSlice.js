import { createSlice } from '@reduxjs/toolkit';
import { calculateCartPrices } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [] }



const cartSlice = createSlice({

    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {

           const item = action.payload

           const existItem = state.cartItems.find((currentItem) => currentItem._id === item._id)

           if(existItem) {

            state.cartItems = state.cartItems.map((currentItem) => currentItem._id === existItem._id ? item : currentItem)

           } else {

              state.cartItems = [...state.cartItems, item]
           }

           return calculateCartPrices(state)
        },

        deleteFromCart: (state, action) => {

            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload)

            return calculateCartPrices(state)
        }
    }
})

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;