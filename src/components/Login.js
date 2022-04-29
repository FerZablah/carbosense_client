import { Row, Col } from "react-bootstrap";
import logo from "../logo.png";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";

const Login = () => {
    const [payrollId, setPayrollId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    const signIn = async (event) => {
        event.preventDefault();
        console.log(payrollId);
        if (payrollId.length < 6) {
            toast.error("El número de nómina es incorrecto");
            return;
        } else if (password.length < 4) {
            toast.error("La contraseña es incorrecta");
            return;
        }
        try {

            const res = await axios.post(`${BASE_URL}/user/login`, {
                payrollId,
                password,
            });
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/");
        } catch (error) {
            toast.error("El número de nómina o la contraseña son incorrectos");
        }
    };
    const handleForgotPassword = async () => {
        try {
            //Check that a payroll number is typed in in the input
            if (payrollId.length < 6) {
                toast.error("El número de nómina es incorrecto");
                return;
            }
            //Get the user for the payroll number
            const res = await axios.get(
                `${BASE_URL}/user/${payrollId}`
            );
            //If the user has an email send email reset password
            if (res.data.email && res.data.email.length > 0) {
                const promisePassword = axios.post(
                    `${BASE_URL}/user/send/restore/password/${res.data.id}`
                );
                toast.promise(promisePassword, {
                    loading: "Cargando...",
                    success:
                        "Se ha enviado un correo con las instrucciones para restablecer la contraseña",
                    error: "El número de nómina es incorrecto",
                });
            }
            //If the user does not have an email ask to contact the admin
            else {
                toast(
                    "Contacte al administrador del sistema para cambiar su contraseña",
                    {
                        icon: "ℹ️",
                    }
                );
            }
        } catch (error) {
            toast.error("El número de nómina es incorrecto");
        }
    };
    return (
        <div
            className="container bg-white shadow-sm rounded-3 position-absolute translate-middle top-50 start-50 w-50 h-50"
            style={{ minHeight: "400px" }}
        >
            <form className="h-100" onSubmit={signIn}>
                <Row className="h-100">
                    <Col
                        className="position-relative rounded-3 p-4 m-0 h-100"
                        md={6}
                    >
                        <span className="fs-3">Iniciar Sesión</span>
                        <div className="mb-3 mt-3">
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                            >
                                Número de nómina
                            </label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setPayrollId(e.target.value)
                                }}
                                className="form-control"
                                id="payrollId"
                                placeholder="123456"
                            />
                        </div>
                        <div className="mb-3 mt-3">
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="password"
                            />
                            <p>
                                <small>
                                    Recuerda que la contraseña es de al menos 6
                                    carácteres
                                </small>
                            </p>
                        </div>
                        <button
                            type="button"
                            className="btn btn-link p-0"
                            style={{ color: "red" }}
                            onClick={handleForgotPassword}
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                        <button
                            type="submit"
                            style={{
                                left: "50%",
                                bottom: "10px",
                                width: "90%",
                            }}
                            className="btn btn-primary text-white position-absolute translate-middle"
                        >
                            Ingresar
                        </button>
                    </Col>
                    <Col
                        className="bg-primary  rounded-3 m-0 text-center position-relative"
                        md={6}
                    >
                        <div
                            style={{ height: "200px", width: "200px" }}
                            className="bg-white rounded-3 position-absolute translate-middle top-50 start-50 d-flex flex-column justify-content-evenly align-items-center "
                        >
                            <img src={logo} alt="logo" height={35} />
                            <span className="fs-5">Carbosense</span>
                        </div>
                    </Col>
                </Row>
            </form>
        </div>
    );
};

export default Login;
