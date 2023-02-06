import React , { useState,  useEffect } from 'react';
import AsyncSelect from 'react-select/async';
//import plataforma_service from '../controller/plataforma_service';
import { Link } from 'react-router-dom';


function Busca(props)  {


  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [loadData, setLoadData] = useState([])
  //const service = new plataforma_service();

 
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    control: (provided) => ({
      ...provided,
      marginTop: "1px",
    })
  }
  
 
      
    const handleInputChange = (event) => {
    
     setValue(event) ;
          //console.log("valor do input", inputValue)
    };



const handlerKeyPress = (e, id)=>{
  console.log(id)
  
  if(e.key ==='Enter'){
    //e.preventDefault();
    const  href  = window.location.host;
    //alert(`${href}listaNodes/${id}`)
    window.location.href = `http://${href}/#/listaNodes/${id}`;

  }
}
   
   
    // handle selection
    const handleChange = (value) => {
      
     setSelectedValue(value)

    }
    
    const mostra =(busca) => {
      console.log(busca)
      setSelectedValue(busca.id)

      return <Link to={{ pathname: `/listaNodes/${busca.id}`,}}>  {busca.nome}  </Link>
    }

    async function load(evento){
      
      //console.log(evento)
      if (inputValue !== ''){
        //const procuraService = service.buscaplataforma(evento);
        //setLoadData([])
       // setLoadData(procuraService)

        //return (await procuraService).map((e) => ( {id: e.id, nome: e.nome_plataforma}))
         
      }
    }      
              
      
    return (
      <div  className='col-md-4' >
     <AsyncSelect
     cacheOptions
     defaultOptions
     noOptionsMessage={() => 'Nenhuma plataforma encontrada'}
     oadingMessage={() => 'procurando...'} 
     placeholder="Pesquisa por Plataforma ou Ip"
      value={selectedValue}
      //getOptionLabel={loadData => loadData.nome}
      getOptionLabel={loadData => mostra(loadData)}
      getOptionValue={loadData => console.log(loadData.id)}
      loadOptions={load}
      onInputChange={(data) => {   
        handleInputChange(data)
      }}
      onChange={(data) => handleChange(data.id)}
      onKeyDown={e => {handlerKeyPress(e, selectedValue)}}
      styles = { customStyles }
      
      />
  </div>
    );
  };
  
  export default Busca;
