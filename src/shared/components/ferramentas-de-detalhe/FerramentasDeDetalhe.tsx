import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from "@mui/material";

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEFechar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEFecharCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEFechar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = "Novo",

  mostrarBotaoNovo = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoSalvarEFechar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoSalvarEFecharCarregando = false,

  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEFechar,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      paddingX={2}
      padding={1}
      gap={1}
      display="flex"
      alignItems="center"
      component={Paper}
    >
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          Salvar
        </Button>
      )}

      {mostrarBotaoSalvarCarregando && <Skeleton width={109} height={61} />}

      {mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvarEFechar}
        >
          Salvar e Voltar
        </Button>
      )}

      {mostrarBotaoSalvarEFecharCarregando && <Skeleton width={177.5} height={60.2} />}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          Apagar
        </Button>
      )}

      {mostrarBotaoApagarCarregando && <Skeleton width={111.8} height={60.2} />}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmNovo}
        >
          {textoBotaoNovo}
        </Button>
      )}

      {mostrarBotaoNovoCarregando && <Skeleton width={95.3} height={60.2} />}

      <Divider variant="middle" orientation="vertical" />

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClicarEmVoltar}
        >
          Voltar
        </Button>
      )}

      {mostrarBotaoVoltarCarregando && <Skeleton width={108.5} height={60.2} />}
    </Box>
  );
};
