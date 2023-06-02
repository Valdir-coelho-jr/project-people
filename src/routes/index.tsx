import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, DetalhesDePessoas, ListagemDePessoas } from "../pages";
import { ListagemDeCidades } from "../pages/cidades/ListagemDeCidades";
import { DetalhesDeCidades } from "../pages/cidades/DetalhesDeCidades";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/pagina-inicial",
        label: "Página inicial",
      },
      {
        icon: "location_city",
        path: "/cidades",
        label: "Cidades",
      },
      {
        icon: "people",
        path: "/pessoas",
        label: "Pessoas",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="/pessoas/detalhes/:id" element={<DetalhesDePessoas />} />

      <Route path="/cidades" element={<ListagemDeCidades />} />
      <Route path="/cidades/detalhes/:id" element={<DetalhesDeCidades />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
