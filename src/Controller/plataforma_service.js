import axios from 'axios';


export const TOKEN_KEY = "user-token";
export const isAuthenticated =  () =>  localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

class plataforma_service {
  
  salvar = (plataforma) => {
    console.log("plataforma recebida", plataforma)
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post(
        'http://localhost:3001/api/v1/plataforma/create',
        JSON.stringify(plataforma), { headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Headers': 'x-access-token',
          'x-access-token': getToken()
   }}
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  lplataforma = async () => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/plataforma`, { headers: {
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

  listaplataformaProj = async (id) => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/plataforma/projeto/${id}`, { headers: {
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




  buscaplataforma = async (search) => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/plataforma/api/busca?search=${search}`, { headers: {
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



  listaplataformaProjAll = async (id) => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/plataforma/projetoall/${id}`, { headers: {
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

  getplataformaName = async (id) => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/plataforma/${id}`, { headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': getToken()
 }})
      .then((res) => {
        
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
 
      return dados;
  
  };



  excluir = async (id,idprojeto) => {
   
    await axios.delete(`http://localhost:3001/api/v1/plataforma/delete/${id}`,{ headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}}).catch((err) => {
      console.log(err);
    });
    return this.listaplataformaProjAll(idprojeto) ;
  };



  updatePlataforma = (plataforma) => {
    
    axios.put(`http://localhost:3001/api/v1/plataforma/update/${plataforma.id}`, plataforma, { headers: {
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
}



}

export default plataforma_service;
