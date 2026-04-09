import { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import HeroPanel from '../components/HeroPanel'
import CalendarGrid from '../components/CalendarGrid'
import NotesPanel from '../components/NotesPanel'

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)
const CalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatRange(start, end) {
  if (!start) return null
  const s = `${MONTH_SHORT[start.getMonth()]} ${start.getDate()}`
  if (!end || end.toDateString() === start.toDateString()) return s
  const e = `${MONTH_SHORT[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`
  return `${s} — ${e}`
}

function daysBetween(start, end) {
  if (!start || !end) return 0
  return Math.round(Math.abs(end - start) / 86400000) + 1
}

// Mobile list view for small screens
function MobileCalendarList({ month, year, startDate, endDate, onDayClick, isDark }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()

  const isSameDay = (a, b) => a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const inRange = (date) => {
    if (!startDate || !endDate) return false
    const d = date.getTime()
    return d > Math.min(startDate.getTime(), endDate.getTime()) && d < Math.max(startDate.getTime(), endDate.getTime())
  }

  const WEEKDAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month, i + 1)
        const isT = isSameDay(date, today)
        const isStart = isSameDay(date, startDate)
        const isEnd = isSameDay(date, endDate)
        const isMid = inRange(date)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6

        let bg = 'transparent'
        let textColor = isDark ? (isWeekend ? 'rgba(200,185,255,0.35)' : 'rgba(230,225,255,0.75)') : (isWeekend ? 'rgba(60,20,180,0.3)' : 'rgba(30,20,60,0.75)')
        let fontWeight = 400
        let border = isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(80,40,200,0.1)'

        if (isStart || isEnd) {
          bg = 'linear-gradient(135deg, #5d21df, #3a18a0)'
          textColor = '#fff'
          fontWeight = 700
          border = 'none'
        } else if (isMid) {
          bg = isDark ? 'rgba(93,33,223,0.18)' : 'rgba(93,33,223,0.1)'
          textColor = isDark ? 'rgba(200,185,255,0.9)' : 'rgba(60,20,180,0.85)'
          border = 'none'
        } else if (isT) {
          bg = isDark ? 'rgba(50,40,80,0.8)' : 'rgba(200,190,240,0.8)'
          fontWeight = 700
          border = isDark ? '1px solid rgba(160,130,255,0.5)' : '2px solid rgba(93,33,223,0.5)'
        }

        return (
          <div
            key={i}
            onClick={() => onDayClick(date)}
            style={{
              display: 'flex', alignItems: 'center',
              padding: '0.55rem 0.85rem',
              borderRadius: '0.5rem',
              background: bg, border,
              color: textColor,
              cursor: 'pointer',
              transition: 'all 0.12s ease',
              fontWeight,
            }}
          >
            <span style={{ width: 32, fontSize: '0.72rem', fontWeight: 600, opacity: 0.5 }}>
              {WEEKDAY_NAMES[date.getDay()].toUpperCase()}
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: fontWeight || 500, minWidth: 28 }}>
              {i + 1}
            </span>
            {(isStart) && (
              <span style={{ marginLeft: 'auto', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', background: 'rgba(255,255,255,0.2)', padding: '0.15rem 0.4rem', borderRadius: 4 }}>
                START
              </span>
            )}
            {(isEnd) && (
              <span style={{ marginLeft: 'auto', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', background: 'rgba(255,255,255,0.2)', padding: '0.15rem 0.4rem', borderRadius: 4 }}>
                END
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileView, setMobileView] = useState('calendar') // 'calendar' | 'notes'

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('chronos-theme')
      if (saved) setIsDark(saved === 'dark')
    } catch {}
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev
      try { localStorage.setItem('chronos-theme', next ? 'dark' : 'light') } catch {}
      return next
    })
  }

  const prevMonth = () => {
    setMonth(m => { if (m === 0) { setYear(y => y - 1); return 11 } return m - 1 })
    setStartDate(null); setEndDate(null)
  }
  const nextMonth = () => {
    setMonth(m => { if (m === 11) { setYear(y => y + 1); return 0 } return m + 1 })
    setStartDate(null); setEndDate(null)
  }

  const handleDayClick = useCallback((date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date); setEndDate(null)
    } else {
      if (date.toDateString() === startDate.toDateString()) {
        setStartDate(null); setEndDate(null)
      } else if (date < startDate) {
        setEndDate(startDate); setStartDate(date)
      } else {
        setEndDate(date)
      }
    }
  }, [startDate, endDate])

  const clearRange = () => { setStartDate(null); setEndDate(null) }
  const storageKey = `chronos-notes-${year}-${month}`

  if (!mounted) return null

  const glassBg = isDark ? 'rgba(28,24,44,0.7)' : 'rgba(255,255,255,0.88)'
  const glassBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(80,40,200,0.14)'
  const glassShadow = isDark
    ? 'inset 0 1px 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.3)'
    : 'inset 0 1px 2px rgba(255,255,255,0.9), 0 4px 24px rgba(80,40,200,0.08)'

  const rangeText = formatRange(startDate, endDate)
  const days = daysBetween(startDate, endDate)
  const hasRange = startDate !== null

  // ── MOBILE LAYOUT ──────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(180deg, #0e0a1c 0%, #0e0e0e 100%)'
          : 'linear-gradient(180deg, #f5f3ff 0%, #eeeef8 100%)',
        color: isDark ? '#e8e8e8' : '#111111',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
      }} className={isDark ? '' : 'light'}>
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} activeTab="Dashboard" onTabChange={() => {}} />

        <div style={{ padding: '0.75rem' }}>
          {/* Hero */}
          <div style={{ marginBottom: '0.75rem' }}>
            <HeroPanel month={month} year={year} />
          </div>

          {/* Range spotlight - always shown on mobile when active */}
          {hasRange && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(93,33,223,0.25), rgba(29,106,143,0.2))',
              border: '1px solid rgba(93,33,223,0.4)',
              borderRadius: '1rem',
              padding: '1rem 1.25rem',
              marginBottom: '0.75rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', color: isDark ? 'rgba(200,180,255,0.6)' : 'rgba(93,33,223,0.6)', marginBottom: '0.25rem' }}>
                  SELECTED RANGE
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: isDark ? '#e0d4ff' : '#3a10a0', letterSpacing: '-0.01em' }}>
                  {rangeText}
                </div>
                {days > 1 && (
                  <div style={{ fontSize: '0.72rem', color: isDark ? 'rgba(200,180,255,0.5)' : 'rgba(93,33,223,0.5)', marginTop: '0.15rem' }}>
                    {days} days
                  </div>
                )}
              </div>
              <button onClick={clearRange} style={{
                padding: '0.35rem 0.75rem', borderRadius: 9999,
                border: '1px solid rgba(255,80,80,0.3)',
                background: 'rgba(255,80,80,0.1)', color: '#ff8080',
                fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', letterSpacing: '0.06em',
              }}>CLEAR</button>
            </div>
          )}

          {/* Tab switcher */}
          <div style={{
            display: 'flex', gap: 4, padding: '0.3rem',
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(80,40,200,0.07)',
            borderRadius: '0.75rem', marginBottom: '0.75rem',
          }}>
            {['calendar','notes'].map(tab => (
              <button key={tab} onClick={() => setMobileView(tab)} style={{
                flex: 1, padding: '0.5rem',
                borderRadius: '0.55rem', border: 'none', cursor: 'pointer',
                background: mobileView === tab
                  ? (isDark ? 'rgba(93,33,223,0.5)' : 'rgba(93,33,223,0.15)')
                  : 'transparent',
                color: mobileView === tab
                  ? (isDark ? '#e0d4ff' : '#5d21df')
                  : (isDark ? 'rgba(200,180,255,0.4)' : 'rgba(80,40,180,0.4)'),
                fontFamily: 'inherit', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Month navigation */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '0.75rem',
            background: glassBg, border: `1px solid ${glassBorder}`,
            borderRadius: '0.875rem', padding: '0.6rem 0.875rem',
          }}>
            <button onClick={prevMonth} style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${glassBorder}`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? 'rgba(200,180,255,0.7)' : 'rgba(80,40,180,0.7)', fontFamily: 'inherit' }}>
              <ChevronLeft/>
            </button>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', color: isDark ? 'rgba(220,210,255,0.9)' : 'rgba(50,20,120,0.9)' }}>
              {MONTH_NAMES[month].toUpperCase()} {year}
            </span>
            <button onClick={nextMonth} style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${glassBorder}`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? 'rgba(200,180,255,0.7)' : 'rgba(80,40,180,0.7)', fontFamily: 'inherit' }}>
              <ChevronRight/>
            </button>
          </div>

          {/* Content */}
          {mobileView === 'calendar' ? (
            <div style={{ background: glassBg, border: `1px solid ${glassBorder}`, borderRadius: '1rem', padding: '0.875rem', boxShadow: glassShadow }}>
              <MobileCalendarList month={month} year={year} startDate={startDate} endDate={endDate} onDayClick={handleDayClick} isDark={isDark} />
            </div>
          ) : (
            <NotesPanel isDark={isDark} startDate={startDate} endDate={endDate} storageKey={storageKey} />
          )}
        </div>
      </div>
    )
  }

  // ── DESKTOP LAYOUT ─────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(160deg, #0e0a1c 0%, #0e0e0e 60%, #0c0c14 100%)'
        : 'linear-gradient(160deg, #f5f3ff 0%, #eeeef8 60%, #e8e8f5 100%)',
      color: isDark ? '#e8e8e8' : '#111111',
      fontFamily: '"Plus Jakarta Sans", sans-serif',
    }} className={isDark ? '' : 'light'}>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} activeTab="Dashboard" onTabChange={() => {}} />

      <main style={{
        height: 'calc(100vh - 52px)',
        overflowY: 'auto',
        padding: 'clamp(1rem, 2vw, 1.5rem)',
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1, alignItems: 'flex-start' }}>

          {/* LEFT: Hero + Calendar */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <HeroPanel month={month} year={year} />

            {/* Calendar card */}
            <div style={{
              background: glassBg,
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: `1px solid ${glassBorder}`,
              borderRadius: '1.25rem',
              padding: '1.25rem',
              boxShadow: glassShadow,
            }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                {/* Nav */}
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {[{fn: prevMonth, icon: <ChevronLeft/>}, {fn: nextMonth, icon: <ChevronRight/>}].map((btn, i) => (
                    <button key={i} onClick={btn.fn} style={{
                      width: 32, height: 32, borderRadius: '50%',
                      border: `1px solid ${glassBorder}`,
                      background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(80,40,200,0.06)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isDark ? 'rgba(200,180,255,0.7)' : 'rgba(80,40,180,0.7)',
                      transition: 'all 0.15s ease', fontFamily: 'inherit',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(80,40,200,0.12)'}
                    onMouseOut={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(80,40,200,0.06)'}
                    >{btn.icon}</button>
                  ))}
                </div>

                {/* Month label */}
                <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', color: isDark ? 'rgba(200,180,255,0.7)' : 'rgba(60,20,150,0.6)' }}>
                  {MONTH_NAMES[month].toUpperCase()} {year}
                </div>

                {/* Live sync */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem', borderRadius: 9999, background: isDark ? 'rgba(28,24,44,0.8)' : 'rgba(240,238,255,0.9)', border: `1px solid ${glassBorder}` }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4fdb8a', boxShadow: '0 0 6px rgba(79,219,138,0.7)' }}/>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', color: isDark ? 'rgba(160,220,160,0.7)' : 'rgba(20,120,60,0.6)', textTransform: 'uppercase' }}>LIVE SYNC</span>
                </div>
              </div>

              <CalendarGrid month={month} year={year} startDate={startDate} endDate={endDate} hoverDate={hoverDate} onDayClick={handleDayClick} onDayHover={setHoverDate} isDark={isDark} />

              {/* ── RANGE SPOTLIGHT (the "star" of the UI) ─────── */}
              <div style={{
                marginTop: '1rem',
                borderTop: `1px solid ${glassBorder}`,
                paddingTop: '0.875rem',
              }}>
                {hasRange ? (
                  <div style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(93,33,223,0.2), rgba(29,106,143,0.15))'
                      : 'linear-gradient(135deg, rgba(93,33,223,0.1), rgba(29,106,143,0.07))',
                    border: isDark ? '1px solid rgba(93,33,223,0.35)' : '1px solid rgba(93,33,223,0.25)',
                    borderRadius: '0.875rem',
                    padding: '0.875rem 1.125rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    animation: 'rangeIn 0.25s ease',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '0.6rem',
                        background: isDark ? 'rgba(93,33,223,0.3)' : 'rgba(93,33,223,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isDark ? '#c0a8ff' : '#5d21df',
                      }}>
                        <CalIcon/>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', color: isDark ? 'rgba(180,160,255,0.55)' : 'rgba(80,40,200,0.5)', marginBottom: '0.2rem' }}>
                          SELECTED RANGE
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.01em', color: isDark ? '#e0d4ff' : '#3a10a0' }}>
                          {rangeText}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      {days > 0 && (
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1, color: isDark ? '#cdbdff' : '#5d21df' }}>{days}</div>
                          <div style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em', color: isDark ? 'rgba(180,160,255,0.4)' : 'rgba(80,40,200,0.45)', textTransform: 'uppercase' }}>days</div>
                        </div>
                      )}
                      <button onClick={clearRange} style={{
                        padding: '0.3rem 0.65rem', borderRadius: 9999,
                        border: '1px solid rgba(255,80,80,0.3)',
                        background: 'rgba(255,80,80,0.1)', color: '#ff8080',
                        fontSize: '0.62rem', fontWeight: 700, cursor: 'pointer',
                        fontFamily: 'inherit', letterSpacing: '0.06em',
                      }}>CLEAR</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.25rem' }}>
                    <ArrowIcon style={{ opacity: 0.3 }}/>
                    <span style={{ fontSize: '0.72rem', color: isDark ? 'rgba(200,180,255,0.3)' : 'rgba(80,40,200,0.3)', letterSpacing: '0.04em' }}>
                      Click any date to start a selection
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Notes only — clean, single-purpose */}
          <div style={{ width: 310, minWidth: 280, maxWidth: 330, display: 'flex', flexDirection: 'column' }}>
            <NotesPanel isDark={isDark} startDate={startDate} endDate={endDate} storageKey={storageKey} />
          </div>
        </div>
      </main>

      <style>{`
        @keyframes rangeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
