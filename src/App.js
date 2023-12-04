import Header
 from "./header/Header";
 import { Snackbar, Alert } from "@mui/material";
 import { useEffect, useState } from "react";
 import Products from "./products/Products";
 import { useSelector } from "react-redux";

function App() {
  let [isLogin, setLogin] = useState(false); 
  let user = useSelector(user=> user.user)

  function login(){
    try{
      if(user.accessToken){
        setLogin(true)
      }}catch(err){}
  }

  useEffect(()=>
  
    login(),[user.accessToken])

  return (
    <>  <Snackbar open={isLogin}
    autoHideDuration={3000}
    onClose={()=> setLogin(false)}><Alert severity ="success"> Login successfull!</Alert></Snackbar>
    <div>
      <Header />
      <Products />
    </div>
    </>
  );
}

export default App;
