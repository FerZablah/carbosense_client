import "./HornoItem.css";
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
        <Col className="text-black fs-4">ID del horno</Col>
        <Col></Col>
        <Col className="p-2 text-center fs-5 bg-info text-white rounded">
          Temperatura
        </Col>
        <Col></Col>
        <Col className="p-2 text-center fs-5 bg-info text-white rounded">
          Porcentaje de Carbono
        </Col>
        <Col></Col>
        <Col className="p-2 text-center fs-5 bg-info text-white rounded">
          Tiempo transcurrido
        </Col>
      </Row>
      <Row>
        <Col className="p-2 text-center fs-1 fw-bold bg-info text-white rounded">
          {props.hornoID}
        </Col>
        <Col></Col>
        <Col className="p-2 text-center fs-1 fw-bold text-black rounded">
          {Math.round(props.horno_temperatura)}°C
        </Col>
        <Col></Col>
        <Col className="p-2 text-center fs-1 fw-bold text-black rounded">
          {props.horno_porcentaje}
        </Col>
        <Col></Col>
        <Col className="p-2 text-center fs-1 fw-bold text-black rounded">
          {/* se reciben segundos y se cambia al formato */}
          {moment.utc(props.cycleTime * 1000).format("HH:mm:ss")}
        </Col>
      </Row>
    </Container>
  );
}

export default Horno;
