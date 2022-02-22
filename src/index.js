import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import "./custom.scss";
import moment from "moment";
ReactDOM.render(
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={ <App /> }>
          </Route>
        </Routes>
      </BrowserRouter>,
    document.getElementById('root')
  );
