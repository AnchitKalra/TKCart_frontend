import { checkoutApi, getLastOrderApi, getPreviousOrdersApi } from "../apis/apis";

const ACTIONS =  {
    CHECKOUT: 'CHECKOUT',
    GETORDERS: 'GETORDERS',
    GETLASTORDER: 'GETLASTORDER'
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

export const checkoutActionCreator = (payload) =>{
    return actionCreator(ACTIONS.CHECKOUT, checkoutApi, payload);
}

export const getOrdersActionCreator = (payload) => {
    return actionCreator(ACTIONS.GETORDERS, getPreviousOrdersApi, payload);
}
export const getLastActionCreator = (payload) => {
    return actionCreator(ACTIONS.GETLASTORDER, getLastOrderApi, payload);
}




export const orderReducer = (state = initialState, action) =>{
    const {type, data} = action;
    switch(type) {
    case ACTIONS.CHECKOUT:
        if(data?.status === 200) {
        state = data.data;
        return {
            ...state
    }}else{
        return {...state}
    }
    case ACTIONS.GETORDERS:
        if(data?.status === 200) {
            state = data.data;
            return {
                ...state
            }
        }
        else{
            return {...state}
        }

        case ACTIONS.GETLASTORDER:
            if(data?.status === 200) {
                state = data.data;
                return {
                    ...state
                }
            }
            else{
                return {
                    ...state
                }
            }
 
    default: return {...state}
}
}