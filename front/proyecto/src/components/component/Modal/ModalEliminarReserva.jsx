import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./modalRedes.scss";
import axiosConnection from "../../../helpers/axiosConnection";

export default function ModalEliminarReserva({ reserva, setReservas, ...props }) {

  const handleDelete = (id) => {
    axiosConnection
      .delete(`/reserva/eliminarReserva/${id}`)
      .then((response) => {
        // Manejar la eliminación de la reserva en el front-end si es necesario
        setReservas((prevReservas) =>
          prevReservas.filter((reserva) => reserva.id !== id)
        );
        console.log("Reserva eliminada correctamente:", response.data);
        props.onHide();
      })
      .catch((error) => {
        console.error("Error al eliminar la reserva:", error);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
     
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          ¿Estás seguro de que deseas eliminar esta reserva?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBodyButtons">        
         <Button onClick={() => handleDelete(reserva.id)} className="buttonModal">Sí</Button>
        <Button onClick={() => props.onHide()} className="buttonModal">No</Button> 
      </Modal.Body>
    </Modal>
  );
}
