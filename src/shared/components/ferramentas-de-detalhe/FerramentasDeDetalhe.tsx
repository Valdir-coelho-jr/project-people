import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

export const FerramentasDeDetalhe: React.FC = () => {
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
      <Button color="primary" variant="contained" disableElevation startIcon={<Icon>save</Icon>}>
        Salvar
      </Button>
      <Button color="primary" variant="outlined" disableElevation startIcon={<Icon>save</Icon>}>
        Salvar e Voltar
      </Button>
      <Button color="primary" variant="outlined" disableElevation startIcon={<Icon>delete</Icon>}>
        Apagar
      </Button>
      <Button color="primary" variant="outlined" disableElevation startIcon={<Icon>add</Icon>}>
        Novo
      </Button>

      <Divider variant="middle" orientation="vertical" />

      <Button
        color="primary"
        variant="outlined"
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}
      >
        Voltar
      </Button>
    </Box>
  );
};
