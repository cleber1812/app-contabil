import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

import { Carrinho } from "./pages/Carrinho";
import { Usuario } from "./pages/Usuario";
import { Lancamentos } from "./pages/Lancamentos";
import { InserirLancamento } from "./pages/LancamentoInserir";

export function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/usuarios" element={<Usuario />} />
                <Route path="/carrinho" element={<Carrinho />} />                
                <Route path="/lancamentos" element={<Lancamentos />} />
                <Route path="/inserirlancamento" element={<InserirLancamento />} />
            </Routes>
        </Router>
    )
}