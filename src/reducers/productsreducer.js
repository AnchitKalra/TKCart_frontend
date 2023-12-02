import { productsApi, productsOptionsApi } from "../apis/apis";


const ACTIONS =  {
    PRODUCTS: 'PRODUCTS',
    OPTIONSELECT: 'OPTIONSELECT'
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


const   asyncactionCreator = (type, fn = () => {}, payload)=> {

    return async(dispatch) =>{
        try{

        let data = await fn(payload);


        dispatch({type, data});
        }catch(err) {
            console.log(err);
        }
    }
}

export const productsActionCreator = () =>{
    return asyncactionCreator(ACTIONS.PRODUCTS, productsApi)
}

export const getOptionActionCreator = (payload) => {
    return asyncactionCreator(ACTIONS.OPTIONSELECT, productsOptionsApi, payload);
}


export const productsReducer = (state = initialState, action) =>{
    const {type, data} = action;
    switch(type) {
    case ACTIONS.PRODUCTS:
        state = data;
        return {
            ...state
        }

    case ACTIONS.OPTIONSELECT:
        if(data.status === 200) {
            state = data.data;
        }
        return {
            ...state
        }


    
    default: return {
        ...state
    }
}
}
