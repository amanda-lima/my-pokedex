import { initDatabase } from "./db";
import React, { useEffect } from 'react';
import { AuthProvider } from "./src/context/AuthProvider";
import Routes from "./src/routes/Routes";

export default function App() {

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <AuthProvider>
    <Routes />
    </AuthProvider>
  );
}
