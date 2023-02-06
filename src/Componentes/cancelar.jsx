import React from 'react';
import { useNavigate } from 'react-router-dom';


const Cancelar = (props)=> {
  const navigate = useNavigate();

  return(

    <button className="btn btn-danger" onClick={() =>navigate(-1)}>Cancelar</button>


  );

}

export default Cancelar;