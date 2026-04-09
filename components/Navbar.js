import { useState } from 'react'

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const ArchiveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>
  </svg>
)

export default function Navbar({ isDark, onToggleTheme, activeTab, onTabChange }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: isDark ? 'rgba(14,14,14,0.85)' : 'rgba(240,240,245,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', height: 52 }}>
        {/* Logo */}
        <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.15em', color: 'var(--on-surface)', marginRight: '3rem' }}>
          CHRONOS
        </div>

        {/* Nav tabs */}
        <nav style={{ display: 'flex', gap: '0.25rem', flex: 1 }}>
          {['Dashboard', 'Schedule', 'Archive'].map(tab => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.4rem 0.9rem',
                fontFamily: 'inherit',
                fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.02em',
                color: activeTab === tab ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 0.8rem',
            background: isDark ? 'rgba(42,42,42,0.6)' : 'rgba(255,255,255,0.7)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: 9999,
            cursor: 'pointer',
            color: 'var(--on-surface)',
            fontFamily: 'inherit',
            fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em',
            transition: 'all 0.2s ease',
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
          <span style={{ textTransform: 'uppercase', fontSize: '0.65rem' }}>
            {isDark ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>
    </header>
  )
}
