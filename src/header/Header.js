import {useNavigate} from 'react-router-dom';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {ReactComponent as AddTocart} from '../products/Addtocart.svg';
import { useEffect, useState } from 'react';
import {  clearCartActionCreator, getCartActionCreator } from '../reducers/cartReducer';
import { loginWithTokenActionCreator, logoutActionCreator} from '../reducers/userReducer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getOptionActionCreator } from '../reducers/productsreducer';



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

    let data = useSelector(user => user.user);

    let dataItems = useSelector(products=> products.products);

    useEffect(() => {
            try{
                dispatch(loginWithTokenActionCreator());
           }
            catch(err) {
              console.log(err);
            }
          }, [data?.accessToken]);




    let dataCart = useSelector(cart => cart.cart)
    let items = [];


    async function getCart() {
        let {username} = data;
        let userId = {username};
        dispatch(getCartActionCreator(userId));
        setCount(dataCart.state?.length);
    }

    function showCartItems() {
        navigate('/showCart');
    }

    function clearCart() {
        let {username} = data;
        let userId = {username};
        dispatch(clearCartActionCreator(userId));

    }

    function handleLogout(){
        dispatch(logoutActionCreator());
    }

    function handleOptions(e) {
        try{
      let products = {};
      if(e.target.value === '') {
        return;
      }
      products['title'] = e.target.value;

        products = JSON.parse(JSON.stringify(products))
        dispatch(getOptionActionCreator(products));
        navigate('/item')
    }catch(err) {
        console.log(err);
    }
    }


    let flag = data?.accessToken || false;
    useEffect(() =>{
        getCart();   
     }, [dataCart?.state?.length, flag])

     function handleProfile() {
        
     }

    

    if(flag) {
        for(let data1 in dataItems) {
            if(dataItems[data1]?.title === undefined) {
                break;
            }
            items.push(dataItems[data1].title);
        }
        return(
            <>
            <div id = 'container'>
                 <span id = 'tk' onClick={home}>TKCART</span>
                 <div id='autocomplete'>
                 <Autocomplete disablePortal id="combo-box-demo" options={items} sx={{}} renderInput={(params) => <TextField id = 'textfield' onSelect = {event => {handleOptions(event)}} {...params} label="Products" />}/>
                 </div>
                 <span id = 'name'><Typography>Hi, </Typography></span>
                 <span id = 'fullName'><Typography>{data.full_name}</Typography></span>
                <Button id = "cartButton" onClick = {showCartItems}><AddTocart height= "60px" width= "70px" id = "cart"></AddTocart></Button>
                 <Typography><sup id = 'count'>{count || 0}</sup></Typography>
                <div onClick={handleProfile}> <img src = {data.image}  alt='profile  of user' id = 'profile' /></div>
            </div>
            <div className='sidebar'>
                <Button id = 'logout' onClick={handleLogout}>LOGOUT</Button>
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