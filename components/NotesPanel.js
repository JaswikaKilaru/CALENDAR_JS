import { useState, useEffect } from 'react'

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
  </svg>
)

const NotesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
)

export default function NotesPanel({ isDark, startDate, endDate, storageKey }) {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Q1 REVIEW', body: 'Finalize performance analytics. Sync with infra team on deployment schedule.' },
    { id: 2, title: 'INTERFACE REFRESH', body: 'Review Aether Glass v2. Ensure backdrop filters hold across all viewports.' },
  ])
  const [editingId, setEditingId] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [quickMemo, setQuickMemo] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.notes) setNotes(parsed.notes)
      }
    } catch {}
  }, [storageKey])

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify({ notes })) } catch {}
  }, [notes, storageKey])

  const addNote = () => {
    if (!newTitle.trim()) return
    setNotes(prev => [...prev, { id: Date.now(), title: newTitle.toUpperCase(), body: newBody }])
    setNewTitle(''); setNewBody(''); setShowAdd(false)
  }
  const addMemo = () => {
    if (!quickMemo.trim()) return
    setNotes(prev => [...prev, { id: Date.now(), title: 'MEMO', body: quickMemo }])
    setQuickMemo('')
  }
  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id))
  const updateNote = (id, body) => setNotes(prev => prev.map(n => n.id === id ? {...n, body} : n))

  const glassBg = isDark ? 'rgba(28,24,44,0.75)' : 'rgba(255,255,255,0.88)'
  const glassBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(80,40,200,0.14)'
  const inputBg = isDark ? 'rgba(14,10,24,0.9)' : 'rgba(245,243,255,0.9)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      {/* Notes card — single, clean, no clutter */}
      <div style={{
        background: glassBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${glassBorder}`,
        borderRadius: '1.25rem',
        padding: '1.25rem',
        boxShadow: isDark
          ? 'inset 0 1px 1px rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.3)'
          : 'inset 0 1px 2px rgba(255,255,255,0.9), 0 4px 24px rgba(80,40,200,0.07)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isDark ? 'rgba(200,180,255,0.6)' : 'rgba(60,20,150,0.55)' }}>
            <NotesIcon/>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Notes</span>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            style={{
              width: 28, height: 28, borderRadius: '0.5rem', border: `1px solid ${glassBorder}`,
              background: showAdd
                ? 'linear-gradient(135deg, #5d21df, #3a18a0)'
                : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(80,40,200,0.07)'),
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: showAdd ? '#fff' : (isDark ? 'rgba(200,180,255,0.6)' : 'rgba(80,40,200,0.6)'),
              transition: 'all 0.15s ease', fontFamily: 'inherit',
            }}
          ><PlusIcon/></button>
        </div>

        {/* Add note form */}
        {showAdd && (
          <div style={{ marginBottom: '0.875rem', padding: '0.875rem', borderRadius: '0.75rem', background: isDark ? 'rgba(14,10,24,0.6)' : 'rgba(245,243,255,0.8)', border: `1px solid ${glassBorder}`, animation: 'fadeIn 0.2s ease' }}>
            <input
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Title"
              style={{ width: '100%', padding: '0.45rem 0', background: 'transparent', border: 'none', borderBottom: `1px solid ${glassBorder}`, color: 'var(--on-surface)', fontFamily: 'inherit', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}
            />
            <textarea
              value={newBody}
              onChange={e => setNewBody(e.target.value)}
              placeholder="Note..."
              rows={2}
              style={{ width: '100%', padding: '0.4rem 0', background: 'transparent', border: 'none', color: 'var(--on-surface)', fontFamily: 'inherit', fontSize: '0.8rem', resize: 'none', lineHeight: 1.5, marginBottom: '0.5rem' }}
            />
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button onClick={addNote} style={{ flex: 1, padding: '0.4rem', borderRadius: 9999, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #5d21df, #3a18a0)', color: '#fff', fontFamily: 'inherit', fontSize: '0.72rem', fontWeight: 700 }}>ADD</button>
              <button onClick={() => setShowAdd(false)} style={{ padding: '0.4rem 0.75rem', borderRadius: 9999, border: `1px solid ${glassBorder}`, cursor: 'pointer', background: 'transparent', color: 'var(--on-surface-variant)', fontFamily: 'inherit', fontSize: '0.72rem' }}>CANCEL</button>
            </div>
          </div>
        )}

        {/* Notes list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: 320, overflowY: 'auto' }}>
          {notes.map(note => (
            <div
              key={note.id}
              className="note-card"
              style={{ padding: '0.75rem 0.875rem', borderRadius: '0.75rem', cursor: 'pointer', position: 'relative' }}
              onClick={() => setEditingId(editingId === note.id ? null : note.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--on-surface)' }}>{note.title}</span>
                <button
                  onClick={e => { e.stopPropagation(); deleteNote(note.id) }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--on-surface-variant)', opacity: 0.4, padding: '0.1rem', display: 'flex', fontFamily: 'inherit', transition: 'opacity 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseOut={e => e.currentTarget.style.opacity = '0.4'}
                ><TrashIcon/></button>
              </div>
              {editingId === note.id ? (
                <textarea
                  value={note.body}
                  onChange={e => updateNote(note.id, e.target.value)}
                  onClick={e => e.stopPropagation()}
                  rows={3}
                  autoFocus
                  style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--on-surface)', fontFamily: 'inherit', fontSize: '0.78rem', resize: 'none', lineHeight: 1.5 }}
                />
              ) : (
                <p style={{ fontSize: '0.78rem', lineHeight: 1.5, color: 'var(--on-surface-variant)' }}>{note.body}</p>
              )}
            </div>
          ))}
          {notes.length === 0 && (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--on-surface-variant)', fontSize: '0.8rem', opacity: 0.5 }}>
              No notes for this month
            </div>
          )}
        </div>

        {/* Quick memo input */}
        <div style={{ marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: `1px solid ${glassBorder}`, display: 'flex', gap: '0.5rem' }}>
          <input
            value={quickMemo}
            onChange={e => setQuickMemo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addMemo()}
            placeholder="Quick note..."
            style={{
              flex: 1, padding: '0.5rem 0.75rem',
              borderRadius: '0.65rem', border: `1px solid ${glassBorder}`,
              background: inputBg, color: 'var(--on-surface)',
              fontFamily: 'inherit', fontSize: '0.8rem',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={e => e.target.style.borderColor = isDark ? 'rgba(150,120,255,0.5)' : 'rgba(93,33,223,0.4)'}
            onBlur={e => e.target.style.borderColor = glassBorder}
          />
          <button
            onClick={addMemo}
            style={{
              width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #5d21df, #3a18a0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', flexShrink: 0,
              boxShadow: '0 0 14px rgba(93,33,223,0.4)',
            }}
          ><PlusIcon/></button>
        </div>
      </div>
    </div>
  )
}
