import { Row, Col } from "react-bootstrap";
import logo from '../logo.png';
import emailValidator from "email-validator";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const signIn = () => {

        if(!emailValidator.validate(email)){
            toast.error("El correo electrónico no es válido");
            return;
        }
        else if(password.length < 4){
            toast.error("La contraseña es incorrecta");
            return;
        }
        localStorage.setItem("user", email);
        navigate("/");
    }
    return (
        <div className="container bg-white shadow-sm rounded-3 position-absolute translate-middle top-50 start-50 w-50 h-50">
            <Row className="h-100">
                <Col className="  rounded-3 p-5 m-0" md={6}>
                    <span className="fs-3">Login</span>
                    <div className="mb-3 mt-3">
                        <label for="exampleFormControlInput1" className="form-label">Correo electrónico</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="nombre@sisamex.com" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="exampleFormControlInput1" className="form-label">Contraseña</label>
                        <input type="password"  onChange={(e) => setPassword(e.target.value)}  className="form-control" id="password"/>
                    </div>
                    <button type="submit" onClick={signIn} className="btn btn-primary mb-3 text-white w-100">Iniciar sesión</button>
                    <button type="button"  className="btn btn-link">¿Olvidaste tu contraseña?</button>

                </Col>
                <Col className="bg-primary  rounded-3 m-0 text-center position-relative" md={6}>
                    <div className="bg-white rounded-3 position-absolute translate-middle top-50 start-50 w-50 h-50 d-flex flex-column justify-content-evenly align-items-center ">
                        <img src={logo} alt="logo" height={45} />
                        <span className="fs-4">Carbosense</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Login;