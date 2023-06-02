import { setLocale } from "yup";

setLocale({
  mixed: {
    oneOf: ({ values }) => `Deve ser um dos seguintes valores: ${values}`,
    notOneOf: ({ values }) => `Não pode ser um dos seguintes valores: ${values}`,
    default: "O campo não é válido",
    required: "Este campo é obrigatório",
    defined: "Este campo precisa ter um valor definido",
    notType: "Formato digitado é invalido",
  },
  string: {
    length: ({ length }) => `Deve ter exatamente ${length} caracteres`,
    min: ({ min }) => `O campo deve ter pelo menos ${min} caracteres`,
    max: ({ max }) => `O campo deve ter no máximo ${max} caracteres`,
    matches: ({ regex }) => `O valor deve corresponder ao padrão: ${regex}`,
    email: "Formato de e-mail digitado não é valido",
    url: "Deve ter um formato de URL válida",
    trim: "Não deve conter espaços no início ou no fim.",
    lowercase: "Deve estar em maiúsculo",
    uppercase: "Deve estar em minúsculo",
    uuid: "Valor digitado não confere a um UUID valido",
  },
  number: {
    min: ({ min }) => `Deve ser no mínimo ${min}`,
    max: ({ max }) => `Deve ser no máximo ${max}`,
    lessThan: ({ less }) => `Deve ser menor que ${less}`,
    moreThan: ({ more }) => `Deve ser maior que ${more}`,
    positive: "Deve ser um número posítivo",
    negative: "Deve ser um número negativo",
    integer: "Deve ser um número inteiro",
  },
  date: {
    min: ({ min }) => `Deve ser maior que a data ${min}`,
    max: ({ max }) => `Deve ser menor que a data ${max}`,
  },
  array: {
    min: ({ min }) => `Deve ter no mínimo ${min} itens`,
    max: ({ max }) => `Deve ter no máximo ${max} itens`,
    length: ({ length }) => `Deve conter exatamente ${length} itens`,
  },
  object: {
    noUnknown: "Deve ser passado um valor definido",
  },
  boolean: {},
});
