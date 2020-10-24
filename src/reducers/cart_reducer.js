import {
    ADD_TO_CART,
    REMOVE_FROM_CART
} from '../actions/types';


export const cartReducer = (
    state = {cart: JSON.parse(localStorage.getItem('cart') || '[]')},
    action
) => {
    switch(action.type){
        case ADD_TO_CART:
            return {cart: action.payload.cart}
        case REMOVE_FROM_CART:
            return {cart: action.payload.cart}
        default:
            return {...state}
    }
}