import "./Hornos.css";
import HornoItem from "./HornoItem";

function Hornos(props) {
  return (
    <div>
      {/* mapa para mostrar todos los hornos que tiene el array de hornos */}
      {props.item.map((horno) => (
        <HornoItem
          key={horno.id}
          hornoID={horno.id}
          horno_temperatura={horno.averageTemperature}
          horno_porcentaje={`${Math.round(horno.oxygenPercentage  * 100) / 100}%`}
          cycleTime={horno.cycleTime}
        />
      ))}
      {/* <HornoItem
        hornoID={props.item[0].hornoID}
        horno_temperatura={props.item[0].horno_temperatura}
        horno_porcentaje={props.item[0].horno_porcentaje}
        horno_tiempo={props.item[0].horno_tiempo}
      />
      <HornoItem
        hornoID={props.item[1].hornoID}
        horno_temperatura={props.item[1].horno_temperatura}
        horno_porcentaje={props.item[1].horno_porcentaje}
        horno_tiempo={props.item[1].horno_tiempo}
      /> */}
    </div>
  );
}

export default Hornos;
