import React, { useEffect, useState } from "react";
import axiosConnection from "../../../../helpers/axiosConnection";
import "../ListadoMisReservas.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ModalEliminarReserva from "../../Modal/ModalEliminarReserva";
import ModalRedes from "../../Modal/ModalRedes";

const ListadoMisReservas = ({ reservas, setReservas }) => {
  const [imagenes, setImagenes] = useState({});
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // Llamamos a la función getImage para cada reserva cuando cambie la lista de reservas
    reservas.forEach((reserva) => {
      getImage(reserva.producto);
    });
  }, [reservas]);

  const getImage = (producto) => {
    axiosConnection
      .get(`/imagenes/productos/${producto.id}/imagenes`)
      .then((response) => {
        const firstImage = response.data[0];
        if (firstImage) {
          // Actualizamos el estado de las imágenes usando el ID del producto como clave
          setImagenes((prevState) => ({
            ...prevState,
            [producto.id]: firstImage.url,
          }));
        }
      })
      .catch((error) => {
        console.error("Error al obtener imágenes:", error);
      });
  };

  // Función para mostrar un modal específico cuando se hace clic en el botón de eliminar
  const handleShowModal = (reservaId) => {
    setModalShow(reservaId);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalShow(null);
  };
  

  return (
    <div className="contenedorReservas">
      {reservas.map((reserva) => (
        <div className="reserva" key={reserva.id}>
          <button
            className="eliminarReserva"
            onClick={() => handleShowModal(reserva.id)} // Pasamos el ID de la reserva al hacer clic en el botón de eliminar
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <ModalEliminarReserva
            reserva={reserva}
            setReservas={setReservas}
            show={modalShow === reserva.id} // Mostramos el modal solo si modalShow es igual al ID de la reserva actual
            onHide={handleCloseModal} // Cerramos el modal al hacer clic en el botón de cerrar
          />
          <div className="contenedorImagen">
            {/* Verificamos si hay una imagen asociada al producto */}
            {imagenes[reserva.producto.id] && (
              <img
                src={imagenes[reserva.producto.id]}
                alt="Imagen del producto"
              />
            )}
          </div>
          <span className="categoriaListadoMisReservas">
            {reserva.producto.categoria.titulo}
          </span>
          <h2 className="tituloListadoMisReservas">
            {reserva.producto.nombre}
          </h2>
          <p className="ciudadListadoReserva">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ paddingRight: "5px" }}
            />
            {`${reserva.producto.ciudad.provincia}, ${reserva.producto.ciudad.nombre}, ${reserva.producto.ciudad.pais}.`}
          </p>
          <div className="checkinReservaListadoContenedor">
            <span className="checkinReservaListadoDescripcion">Check in</span>
            <span className="fechaReservaListado">{reserva.fechaInicial}</span>
          </div>
          <div className="checkoutReservaListado">
            <span className="checkoutReservaListadoDescripcion">Check out</span>
            <span className="fechaReservaListado">{reserva.fechaFinal}</span>
          </div>
        </div>
      ))}
      <div className="separador" />
    </div>
  );
};

export default ListadoMisReservas;
