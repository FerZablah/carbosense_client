/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";
import RecipeAdministrationPage from "./RecipeAdministrationPage";

const authorizedScreens = {
    admin: ["root", "alerts", "users", "ovenAdministration", "systemSettings", "recipeAdministration"],
    metallurgy: ["root", "reports", "metallurgyReport"],
    oven_operator: ["root", "partSelector"],
    qa: ["root", "reports", "metallurgyReportAuthorization"],
};

const screenPaths = {
    root: {
        path: "/",
        name: "Inicio",
    },
    reports: {
        path: "/reportes",
        name: "Reportes",
    },
    alerts: {
        path: "/alertas",
        name: "Alertas",
    },
    partSelector: {
        path: "/seleccion-recetas",
        name: "Hornos",
    },
    users: {
        path: "/usuarios",
        name: "Administración de usuarios",
    },
    metallurgyReport: {
        path: "/metalurgica",
        name: "Reportes de metalurgia",
    },
    metallurgyReportAuthorization: {
        path: "/metalurgica/autorizacion",
        name: "Reportes de metálurgia - Autorización",
    },
    ovenAdministration: {
        path: "/administracionHornos",
        name: "Administración de Hornos",
    },
    systemSettings: {
        path: "/settings",
        name: "Configuración del sistema",
    },
    recipeAdministration:{
        path: "/administracionRecetas",
        name: "Administración de Recetas",
    },
};

const TopBar = () => {
    const [openedMenu, setOpenedMenu] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    let alias = "";
    if (user) {
        alias = user.name;
    }

    return (
        // menu de hamburguesa

        <div>
            <div
                id="mySidenav"
                style={{ width: openedMenu ? 250 : 0 }}
                className="sidenav"
            >
                <span className="logo">
                    <img src={logo} alt="logo" height={30} />
                </span>

                <span
                    className="closebtn text-white"
                    style={{ mouse: "pointer" }}
                    onClick={() => setOpenedMenu(false)}
                >
                    &times;
                </span>
                {authorizedScreens[user.role].map((screen) => (
                    <a
                        key={screen}
                        onClick={() => {
                            setOpenedMenu(false)
                            navigate(screenPaths[screen].path)
                        }}
                        style={{
                            cursor: "pointer",
                        }}

                        // href={`#${screenPaths[screen].path}`}
                        className="text-white"
                    >
                        {screenPaths[screen].name}
                    </a>
                ))}
            </div>
            <Row className="justify-content-between bg-primary ">
                <Col md={4}>
                    <span
                        style={{ fontSize: "30px", cursor: "pointer" }}
                        className="text-white mx-3"
                        onClick={() => setOpenedMenu(true)}
                    >
                        &#9776;
                    </span>
                </Col>
                <Col className="position-relative" md={2}>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowLogout(!showLogout)}
                        className="d-flex justify-content-center  align-items-center h-100 user-account"
                    >
                        {user.photo ? (
                            <img
                                src={user.photo}
                                alt="user"
                                className="rounded-circle mx-2 border border-white bg-white"
                                width={35}
                                height={35}
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <BsPersonCircle
                                size="35"
                                className="ms-3 text-white mx-2"
                            />
                        )}
                        <span className="text-white">@{alias}</span>
                    </div>
                    {showLogout && (
                        <div className="position-absolute start-0 w-100">
                            <button
                                onClick={() => {
                                    localStorage.removeItem("user");
                                    window.location.reload();
                                }}
                                type="submit"
                                className="btn btn-secondary text-white w-100 "
                            >
                                Cerrar sesión
                            </button>
                            <button
                                onClick={() => {
                                    window.location = "/perfil";
                                }}
                                type="submit"
                                className="btn btn-secondary text-white w-100 "
                            >
                                Perfil
                            </button>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default TopBar;
