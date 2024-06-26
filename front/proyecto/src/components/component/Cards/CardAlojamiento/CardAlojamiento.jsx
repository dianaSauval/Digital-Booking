import React, { useState, useEffect } from "react";
import axiosConnection from "../../../../helpers/axiosConnection";
import SpinnerLoader from "../../../component/SpinnerLoader/SpinnerLoader";
import "../cards.scss";

const CardAlojamiento = ({ idCategoria, setIdCategoria, onClickFilterCategoria }) => {
  const [dataCategoria, setDataCategoria] = useState([]);
  const [dataProductos, setDataProductos] = useState([]);
  //const [idCategoria, setIdCategoria] = useState([]);

  useEffect(() => {
    axiosConnection.get("/categorias").then((response) => {
      setDataCategoria(response.data.data);
    });
  }, []);

  useEffect(() => {
    axiosConnection.get("/productos/traerTodos").then((response) => {
      setDataProductos(response.data.data);
    });
  }, []);

  const cantidadProductos = (cat) =>{
    const dataCantidadProductosFiltrados = dataProductos.filter((prod)=> prod.categoria.id === cat.id)
    console.log("dataCategoriaFiltrada: ", dataCantidadProductosFiltrados);
    return dataCantidadProductosFiltrados.length
  }

  const buscadorCardsCategoria = () => {
    if (dataCategoria.length === 0) {
      return (
        <>
            <SpinnerLoader/>
        </>
      );
    } else {
      return (
        <>
          <div className="cards" >
                {dataCategoria.map((cat)=>(
                    <div key={cat.id} className="cardAlojamiento" onClick={(e)=>{onClickFilterCategoria(cat.id,e)}}>
                        <div style={{backgroundImage:"url('" + cat.urlImg + "')"}} className="fondoImagen"/>
                        <div className="cardBody">
                            <h4>{cat.titulo}</h4>
                            <p style={{fontWeight:"700"}}>{cantidadProductos(cat)} {cat.descripcion}</p>
                        </div>
                                                
                    </div>
                ))}

            </div>
        </>
      );
    }
  };



        return (
            <>
            {buscadorCardsCategoria()}
            </>
        ) 


}


export default CardAlojamiento;
