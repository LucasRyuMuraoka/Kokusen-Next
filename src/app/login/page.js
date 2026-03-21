'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validação mockada estática
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('user_token', 'autenticado');
      router.push('/'); 
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-indigo-900">Acesso Restrito</h1>
          <p className="text-gray-800 mt-2">Identifique-se para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium border border-red-100">
            Usuário ou senha incorretos!
          </div>
        )}

        <input
          type="text"
          placeholder="Usuário (admin)"
          className="w-full p-3 mb-4 text-gray-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Senha (admin)"
          className="w-full p-3 mb-6 text-gray-800 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}