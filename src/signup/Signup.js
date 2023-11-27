import {Input, FormLabel, Button, Snackbar, Alert} from '@mui/material';
import Header from '../header/Header';
import { useNavigate} from 'react-router-dom';
import {useState} from 'react';
import './signup.css';
import {useDispatch, useSelector} from 'react-redux';
import {signupActionCreator} from '../reducers/userReducer';
function Signup() {

    let navigate = useNavigate();
   
    let [isNotSignup, setNotSignup] = useState(false); 
    let response = useSelector(user => user.user);
    let [isNotPassword, setNotPassword] = useState(false);

    const dispatch = useDispatch();

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

    function checkPassword(password) {
        if(password.length < 8) {
            return false;
        }
        let alphabetFlag = false;
        let numberFlag = false;
        let capitalFlag = false;
        for(let i = 0; i < password.length; i++) {
            if(password[i] >= 'A' && password[i] <= 'Z') {
                capitalFlag = true;
            }
            if(password[i] >= 'a' && password[i] <= 'z') {
                alphabetFlag = true;
            }
            if(password[i] >= '1' && password[i] <= '9') {
                numberFlag = true;
            }
        }
        if(alphabetFlag && numberFlag && capitalFlag) {
            return true;
        }
        return false;
    }
   async function submitForm() {
        try{
            let flag = checkPassword(data.password);
            if(!flag) {
                setNotPassword(true);
                return;
            }
            if(data.full_name && data.password && data.username) {
           await dispatch(signupActionCreator(data));
       if(response.signupFlag === true) {
            navigate('/login');
        }
        else {
            setNotSignup(true);
        }}
    else {
        return;
    }
    }catch(err) {
            console.log(err);
        }

    }

    return (
        <>
         

<Snackbar open={isNotSignup}
            autoHideDuration={3000}
            onClose={()=> setNotSignup(false)}><Alert severity ="error"> Signup unsuccessfull! Please try again</Alert></Snackbar>

<Snackbar open={isNotPassword}
            autoHideDuration={3000}
            onClose={()=> setNotPassword(false)}><Alert severity ="error"> Password must contain atleast 1 small letter, 1 capital character, 1 numeric character and length must be greater than or equal to 8</Alert></Snackbar>
    <Header></Header>
    <div id = 'signupContainer'>
        <form id = 'signupForm'>
            <div>
            <FormLabel htmlFor = 'full_name'>Name:</FormLabel>
            <Input type = 'text' id = 'full_name' onChange= {event =>{inputHandler(event)}}></Input>
            </div>
            <div>
            <FormLabel htmlFor = 'username'>Username:</FormLabel>
            <Input type='text' id = 'username' onChange={event =>{inputHandler(event)}}></Input>
            </div>
            <div>
            <FormLabel htmlFor = 'password' >Password:</FormLabel>
            <Input type='password' id = 'password' onChange={event =>{inputHandler(event)}}></Input>
            </div>
            <div>
                <Button onClick={submitForm}>Submit</Button>
            </div>
        </form>
    </div></>)
}

export default Signup;