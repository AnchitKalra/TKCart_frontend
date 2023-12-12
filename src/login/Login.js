import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState }  from "react";
import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import './login.css';
import { Snackbar, Alert, FormLabel, Input, Button } from "@mui/material";
import Header from "../header/Header";
import { loginActionCreator } from "../reducers/userReducer";
import {ReactComponent as Eye} from '../signup/eye.svg'
import {ReactComponent as NotEye} from '../signup/not-eye.svg'




function Login() {

    let googleData = useLocation();
    let navigate = useNavigate();
    let [isSignup, setSignup] = useState(false); 
    const dispatch = useDispatch();

    let [isNotLogin, setNotLogin] = useState(false); 
    let responseData = useSelector(user => user.user);
    let showPassword = false;
    let [data, setData] = useState({})


    useEffect(()=>{
        if(responseData?.username){
            setSignup(true);
        }
        if(googleData?.state) {
            data.username = googleData?.state.email;
            setData(data);
            data.password = 'Bangles@001';
            setData(data);
            JSON.parse(JSON.stringify(data));
            console.log('logging responsedata');
            console.log(responseData);
            loginHandler();
            }
        if(responseData?.accessToken) {
            navigate('/');
        }
    }, [responseData?.accessToken]);


    function inputHandler(event) {

        try{
          data[event.target.id] = event.target.value;
          setData(data);
        JSON.parse(JSON.stringify(data));
        }catch(err) {
            console.log(err);
        }

    }
     function loginHandler() {
        try{
        
             dispatch(loginActionCreator(data));
        if(responseData?.accessToken) {
             navigate('/');
         }
      }catch(err) {
             console.log(err);
         }

    }

    function handlePassword() {
        showPassword = !showPassword;
        let inputField = document.getElementById('password') 
        let image1 = document.getElementById('passwordS');
        let image2 = document.getElementById('passwordH');
        if(!showPassword) {
            inputField.setAttribute('type', 'text');
            image1.classList.add('hide');
            image2.classList.remove('hide');
        }
        else{
            inputField.setAttribute('type', 'password');
            image1.classList.remove('hide');
            image2.classList.add('hide');
           
        }
    }


    return (
        <>
         <Snackbar open={isSignup}
            autoHideDuration={3000}
            onClose={()=> setSignup(false)}><Alert severity ="success"> Signup successfull! Please Login!</Alert></Snackbar>
        
<Snackbar open={isNotLogin}
            autoHideDuration={6000}
            onClose={()=> setNotLogin(false)}><Alert severity ="error"> Login unsuccessfull! Please try again</Alert></Snackbar>
    <Header></Header>
    <div id = 'loginContainer'>
        <form id = 'loginForm'>
            <div>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input type = 'text' id = 'username' onChange={event=> inputHandler(event)}></Input>
            </div>
            <div id = 'loginDiv'>
                <FormLabel htmlFor="password">Password:</FormLabel>
                <Input type="password" id = 'password' onChange={event=> inputHandler(event)}></Input>
                <Eye height = '30px' width = '30px' className = 'unhide' id = 'passwordS' onClick={handlePassword} alt = 'Show password'/>
            <NotEye height = '30px' width = '30px' className = 'hide' id = 'passwordH' onClick = {handlePassword} alt = 'Hide password' />
            </div>
            <div>
                <Button id = 'loginbtn' onClick = {loginHandler}>LOGIN</Button>
            </div>
         
          
        </form>
        
    </div>
    </>)
}

export default Login;