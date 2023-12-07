import { Card, CardActions, CardContent, CardMedia, Typography, Button, Rating, Snackbar, Alert } from '@mui/material';
import {ReactComponent as AddTocart} from './Addtocart.svg'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActionCreator } from '../reducers/cartReducer';
import { useNavigate } from 'react-router-dom';
import './listitem.css'
function ListItem({number}) {

    let [isLogin, setLogin] = useState(false);
    let item = useSelector(products => products.products);
    let user =  useSelector(user => user.user);
    let data = item[number];
    let flag = user.accessToken || false;
    let [counter, setCounter] = useState(0);
    let [isCart, setCart] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


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
                if(counter === 0) {
                    return;
                }
            let cart = {};
                let {username} = user;
                let userId = {username}
                item[number]["quantity"] = counter;
                cart = item[number];
                cart["rate"] = cart.rate;
                cart["count"] = cart.count;
                cart["userId"] = userId;
            JSON.parse(JSON.stringify(cart));
             dispatch(cartActionCreator(cart));
            setCart(true);
            }
            catch(err) {
                console.log(err);
            }
        }
    }

    function handleDescription(event, text) {
        try{
        let btn = document.getElementById(event.target.id);
        if(btn.innerText === 'READ MORE') {
            let element = document.getElementById(number);
            let description = item[number].description;
            element.innerText = description;
            btn.innerText = 'READ LESS';
        }
        else {
            let element = document.getElementById(number);
            let description = item[number].description;
            element.innerText = description.slice(0, 30) + '...';
            btn.innerText = 'READ MORE'
        }
    }catch(err) {
        console.log(err);
    }
    }
    function imageHandler(e, image) {

        navigate('/image', {state : image});
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
            <div id = 'card'>
        <Card id = 'materialCard'>
        <CardMedia 
              sx={{height:200}}
              className='cardMedia'
              image= {`data:image/jpeg;base64,${data.image}`}
              title= {data.title}
              onClick = {event=>imageHandler(event, data.image)}
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
              <Rating value={data?.rate || 0} />
              <Typography>{data.count}</Typography>
              <Typography>Please click on image to view it in zoom mode</Typography>
            </CardContent>
        <CardActions>
              <Button id = 'minus' size="small" onClick = {minusHandler}>-</Button>
              <Button className = "btn" size="large" onClick={handleCart}><AddTocart height= "40px" width= "50px"></AddTocart></Button>
              <Button id = 'plus' onClick = {plusHandler}>+{counter}</Button>
            </CardActions>
            </Card>
            </div>
            </>
)};




}

export default ListItem;