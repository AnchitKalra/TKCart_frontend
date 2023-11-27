import {useSelector, useDispatch} from 'react-redux';
import {Card, Typography,  CardActions, CardContent, Button, Snackbar, Alert} from '@mui/material';
import {ReactComponent as AddTocart} from '../products/Addtocart.svg';
import './showcart.css';
import Header from '../header/Header';
import { checkoutActionCreator } from '../reducers/orderReducer';
import { cartActionCreator, clearCheckoutActionCreator, updateQuantityActionCreator } from '../reducers/cartReducer';
import { useState } from 'react';


function ShowCart() {
    const dispatch = useDispatch();
    let cart = useSelector(cart => cart.cart.state);
    let user= useSelector(user => user.user);
    let orderId = useSelector(order => order.order?.state)
    let [isOrder, setOrder] = useState(false);
    console.log('logging order id');
    console.log(orderId);

   
      
   

    let counter;
    let totalValue = 0;
    function checkout() {

        let order = {};
        if(totalValue === 0) {
            return;
        }
        cart = JSON.parse(JSON.stringify(cart));
        let cartId = cart;
        let {username} = user
        let userId = {username};
        order = {cartId, userId};
        console.log('logging order');
        console.log(order);
        dispatch(checkoutActionCreator(order));
        dispatch(clearCheckoutActionCreator);
            setOrder(true);
    }

    function minusHandler(e) {
        try{
            let id = e.target.id;
            let plusId = parseInt(id) + 1;
            let btn = document.getElementById(plusId);
            let text = btn.innerText.slice(1, 2);
            text = parseInt(text);
            if(text === 0) {
                return;
            }
        let cart = {};
           cart["id"] = (id); 
           cart["minus"] = 'minus';
            console.log("FROM HANDLECART");
            console.log(cart)
        JSON.parse(JSON.stringify(cart));
       dispatch(updateQuantityActionCreator(cart));
        }catch(err) {
            console.log(err);
        }
    }

    function plusHandler(e) {
        try{
            let id = e.target.id;
            let btn = document.getElementById(id);
        let cart = {};
           cart["id"] = (id - 1); 
            console.log("FROM HANDLECART");
            console.log(cart)
        JSON.parse(JSON.stringify(cart));
        dispatch(updateQuantityActionCreator(cart));
        }catch(err) {
            console.log(err);
        }
    }

    return(
        <>
        <Header></Header>
        <div id = 'cartContainer'>
       {
        Array.isArray(cart) ? cart?.map(item =>{

        counter = (item.quantity);
        totalValue += item.totalValue;
        totalValue = parseFloat(totalValue.toFixed(2));
        
           return(
         <div className = "card">
            <Card>
            <CardContent>
        <Typography  component="div">
            Product Name = {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Quantity = {
            item.quantity|| 0

         }
        </Typography>
        <Typography>Price =  ₹{item.price}</Typography>
      </CardContent>
  <CardActions>
  <Button id = {item.id} size="small" onClick = {(event, item) => minusHandler(event, item)}>-</Button>
              <Button className = "btn" size="large"><AddTocart height= "40px" width= "50px"></AddTocart></Button>
              <Button id = {item.id + 1} onClick = {(event) => plusHandler(event)}>+{counter || 0}</Button>
      </CardActions>
                    </Card>
            </div> 

             )}):""}
       <div>
        <Card> 
        <CardContent>
            <Typography id = 'total'>TOTAL VALUE = ₹{totalValue}</Typography>
       </CardContent>
       <CardActions>
        <Button id = "checkout" onClick={checkout}>CHECKOUT</Button>
       </CardActions>
       </Card>
            </div>
            </div>
                  <Snackbar open={isOrder}
            autoHideDuration={3000}
            onClose={()=> setOrder(false)}><Alert severity ="success"> Order successfully placed!</Alert></Snackbar>
            
            </>)
}

export default ShowCart;