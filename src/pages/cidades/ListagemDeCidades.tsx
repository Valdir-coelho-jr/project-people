/* eslint-disable no-restricted-globals */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  LinearProgress,
  Pagination,
  IconButton,
  Icon,
} from "@mui/material";

import { useMemo, useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { FerramentasDeListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  IListagemCidade,
  cidadesServices,
} from "../../shared/services/api/cidades/CidadesServices";
import { useDebouce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";

export const ListagemDeCidades: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebouce();
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get("pagina") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      cidadesServices.getAll(pagina, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [busca, pagina]);

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      cidadesServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => {
            return [...oldRows.filter((oldRow) => oldRow.id !== id)];
          });
          alert("Registro apagado com sucesso!");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo="Listagem de Cidades"
      barraDeFerramentas={
        <FerramentasDeListagem
          mostrarInputBusca
          textoBotaoNovo="Nova Cidade"
          textoDaBusca={searchParams.get("busca") ?? ""}
          aoMudarTextoDeBusca={(texto) =>
            setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
          }
          AoClicarEmNovo={() => navigate("/cidades/detalhes/nova-cidade")}
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableCell>Ações</TableCell>
              </TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell size="small">
                  <IconButton size="small">
                    <Icon onClick={() => handleDelete(row.id)}>delete</Icon>
                  </IconButton>
                  <IconButton size="small">
                    <Icon onClick={() => navigate(`/cidades/detalhes/${row.id}`)}>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && <caption>{Environment.LISTAGEM_VAZIA}</caption>}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate"></LinearProgress>
                </TableCell>
              </TableRow>
            )}
            {totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    shape="rounded"
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(e, newPage) =>
                      setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
