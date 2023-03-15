import React, { useState, useEffect }  from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPersonificada = (props) => {
  
  const [showModal, setshowModal] = useState();
 
  const handleClose = () => setshowModal(false);
 
  
  useEffect(() => {
    setshowModal(props.showModal);
  }, [props]);


  return (
    <div >
  


<Modal show={showModal} onHide={handleClose} animation={false} aria-labelledby="contained-modal-title-vcenter" centered>
<Modal.Header  >
  <Modal.Title id="contained-modal-title-vcenter">Exclusão</Modal.Title>
</Modal.Header>
<Modal.Body>Essa ação excluirá o {props.texto} selecionado.<br/> Essa ação não tem volta.</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={() => props.handleExcluir(props.id,props.hostplatID)}>Excluir </Button>
          
          <Button variant="primary" onClick={() => props.updateStatus(false)}>Close
           
          </Button>
        </Modal.Footer>
      </Modal>









   </div>
  );
};

export default ModalPersonificada;
