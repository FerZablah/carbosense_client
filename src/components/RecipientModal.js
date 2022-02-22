import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import emailValidator from "email-validator";
import 'react-phone-input-2/lib/bootstrap.css'
import es from 'react-phone-input-2/lang/es.json'

const RecipientModal = ({ show, onHide, onSubmit, recipient }) => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("52");
    const [mediums, setMediums] = useState(new Set());

    useEffect(() => {
        if (recipient) {
            setName(recipient.name);
            setPhone(recipient.phone);
            setEmail(recipient.email);
            setCountryCode(recipient.countryCode);
            setMediums(new Set(recipient.mediums.map(medium => medium.name)));
        }
    }, [recipient])

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar recipiente</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Container
                    className="m-2 p-3 w-full mx-auto rounded"
                >
                    <Row>
                        <Col className="text-body fs-5">Nombre</Col>
                    </Row>
                    <Row>
                        <Col>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br></br>
                        </Col>
                        <Row>
                            <Col className="text-body fs-5">Teléfono</Col>
                        </Row>
                        <Row>
                            <Col>
                                <PhoneInput
                                    country={"mx"}
                                    localization={es}
                                    value={`${countryCode}${phone}`}
                                    onChange={(value, country) => {
                                        setPhone(value.substring(country.dialCode.length));
                                        setCountryCode(country.dialCode)
                                    }}
                                    countryCodeEditable={false}
                                />
                                <br></br>
                            </Col>
                            <Row>
                                <Col className="text-body fs-5">Correo electrónico</Col>
                            </Row>
                            <Col>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <br></br>
                            </Col>
                            <Row>
                                <Col className="text-body fs-5">Medios de contacto</Col>
                            </Row>
                            <Col>
                                <div>
                                    <input className="m-1" type="checkbox" id="whatsapp" name="whatsapp" checked={mediums.has('whatsapp')} onChange={(e) => {
                                        const newMediums = new Set(mediums);
                                        if (e.target.checked) {
                                            newMediums.add('whatsapp');
                                        }
                                        else {
                                            newMediums.delete('whatsapp');
                                        }
                                        setMediums(newMediums);

                                    }} />
                                    <label htmlFor="scales">Whatsapp</label>
                                </div>
                                <div>
                                    <input className="m-1" type="checkbox" id="email" name="email" checked={mediums.has('email')} onChange={(e) => {
                                        const newMediums = new Set(mediums);
                                        if (e.target.checked) {
                                            newMediums.add('email');
                                        }
                                        else {
                                            newMediums.delete('email');
                                        }
                                        setMediums(newMediums);

                                    }} />
                                    <label htmlFor="scales">Correo electrónico</label>
                                </div>
                                <div>
                                    <input className="m-1" type="checkbox" id="sms" name="sms" checked={mediums.has('sms')} onChange={(e) => {
                                        const newMediums = new Set(mediums);
                                        if (e.target.checked) {
                                            newMediums.add('sms');
                                        }
                                        else {
                                            newMediums.delete('sms');
                                        }
                                        setMediums(newMediums);

                                    }} />
                                    <label htmlFor="scales">SMS</label>
                                </div>
                            </Col>
                        </Row>
                    </Row>
                </Container>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="primary" onClick={() => {
                    if(name.length < 2){
                        toast.error("El nombre debe contener al menos 2 caracteres");
                        return;
                    }

                    if(phone.length < 10){
                        toast.error("El número de teléfono debe contener al menos 10 caracteres");
                        return;
                    }
                    if(!emailValidator.validate(email)){
                        toast.error("El correo electrónico no es válido");
                        return;
                    }
                    onSubmit({
                        id: recipient ? recipient.id : null,
                        name,
                        countryCode,
                        phone,
                        email,
                        mediums
                    });
                    onHide();
                }}>Agregar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RecipientModal;
