import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faWhatsapp, faFacebook, faLinkedinIn, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./modalRedes.scss";

export default function ModalRedes(props) {
    const { id } = useParams();
    const urlACompartir = `https://remo-digitalbooking.click/productos/${id}`

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          ¿Desea compartir en redes este producto?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <ul className="listaRedes">
          <li>
            <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${urlACompartir}`}>
              <i class="fab fa-facebook-f icon"></i>
            </a>
          </li>
          <li>
            <a target="_blank" href="https://twitter.com/intent/tweet?text=[text]&url=[url]&hashtags=[hashtag]">
              <i class="fab fa-twitter icon"></i>
            </a>
          </li>
          <li>
            <a target="_blank" href={'http://www.linkedin.com/shareArticle?url=' + urlACompartir}>
              <i class="fab fa-linkedin-in icon"></i>
            </a>
          </li>
          <li>
            <a target="_blank" href={`https://api.whatsapp.com/send?text=${urlACompartir}`}>  
                        
              <FontAwesomeIcon icon={faWhatsapp} className="icon"/>
            </a>
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
}
