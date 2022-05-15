import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Horno(props) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/graficas/" + props.hornoID);
  };
  return (
    <Container
      onClick={clickHandler}
      type="button"
      className="bg-extra m-3 p-5 w-100 rounded text-center mx-auto oven-item"
    >
      <Row>
        <span className="p-1 text-center bg-info rounded text-white fs-2 fw-bold w-25">
          ID del Horno: {props.hornoID}{" "}
        </span>
        <Col>
          {
            Math.round(props.horno_temperatura) === 0 ? (
              <span className="p-1 text-center rounded fs-2 fw-bold w-25">
                No hay lecturas para este horno en este momento
              </span>
            ) : (
              <Container className="bg-extra w-100 rounded text-center mx-auto">
                <Row className="text-center fs-5 mt-1">
                  <Col>Temperatura</Col>
                  <Col>Porcentaje de carbono</Col>
                  <Col>Tiempo Transcurrido</Col>
                </Row>
                <Row className="text-center fs-1 fw-bold mt-1">
                  <Col>{Math.round(props.horno_temperatura)}°C</Col>
                  <Col>{props.horno_porcentaje}</Col>
                  <Col>{moment.utc(props.cycleTime * 1000).format("HH:mm:ss")}</Col>
                </Row>
              </Container>
            )
          }
        </Col>
      </Row>
    </Container>
  );
}

export default Horno;
