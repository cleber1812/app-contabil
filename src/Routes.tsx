import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HellowWorld } from "./pages/HellowWorld";
import { Usuarios } from "./pages/Usuarios";
import { Lancamentos } from "./pages/Lancamentos";
import { InserirLancamento } from "./pages/LancamentoInserir";
import { DeletarLancamento } from "./pages/LacamentoDeletar";
import { AtualizarLancamento } from "./pages/LancamentoAtualizar";
import { Login } from "./pages/Login";
import { CadastrarUsuario } from "./pages/UsuarioCadastro";
import { EmpresasUsuario } from "./pages/EmpresasUsuario";
import { Home } from "./pages/Home";
import { LancamentosEmpresa } from "./pages/LancamentosEmpresa";
import { InserirLancamentoEmpresa } from "./pages/LancamentoInserirPorEmpresa";
import { AtualizarLancamentoEmpresa } from "./pages/LancamentoAtualizarPorEmpresa";
import { CriarEmpresa } from "./pages/EmpresaCriar";

export function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hellow" element={<HellowWorld />} />
                <Route path="/cadastrarusuario" element={<CadastrarUsuario />} />
                <Route path="/login" element={<Login />} />

                <Route path="/usuarios" element={<Usuarios />} />                
                <Route path="/lancamentos" element={<Lancamentos />} />
                <Route path="/inserirlancamento" element={<InserirLancamento />} />                
                <Route path="/deletarlancamento" element={<DeletarLancamento />} />                
                <Route path="/atualizarlancamento/:id" element={<AtualizarLancamento />} />
                
                <Route path="/criarempresa/:userID" element={<CriarEmpresa />} />
                <Route path="/minhasempresas/:userID" element={<EmpresasUsuario />} />
                <Route path="/lancamentosempresa/:fk_id_empresa/:userID" element={<LancamentosEmpresa />} />
                <Route path="/inserirlancamentoempresa/:fk_id_empresa/:userID" element={<InserirLancamentoEmpresa />} />
                <Route path="/atualizarlancamentoempresa/:id/:fk_id_empresa/:userID" element={<AtualizarLancamentoEmpresa />} />
            </Routes>
        </Router>
    )
}