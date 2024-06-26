import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosConnection from "../../../helpers/axiosConnection";
import "./caracteristicas.scss";

import { faMugHot, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Caracteristicas() {
  const [dataCaracteristicas, setDataCaracteristicas] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // TODO modificar url
    axiosConnection
      .get(`/productos/buscarProductoPorId/${id}`)
      .then((response) => {
        setDataCaracteristicas(response.data.data.caracteristicas);
      });
  }, []);

  return (
    <>
      <h2>¿Qué ofrece este lugar?</h2>
      <div className="contendorCaracteristicas">
        {dataCaracteristicas
          .map((cat) => (
            <div key={cat.id} className="caracteristica">
              <span class="material-symbols-outlined">{cat.caracteristica.icono}</span>              
              <p>{cat.caracteristica.nombre}</p>
            </div>
          ))}
      </div>
    </>
  );
}
