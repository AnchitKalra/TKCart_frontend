import {Input, FormLabel, Button, Snackbar, Alert} from '@mui/material';
import Header from '../header/Header';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import {useState} from 'react';
import './signup.css';
import {useDispatch, useSelector} from 'react-redux';
import {signupActionCreator} from '../reducers/userReducer';
import {ReactComponent as Eye} from './eye.svg'
import {ReactComponent as NotEye} from './not-eye.svg'
import {  useGoogleLogin } from '@react-oauth/google';
import {ReactComponent as Google} from './google.svg';


function Signup() {

    let navigate = useNavigate();
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
   
    let [isNotSignup, setNotSignup] = useState(false); 
    let response = useSelector(user => user.user);
    let [isNotPassword, setNotPassword] = useState(false);
    let [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    let [data, setData] = useState({});
    let [profileData, setProfileData] = useState({});

    useEffect(
        () => {
            if (user) {
                console.log('logging google user');
                console.log(user);
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log('success google');
                        setProfile(res?.data);
                       
                    data.full_name = res?.data.name;
                    data.username = res?.data.email;
                    data.password = "Bangles@001";
                    data['image'] = res?.data.picture;
                    JSON.parse(JSON.stringify(data));
                    submitForm();
                    })
                    .catch((err) => console.log('error', err));
            }
            if(response?.username) {
                if(profile?.name) {
                navigate('/login', {state : profile});
                }else {
                    navigate('/login')
                }
            }
            
        },
        [ user , response?.signupFlag, profile?.name]
    );

    function inputHandler(event) {

        try{

        let id = event.target.id;
        if(id === 'password') {
            let inputField = document.getElementById(id) 
            if(showPassword) {
              
                    inputField.setAttribute('type', 'text');
                
            }
            else{
                inputField.setAttribute('type', 'password');
            }
        }
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
    function submitForm() {
        try{
            let flag = checkPassword(data.password);
            if(!flag) {
                setNotPassword(true);
                return;
            }
           
            if(data.full_name && data.password && data.username) {
             dispatch(signupActionCreator(data));
        }
    else {
        return;
    }
    }catch(err) {
            console.log(err);
        }

    }

    function handlePassword() {
        setShowPassword(prevState => !prevState);
        let image1 = document.getElementById('passwordS');
        let image2 = document.getElementById('passwordH');
        if(!showPassword) {
            image1.classList.add('hide');
            image2.classList.remove('hide');
        }
        else{
            image1.classList.remove('hide');
            image2.classList.add('hide');
           
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

            <Eye height = '30px' width = '30px' className = 'unhide' id = 'passwordS' onClick={handlePassword} alt = 'Show password'/>
            <NotEye height = '30px' width = '30px' className = 'hide' id = 'passwordH' onClick = {handlePassword} alt = 'Hide password' />
            
            </div>
            <div>
                <Button onClick={submitForm}>Submit</Button>
            </div>
            <Button variant="contained" color='success' onClick = {() => login()}> LOGIN WITH GOOGLE <Google height = '30px' width = '30px'></Google></Button>
        </form>
    </div></>)
}

export default Signup;