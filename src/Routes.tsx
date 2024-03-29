import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProtectedRoute from './components/ProtectedRoute';  // Use {} para importar se ProtectedRoute for exportado diretamente

import { HellowWorld } from "./pages/HellowWorld";
import { Usuarios } from "./pages/Usuarios";
import { Empresas } from "./pages/Empresas";
import { Lancamentos } from "./pages/Lancamentos";
// import { InserirLancamento } from "./pages/LancamentoInserir";
// import { DeletarLancamento } from "./pages/LacamentoDeletar";
// import { AtualizarLancamento } from "./pages/LancamentoAtualizar";
import { Login } from "./pages/Login";
import { CadastrarUsuario } from "./pages/UsuarioCadastro";
import { EmpresasUsuario } from "./pages/EmpresasUsuario";
import { Home } from "./pages/Home";
import { LancamentosEmpresa } from "./pages/LancamentosEmpresa";
import { InserirLancamentoEmpresa } from "./pages/LancamentoInserirPorEmpresa";
import { AtualizarLancamentoEmpresa } from "./pages/LancamentoAtualizarPorEmpresa";
// import { CriarEmpresa } from "./pages/EmpresaCriar";
import { AtualizarEmpresa } from "./pages/EmpresaAtualizarPorUsuario";
import { DiarioEmpresa } from "./pages/EmpresaDiario";
import { RazaoEmpresa } from "./pages/EmpresaRazao";
import { BalancoEmpresa } from "./pages/EmpresaBalanco";
import { DreEmpresa } from "./pages/EmpresaDRE";

export function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />                
                <Route path="/cadastrarusuario" element={<CadastrarUsuario />} />
                <Route path="/login" element={<Login />} />

                <Route path="/hellow" element={<HellowWorld />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/empresas" element={<Empresas />} />
                {/* <ProtectedRoute path="/lancamentos" element={<Lancamentos />} /> */}
                <Route path="/lancamentos" element={<Lancamentos />} />
                
                {/* <Route path="/inserirlancamento" element={<InserirLancamento />} /> */}
                {/* <Route path="/deletarlancamento" element={<DeletarLancamento />} /> */}
                {/* <Route path="/atualizarlancamento/:id" element={<AtualizarLancamento />} /> */}                
                {/* <Route path="/criarempresa/:userID" element={<CriarEmpresa />} /> */}
                
                {/* <Route path="/atualizarempresa/:id/:userID" element={<AtualizarEmpresa />} /> */}
                <Route path="/atualizarempresa/:id" element={<AtualizarEmpresa />} />                
                {/* <Route path="/minhasempresas/:userID" element={<EmpresasUsuario />} /> */}
                <Route path="/minhasempresas/" element={<EmpresasUsuario />} />
                {/* <Route path="/inserirlancamentoempresa/:fk_id_empresa/:userID" element={<InserirLancamentoEmpresa />} /> */}                
                <Route path="/inserirlancamentoempresa/:fk_id_empresa" element={<InserirLancamentoEmpresa />} />                
                {/* <Route path="/atualizarlancamentoempresa/:id/:fk_id_empresa/:userID" element={<AtualizarLancamentoEmpresa />} /> */}
                <Route path="/atualizarlancamentoempresa/:id/:fk_id_empresa" element={<AtualizarLancamentoEmpresa />} />
                {/* <Route path="/lancamentosempresa/:fk_id_empresa/:userID" element={<LancamentosEmpresa />} /> */}
                <Route path="/lancamentosempresa/:fk_id_empresa" element={<LancamentosEmpresa />} />
                <Route path="/diarioempresa/:fk_id_empresa" element={<DiarioEmpresa />} />
                <Route path="/razaoempresa/:fk_id_empresa" element={<RazaoEmpresa />} />
                <Route path="/balancoempresa/:fk_id_empresa" element={<BalancoEmpresa />} />
                <Route path="/dreempresa/:fk_id_empresa" element={<DreEmpresa />} />
                
                
                
            </Routes>
        </Router>
    )
}