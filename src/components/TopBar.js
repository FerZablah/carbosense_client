import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../logo.png";

const TopBar = () => {
    const [openedMenu, setOpenedMenu] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    
    const user = localStorage.getItem("user");
    let alias = "";
    if (user) {
        alias = user.split("@")[0];
    }

    return (
        // menu de hamburguesa

        <div>
            <div id="mySidenav" style={{ width: openedMenu ? 250 : 0 }} className="sidenav">

                <span className="logo" >
                    <img src={logo} alt="logo" height={30} />
                </span>

                <span className="closebtn text-white" style={{ mouse: 'pointer' }} onClick={() => setOpenedMenu(false)}>&times;</span>
                <a href="/">Inicio</a>
                <a href="/reportes">Reportes</a>
                <a href="/alertas">Configuración alertas</a>
            </div>
            <Row className="justify-content-between bg-primary ">
                <Col md={4}>
                    <span style={{ fontSize: '30px', cursor: 'pointer' }} className="text-white mx-3" onClick={() => setOpenedMenu(true)}>&#9776;</span>
                </Col>
                <Col className="position-relative" md={2}>
                    <div style={{ cursor: 'pointer' }} onClick={() => setShowLogout(!showLogout)} className="d-flex justify-content-center  align-items-center h-100">
                        <BsPersonCircle size="30" className="ms-3 text-white mx-2" />
                        <span className="text-white">@{alias}</span>
                    </div>
                    {showLogout &&
                        <div className="position-absolute start-0 w-100">
                            <button onClick={() => {
                                localStorage.removeItem("user");
                                window.location.reload();
                            }} type="submit" className="btn btn-secondary text-white w-100 ">Cerrar sesión</button>
                        </div>
                    }

                </Col>
            </Row>
        </div>
    );
}

export default TopBar;