import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

import { Carrinho } from "./pages/Carrinho";
import { Usuario } from "./pages/Usuario";

export function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/usuarios" element={<Usuario />} />
                <Route path="/carrinho" element={<Carrinho />} />                
            </Routes>
        </Router>
    )
}