import { use } from 'react';

export function CharacterList({ charactersPromise, onEdit, onDelete }) {
  const data = use(charactersPromise);
  
  const list = Array.isArray(data) ? data : (data.characters || []);

  if (list.length === 0) {
    return (
      <div className="text-center p-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400 text-lg italic">Nenhum feiticeiro encontrado neste domínio.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {list.map((char) => (
        <div key={char.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{char.name}</h3>
            <span className={`text-[10px] font-black px-2 py-1 rounded-full ${getRankStyle(char.rank)}`}>
              {char.rank}
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Clã: <span className="text-gray-800 font-semibold">{char.clanName || 'Sem Clã'}</span>
          </p>
          <div className="flex gap-3 border-t pt-4">
            <button onClick={() => onEdit(char)} className="flex-1 text-sm font-bold text-indigo-600 bg-indigo-50 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition">Editar</button>
            <button onClick={() => onDelete(char.id)} className="flex-1 text-sm font-bold text-red-600 bg-red-50 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper para cores dos Ranks
function getRankStyle(rank) {
  switch(rank) {
    case 'SPECIAL_GRADE': return 'bg-red-100 text-red-700 border border-red-200';
    case 'GRADE_1': return 'bg-orange-100 text-orange-700 border border-orange-200';
    default: return 'bg-blue-100 text-blue-700 border border-blue-200';
  }
}