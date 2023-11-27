import './products.css';
import { useSelector, useDispatch } from "react-redux";
import { productsActionCreator } from "../reducers/productsreducer";
import { useEffect } from 'react';
import ListItem from './ListItem';
function Products() {


    let response = useSelector(products => products);

    const dispatch = useDispatch();
   const  products = async() =>{
        try{
            
            await dispatch(productsActionCreator());
          console.log(response.products);
        }catch(err){
            console.log(err);
        }
    }

   useEffect(()=>{
         products();

   },[response.user.loginFlag === true]);

   let i = 0;
 

   return (
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
   )

}

export default Products;