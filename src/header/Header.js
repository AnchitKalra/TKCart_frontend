import {useNavigate} from 'react-router-dom';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {ReactComponent as AddTocart} from '../products/Addtocart.svg';
import { useEffect, useState } from 'react';
import {  clearCartActionCreator, getCartActionCreator } from '../reducers/cartReducer';

function Header() {

    const navigate = useNavigate();

    function signup() {
        navigate('/signup');
    }
    function login() {
        navigate('/login');
    }
    function home() {
        navigate('/');
    }

    const dispatch = useDispatch();

    let [count, setCount] = useState(0);

    let data = useSelector(user => user);


    async function getCart() {
        let {username} = data.user;
        let userId = {username};
        dispatch(getCartActionCreator(userId));
        setCount(data.cart?.state?.length);
    }

    function showCartItems() {
        navigate('/showCart');
    }

    function clearCart() {
        let {username} = data.user;
        let userId = {username};
        dispatch(clearCartActionCreator(userId));

    }

   

    let flag = data?.user?.loginFlag;
    useEffect(() =>{
        getCart();
     }, [data?.cart?.state.length, flag])

    if(flag) {
        return(
            <>
            <div id = 'container'>
                 <span id = 'tk' onClick={home}>TKCART</span>
                <Button id = "cartButton" onClick = {showCartItems}><AddTocart height= "60px" width= "70px" id = "cart"></AddTocart></Button>
                 <Typography><sup id = 'count'>{count || 0}</sup></Typography>
            </div>
            <div className='sidebar'>
                <Button id = 'logout'>LOGOUT</Button>
                <Button id = 'clearcart' onClick={clearCart}>CLEAR CART</Button>
            </div>
            </>
        )
    }
    return(
    <div id = 'container'>
        <span id = 'tk' onClick={home}>TKCART</span>
        <Button onClick = {signup} id = 'signUp'>SIGNUP</Button>
        <Button onClick = {login} id = 'loginButton'>LOGIN</Button>
    </div>);
}

export default Header;