// Simular dados do servidor
let itemsData = [
  {
    id: 1,
    titulo: "Projeto A",
    descricao: "Descrição do projeto A",
    status: "Em Progresso",
    data: "2026-04-14",
  },
  {
    id: 2,
    titulo: "Projeto B",
    descricao: "Descrição do projeto B",
    status: "Concluído",
    data: "2026-04-10",
  },
  {
    id: 3,
    titulo: "Projeto C",
    descricao: "Descrição do projeto C",
    status: "Pendente",
    data: "2026-04-20",
  },
];

export async function getItems() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(itemsData);
    }, 500);
  });
}

export async function createItem(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItem = {
        ...item,
        id: Math.max(...itemsData.map((i) => i.id)) + 1,
      };
      itemsData.push(newItem);
      resolve(newItem);
    }, 300);
  });
}

export async function deleteItem(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      itemsData = itemsData.filter((item) => item.id !== id);
      resolve({ success: true });
    }, 300);
  });
}

export async function updateItem(id, updatedItem) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = itemsData.findIndex((item) => item.id === id);
      if (index !== -1) {
        itemsData[index] = { ...itemsData[index], ...updatedItem };
        resolve(itemsData[index]);
      }
    }, 300);
  });
}

export async function searchItems(term) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = itemsData.filter(
        (item) =>
          item.titulo.toLowerCase().includes(term.toLowerCase()) ||
          item.descricao.toLowerCase().includes(term.toLowerCase()),
      );
      resolve(results);
    }, 300);
  });
}
