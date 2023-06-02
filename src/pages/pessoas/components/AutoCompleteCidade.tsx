import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { cidadesServices } from "../../../shared/services/api/cidades/CidadesServices";
import { useDebouce } from "../../../shared/hooks";
import { useField } from "@unform/core";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField("cidadeId");
  const { debounce } = useDebouce();
  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      cidadesServices.getAll(1 /*busca */).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          //alert(result.message);
        } else {
          console.log(result);

          setOpcoes(result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome })));
        }
      });
    });
  }, [busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);
    if (!selectedId) return null;

    return selectedOption;
  }, [selectedId, opcoes]);

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem Opções"
      loadingText="Carregando..."
      disablePortal
      value={autoCompleteSelectedOption}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28} /> : undefined}
      onInputChange={(_, newValue) => setBusca(newValue)}
      options={opcoes}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca("");
        clearError();
      }}
      renderInput={(params) => (
        <TextField {...params} label="Cidade" error={!!error} helperText={error} />
      )}
    />
  );
};
