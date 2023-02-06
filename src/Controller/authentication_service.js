import axios from 'axios';

export const TOKEN_KEY = "user-token";
export const isAuthenticated =  () =>  localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

class autenticacao {
  
  autentica =  async (autenticacao) => {
    const dados = [];
    await axios.post('http://localhost:3001/api/v1/auth/login', autenticacao)
    .then((res) => {
     
      dados.push(res.data.accessToken);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
   
  return dados;
};
            
            
  
lprofile = async () => {
  let dados = [];
  await axios
    .get(`http://localhost:3001/api/v1/users/profile`,{ headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}})
    .then((res) => {
      //console.log(res.data);
      dados = res.data;
    })
    .catch((err) => {
      dados = JSON.stringify(err.response.status);
    });
  return dados;
};
   

 
          

}





export default autenticacao;