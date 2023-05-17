/* eslint-disable no-restricted-globals */
import { useNavigate, useParams } from "react-router-dom";

import { LinearProgress, TextField } from "@mui/material";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState, useRef } from "react";
import { pessoaServices } from "../../shared/services/api/pessoas/PessoaServices";

import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import { CustomTextField } from "../../shared/forms";

interface IFormData {
  email: string;
  nomeCompleto: string;
  cidadeId: number;
}

export const DetalhesDePessoas: React.FC = () => {
  const { id = "nova-pessoa" } = useParams<"id">();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova-pessoa") {
      setIsLoading(true);
      pessoaServices.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          console.log(result);
        }
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    if (id === "nova-pessoa") {
      pessoaServices.create(dados);
    } else {
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      pessoaServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova-pessoa" ? "Nova Pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova Pessoa"
          mostrarBotaoSalvar
          mostrarBotaoApagar={id !== "nova-pessoa"}
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova-pessoa"}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhes/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <CustomTextField placeholder="Nome Completo" name="nomeCompleto" />
        <CustomTextField placeholder="E-mail" name="email" />
        <CustomTextField placeholder="Cidade id" name="cidadeId" />
      </Form>
    </LayoutBaseDePagina>
  );
};
