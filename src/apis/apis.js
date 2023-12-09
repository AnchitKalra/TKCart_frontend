
import axios from 'axios';
const instance = axios.create({ baseURL: ' http://192.168.1.9:8080/'})

   

const ENDPOINT = {
    SIGNUP:'user/signup',
    LOGIN: 'user/login',
    UPDATECART: 'cart/addToCart',
    GETCART: 'cart/getCart',
    CLEARCART: 'cart/clearCart',
    CHECKOUT:"order/checkout",
    UPDATEQUANTITY:"cart/updateQuantity",
    LOGINWITHTOKEN: "user/loginWithToken",
    LOGOUT: "user/logout",
    GETOPTIONS: "products/getOption",
    PROFILE: 'profile/saveImage',
    GETPROFILE:'profile/getProfile',
    GETORDERS:'order/getOrders',
    GETLASTORDER: 'order/getLastOrder'    
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
        let response = await axios.get(' http://192.168.1.9:8080/products/fetchProducts');
        return response.data;
    }
    catch(err) {
        console.log(err);
    }
}

export const loginWithToken = async() => {
    try{
        let token = sessionStorage.getItem('access-token');
        let response = await axios.get(' http://192.168.1.9:8080/user/loginWithToken', {headers: {'access-token' : token}}); 
        return response;
    }
    catch(err) {
        console.log(err);
    }
}

export const productsOptionsApi = async(payload) => {
    try{
    let response = await instance.post(ENDPOINT.GETOPTIONS, payload)
    return response;
    }catch(err) {
        console.log(err);
    }
}


export const logoutApi = async()=> {
    try{
        let response = await instance.get(ENDPOINT.LOGOUT);
        sessionStorage.clear('access-token');
        return response;
    }
    catch(err){
        console.log(err);
    }
}

export const updateCartApi = async(payload) =>{
    try{
        let response = await instance.post(ENDPOINT.UPDATECART, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}

export const getCartApi = async(payload) => {
    try{
        let response = await instance.post(ENDPOINT.GETCART, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}

export const clearCartApi = async(payload) =>{
    try{
        let response = await instance.post(ENDPOINT.CLEARCART, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}

export const checkoutApi = async(payload) =>{
    try{
        let response = await instance.post(ENDPOINT.CHECKOUT, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}

export const updateQuantityApi = async(payload) => {
    try{

        let response = await instance.patch(ENDPOINT.UPDATEQUANTITY, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}

export const saveProfileApi = async(payload) => {
    try{
       
        let response = await instance.post(ENDPOINT.PROFILE, payload);
        return response;
    }
    catch(err) {
        console.log(err);
    }
}

export const getProfileApi = async(payload)=>{
    try{
    let response = await instance.post(ENDPOINT.GETPROFILE, payload);
    return response
    }catch(err) {
        console.log(err);
    }
}

export const getPreviousOrdersApi = async(payload) =>{
    try{
        let response = await instance.post(ENDPOINT.GETORDERS, payload);
       return response;
    }
catch(err) {
    console.log(err);
}

}


export const getLastOrderApi = async(payload) => {
    try{
        let response = await instance.post(ENDPOINT.GETLASTORDER, payload);
       return response;
    }
catch(err) {
    console.log(err);
}
}
