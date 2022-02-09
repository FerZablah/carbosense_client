import "./HornoItem.css";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";
function Horno(props) {
  const clickHandler = () => {
    // aqui nos vamos a las graficas
    console.log("Funciona");
  };

  return (
    <Container
      onClick={clickHandler}
      type="button"
      className="bg-extra m-3 p-5 w-100 rounded text-center mx-auto"
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
          {moment.utc(props.cycleTime*1000).format('HH:mm:ss')}
        </Col>
      </Row>
    </Container>

    // <button onClick={clickHandler} type="button" className="w-100 text-start p-5">
    //   <span className="p-4 text-start fs- fw-bold bg-info text-white rounded">{props.hornoID}</span>
    //   <div>
    //     <span className="p-4 text-center fs-3 bg-info text-white rounded">Temperatura</span>
    //     <div className="horno_temperatura_dato">{Math.round(props.horno_temperatura)}°C</div>
    //   </div>
    //   <div className="div_procentaje" align="center">
    //     <div className="horno_porcentaje">Porcentaje de Carbono</div>
    //     <span className="horno_porcentaje_dato">{props.horno_porcentaje}</span>
    //   </div>
    //   <div className="div_tiempo" align="center">
    //     <div className="horno_tiempo">Tiempo transcurrido</div>
    //     <span className="horno_tiempo_dato">{props.horno_tiempo}</span>
    //   </div>
    // </button>
  );
}

export default Horno;