import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Graphs from "./components/Graphs";
import Summary from "./components/Summary";
import Reports from "./components/Reports";
import moment from "moment";
import Alerts from "./components/Alerts";
import ReportPhase from "./components/ReportPhase";
import { Toaster } from "react-hot-toast";
import DashboardPhase from "./components/DashboardPhase";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import TopBar from "./components/TopBar";
import Ovens from "./components/Ovens";

//libreria para manejar fechas y horas.
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

      <div><Toaster /></div>
      <Routes>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TopBar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/graficas/:id"
          element={
            <ProtectedRoute>
              <TopBar />
              <Graphs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/graficas/:fase/horno/:horno"
          element={
            <ProtectedRoute>
              <TopBar />
              <DashboardPhase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alertas"
          element={
            <ProtectedRoute>
              <TopBar />
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportes"
          element={
            <ProtectedRoute>
              <TopBar />
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportes/:ciclo"
          element={
            <ProtectedRoute>
              <TopBar />
              <Summary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportes/ciclo/:ciclo/fase/:fase"
          element={
            <ProtectedRoute>
              <TopBar />
              <ReportPhase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seleccion"
          element={
            <ProtectedRoute>
              <TopBar />
              <Ovens />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
