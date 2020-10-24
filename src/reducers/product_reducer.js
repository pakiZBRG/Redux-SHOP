import { 
    FETCH_PRODUCTS,
    FILTER_BY_SIZE,
    SORT_BY_PRICE
} from '../actions/types';


export const productsReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_PRODUCTS:
            return {
                items: action.payload,
                filteredItems: action.payload
            }
        case FILTER_BY_SIZE:
            return { 
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items
            }
        case SORT_BY_PRICE:
            return {
                ...state,
                sort: action.payload.sort,
                filteredItems: action.payload.items
            }
        default:
            return { ...state }
    }
}