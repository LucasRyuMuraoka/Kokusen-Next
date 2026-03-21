const BASE_URL = "http://localhost:8080/characters";

export const fetchCharacters = async (query = "") => {
  const url = query ? `${BASE_URL}/search?q=${query}` : BASE_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar personagens");
  return res.json();
};

export const createCharacter = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Erro ao criar");
  }
  return res.json();
};

export const updateCharacter = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar");
  return res.json();
};

export const deleteCharacter = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar");
  return true;
};
