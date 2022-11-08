// import logo from './logo.svg';
import './App.css';
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
          <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
