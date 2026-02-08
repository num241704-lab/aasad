import { useState } from 'react'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Notes from './pages/Notes'

// Simple router
function App() {
  const [currentPage, setCurrentPage] = useState('home')

  // Mock auth context
  const mockUser = { name: 'Felipe' }

  const navigate = (path: string) => {
    setCurrentPage(path.replace('/', '') || 'home')
  }

  // Provide navigation context
  ;(window as any).navigate = navigate

  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return <Chat />
      case 'notes':
        return <Notes />
      default:
        return <HomePage navigate={navigate} user={mockUser} />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 flex justify-around z-50">
        <button
          onClick={() => setCurrentPage('home')}
          className={`p-3 rounded-lg ${currentPage === 'home' ? 'bg-blue-600' : 'bg-gray-800'}`}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentPage('chat')}
          className={`p-3 rounded-lg ${currentPage === 'chat' ? 'bg-blue-600' : 'bg-gray-800'}`}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentPage('notes')}
          className={`p-3 rounded-lg ${currentPage === 'notes' ? 'bg-blue-600' : 'bg-gray-800'}`}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </nav>

      {/* Page Content */}
      <div className="pb-20">
        {renderPage()}
      </div>
    </div>
  )
}

// Simplified Home Page
function HomePage({ navigate, user }: { navigate: (path: string) => void; user: { name: string } }) {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user.name}</h1>
          <p className="text-blue-200">Jarvis está ao seu dispor.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => navigate('/chat')}
            className="bg-gray-800 border border-gray-700 p-4 rounded-lg cursor-pointer hover:border-blue-600 transition-colors"
          >
            <div className="text-blue-500 mb-2 text-3xl">💬</div>
            <h3 className="font-semibold">Chat</h3>
            <p className="text-xs text-gray-400">Converse com Jarvis</p>
          </div>

          <div
            onClick={() => navigate('/notes')}
            className="bg-gray-800 border border-gray-700 p-4 rounded-lg cursor-pointer hover:border-yellow-600 transition-colors"
          >
            <div className="text-yellow-500 mb-2 text-3xl">📝</div>
            <h3 className="font-semibold">Notas</h3>
            <p className="text-xs text-gray-400">Suas anotações</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg cursor-pointer hover:border-purple-600 transition-colors">
            <div className="text-purple-500 mb-2 text-3xl">📅</div>
            <h3 className="font-semibold">Calendário</h3>
            <p className="text-xs text-gray-400">Seus eventos</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg cursor-pointer hover:border-green-600 transition-colors">
            <div className="text-green-500 mb-2 text-3xl">💰</div>
            <h3 className="font-semibold">Finanças</h3>
            <p className="text-xs text-gray-400">Transações</p>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🧠</span>
            <h2 className="text-xl font-bold">Insights</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-300">Você tem 3 tarefas pendentes para hoje</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-300">Próximo compromisso: Reunião às 14h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
