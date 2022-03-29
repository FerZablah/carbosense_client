import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import Ovens from "./components/Ovens";
import Unauthorized from "./components/Unauthorized";
import Recipe from "./components/Recipe";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";

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
        <div>
            <div>
                <Toaster />
            </div>
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
                            <Alerts />
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
                    path="/seleccion"
                    element={
                        <ProtectedRoute authorized={["oven_operator"]}>
                            <TopBar />
                            <Ovens />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recetas"
                    element={
                        <ProtectedRoute authorized={["oven_operator"]}>
                            <TopBar />
                            <Recipe />
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
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;
