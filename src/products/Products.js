import './products.css';
import { useSelector, useDispatch } from "react-redux";
import { productsActionCreator } from "../reducers/productsreducer";
import { useEffect, useState } from 'react';
import ListItem from './ListItem';
import {Button ,Paper, Box, Typography, Divider} from '@mui/material'
import { clearCartActionCreator } from '../reducers/cartReducer';
import { getLastActionCreator, getOrdersActionCreator } from '../reducers/orderReducer';
import { useNavigate } from 'react-router-dom';
function Products() {


    let data= useSelector(user => user.user)
    const navigate = useNavigate();

    const dispatch = useDispatch();
   const  products = async() =>{
        try{
            
         dispatch(productsActionCreator());
        }catch(err){
            console.log(err);
        }
    }

    function getPastOrders() {
        try{
          console.log('getPastOrders')
            let {username} = data;
            let user = {};
            user['username'] = username;
            user = JSON.parse(JSON.stringify(user));
            dispatch(getOrdersActionCreator(user));
            navigate('/summary')
        }
        catch(err) {
            console.log(err);
        }
    }

   useEffect(()=>{

    products(); 

   },[data?.accessToken]);

   let i = 0;

   function clearCart() {
    let {username} = data;
    let userId = {username};
    dispatch(clearCartActionCreator(userId));
   }

    function handleMenu() {
        
        let divElement = document.querySelector('#menuDiv');
        if(divElement.classList.contains('noDisp')) {
        divElement.classList.add('disp');
        divElement.classList.remove('noDisp');
        }
        else{
      
            divElement.classList.add('noDisp');
            divElement.classList.remove('disp');
        }
     }

   
 function getLastOrder(){
    let user = {};
    let {username} = data;
    user = {username: username};
   user =  JSON.parse(JSON.stringify(user));  
   dispatch(getLastActionCreator(user));
   navigate('/lastOrder');
 }      

     const style = {
        position: 'absolute',
        top: '27%',
        left: '8%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      function gameHandler() {
        navigate('/tictactoe')
      }
      
 

   return (
    <>  
    
     <div className='headerfooter'>
    <Button id = 'menu' variant = 'contained' color='success' onClick={handleMenu}>MENU</Button>
     <div className = 'noDisp' id = 'menuDiv'>
         <div id = 'menuCard'>
         <Paper onClick = {handleMenu}>
<Box sx={style}>
<Divider>
    <Typography onClick = {clearCart} id = 'clearCart'>CLEAR CART </Typography>
    </Divider>
    <Divider>
    <Typography onClick={getPastOrders} id = 'pastOrders'>PAST ORDERS</Typography>
    </Divider>
    <Divider>
    <Typography onClick= {getLastOrder} id = 'lastOrder'>LAST ORDER</Typography>
    </Divider>
    <Divider>
    <Typography onClick = {gameHandler} id = 'tictactoe'> PLAY A GAME </Typography>
    </Divider>
  </Box>
</Paper>
</div>
</div>
         </div>
        <div id = "divConatiner">
        <div className = "innerContainer">
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
        </div>
        <div className = "innerContainer">
        <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
        </div>
        <div className = "innerContainer">
        <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
        </div>
        <div className = "innerContainer">
        <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
        </div>
        <div className = "innerContainer">
        <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
        </div>
        <div className = "innerContainer">
        <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
        </div>
        <div className = "innerContainer">
        <div className='list'>
            <ListItem number = {i++}/>
            </div>
            <div className='list'>
            <ListItem number = {i++}/>
            </div>
        </div>
    </div>
    </>
   )

}

export default Products;