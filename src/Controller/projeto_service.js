import axios from 'axios';

export const TOKEN_KEY = "user-token";
export const isAuthenticated =  () =>  localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

class projeto_service {

  salvar = (projeto) => {
    
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios
      .post('http://localhost:3001/api/v1/projetos/create', JSON.stringify(projeto), { headers: {
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

  lprojetos = async () => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/projetos`,{ headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': getToken()
 }})
      .then((res) => {
        //console.log(res.data);
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return dados;
  };


  excluir = async (id) => {
    console.log('id para ser deletado', id);
    await axios.delete(`http://localhost:3001/api/v1/projetos/delete/${id}`,{ headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}}).catch((err) => {
      console.log(err);
    });
    return this.lprojetos();
  };


  buscaProjeto = async (id) => {
    console.log("id recebido", id)
    let dados = null;
    await axios
      .get(`http://localhost:3001/api/v1/projetos/${id}`,{ headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': getToken()
 }})
      .then((res) => {
        console.log(dados)
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  
    return dados;
  };

  updateProjeto = (projeto) => {
    console.log(projeto, " no serviceS")
    axios.put(`http://localhost:3001/api/v1/projetos/update/${projeto.id}`, projeto, { headers: {
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





export default projeto_service;
