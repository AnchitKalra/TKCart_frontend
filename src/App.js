import Header
 from "./header/Header";
 import { Alert, Snackbar } from "@mui/material";
 import React, { useEffect, useState } from "react";
 import Products from "./products/Products";
 import { useSelector } from "react-redux";
 import { useDispatch } from "react-redux";
import {  countIncrementActionCreator } from "./reducers/countReducer";

function App() {
  let [isLogin, setIsLogin] = useState(false);
  let user = useSelector(user=> user.user);
  let count = useSelector(count=> count.count);
  const dispatch = useDispatch();
  


  const handleLogin = () =>{
    if(user?.accessToken) {
      dispatch(countIncrementActionCreator());
      setIsLogin(true);
    }
  }
  useEffect(() =>{
    if(user?.accessToken && count?.count < 1) {
      handleLogin();
    }
  }, [user?.accessToken])

  const handleClose = () => {
    setIsLogin(false);
  }


  return (
    <>  <Snackbar open={isLogin}
    autoHideDuration={6000}
        onClose={handleClose}
        ><Alert severity="success">LOGIN SUCCESS!</Alert></Snackbar>
    <div>
      <Header />
      <Products />
    </div>
    </>
  );
}

export default App;
