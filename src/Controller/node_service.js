import axios from 'axios';
import React, { Component } from 'react';

class node_service {
  salvar = (nodes) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post('/nodes/create', JSON.stringify(nodes))
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
      .get(`/nodes`)
      .then((res) => {
        //console.log(res.data);
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return dados;
    console.log(dados);
  };
  
  listanodesplataforma = async (id) => {
    let dados = [];
    await axios
      .get(`/nodes/plataforma/${id}`)
      .then((res) => {
        //console.log(res.data);
        dados = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return dados;
    console.log(dados);
  };

  vncConnect = (vnc) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      //.post('http://localhost:6081/novnc/sendnodes', JSON.stringify(vnc))
      .post('/novnc/sendnodes', JSON.stringify(vnc))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  excluir = async (id,idplataforma) => {
    console.log('id para ser deletado', id);
    await axios.delete(`/nodes/delete/${id}`).catch((err) => {
      console.log(err);
    });
    return this.listanodesplataforma(idplataforma) ;
  };

  getNodeById = async(id) => {
    let dados = [];
    await axios.get(`/nodes/${id}`).then((res) => {
      //console.log(res.data);
      dados = res.data;
    }).catch((err) => {
      console.log(err);
    });
    return dados
  };


  updateNodes = (nodes,id) => {
    console.log("dados" + nodes)
    axios.put(`/nodes/update/${id}`, nodes)
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
