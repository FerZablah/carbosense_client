import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Graphs from "./components/Graphs";
import Heating from "./components/Heating";
import Carburized from "./components/DashboardPhase";
import Equalization from "./components/Equalization";
import Diffusion from "./components/Diffusion";
import Hardening from "./components/Hardening";
import Summary from "./components/Summary";
import Reports from "./components/Reports";
import moment from "moment";
import Alerts from "./components/Alerts";
import ReportPhase from "./components/ReportPhase";
import { Toaster } from "react-hot-toast";
import DashboardPhase from "./components/DashboardPhase";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import logo from './logo.png';

moment.locale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero_Feb_Mar_Abr_May_Jun_Jul_Ago_Sept_Oct_Nov_Dec'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom_Lun_Mar_Mie._Jue_Vier_Sab'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
}
);

const App = () => {
  const [openedMenu, setOpenedMenu] = useState(false);

  return (
    <div>
      <div id="mySidenav" style={{ width: openedMenu ? 250 : 0 }} className="sidenav">
        
        <span className="logo" > 
          <img src={logo} alt="logo" height={30} />
        </span>

        <span className="closebtn text-white" style={{ mouse: 'pointer' }} onClick={() => setOpenedMenu(false)}>&times;</span>
        <a href="/">Inicio</a>
        <a href="/">Reportes</a>
        <a href="/alertas">Configuración alertas</a>
      </div>
      <Row className="justify-content-between bg-primary ">
        <Col md={4}>
          <span style={{ fontSize: '30px', cursor: 'pointer' }} className="text-white mx-3" onClick={() => setOpenedMenu(true)}>&#9776;</span>
        </Col>
        <Col md={2}>
          <div className="d-flex justify-content-center  align-items-center h-100">
            <BsPersonCircle size="30" className="ms-3 text-white mx-2" />
            <span className="text-white">@Zablah</span>
          </div>
        </Col>
      </Row>

      <div><Toaster /></div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/graficas/:id" element={<Graphs />} />
        <Route path="/graficas/:fase/horno/:horno" element={<DashboardPhase />} />
        <Route path="/alertas" element={<Alerts />} />
      </Routes>
        <div className="w-100 p-2 bg-primary text-end text-white">@usuario</div>      
        <div><Toaster/></div>  
        <Routes>
          <Route path ="/" element={<Dashboard/>}/>
          <Route path ="/graficas/:id" element={<Graphs/>}/>
          <Route path ="/graficas/:fase/horno/:horno" element={<DashboardPhase/>}/>
          <Route path ="/alertas" element={<Alerts/>}/>
          <Route path = "/resumen" element={<Summary/>}/>
          <Route path = "/reportes" element={<Reports/>}/>
          <Route path = "/reporte/fase" element={<ReportPhase/>}/>
        </Routes>
    </div>
  );
};

export default App;
