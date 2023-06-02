/* eslint-disable no-restricted-globals */
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { Box, Grid, LinearProgress, Paper, TextField, Typography } from "@mui/material";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useEffect, useState } from "react";
import { cidadesServices } from "../../shared/services/api/cidades/CidadesServices";

import { CustomTextField, CustomForm, useCustomForm, iCustomFormErrors } from "../../shared/forms";

interface IFormData {
  nome: string;
}

const formValidationSchema = yup.object({
  nome: yup.string().required().min(3),
});

export const DetalhesDeCidades: React.FC = () => {
  const { id = "nova-cidade" } = useParams<"id">();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useCustomForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  useEffect(() => {
    if (id !== "nova-cidade") {
      setIsLoading(true);
      cidadesServices.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/cidades");
        } else {
          setNome(result.nome);

          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: "",
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        if (id === "nova-cidade") {
          cidadesServices.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSaveAndClose()) {
                navigate("/cidades");
              } else navigate(`/cidades/detalhes/${result}`);
            }
          });
        } else {
          cidadesServices
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate("/cidades");
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
      cidadesServices.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/cidades");
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova-cidade" ? "Nova Cidade" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova Cidade"
          mostrarBotaoSalvar
          mostrarBotaoApagar={id !== "nova-cidade"}
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "nova-cidade"}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/cidades/detalhes/nova-cidade")}
          aoClicarEmVoltar={() => navigate("/cidades")}
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
                  label="Nome"
                  name="nome"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CustomForm>
    </LayoutBaseDePagina>
  );
};
