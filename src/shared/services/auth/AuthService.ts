import { Api } from "../api/axios-config";

interface IAuth {
  accessToken: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get("/auth", { data: { email, password } });
    // Isso é apenas para simular uma autenticação de login e senha por causa do json server

    if (data) {
      return data;
    }

    return new Error("Erro ao efetuar login");
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || "Erro ao efetuar login");
  }
};

export const AuthService = {
  auth,
};
