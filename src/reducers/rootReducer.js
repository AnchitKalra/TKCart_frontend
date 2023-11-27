import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { productsReducer } from "./productsreducer";
import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer";

export default combineReducers({
    user: userReducer,
    products : productsReducer,
    cart : cartReducer,
    order: orderReducer
});