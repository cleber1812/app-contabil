import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HellowWorld } from "./pages/HellowWorld";
import { Usuario } from "./pages/Usuario";
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

export function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/usuarios" element={<Usuario />} />
                <Route path="/hellow" element={<HellowWorld />} />                
                <Route path="/lancamentos" element={<Lancamentos />} />
                <Route path="/inserirlancamento" element={<InserirLancamento />} />
                <Route path="/inserirlancamentoempresa" element={<InserirLancamentoEmpresa />} />
                <Route path="/deletarlancamento" element={<DeletarLancamento />} />
                <Route path="/atualizarlancamento/:id" element={<AtualizarLancamento />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/cadastrarusuario" element={<CadastrarUsuario />} />
                {/* <Route path="/minhasempresas" element={<Dashboard />} /> */}
                <Route path="/minhasempresas/:id" element={<EmpresasUsuario />} />
                <Route path="/lancamentosempresa/:fk_id_empresa" element={<LancamentosEmpresa />} />
            </Routes>
        </Router>
    )
}