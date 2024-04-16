import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useMemo } from "react";
import "../cards.scss";
import { Link } from "react-router-dom";
import axiosConnection from "../../../../helpers/axiosConnection";
import ImageEmptyState from "../../../img/EmptyState@2x.png";


const CardRecomendacion = ({
  selectCiudad,
  selectCategoria,
  startDate,
  endDate,
}) => {
  const [dataProducto, setDataProducto] = useState([]);
  const [dataImagen, setImagen] = useState([]);
  const [dataCaracteristicas, setCaracteristicas] = useState([]);
  const [verMas, setVerMas] = useState(false);

  const fechaInicio = new Date(startDate).toISOString().slice(0, 10);
  const fechaFinal = new Date(endDate).toISOString().slice(0, 10);

  const getUrl = () =>
    selectCiudad
      ? `/productos/FiltroPorCiudadYFechas/${selectCiudad}/${fechaInicio}/${fechaFinal}`
      : "/productos/traerTodos";

  useEffect(() => {
    axiosConnection.get(getUrl()).then((response) => {
      setDataProducto(response.data.data);      
    });
    // TODO Modificar url
    
  }, [selectCiudad, startDate, endDate]);

  useEffect(() => {
    axiosConnection
      .get(`/caracteristicas/listarCaracteristicas`)
      .then((response) => {
        setCaracteristicas(response.data.data);
      });
  }, [dataImagen]);

  const getImage = (card) => {
    return dataImagen[card.id] || ImageEmptyState; // Devuelve la URL de la imagen si está disponible, de lo contrario, la imagen predeterminada.
  };

  const filteredList = useMemo(() => {
    return selectCategoria
      ? dataProducto.filter((prod) => prod.categoria.id === selectCategoria)
      : dataProducto;
  }, [dataProducto, selectCategoria, selectCiudad]);

 
  useEffect(() => {
    filteredList.forEach((card) => {
      axiosConnection.get(`/imagenes/productos/${card.id}/imagenes`).then((response) => {
        const firstImage = response.data[0]; 
        if (firstImage) {
          setImagen((prevState) => ({
            ...prevState,
            [card.id]: firstImage.url // Guardar la primera imagen en un objeto usando el ID del producto como clave.
          }));
        }
      }).catch((error) => {
        console.error("Error al obtener imágenes:", error);
      });
    });
  }, [filteredList]);
  
  const buscadorCards = () => {
    if (filteredList.length === 0) {
      return (
        <>
            <div className="emptyState">
                <p className="parrafoEmpty">Lo sentimos, no hay productos disponibles en este momento</p>
                <img src={ImageEmptyState}/>
                
            </div>
        </>
      );
    } else {
      return (
        <>
          {filteredList?.map((card) => (
            <div key={card.id} className="cardRecomendacion">
              <div
                style={{ backgroundImage: "url('" + getImage(card) + "')" }}
                className="fondoImagenProducto"
              />
              <div className={`cardBody ${verMas? null : "widthBody"}`}>
                <div className="presentacion">
                  <div>
                    <div className="categoriaYEstrellas">
                      <p className="categoria">{card.categoria.titulo}</p>
                      <p>
                        <FontAwesomeIcon icon={faStar} className="estrella" />
                        <FontAwesomeIcon icon={faStar} className="estrella" />
                        <FontAwesomeIcon icon={faStar} className="estrella" />
                        <FontAwesomeIcon icon={faStar} className="estrella" />
                        <FontAwesomeIcon icon={faStar} className="estrella" />
                      </p>
                    </div>
                    <h3 className="nombreHotel">{card.nombre}</h3>
                  </div>
                  <div className="calificacion">
                    <span className="puntaje">8</span>
                    <p style={{ fontWeight: "700", textAlign: "right" }}>
                      Muy Bueno
                    </p>
                  </div>
                </div>
                <div className="infoHotel">
                  <p>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ marginRight: "4px" }}
                    />
                    {card.ciudad.nombre}{" "}
                    <span className="mostrarMapa">MOSTRAR EN EL MAPA</span>
                  </p>
                  <p className="iconosInfoHotel">
                    {card.caracteristicas
                      .map((cat) => (
                        <span class="material-symbols-outlined">
                          {cat.caracteristica?.icono}
                        </span>
                      ))}
                  </p>
                </div>
                <p>
                  {verMas
                    ? card.descripcion
                    : card.descripcion?.split(" ", 12).join(" ")}
                  <span className="mas" onClick={() => setVerMas(!verMas)}>
                    {verMas ? " ver menos" : " ver más..."}
                  </span>
                </p>
                <Link to={`/productos/${card.id}`}>
                  <button className="buttonCard">ver más</button>
                </Link>
              </div>
            </div>
          ))}
        </>
      );
    }
  };


  return <div className="cards">{buscadorCards()}</div>;
};

export default CardRecomendacion;
