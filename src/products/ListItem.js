import { Card, CardActions, CardContent, CardMedia, Typography, Button, Rating, Snackbar, Alert } from '@mui/material';
import {ReactComponent as AddTocart} from './Addtocart.svg'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActionCreator } from '../reducers/cartReducer';
function ListItem({number}) {

    let [isLogin, setLogin] = useState(false);
    let item = useSelector(products => products);
    let data = item?.products[number];
    let flag = item.user.loginFlag;
    let [counter, setCounter] = useState(0);
    let [isCart, setCart] = useState(false);
    const dispatch = useDispatch();


    function checkLogin() {
        if(!flag) {
            setLogin(true);
            return false;
        }
        return true;
    }

    function minusHandler() {
        if(checkLogin()) {
            if(counter === 0) {
                return;
            }
            setCounter(prevState => prevState - 1);
        }

    }

    function plusHandler() {
        if(checkLogin()) {
            setCounter(prevState => prevState + 1);
        }
    }

    async function handleCart() {
        if(checkLogin()) {
            try {
                if(counter == 0) {
                    return;
                }
            console.log(item.user);
            let cart = {};
            let {username} = item.user;
            let userId = {username}

                item.products[number]["quantity"] = counter;
                cart = item.products[number];
                cart["rate"] = cart.rating.rate;
                cart["count"] = cart.rating.count;
                cart["userId"] = userId;
                console.log("FROM HANDLECART");
                console.log(cart)
            JSON.parse(JSON.stringify(cart));
            await dispatch(cartActionCreator(cart));
            setCart(true);
            }
            catch(err) {
                console.log(err);
            }
        }
    }

    function handleDescription(event, text) {
        try{
        console.log(event.target.id);
        let btn = document.getElementById(event.target.id);
        if(btn.innerText === 'READ MORE') {
            let element = document.getElementById(number);
            let description = item.products[number].description;
            element.innerText = description;
            btn.innerText = 'READ LESS';
        }
        else {
            let element = document.getElementById(number);
            let description = item.products[number].description;
            element.innerText = description.slice(0, 30) + '...';
            btn.innerText = 'READ MORE'
        }
    }catch(err) {
        console.log(err);
    }
 

    }
        if(data){
            return (
                <>
                  <Snackbar open={isCart}
            autoHideDuration={3000}
            onClose={()=> setCart(false)}><Alert severity ="success"> Item/s successfully to cart!</Alert></Snackbar>
              <Snackbar open={isLogin}
            autoHideDuration={3000}
            onClose={()=> setLogin(false)}><Alert severity ="warning"> Please Login to access the cart!</Alert></Snackbar>
        <Card height = "300px" width = "300px">
        <CardMedia
              sx={{ height: 140 }}
              image= {data.image}
              title= {data.title}
            />
        <CardContent>
            <Typography>{data.title}</Typography>
              <Typography gutterBottom variant="h5" component="div">
                ₹{data.price}
              </Typography>
              <div>
              <Typography variant="body2" color="text.secondary" id = {number}>
               {
                    data.description.slice(0, 30)+'...'
      
               }
              </Typography>
              <Button id = {'btn' + number} onClick={(event) => handleDescription(event, data.description)}>READ MORE</Button>
              </div>
              <Rating value = {data.rating.rate} readOnly></Rating>
              <Typography>{data.rating.count}</Typography>
            </CardContent>
        <CardActions>
              <Button id = 'minus' size="small" onClick = {minusHandler}>-</Button>
              <Button className = "btn" size="large" onClick={handleCart}><AddTocart height= "40px" width= "50px"></AddTocart></Button>
              <Button id = 'plus' onClick = {plusHandler}>+{counter}</Button>
            </CardActions>
            </Card>
            </>
)};




}

export default ListItem;