import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginMock } from "../authService";
import { useAuth } from "../hooks/useAuth";
import styles from "./Login.module.css";

export default function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await loginMock(email, password);
      console.log("Autenticado com sucesso!", response.user);

      localStorage.setItem("authToken", response.token);
      login(response.user.name, response.user.email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Portal de Acesso</h2>
      <p className={styles.subtitle}>Entre com suas credenciais</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? "Processando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
