'use client';
import { useState, Suspense, startTransition } from 'react';
import { fetchCharacters, createCharacter, updateCharacter, deleteCharacter } from '../api';
import { CharacterList } from '../components/CharacterList';
import { ErrorState } from '../components/ErrorState';

export default function KokusenApp() {
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ name: '', rank: 'NON_SORCERER', clanName: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  // Promise inicial
  const [charactersPromise, setCharactersPromise] = useState(() => fetchCharacters());

  const refreshData = (query = '') => {
    startTransition(() => {
      setError(null);
      setCharactersPromise(fetchCharacters(query));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCharacter(editingId, formData);
      } else {
        await createCharacter(formData);
      }
      setFormData({ name: '', rank: 'NON_SORCERER', clanName: '' });
      setEditingId(null);
      refreshData(search);
    } catch (err) {
      alert("Erro na operação: " + err.message);
    }
  };

  if (error) return <ErrorState error={error} reset={() => refreshData()} />;

  // Estilo padrão para os inputs
  const inputStyle = "flex-1 min-w-[200px] p-3 bg-white border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-800 placeholder-gray-400 shadow-sm transition-all";

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-black text-indigo-900 mb-2 tracking-tight">KOKUSEN</h1>
          <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 font-medium">Personagens Jujutsu da API Kokusen</p>
        </header>

        {/* Formulário */}
        <section className="bg-white p-8 rounded-2xl shadow-xl mb-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-l-4 border-indigo-600 pl-3">
            {editingId ? 'Editar Feiticeiro' : 'Cadastrar Novo Feiticeiro'}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
            <input
              className={inputStyle}
              placeholder="Ex: Satoru Gojo"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
            <select 
              className={inputStyle}
              value={formData.rank}
              onChange={e => setFormData({...formData, rank: e.target.value})}
            >
              <option value="SPECIAL_GRADE">Special Grade</option>
              <option value="GRADE_1">Grade 1</option>
              <option value="GRADE_2">Grade 2</option>
              <option value="GRADE_3">Grade 3</option>
              <option value="GRADE_4">Grade 4</option>
              <option value="NON_SORCERER">Non-Sorcerer</option>
            </select>
            <input
              className={inputStyle}
              placeholder="Clã (ex: Gojo, Zenin)"
              value={formData.clanName}
              onChange={e => setFormData({...formData, clanName: e.target.value})}
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-indigo-200 transition-all transform active:scale-95">
              {editingId ? 'Atualizar' : 'Salvar Feiticeiro'}
            </button>
            {editingId && (
              <button type="button" onClick={() => {setEditingId(null); setFormData({name:'', rank:'NON_SORCERER', clanName:''})}} className="bg-gray-200 text-gray-600 px-4 py-3 rounded-lg font-bold">Cancelar</button>
            )}
          </form>
        </section>

        {/* Barra de Busca */}
        <div className="flex gap-2 mb-8">
          <input 
            className="flex-1 p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 outline-none shadow-sm text-gray-800" 
            placeholder="Pesquisar por nome do personagem..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && refreshData(search)}
          />
          <button onClick={() => refreshData(search)} className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition shadow-lg">
            Buscar
          </button>
        </div>

        {/* Listagem */}
        <Suspense fallback={<div className="text-center py-20 text-indigo-600 font-bold animate-pulse text-xl">Invocando dados do Reino das Sombras...</div>}>
          <CharacterList 
            charactersPromise={charactersPromise} 
            onEdit={(char) => {
              setEditingId(char.id);
              setFormData({ name: char.name, rank: char.rank, clanName: char.clanName || '' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDelete={async (id) => {
              if(confirm("Deseja eliminar este registro?")) {
                await deleteCharacter(id);
                refreshData(search);
              }
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}