import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProtectedRoute from './components/ProtectedRoute';  // Use {} para importar se ProtectedRoute for exportado diretamente

import { HellowWorld } from "./pages/0HellowWorld";
import { Usuarios } from "./pages/0Usuarios";
import { Empresas } from "./pages/0Empresas";
import { Lancamentos } from "./pages/0Lancamentos";
// import { InserirLancamento } from "./pages/1LancamentoInserir";
// import { DeletarLancamento } from "./pages/1LacamentoDeletar";
// import { AtualizarLancamento } from "./pages/1LancamentoAtualizar";
// import { CriarEmpresa } from "./pages/1EmpresaCriar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { CadastrarUsuario } from "./pages/UsuarioCadastro";
import { EmpresasUsuario } from "./pages/EmpresasUsuario";
import { AtualizarEmpresa } from "./pages/EmpresaAtualizarPorUsuario";
// import { LancamentosEmpresa } from "./pages/LancamentosEmpresa";
import { LancamentosEmpresaPP } from "./pages/LancamentosEmpresaPP";
import { InserirLancamentoEmpresa } from "./pages/LancamentoInserirPorEmpresa";
import { AtualizarLancamentoEmpresa } from "./pages/LancamentoAtualizarPorEmpresa";
import { DiarioEmpresa } from "./pages/EmpresaDiario";
import { RazaoEmpresa } from "./pages/EmpresaRazao";
import { BalancoEmpresa } from "./pages/EmpresaBalanco";
import { DreEmpresa } from "./pages/EmpresaDRE";
import { MeusDados } from "./pages/MeusDados";

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

                <Route path="/meusdados" element={<MeusDados />} />
                
                {/* <Route path="/atualizarempresa/:id/:userID" element={<AtualizarEmpresa />} /> */}
                <Route path="/atualizarempresa/:id" element={<AtualizarEmpresa />} />                
                {/* <Route path="/minhasempresas/:userID" element={<EmpresasUsuario />} /> */}
                <Route path="/minhasempresas/" element={<EmpresasUsuario />} />
                {/* <Route path="/inserirlancamentoempresa/:fk_id_empresa/:userID" element={<InserirLancamentoEmpresa />} /> */}                
                <Route path="/inserirlancamentoempresa/:fk_id_empresa" element={<InserirLancamentoEmpresa />} />                
                {/* <Route path="/atualizarlancamentoempresa/:id/:fk_id_empresa/:userID" element={<AtualizarLancamentoEmpresa />} /> */}
                <Route path="/atualizarlancamentoempresa/:id/:fk_id_empresa" element={<AtualizarLancamentoEmpresa />} />
                {/* <Route path="/lancamentosempresa/:fk_id_empresa/:userID" element={<LancamentosEmpresa />} /> */}
                {/* <Route path="/lancamentosempresa/:fk_id_empresa" element={<LancamentosEmpresa />} /> */}
                <Route path="/lancamentosempresa/:fk_id_empresa" element={<LancamentosEmpresaPP />} />
                <Route path="/diarioempresa/:fk_id_empresa" element={<DiarioEmpresa />} />
                <Route path="/razaoempresa/:fk_id_empresa" element={<RazaoEmpresa />} />
                <Route path="/balancoempresa/:fk_id_empresa" element={<BalancoEmpresa />} />
                <Route path="/dreempresa/:fk_id_empresa" element={<DreEmpresa />} />
                
                
                
            </Routes>
        </Router>
    )
}