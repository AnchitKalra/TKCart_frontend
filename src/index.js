import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Signup from './signup/Signup';
import Login from './login/Login';
import { Provider } from 'react-redux';
import store from './store/store';
import ShowCart from './showcart/ShowCart';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
  <Routes> 
 
                <Route exact path='/' element={< App />}></Route> 
                <Route exact path='/signup' element={<Signup/>}></Route>
                <Route exact path = '/login' element = {<Login />}></Route> 
                <Route exact path='/showCart' element = {<ShowCart />}></Route>
                
        </Routes> 
    </BrowserRouter>
    </Provider>
   
);
