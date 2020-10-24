import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productsReducer } from './reducers/product_reducer';
import { cartReducer } from './reducers/cart_reducer';
import { orderReducer } from './reducers/order_reducer';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({ 
        products: productsReducer,
        cart:  cartReducer,
        order: orderReducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;