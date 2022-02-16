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

const App = () => {
  return (
    <div>
        <Routes>
          <Route path ="/dashboard" element={<Dashboard/>}/>
          <Route path ="/graficas" element={<Graphs/>}/>
          <Route path ="/calentamiento" element={<Heating/>}/>
          <Route path ="/carburizado" element={<Carburized/>}/>
          <Route path ="/ecualizacion" element={<Equalization/>}/>
          <Route path ="/difusion" element={<Diffusion/>}/>
          <Route path ="/temple" element={<Hardening/>}/>
        </Routes>
    </div>
  );
};

export default App;
