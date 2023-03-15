import { Navigate } from "react-router-dom";


const logout = async () => {
  
  try {
   
    //const response = await axios("/users/logout", { method: "POST"});

    // remove token from local storage and redirect to login page 
    localStorage.clear();
  
  } catch (e) {
    console.log(e);
  }
  return <Navigate to="/" />
}

export default logout