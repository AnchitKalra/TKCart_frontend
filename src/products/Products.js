import './products.css';
import { useSelector, useDispatch } from "react-redux";
import { productsActionCreator } from "../reducers/productsreducer";
import { useEffect } from 'react';
import ListItem from './ListItem';
function Products() {


    let user= useSelector(user => user.user)

    const dispatch = useDispatch();
   const  products = async() =>{
        try{
            
         dispatch(productsActionCreator());
        }catch(err){
            console.log(err);
        }
    }

   useEffect(()=>{

    products();      

   },[user.loginFlag]);

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