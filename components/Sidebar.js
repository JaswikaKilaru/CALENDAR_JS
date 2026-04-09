const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
)

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

const ArchiveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="21 8 21 21 3 21 3 8"/>
    <rect x="1" y="3" width="22" height="5"/>
    <line x1="10" y1="12" x2="14" y2="12"/>
  </svg>
)

export default function Sidebar({ isDark, activeItem, onItemChange }) {
  const items = [
    { id: 'dashboard', icon: <GridIcon />, label: 'Dashboard' },
    { id: 'schedule', icon: <CalendarIcon />, label: 'Schedule' },
    { id: 'archive', icon: <ArchiveIcon />, label: 'Archive' },
  ]

  return (
    <aside style={{
      width: 72,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem 0',
      gap: '0.5rem',
      background: isDark ? 'rgba(14,14,14,0.5)' : 'rgba(240,240,245,0.5)',
      borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'}`,
      transition: 'all 0.3s ease',
    }}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onItemChange(item.id)}
          title={item.label}
          style={{
            width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: item.id === activeItem ? '0.875rem' : '50%',
            border: 'none', cursor: 'pointer',
            background: item.id === activeItem
              ? 'linear-gradient(135deg, var(--primary-container), #3a18a0)'
              : 'transparent',
            color: item.id === activeItem ? '#fff' : 'var(--on-surface-variant)',
            boxShadow: item.id === activeItem ? '0 0 20px rgba(93,33,223,0.4)' : 'none',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit',
          }}
        >
          {item.icon}
        </button>
      ))}
    </aside>
  )
}
