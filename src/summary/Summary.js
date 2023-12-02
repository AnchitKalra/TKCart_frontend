import { useSelector } from 'react-redux';
import './summary.css'
import{Typography} from '@mui/material';

function Summary() {
    let totalValue = 0;
    let order = useSelector(order => order.order.state.cartId);
    console.log('logging order');
    console.log(order);
    let i = 0;
    if(Array.isArray(order)){
        return(<div className='summary'>
            <Typography><h2>SUMMARY PAGE:</h2></Typography>
        {order.map(data=>{
          
            totalValue += data.totalValue;
            return(
                
                <div id = 'card'>
        <Typography>#{++i}</Typography>
            <Typography>{data.title}</Typography>
              <Typography gutterBottom variant="h5" component="div">
                ₹{data.price}
              </Typography>
                    </div>
            )
        })}
        <div id = 'total'>
        <Typography>TOTAL VALUE =  {totalValue || 0}</Typography>
        </div>
    </div>)

    }
}

export default Summary;