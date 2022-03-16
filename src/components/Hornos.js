import "./Hornos.css";
import HornoItem from "./HornoItem";
import { Breadcrumb } from "react-bootstrap";

function Hornos(props) {
  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item active>Inicio</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        {/* mapa para mostrar todos los hornos que tiene el array de hornos */}
        {props.item.map((horno) => (
          <HornoItem
            key={horno.id}
            hornoID={horno.id}
            horno_temperatura={horno.averageTemperature}
            horno_porcentaje={`${Math.round(horno.oxygenPercentage * 100) / 100}%`}
            cycleTime={horno.cycleTime}
          />
        ))}
        <HornoItem
            hornoID={90}
            horno_temperatura={828}
            horno_porcentaje={`2%`}
            cycleTime={new Date()}
          />
          <HornoItem
            hornoID={92}
            horno_temperatura={830}
            horno_porcentaje={`1.7%`}
            cycleTime={new Date()}
          />
        
      </div>
    </div>
  );
}

export default Hornos;
