import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { getLastActionCreator } from "../reducers/orderReducer";


function ShowLastOrder() {
        let totalValue = 0;
        const dispatch = useDispatch();
        let order = useSelector(order => order.order);
        let data = useSelector(user=> user.user)
        let lastOrder = [];
            if(order) {
                for(let o in order) {
                    lastOrder.push(order[o]);
                }
            }

            useEffect(()=>{
                let {username} = data;
                let user = {};
                user = {username : username}
                user = JSON.parse(JSON.stringify(user));
                dispatch(getLastActionCreator(user));
            }, [order])

 let i = 0;

 return(
    <div className='summary'>
            <Typography><h2>SUMMARY PAGE:</h2></Typography>
    {lastOrder?.length >= 1? 
        lastOrder.map(item => {
            totalValue += item?.totalValue;
            return(
            <div id = 'type'>
            <Typography className='card'>#{++i}</Typography>
                <Typography>{item?.title}</Typography>
                  <Typography>
                    ₹{item?.price}
                  </Typography>
                  <Typography>Quantity:{item?.quantity}</Typography>
                        </div>
        )})
    :""}
    <div id = 'total'>
        <Typography>TOTAL VALUE =  {totalValue || 0}</Typography>
        </div>
    </div>
 )

}

export default ShowLastOrder;