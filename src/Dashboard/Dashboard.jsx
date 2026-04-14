import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getItems,
  deleteItem,
  searchItems,
} from "../services/dashboardService";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { userName, logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
      setFilteredItems(data);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
      return;
    }
    const results = await searchItems(searchTerm);
    setFilteredItems(results);
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja deletar?")) {
      await deleteItem(id);
      await loadItems();
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>CRUD - {userName}</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Sair
        </button>
      </header>

      <div className={styles.main}>
        <div className={styles.controls}>
          <button className={styles.btnAdd}>+ Adicionar</button>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Filtro"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleFilter} className={styles.btnFilter}>
              Filtrar
            </button>
          </div>
        </div>

        {loading ? (
          <p className={styles.loading}>Carregando...</p>
        ) : filteredItems.length === 0 ? (
          <p className={styles.empty}>Nenhum item encontrado</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.titulo}</td>
                  <td>{item.descricao}</td>
                  <td>{item.status}</td>
                  <td>{item.data}</td>
                  <td className={styles.actions}>
                    <button className={styles.btnInfo}>Info</button>
                    <button className={styles.btnEdit}>Atualizar</button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className={styles.btnDelete}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
