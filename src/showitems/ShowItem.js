import { useDispatch, useSelector } from "react-redux";
import { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { cartActionCreator } from "../reducers/cartReducer";
import { Snackbar, Alert,  Card, CardMedia, CardContent, Typography, Button, Rating, CardActions, } from "@mui/material";
import Header from "../header/Header";
import {ReactComponent as AddTocart} from '../products/Addtocart.svg';
import './showitem.css';
function ShowItem() {

    let item = useSelector(products => products.products);
    let user =  useSelector(user => user.user);
    let data = item;
    let [counter, setCounter] = useState(0);
    let [isCart, setCart] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    function minusHandler() {
       
            if(counter === 0) {
                return;
            }
            setCounter(prevState => prevState - 1);
        }

    function plusHandler() {
    
            setCounter(prevState => prevState + 1);
    
    }

    async function handleCart() {
            try {
                if(counter === 0) {
                    return;
                }
            let cart = {};
                let {username} = user;
                let userId = {username}
                item["quantity"] = counter;
                cart = item;
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

    function imageHandler(e, image) {

        navigate('/image', {state : image});
    }
        if(data){
            return (
                <>
                  <Snackbar open={isCart}
            autoHideDuration={3000}
            onClose={()=> setCart(false)}><Alert severity ="success"> Item/s successfully to cart!</Alert></Snackbar>
            <div>
                <Header></Header>
            </div>
            <div id = 'cardItem'>
        <Card>
        <CardMedia
              sx={{ height: 200 }}
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
              <Typography variant="body2" color="text.secondary">
               {
                    data.description
      
               }
              </Typography>
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
)}
            }

export default ShowItem;