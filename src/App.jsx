import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home/Home";
import Sobre from "./pages/sobre/Sobre";
import Contatos from "./pages/contatos/Contatos";
import Footer from "./components/footer";
import Saiba from "./pages/saibamais/Saiba";
import Pets from "./pages/meuspets/Pets";
import Loc from "./pages/localizacao/Localizacao";
import Login from "./pages/login/Login";
import MeusPets from "./pages/meuspets/meuspets";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contatos" element={<Contatos />} />
          <Route path="/saiba" element={<Saiba />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/loc" element={<Loc />} />
          <Route path="/login" element={<Login />} />
          <Route path="/meuspets" element={<MeusPets />} />
          
         
          
        </Routes>
     {/* <Footer /> */}
      </div>
    </BrowserRouter>
    
  );
}

export default App;
