import "./App.css";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Graphs from "./components/Graphs";
import Heating from "./components/Heating";
import Carburized from "./components/Carburized";
import Equalization from "./components/Equalization";
import Diffusion from "./components/Diffusion";
import Hardening from "./components/Hardening";
import moment from "moment";
import Test from "./components/DashboardChart";

moment.locale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero_Feb_Mar_Abr_May_Jun_Jul_Ago_Sept_Oct_Nov_Dec'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom_Lun_Mar_Mie._Jue_Vier_Sab'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
}
);

const App = () => {
  return (
    <div>
        <div className="w-100 p-2 bg-primary text-end text-white">@usuario</div>        
        <Routes>
          <Route path ="/" element={<Dashboard/>}/>
          <Route path ="/graficas/:id" element={<Graphs/>}/>
          <Route path ="/calentamiento" element={<Heating/>}/>
          <Route path ="/carburizado" element={<Carburized/>}/>
          <Route path ="/ecualizacion" element={<Equalization/>}/>
          <Route path ="/difusion" element={<Diffusion/>}/>
          <Route path ="/temple" element={<Hardening/>}/>
          <Route path ="/test" element={<Test/>}/>

        </Routes>
    </div>
  );
};

export default App;
