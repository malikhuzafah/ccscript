import "./App.css";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      {/* <div className="background"> */}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
