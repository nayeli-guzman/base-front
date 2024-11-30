import { createContext, ReactNode, useContext } from "react";
import { LoginRequest } from "../dtos/Auth/LoginRequest";
import { RegisterRequest } from "../dtos/Auth/RegisterRequest";
import { login } from "../services/AuthService/Login";
import { register } from "../services/AuthService/Signup";
import { useStorageState } from "../hooks/useStorageState";
import { axiosClient } from "../App";

interface AuthContextType {
  register: (request: RegisterRequest) => Promise<void>;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
  //setSession: (value: string) => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function loginHandler(
  loginRequest: LoginRequest,
  setSession: (value: string | null) => void,
) {
  setSession(null);
  const response = await login(loginRequest);
  setSession(response.token);
  //localStorage.setItem("authsession", response.data.session);
}

async function signupHandler(signupRequest: RegisterRequest) {
  await register(signupRequest);
}

export function AuthProvider(props: { children: ReactNode }) {
  const [[isLoading, session], setSession] = useStorageState("session");
  console.log("session: ", session);
  if (session) {
    axiosClient.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${session}`;
        console.log("TOKEN");
        console.log(session);
        return config;
      },
      (error) => Promise.reject(error),
    );

    /*
		Api.getInstance().then((api) => {
			api.authorization = session;
		});*/
  }

  return (
    <AuthContext.Provider
      value={{
        register: (signupRequest) => signupHandler(signupRequest),
        login: (loginRequest) => loginHandler(loginRequest, setSession),
        logout: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
