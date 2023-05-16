import { useSearchParams } from "react-router-dom";

import { FerramentasDeListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const ListagemDeCidades: React.FC = () => {
  const [] = useSearchParams();
  return (
    <LayoutBaseDePagina
      titulo="Listagem de Cidades"
      barraDeFerramentas={
        <FerramentasDeListagem
          mostrarInputBusca
          textoBotaoNovo="Nova Cidade"
          textoDaBusca="Teste"
          aoMudarTextoDeBusca={(texto) => console.log(texto)}
        ></FerramentasDeListagem>
      }
    ></LayoutBaseDePagina>
  );
};
