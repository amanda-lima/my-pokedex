import React, { ReactNode, createContext } from 'react';

interface AuthContextData {
  signed: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [signed, setSigned] = React.useState(false);

  const signIn = async (username: string, password: string) => {
    if (username === 'usuario' && password === 'senha') {
      setSigned(true);
    } else {
      throw new Error('Nome de usuário ou senha incorretos');
    }
  };

  const signOut = () => {
    setSigned(false);
  };

  return (
    <AuthContext.Provider value={{ signed, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
