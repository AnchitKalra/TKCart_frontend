import {useNavigate} from 'react-router-dom';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography } from '@mui/material';
import {ReactComponent as AddTocart} from '../products/Addtocart.svg';
import { useEffect, useState } from 'react';
import { getCartActionCreator } from '../reducers/cartReducer';
import { loginWithTokenActionCreator, logoutActionCreator} from '../reducers/userReducer';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getOptionActionCreator } from '../reducers/productsreducer';
import { getProfileActionCreator, profileActionCreator } from '../reducers/profileReducer';
import { countDecrementActionCreator } from '../reducers/countReducer';



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
    let productItems = useSelector(products=> products.products);

    let profileItems = useSelector(profile=> profile.profile);
    let dataCart = useSelector(cart => cart.cart)

    useEffect(() => {
        
            try{
                dispatch(loginWithTokenActionCreator());
                getCart();
                getProfile();
                setCount(dataCart['0']?.length)
            }
           
            catch(err) {
              console.log(err);
            }
          }, [data?.accessToken, dataCart['0']?.length]);




   
    let items = [];


    async function getCart() {
        let {username} = data;
        let userId = {username};
        dispatch(getCartActionCreator(userId));
    }

    function showCartItems() {
        navigate('/showCart');
    }

   
    function handleLogout(){
        dispatch(countDecrementActionCreator());
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


    function getProfile() {
        try{
       let {username} = data;
       let user = {};
       user.username = username;
        JSON.parse(JSON.stringify(user));
        dispatch(getProfileActionCreator(user))   
        }catch(err) {
            console.log(err);
        }
    }
    let flag = data?.accessToken || false;

     function handleProfile() {
        try{
        let modal = document.querySelector('.modalDiv');
        modal.classList.add('modaldiv');
        modal.classList.remove('modalDiv');
        }catch(err) {
            let modal = document.querySelector('.modaldiv');
            modal.classList.add('modalDiv');
            modal.classList.remove('modaldiv');
        }
     }
      function handlePic(e) {
        try{
            let input = document.getElementById('fileInput');
            let reader = new FileReader();
            let imageData;
            let profile = {};
            reader.onload = function() {
                imageData = reader.result;
                profile['image'] = imageData;
                let {username} = data;
                profile['userId'] = {username};
                JSON.parse(JSON.stringify(profile));
                dispatch(profileActionCreator(profile));
            }

            reader.readAsDataURL(input.files[0]);
         
          
           
        }catch(err) {
            console.log(err);
        }

     }

    
    

    if(flag) {
        for(let data1 in productItems) {
            if(productItems[data1]?.title === undefined) {
                break;
            }
            items.push(productItems[data1].title);
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
                <div onClick={handleProfile}> <img src = {data?.image || profileItems?.image}   id = 'profile' height= '95px' width= '120px' alt='profile of user' />
                <div className = 'modalDiv'>
                    <Button variant='contained'> <input type='file' id = 'fileInput' onChange={handlePic}></input></Button>
                  
                    <Button onClick={handleLogout} variant='contained'>LOGOUT</Button>
                  
                </div>
                </div>
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

