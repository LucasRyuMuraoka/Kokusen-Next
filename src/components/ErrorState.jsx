export function ErrorState({ error, reset }) {
  return (
    <div className="p-8 text-center bg-red-50 border-2 border-red-200 rounded-xl my-4">
      <h2 className="text-2xl font-bold text-red-700 mb-2">Expansão de Domínio Falhou!</h2>
      <p className="text-red-600 mb-4">{error.message || "Erro ao conectar com a API Kokusen."}</p>
      <button 
        onClick={reset}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Tentar Novamente
      </button>
    </div>
  );
}