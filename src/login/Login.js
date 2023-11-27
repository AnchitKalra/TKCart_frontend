import { useNavigate } from "react-router-dom";
import { useEffect, useState }  from "react";
import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import './login.css';
import { Snackbar, Alert, FormLabel, Input, Button } from "@mui/material";
import Header from "../header/Header";
import { loginActionCreator } from "../reducers/userReducer";


function Login() {
    let navigate = useNavigate();
    let [isSignup, setSignup] = useState(false); 
    const dispatch = useDispatch();

    let [isNotLogin, setNotLogin] = useState(false); 
    let responseData = useSelector(user => user.user);


    useEffect(()=>{
        if(responseData.signupFlag) {
            setSignup(true);
        }
    }, [responseData.signupFlag === true])



    let [data, setData] = useState({});

    function inputHandler(event) {

        try{
          data[event.target.id] = event.target.value;
          setData(data);
        JSON.parse(JSON.stringify(data));
        }catch(err) {
            console.log(err);
        }

    }
    async function loginHandler() {
        try{
            console.log(data);
            await dispatch(loginActionCreator(data));
        if(responseData.loginFlag === true) {
             navigate('/');
         }
         else {
             setNotLogin(true);
         }}catch(err) {
             console.log(err);
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
            <div>
                <FormLabel htmlFor="password">Password:</FormLabel>
                <Input type="password" id = 'password' onChange={event=> inputHandler(event)}></Input>
            </div>
            <div>
                <Button id = 'loginbtn' onClick = {loginHandler}>LOGIN</Button>
            </div>
          
        </form>
    </div>
    </>)
}

export default Login;