import { Row, Col } from "react-bootstrap";
import logo from "../logo.png";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";

const ResetPassword = () => {
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    const signIn = async () => {
        if (password.length < 6) {
            toast.error("El contraseña es muy corta");
            return;
        } else if (password !== passwordConfirm) {
            toast.error("Las contraseñas no coinciden");
            return;
        }
        try {
            const resPassword = await axios.post(
                `${BASE_URL}/user/restore/password`,
                {
                    token: params.token,
                    password,
                }
            );

            const res = await axios.post(`${BASE_URL}/user/login`, {
                payrollId: resPassword.data.payrollId,
                password,
            });
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/");
        } catch (error) {
            toast.error(
                "Hubo un error al cambiar la contraseña, intente de nuevo"
            );
        }
    };
    return (
        <div
            className="container bg-white shadow-sm rounded-3 position-absolute translate-middle top-50 start-50 w-50 h-50"
            style={{ minHeight: "400px" }}
        >
            <Row className="h-100">
                <Col
                    className="position-relative rounded-3 p-4 m-0 h-100"
                    md={6}
                >
                    <span className="fs-3">Cambiar contraseña</span>
                    <div className="mb-3 mt-3">
                        <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                        >
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="password"
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                        >
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className="form-control"
                            id="passwordConfirm"
                        />
                        <p>
                            <small>
                                Recuerda que la contraseña es de al menos 6
                                carácteres
                            </small>
                        </p>
                    </div>
                    <button
                        type="submit"
                        onClick={signIn}
                        style={{
                            left: "50%",
                            bottom: "10px",
                            width: "90%",
                        }}
                        className="btn btn-primary text-white position-absolute translate-middle"
                    >
                        Guardar contraseña
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
        </div>
    );
};

export default ResetPassword;
