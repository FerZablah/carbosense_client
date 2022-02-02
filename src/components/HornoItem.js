import "./HornoItem.css";
import moment from 'moment';

function Horno (props){
  const clickHandler = () => {
    // aqui nos vamos a las graficas
    console.log("Funciona");
  };
  const formattedTime = moment.utc(props.cycleTime*1000).format('HH:mm:ss');
  return (
    <button onClick={clickHandler} className="horno">
      <div className="horno_id">{props.hornoID}</div>
      <div className="div_temperatura" align="center">
        <div className="horno_temperatura">Temperatura</div>
        <div className="horno_temperatura_dato">{Math.round(props.horno_temperatura)}°C</div>
      </div>
      <div className="div_procentaje" align="center">
        <div className="horno_porcentaje">Porcentaje de Carbono</div>
        <span className="horno_porcentaje_dato">{props.horno_porcentaje}</span>
      </div>
      <div className="div_tiempo" align="center">
        <div className="horno_tiempo">Tiempo transcurrido</div>
        <span className="horno_tiempo_dato">{formattedTime}</span>
      </div>
    </button>
  );
}

export default Horno;
