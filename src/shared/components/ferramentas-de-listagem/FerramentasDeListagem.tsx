import { Box, Button, TextField, Paper, useTheme, Icon } from "@mui/material";

interface IFerramentasDeListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  AoClicarEmNovo?: () => void;
}

export const FerramentasDeListagem: React.FC<IFerramentasDeListagemProps> = ({
  textoDaBusca = "",
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  textoBotaoNovo = "Novo",
  mostrarBotaoNovo = true,
  AoClicarEmNovo,
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
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          placeholder="Pesquisar..."
        ></TextField>
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={AoClicarEmNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
