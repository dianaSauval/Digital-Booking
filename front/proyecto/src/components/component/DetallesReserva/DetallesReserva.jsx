import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./reservaDetalle.scss";
//import { Button } from 'react-bootstrap';
//import { Boton } from '../../elementStyle/Form';
import FechaRangoContextProvider from "../../context/FechaRangoContextProvider";
import HoraContextProvider from "../../context/HoraContextProvider";
import UserProvider from "../../context/UserContext";
import axiosConnection from "../../../helpers/axiosConnection";
import axios from "axios";
import ImageEmptyState from "../../img/EmptyState@2x.png";

export default function DetallesReserva() {
  const { user } = useContext(UserProvider);
  const { isHora } = useContext(HoraContextProvider);
  const { rango } = useContext(FechaRangoContextProvider);
  //console.log("rango: ", rango);
  const [dataProducto, setDataProducto] = useState([]);
  const [dataImagen, setDataImagen] = useState([]);
  const [isCiudad, setIsCiudad] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  //console.log("isCiudad: ", isCiudad);
  useEffect(() => {
    if (user.ciudad !== "") {
      setIsCiudad(true);
    } else if (user.ciudad === "") {
      setIsCiudad(false);
    }
  }, [user.ciudad]);

  const fechaInicio = rango[0]
    ? new Date(rango[0]).toISOString().slice(0, 10)
    : "_/_/_";
  const fechaFinal = rango[1]
    ? new Date(rango[1]).toISOString().slice(0, 10)
    : "_/_/_";

  useEffect(() => {
    axiosConnection
      .get(`/productos/buscarProductoPorId/${id}`)
      .then((response) => {
        setDataProducto(response.data.data);
      });
  }, []);

  useEffect(() => {
    // TODO modificar url
    axiosConnection
      .get(`/imagenes/productos/${id}/imagenes`)
      .then((response) => {
        const firstImage = response.data[0];
        if (firstImage) {
          setDataImagen((prevState) => ({
            ...prevState,
            [id]: firstImage.url, // Guardar la primera imagen en un objeto usando el ID del producto como clave.
          }));
        }
      })
      .catch((error) => {
        console.error("Error al obtener imágenes:", error);
      });
  }, []);

  const getImage = () => {
    return dataImagen[id] || ImageEmptyState;
    // Devuelve la URL de la imagen si está disponible, de lo contrario, la imagen predeterminada.
  };

  const isProducto = () => {
    if (dataProducto.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (
      rango[0] !== null &&
      rango[1] !== null &&
      isHora !== null &&
      isCiudad
    ) {
      console.log("hora: " + isHora);
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rango, isHora, isCiudad]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newReserva = {
      hora: isHora,
      fechaInicial: fechaInicio,
      fechaFinal: fechaFinal,
      producto: {
        id: parseInt(id),
      },
      usuario: {
        id: parseInt(user.id),
      },
    };

    console.log(newReserva);

    if (rango[0] !== null && rango[1] !== null && isHora!==undefined && isCiudad) {
      const token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token);
      axiosConnection
        .post("reserva/agregarReserva", newReserva, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",            
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Respuesta del servidor:", response.data);
          navigate(`/reservaExitosa`);
        })
        .catch((error) => {
          console.error("Error al enviar la solicitud:", error);
          // Manejar el error aquí
        });
    }
  };

  return (
    <div className="tablaDatos">
      {isProducto() && (
        <div className="contenedorTablaDetalle">
          <h2 className="tituloDetalleReserva">Detalle de la reserva</h2>
          <div className="contenidoTablaDetalle">
            <div
              style={{ backgroundImage: "url('" + getImage() + "')" }}
              className="fondoImagen"
            />
            <div className="contenedorDetalle">
              <span>{dataProducto.categoria.titulo}</span>
              <h2>{dataProducto.nombre}</h2>
              <div className="contenedorEstrellas">
                <FontAwesomeIcon icon={faStar} className="estrella" />
                <FontAwesomeIcon icon={faStar} className="estrella" />
                <FontAwesomeIcon icon={faStar} className="estrella" />
                <FontAwesomeIcon icon={faStar} className="estrella" />
                <FontAwesomeIcon icon={faStar} className="estrella" />
              </div>
              <p>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ paddingRight: "5px" }}
                />
                {dataProducto.ciudad.provincia}, {dataProducto.ciudad.nombre},{" "}
                {dataProducto.ciudad.pais}.
              </p>
              <div className="linea" />
              <div className="check">
                <p>Check in</p>
                <p>{fechaInicio}</p>
              </div>
              <div className="linea" />
              <div className="check">
                <p>Check out</p>
                <p>{fechaFinal}</p>
              </div>
              <button
                className="confirmarReserva"
                onClick={onSubmit}
                disabled={isDisabled}
              >
                Confirmar reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
