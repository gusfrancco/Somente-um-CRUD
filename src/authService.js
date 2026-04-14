export const loginMock = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Credenciais de teste do administrador
      if (email === "admin@gmail.com" && password === "admin123") {
        resolve({
          token: "fake-jwt-token-123456789",
          user: {
            id: 1,
            name: "Administrador",
            email: "admin@gmail.com",
          },
        });
      } else {
        reject(
          new Error("E-mail ou senha incorretos. Verifique suas credenciais."),
        );
      }
    }, 1500);
  });
};
