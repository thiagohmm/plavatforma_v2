import axios from 'axios';

export const TOKEN_KEY = "user-token";
export const isAuthenticated =  () =>  localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

class equipamento_service {
  
  salvar = (equip) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post('http://localhost:3001/api/v1/equip/create', JSON.stringify(equip), { headers: {
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

  lequip = async () => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/equip`, { headers: {
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

  listaequipById = async (id) => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/equip/${id}`, { headers: {
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



  listaequipPlataforma = async (id) => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/equip/plataforma/${id}`, { headers: {
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



  excluir = async (id,idplataforma) => {
    console.log('id para ser deletado', id);
    await axios.delete(`http://localhost:3001/api/v1/equip/delete/${id}`, { headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}}).catch((err) => {
      console.log(err);
    });
    return this.listaequipPlataforma(idplataforma) ;
  };


  updateEquipamentos = (equipamentos) => {
    axios.put(`http://localhost:3001/api/v1/equip/update/${equipamentos.id_equip}`, equipamentos, { headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}})
      .then((res) => {
       
       
      })
      .catch((err) => {
        console.log(err);
      });
}

}

export default equipamento_service;
