import { useSelector } from 'react-redux';
import './summary.css'
import{Typography} from '@mui/material';

function Summary() {
    let totalValue = 0;
    let order = useSelector(order => order.order);
    let getOrders = ['start'];
        if(order) {
            console.log('logging orders')
            console.log(order);
            for(let o in order) {
                
                getOrders.push(order[o]);
                if(order[o] === null) {
                    getOrders.push('start');
                }
            }
            getOrders.pop();
        }



    let i = 0;
    let j = 1;
   
    if(getOrders?.length >= 1){
        return(<div className='summary'>
            <Typography><h2>SUMMARY PAGE:</h2></Typography>
        {getOrders.map(data =>{
            if(data === 'start') {
                return(
                    <Typography><h3>Order Number #{j}</h3></Typography>
                )
            }
            if(data === null) {
                let value = totalValue;
                totalValue = 0;
                j++;
                i = 0;
                return(
                    <div id = 'total'>
        <Typography>TOTAL VALUE =  {value || 0}</Typography>
        </div>
                )
                
            }
                totalValue += data.totalValue;
                
                return(
                    
                   <div id = 'type'>
            <Typography className='card'>#{++i}</Typography>
                <Typography>{data.title}</Typography>
                  <Typography>
                    ₹{data.price}
                  </Typography>
                  <Typography>Quantity:{data.quantity}</Typography>
                        </div>
                )
        }
        )
    }
          
            
    </div>)

    }
}



export default Summary;