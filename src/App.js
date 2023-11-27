import Header
 from "./header/Header";
 import { Snackbar, Alert } from "@mui/material";
 import { useEffect, useState } from "react";
 import { useSelector, useDispatch } from 'react-redux';
 import Products from "./products/Products";

function App() {
  let [isLogin, setLogin] = useState(false); 

  let response = useSelector(user => user.user);
  const dispatch = useDispatch();
  let [notLogin, setNotLogin] =useState(true)

  useEffect(()=>{
    if(response.loginFlag && notLogin){
      setLogin(true);
      setNotLogin(false);
      
    }
  },[response.loginFlag])


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
