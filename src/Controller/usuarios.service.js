import axios from 'axios';

export const TOKEN_KEY = "user-token";
export const isAuthenticated =  () =>  localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
class usuario_service {
  salvar = (usuario) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post('http://localhost:3001/api/v1/auth/register', JSON.stringify(usuario), { headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': getToken()
 }})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  lusuarios = async () => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/users`, { headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': getToken()
 }})
      .then((res) => {
       console.log(res.data);
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return dados;
  };


  excluir = async (id) => {
    console.log('id para ser deletado', id);
    await axios.delete(`http://localhost:3001/api/v1/users/delete/${id}` , { headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}}).catch((err) => {
      console.log(err);
    });
    return this.lusuarios();
  };


 
  updateProjeto = (usuarios) => {
    axios.put(`http://localhost:3001/api/v1/users/update/${usuarios.id}`, usuarios, { headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}})
      .then((res) => {
        console.log(res);
        console.log(res.data);
        // alert('Contato salvo com sucesso');
      })
      .catch((err) => {
        console.log(err);
      });
  };



}





export default usuario_service;
