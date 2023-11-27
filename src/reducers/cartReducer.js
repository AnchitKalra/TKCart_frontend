import { clearCartApi, getCartApi, updateCartApi, updateQuantityApi } from "../apis/apis";

const ACTIONS =  {
    ADDTOCART: 'ADDTOCART',
    GETCART: 'GETCART',
    CLEARCART: 'CLEARCART',
    CLEARCHECKOUT: 'CLEARCHECKOUT',
    UPDATEQUANTITY:'UPDATEQUANTITY'
}

export const initialState=  [{
    
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
        rate: 3.9,
        count: 120
    }
}
];


const   actionCreator = (type, fn = () => {}, payload)=> {

    return async(dispatch) =>{
        try{

        let data = await fn(payload);


        dispatch({type, data});
        }catch(err) {
            console.log(err);
        }
    }
}

export const cartActionCreator = (payload) =>{
    return actionCreator(ACTIONS.ADDTOCART, updateCartApi, payload)
}

export const getCartActionCreator = (payload) =>{
    return actionCreator(ACTIONS.GETCART, getCartApi, payload)
}

export const clearCartActionCreator = (payload) =>{
    return actionCreator(ACTIONS.CLEARCART, clearCartApi, payload)
}

export const clearCheckoutActionCreator = ()=>{
    return actionCreator(ACTIONS.CLEARCHECKOUT);
}

export const updateQuantityActionCreator = (payload) => {
    return actionCreator(ACTIONS.UPDATEQUANTITY, updateQuantityApi, payload);
}

export const cartReducer = (state = initialState, action) =>{
    const {type, data} = action;
    switch(type) {
    case ACTIONS.ADDTOCART:
        state = data;
        return {
            state
    }
     case ACTIONS.GETCART:
        state = data;
        return{state}
    case ACTIONS.CLEARCART:
        state = data;
        return{
            state
        }

    case ACTIONS.CLEARCHECKOUT:
        state = initialState;
        return {
            state
        }
    
    default: return {state}
}
}