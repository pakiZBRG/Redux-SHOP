import {
    ADD_TO_CART,
    REMOVE_FROM_CART
} from './types';

export const addToCart = product => (dispatch, getState) => {
    // Get what every there is in cart state and make copy
    const cart = [...getState().cart.cart];
    let inCart = false;
    cart.forEach(item => {
        //if item is in cart
        if(item._id === product._id){
            inCart = true;
            item.count++;
        }
    })
    //if not push item to cart array
    if(!inCart){
        cart.push({...product, count: 1})
    }
    dispatch({
        type: ADD_TO_CART,
        payload: {cart} 
    });
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFromCart = product => (dispatch, getState) => {
    // Get what every there is in cart state and make copy
    const cart = getState()
        .cart.cart.slice()
        .filter(item => item._id !== product._id);
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {cart}
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart)
}