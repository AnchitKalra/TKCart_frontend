
import axios from 'axios';
const instance = axios.create({ baseURL: 'http://localhost:8080/'});

const ENDPOINT = {
    SIGNUP:'user/signup',
    LOGIN: 'user/login',
    UPDATECART: 'cart/addToCart',
    GETCART: 'cart/getCart',
    CLEARCART: 'cart/clearCart',
    CHECKOUT:"order/checkout",
    UPDATEQUANTITY:"cart/updateQuantity"
}

export const signupApi = async(payload) =>{
    try{
       let response = await instance.post(ENDPOINT.SIGNUP, payload);
       return response;
    }catch(err) {
        console.log(err);
    }
}

export const loginApi = async(payload) =>{
    try{
        let response = await instance.post(ENDPOINT.LOGIN, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}

export const productsApi = async() =>{
    try{
        let response = await axios.get('http://fakestoreapi.com/products');
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const updateCartApi = async(payload) =>{
    try{
        let response = await instance.post(ENDPOINT.UPDATECART, payload);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const getCartApi = async(payload) => {
    try{
        let response = await instance.post(ENDPOINT.GETCART, payload);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const clearCartApi = async(payload) =>{
    try{
        let response = await instance.post(ENDPOINT.CLEARCART, payload);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const checkoutApi = async(payload) =>{
    try{
        let response = await instance.post(ENDPOINT.CHECKOUT, payload);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const updateQuantityApi = async(payload) => {
    try{
        let response = await instance.patch(ENDPOINT.UPDATEQUANTITY, payload);
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}

