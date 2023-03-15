import axios from 'axios';



export const TOKEN_KEY = "user-token";
export const isAuthenticated =  () =>  localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

class node_service {
  salvar = (nodes) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post('http://localhost:3001/api/v1/nodes/create', JSON.stringify(nodes) , { headers: {
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

  lnodes = async () => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/nodes`,  { headers: {
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
  
  listanodesplataforma = async (id) => {
    let dados = [];
    await axios
      .get(`http://localhost:3001/api/v1/nodes/plataforma/${id}` , { headers: {
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

  vncConnect = (vnc) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      //.post('http://localhost:6081/novnc/sendnodes', JSON.stringify(vnc))
      .post('http://localhost:3001/api/v1/novnc/sendnodes', JSON.stringify(vnc))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  excluir = async (id,idplataforma) => {
    console.log('id para ser deletado', id);
    await axios.delete(`http://localhost:3001/api/v1/nodes/delete/${id}` , { headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}}).catch((err) => {
      console.log(err);
    });
    return this.listanodesplataforma(idplataforma) ;
  };

  getNodeById = async(id) => {
    console.log("id recebido", id)
    let dados = [];
    await axios.get(`http://localhost:3001/api/v1/nodes/${id}`, { headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}}).then((res) => {
      //console.log(res.data);
      dados = res.data;
    }).catch((err) => {
      console.log(err);
    });
    return dados
  };


  updateNodes = (nodes) => {
    console.log("dados", nodes)
    axios.put(`http://localhost:3001/api/v1/nodes/update/${nodes.id_node}`, nodes , { headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Headers': 'x-access-token',
      'x-access-token': getToken()
}})
      .then((res) => {
        console.log(res);
        console.log(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
}


  }


export default node_service;
