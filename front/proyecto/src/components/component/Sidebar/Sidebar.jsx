import React, { useEffect, useState, useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import "./sidebar.scss";
//import { matchPath, useNavigate } from "react-router";
import SocialIconsSidebar from "./SocialIconsSidebar/SocialIconsSidebar";
import { Link, useLocation } from "react-router-dom";
//import { Button } from "react-bootstrap";
import UserProvider from "../../context/UserContext";

const Sidebar = () => {
  const [isAuthenticatedMenu, setIsAuthenticatedMenu] = useState(false);
  const { user, loginLogoutEvent } = useContext(UserProvider);
  useEffect(() => setIsAuthenticatedMenu(user.auth), [user]);
  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  });

  const handleClick = () => {
    loginLogoutEvent({
      nombre: "",
      apellido: "",
      mail: "",
      id: null,
      auth: false,
      redirect: false,
      rol:"",
      ciudad: "",
    });
  };

  const buttonsView = {
    "/": (
      <>
        <Link to="/account" className="buttonSideBarAccount">
          Crear cuenta
        </Link>
        <Link to="/login" className="buttonNavSideLogin">
          Iniciar Sesión
        </Link>
      </>
    ),
    "/reserva": (
      <>
        <Link to="/account" className="buttonSideBarAccount">
          Crear cuenta
        </Link>
        <Link to="/login" className="buttonNavSideLogin">
          Iniciar Sesión
        </Link>
      </>
    ),
    "/account": (
      <>
        <Link to="/login" className="buttonNavSideLogin">
          Iniciar Sesión
        </Link>
      </>
    ),
    "/login": (
      <>
        <Link to="/account" className="buttonSideBarAccount">
          Crear cuenta
        </Link>
      </>
    ),
  };

  const handleIsAuthMenu = () => {
    if (isAuthenticatedMenu) {
      return (
        <>
          <p>
            ¿Deseas{" "}
            <Link className="menu-item" to="/login" onClick={handleClick}>
              cerrar sesión
            </Link>
            ?
          </p>
          <br />
        </>
      );
    } else {
      return buttonsView[pathname];
    }
  };
  const handleAuthenticated = () => {
    if (isAuthenticatedMenu) {
      return (
        <div className="SidebarBienvenida">
          {/* {console.log(user)} */}
          <span>{user.nombre[0] + user.apellido[0]}</span>
          {/* {console.log(user.nombre[0])} */}
          <p>Hola,</p>
          <p className="nombreCompletoMenu">{`${user.nombre} ${user.apellido}`}</p>
        </div>
      );
    } else {
      return <span className="menu">MENU</span>;
    }
  };

  return (
    <>
      {windowWidth <= 768 && (
        <Menu right>
          <div className="upper-colored-box">{handleAuthenticated()}</div>
          <div className="menuConFooter">
            <div className="menu-main">{handleIsAuthMenu()}</div>
            <div>
              <SocialIconsSidebar />
            </div>
          </div>
        </Menu>
      )}
    </>
  );
};

export default Sidebar;
