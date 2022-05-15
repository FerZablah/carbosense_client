import HornoItem from "./HornoItem";
import { Breadcrumb } from "react-bootstrap";

const Ovens = (props) => {
    return (
        <div>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item active>Inicio</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                {props.item.length === 0 && (
                    <div className="text-center">
                        <h1>No hay hornos registrados</h1>
                    </div>
                )}
                {/* mapa para mostrar todos los hornos que tiene el array de hornos */}
                {props.item.map((horno) => (
                    <HornoItem
                        key={horno.id}
                        hornoID={horno.id}
                        horno_temperatura={horno.averageTemperature}
                        horno_porcentaje={`${Math.round(horno.oxygenPercentage * 100) / 100
                            }%`}
                        cycleTime={horno.cycleTime}
                    />
                ))}
            </div>
        </div>
    );
};

export default Ovens;
