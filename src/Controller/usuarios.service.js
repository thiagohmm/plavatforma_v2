import axios from 'axios';


class usuario_service {
  salvar = (usuario) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios
      .post('http://localhost:3001/api/v1/auth/register', JSON.stringify(usuario))
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
      .get(`http://localhost:3001/api/v1/users`)
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
    await axios.delete(`http://localhost:3001/api/v1/users/delete/${id}`).catch((err) => {
      console.log(err);
    });
    return this.lusuarios();
  };


 
  updateProjeto = (usuarios) => {
    axios.put(`http://localhost:3001/api/v1/users/update/${usuarios.id}`, usuarios)
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
