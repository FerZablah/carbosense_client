import "./App.css";
import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Graphs from "./components/Graphs";
import Summary from "./components/Summary";
import Reports from "./components/Reports";
import moment from "moment";
import ReportPhase from "./components/ReportPhase";
import { Toaster } from "react-hot-toast";
import DashboardPhase from "./components/DashboardPhase";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import TopBar from "./components/TopBar";
import ResetPassword from "./components/ResetPassword";
import Unauthorized from "./components/Unauthorized";

import OvenAdministrationOperator from "./components/OvenAdministrationOperator";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import Ovens from "./components/Ovens";
import AlertRecipients from "./components/AlertRecipients";
import MetallurgyReport from "./components/MetallurgyReport";
import MetallurgyReports from "./components/MetallurgyReports";
import MetallurgyReportsAuthorization from "./components/MetallurgyReportsAuthorization";
import MetallurgyReportAuthorization from "./components/MetallurgyReportAuthorization";
import OvenSelectionOperator from "./components/OvenSelectionOperator";
import OvenAdministration from "./components/OvenAdministration";
import SystemSettings from "./components/SystemSettings";

//libreria para manejar fechas y horas.
moment.locale("es", {
    months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
        "_"
    ),
    monthsShort: "Enero_Feb_Mar_Abr_May_Jun_Jul_Ago_Sept_Oct_Nov_Dec".split(
        "_"
    ),
    weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
    weekdaysShort: "Dom_Lun_Mar_Mie._Jue_Vier_Sab".split("_"),
    weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
});

const App = () => {

    return (

        <HashRouter>
            <div>
                {/* <div>
                    <Toaster />
                </div> */}
                <Routes>
                    <Route
                        path="/unauthorized"
                        element={
                            <div>
                                <TopBar />
                                <Unauthorized />
                            </div>
                        }
                    />
                    <Route path="/user/new/:token" element={<ResetPassword />} />
                    <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                authorized={[
                                    "admin",
                                    "metallurgy",
                                    "oven_operator",
                                    "qa",
                                ]}
                            >
                                <TopBar />
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/graficas/:id"
                        element={
                            <ProtectedRoute
                                authorized={[
                                    "admin",
                                    "metallurgy",
                                    "oven_operator",
                                    "qa",
                                ]}
                            >
                                <TopBar />
                                <Graphs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/graficas/:fase/horno/:horno"
                        element={
                            <ProtectedRoute
                                authorized={[
                                    "admin",
                                    "metallurgy",
                                    "oven_operator",
                                    "qa",
                                ]}
                            >
                                <TopBar />
                                <DashboardPhase />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/alertas"
                        element={
                            <ProtectedRoute authorized={["admin"]}>
                                <TopBar />
                                <AlertRecipients />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reportes"
                        element={
                            <ProtectedRoute authorized={["metallurgy", "qa"]}>
                                <TopBar />
                                <Reports />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reportes/:ciclo"
                        element={
                            <ProtectedRoute authorized={["metallurgy", "qa"]}>
                                <TopBar />
                                <Summary />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reportes/ciclo/:ciclo/fase/:fase"
                        element={
                            <ProtectedRoute authorized={["metallurgy", "qa"]}>
                                <TopBar />
                                <ReportPhase />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/seleccion-recetas/:ovenId"
                        element={
                            <ProtectedRoute authorized={["oven_operator"]}>
                                <TopBar />
                                <OvenAdministrationOperator />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/seleccion-recetas"
                        element={
                            <ProtectedRoute authorized={["oven_operator"]}>
                                <TopBar />
                                {/* RENOMBRAR A OvenSelectionOperator*/}
                                <OvenSelectionOperator />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/usuarios"
                        element={
                            <ProtectedRoute authorized={["admin"]}>
                                <TopBar />
                                <Users />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/perfil"
                        element={
                            <ProtectedRoute
                                authorized={[
                                    "oven_operator",
                                    "qa",
                                    "admin",
                                    "metallurgy",
                                ]}
                            >
                                <TopBar />
                                <UserProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/metalurgica/:cycleId"
                        element={
                            <ProtectedRoute authorized={["metallurgy"]}>
                                <TopBar />
                                <MetallurgyReport />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/metalurgica"
                        element={
                            <ProtectedRoute authorized={["metallurgy"]}>
                                <TopBar />
                                <MetallurgyReports />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/metalurgica/autorizacion"
                        element={
                            <ProtectedRoute authorized={["qa"]}>
                                <TopBar />
                                <MetallurgyReportsAuthorization />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/metalurgica/autorizacion/:cycleId"
                        element={
                            <ProtectedRoute authorized={["qa"]}>
                                <TopBar />
                                <MetallurgyReportAuthorization />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/administracionHornos"
                        element={
                            <ProtectedRoute authorized={["admin"]}>
                                <TopBar />
                                <OvenAdministration />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute authorized={["admin"]}>
                                <TopBar />
                                <SystemSettings />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </HashRouter>

    );
};

export default App;
