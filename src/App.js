import Header
 from "./header/Header";
 import { Snackbar, Alert } from "@mui/material";
 import { useState } from "react";
 import Products from "./products/Products";

function App() {
  let [isLogin, setLogin] = useState(false); 

 

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
