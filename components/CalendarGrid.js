import { useMemo, useState } from 'react'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

function isSameDay(a, b) {
  if (!a || !b) return false
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}
function isToday(date) { return isSameDay(date, new Date()) }
function isBetween(date, start, end) {
  if (!start || !end) return false
  const d = date.getTime()
  return d > Math.min(start.getTime(), end.getTime()) && d < Math.max(start.getTime(), end.getTime())
}

export default function CalendarGrid({ month, year, startDate, endDate, hoverDate, onDayClick, onDayHover, isDark }) {
  const [localHover, setLocalHover] = useState(null)

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    let dayOfWeek = firstDay.getDay() - 1
    if (dayOfWeek < 0) dayOfWeek = 6
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = []
    for (let i = 0; i < dayOfWeek; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
    return cells
  }, [month, year])

  // Effective end date for hover preview
  const previewEnd = startDate && !endDate ? (hoverDate || localHover) : endDate
  const rangeStart = startDate && previewEnd
    ? (startDate < previewEnd ? startDate : previewEnd)
    : startDate
  const rangeEnd = startDate && previewEnd
    ? (startDate < previewEnd ? previewEnd : startDate)
    : null

  const isStart = (date) => rangeStart && isSameDay(date, rangeStart)
  const isEnd = (date) => rangeEnd && !isSameDay(rangeStart, rangeEnd) && isSameDay(date, rangeEnd)
  const isSingleDay = (date) => rangeStart && rangeEnd && isSameDay(rangeStart, rangeEnd) && isSameDay(date, rangeStart)
  const inRange = (date) => isBetween(date, rangeStart, rangeEnd)

  // Is this a "preview" hover state (not committed yet)?
  const isHoverPreview = startDate && !endDate

  return (
    <div>
      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '0.5rem' }}>
        {DAYS.map(d => (
          <div key={d} style={{
            textAlign: 'center',
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
            color: isDark ? 'rgba(200,180,255,0.45)' : 'rgba(80,40,200,0.5)',
            padding: '0.3rem 0',
          }}>{d}</div>
        ))}
      </div>

      {/* Grid separator */}
      <div style={{
        height: 1,
        background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(80,40,180,0.18)',
        marginBottom: '0.4rem',
      }}/>

      {/* Days grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {days.map((date, i) => {
          if (!date) return <div key={`e${i}`} style={{ aspectRatio: '1' }} />

          const today = isToday(date)
          const start = isStart(date)
          const end = isEnd(date)
          const single = isSingleDay(date)
          const between = inRange(date)
          const isWeekend = [5, 6].includes((date.getDay() + 6) % 7)

          // Colors
          let bg = 'transparent'
          let borderRadius = '0.5rem'
          let textColor = isDark ? 'rgba(230,225,255,0.85)' : 'rgba(30,20,60,0.85)'
          let shadow = 'none'
          let opacity = 1
          let fontWeight = 400
          let transition = 'background 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease'

          if (single || (start && !rangeEnd)) {
            bg = 'linear-gradient(135deg, #5d21df, #3a18a0)'
            shadow = '0 0 18px rgba(93,33,223,0.55)'
            textColor = '#fff'
            fontWeight = 700
            borderRadius = '0.65rem'
          } else if (start) {
            bg = 'linear-gradient(135deg, #5d21df, #3a18a0)'
            shadow = '0 0 18px rgba(93,33,223,0.5)'
            textColor = '#fff'
            fontWeight = 700
            borderRadius = '0.65rem 0.2rem 0.2rem 0.65rem'
          } else if (end) {
            bg = isHoverPreview
              ? (isDark ? 'rgba(93,33,223,0.35)' : 'rgba(93,33,223,0.2)')
              : 'linear-gradient(135deg, #1d6a8f, #0d4a6a)'
            shadow = isHoverPreview ? 'none' : '0 0 14px rgba(29,139,163,0.4)'
            textColor = isHoverPreview ? (isDark ? '#c0a8ff' : '#5d21df') : '#fff'
            fontWeight = 600
            borderRadius = '0.2rem 0.65rem 0.65rem 0.2rem'
          } else if (between) {
            bg = isHoverPreview
              ? (isDark ? 'rgba(93,33,223,0.12)' : 'rgba(93,33,223,0.07)')
              : (isDark ? 'rgba(93,33,223,0.2)' : 'rgba(93,33,223,0.12)')
            borderRadius = '0'
            textColor = isDark ? 'rgba(200,185,255,0.9)' : 'rgba(60,20,180,0.8)'
          } else if (today) {
            bg = isDark ? 'rgba(50,40,80,0.9)' : 'rgba(200,190,240,0.9)'
            shadow = isDark
              ? '0 0 0 1.5px rgba(160,130,255,0.6), inset 0 1px 1px rgba(255,255,255,0.08)'
              : '0 0 0 2px rgba(93,33,223,0.5), inset 0 1px 1px rgba(255,255,255,0.5)'
            fontWeight = 700
          }

          if (isWeekend && !start && !end && !between && !single && !today) {
            opacity = isDark ? 0.45 : 0.4
          }

          return (
            <div
              key={date.toISOString()}
              onClick={() => onDayClick(date)}
              onMouseEnter={() => {
                onDayHover(date)
                setLocalHover(date)
              }}
              onMouseLeave={() => {
                onDayHover(null)
                setLocalHover(null)
              }}
              style={{
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRadius,
                background: bg,
                boxShadow: shadow,
                color: textColor,
                opacity,
                transition,
                position: 'relative',
                userSelect: 'none',
              }}
              onMouseOver={e => {
                if (!start && !end && !between && !single && !today) {
                  e.currentTarget.style.background = isDark
                    ? 'rgba(180,160,255,0.1)'
                    : 'rgba(93,33,223,0.09)'
                  e.currentTarget.style.opacity = '1'
                }
              }}
              onMouseOut={e => {
                if (!start && !end && !between && !single && !today) {
                  e.currentTarget.style.background = between
                    ? (isDark ? 'rgba(93,33,223,0.2)' : 'rgba(93,33,223,0.12)')
                    : 'transparent'
                  e.currentTarget.style.opacity = String(
                    isWeekend && !start && !end && !between && !single && !today
                      ? (isDark ? 0.45 : 0.4)
                      : 1
                  )
                }
              }}
            >
              <span style={{
                fontSize: 'clamp(0.72rem, 1.5vw, 0.87rem)',
                fontWeight,
                lineHeight: 1,
              }}>
                {String(date.getDate()).padStart(2, '0')}
              </span>
              {today && !start && !end && !single && (
                <div style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 4, height: 4,
                  borderRadius: '50%',
                  background: isDark ? 'rgba(160,130,255,0.8)' : 'rgba(93,33,223,0.7)',
                }}/>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
