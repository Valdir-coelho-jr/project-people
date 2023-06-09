/* eslint-disable no-restricted-globals */
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { Box, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { pessoaServices } from "../../shared/services/api/pessoas/PessoaServices";

import { CustomTextField, CustomForm, useCustomForm, iCustomFormErrors } from "../../shared/forms";
import { AutoCompleteCidade } from "./components/AutoCompleteCidade";

interface IFormData {
  email: string;
  nomeCompleto: string;
  cidadeId: number;
}

const formValidationSchema = yup.object({
  nomeCompleto: yup.string().required().min(3),
  email: yup.string().required().email(),
  cidadeId: yup.number().required(),
});

export const DetalhesDePessoas: React.FC = () => {
  const { id = "nova-pessoa" } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useCustomForm();

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

          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nomeCompleto: "",
        email: "",
        cidadeId: "",
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    console.log(dados);
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        if (id === "nova-pessoa") {
          pessoaServices.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/pessoas");
              } else navigate(`/pessoas/detalhes/${result}`);
            }
          });
        } else {
          pessoaServices
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate("/pessoas");
                }
              }
            });
        }

        setIsLoading(true);
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: iCustomFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
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
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhes/nova-pessoa")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
      <CustomForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <CustomTextField
                  fullWidth
                  label="Nome Completo"
                  name="nomeCompleto"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <CustomTextField fullWidth label="E-mail" name="email" disabled={isLoading} />
              </Grid>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <AutoCompleteCidade isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CustomForm>
    </LayoutBaseDePagina>
  );
};
