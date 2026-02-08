import { useState } from 'react'

interface Note {
  id: number
  title: string
  content: string
  createdAt: Date
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: 'Bem-vindo ao Jarvis Notes',
      content: 'Aqui você pode criar e organizar suas anotações.',
      createdAt: new Date()
    }
  ])
  const [isCreating, setIsCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleCreate = () => {
    if (!newTitle.trim()) return

    const newNote: Note = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
      createdAt: new Date()
    }

    setNotes(prev => [newNote, ...prev])
    setNewTitle('')
    setNewContent('')
    setIsCreating(false)
  }

  const handleDelete = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-2xl">📝</span> Notas
        </h1>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          + Nova
        </button>
      </div>

      {/* Create Note Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nova Nota</h2>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Conteúdo..."
              rows={5}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4 pb-20">
        {notes.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-4xl mb-4">📭</p>
            <p>Nenhuma nota ainda</p>
            <p className="text-sm">Toque em "+ Nova" para criar</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{note.title}</h3>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-500 hover:text-red-400 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-400 whitespace-pre-wrap">{note.content}</p>
              <p className="text-xs text-gray-600 mt-3">
                {note.createdAt.toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
