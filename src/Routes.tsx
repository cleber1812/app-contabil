import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

import { Carrinho } from "./pages/Carrinho";
import { Usuario } from "./pages/Usuario";
import { Lancamentos } from "./pages/Lancamentos";
import { InserirLancamento } from "./pages/LancamentoInserir";
import { DeletarLancamento } from "./pages/LacamentoDeletar";
import { AtualizarLancamento } from "./pages/LancamentoAtualizar";
import { Login } from "./pages/Login";
import { Home } from "./pages/home";
import { CadastrarUsuario } from "./pages/UsuarioCadastro";
import { Dashboard } from "./pages/Dashboard";

export function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/usuarios" element={<Usuario />} />
                <Route path="/carrinho" element={<Carrinho />} />                
                <Route path="/lancamentos" element={<Lancamentos />} />
                <Route path="/inserirlancamento" element={<InserirLancamento />} />
                <Route path="/deletarlancamento" element={<DeletarLancamento />} />
                <Route path="/atualizarlancamento/:id" element={<AtualizarLancamento />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/cadastrarusuario" element={<CadastrarUsuario />} />
                <Route path="/minhasempresas" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}