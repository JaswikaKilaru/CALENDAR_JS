const MONTH_DATA = {
  0:  { name: 'JANUARY',  palette: { bg: ['#050d1a','#0a1f40','#112b5c'], stars: true, accent: '#4a8fc4', accent2: '#7ab8e8' } },
  1:  { name: 'FEBRUARY', palette: { bg: ['#130820','#2a1045','#451870'], stars: true, accent: '#b06fd0', accent2: '#e0a0ff' } },
  2:  { name: 'MARCH',    palette: { bg: ['#0d1520','#112030','#1a3a55'], stars: false, accent: '#4fa8d5', accent2: '#80d0f8' } },
  3:  { name: 'APRIL',    palette: { bg: ['#180e05','#3a200a','#6a3a14'], stars: false, accent: '#e0903a', accent2: '#f0c060' } },
  4:  { name: 'MAY',      palette: { bg: ['#081510','#10301a','#1a5028'], stars: false, accent: '#40bf70', accent2: '#80ef90' } },
  5:  { name: 'JUNE',     palette: { bg: ['#180808','#3a1010','#701818'], stars: false, accent: '#e04a4a', accent2: '#f88888' } },
  6:  { name: 'JULY',     palette: { bg: ['#08081a','#101040','#181880'], stars: true, accent: '#4040df', accent2: '#8888ff' } },
  7:  { name: 'AUGUST',   palette: { bg: ['#18130a','#382810','#705018'], stars: false, accent: '#d09020', accent2: '#f0c840' } },
  8:  { name: 'SEPTEMBER',palette: { bg: ['#081a18','#104038','#186058'], stars: false, accent: '#30b0b0', accent2: '#60dfd0' } },
  9:  { name: 'OCTOBER',  palette: { bg: ['#180810','#3a1020','#701838'], stars: true, accent: '#d04070', accent2: '#f07090' } },
  10: { name: 'NOVEMBER', palette: { bg: ['#0a0a14','#161630','#282860'], stars: true, accent: '#6060af', accent2: '#9090df' } },
  11: { name: 'DECEMBER', palette: { bg: ['#081014','#102030','#184858'], stars: true, accent: '#3090b8', accent2: '#60c0e8' } },
}

const starPositions = [
  [15,12],[28,8],[45,15],[60,6],[75,10],[88,18],[95,8],[10,25],[35,20],[55,28],[80,22],
  [20,5],[50,3],[70,18],[85,5],[40,28],[65,14],[90,25],[8,18],[30,30]
]

function Stars() {
  return starPositions.map(([x,y],i) => (
    <circle key={i} cx={x*4} cy={y*1.2} r={i%3===0 ? 1 : 0.6} fill="white" opacity={0.3+i%3*0.15}/>
  ))
}

function MonthScene({ month, palette: p }) {
  if (month === 0) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs><radialGradient id="moon0" cx="75%" cy="25%" r="8%"><stop offset="0%" stopColor="#e8f4ff" stopOpacity="0.95"/><stop offset="100%" stopColor="#c0d8f0" stopOpacity="0"/></radialGradient></defs>
      <Stars/>
      <circle cx="300" cy="50" r="28" fill="url(#moon0)" opacity="0.9"/>
      <circle cx="300" cy="50" r="40" fill="#4a8fc4" opacity="0.06"/>
      <path d="M0,130 Q80,90 160,115 Q240,90 320,110 Q360,100 400,115 L400,200 L0,200 Z" fill={p.bg[1]} opacity="0.8"/>
      <ellipse cx="200" cy="170" rx="180" ry="30" fill="#1a3a6c" opacity="0.7"/>
      <path d="M60,168 Q200,162 340,168" stroke="#6aacdf" strokeWidth="0.5" fill="none" opacity="0.5"/>
      <line x1="50" y1="130" x2="50" y2="80" stroke={p.accent2} strokeWidth="2.5" opacity="0.7"/>
      <line x1="50" y1="100" x2="30" y2="82" stroke={p.accent2} strokeWidth="1.2" opacity="0.5"/>
      <line x1="50" y1="95" x2="70" y2="78" stroke={p.accent2} strokeWidth="1.2" opacity="0.5"/>
      <line x1="340" y1="125" x2="340" y2="78" stroke={p.accent2} strokeWidth="3" opacity="0.7"/>
      <line x1="340" y1="98" x2="318" y2="78" stroke={p.accent2} strokeWidth="1.5" opacity="0.5"/>
      <line x1="340" y1="94" x2="362" y2="76" stroke={p.accent2} strokeWidth="1.5" opacity="0.5"/>
      <path d="M0,138 Q100,132 200,136 Q300,130 400,134 L400,145 L0,145 Z" fill="#c8dff0" opacity="0.3"/>
    </svg>
  )

  if (month === 1) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs>
        <linearGradient id="au1a" x1="0.2" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#b06fd0" stopOpacity="0.6"/><stop offset="100%" stopColor="#6040b0" stopOpacity="0"/></linearGradient>
        <linearGradient id="au1b" x1="0" y1="0" x2="1" y2="0.8"><stop offset="0%" stopColor="#40c0a0" stopOpacity="0.5"/><stop offset="100%" stopColor="#2080c0" stopOpacity="0"/></linearGradient>
      </defs>
      <Stars/>
      <path d="M-20,60 Q100,20 200,50 Q300,80 420,30" stroke="url(#au1a)" strokeWidth="30" fill="none" opacity="0.5"/>
      <path d="M-20,80 Q100,40 220,65 Q320,90 420,50" stroke="url(#au1b)" strokeWidth="20" fill="none" opacity="0.4"/>
      <path d="M0,155 Q60,120 120,140 Q180,115 240,135 Q300,110 360,130 Q385,120 400,128 L400,200 L0,200 Z" fill={p.bg[0]} opacity="0.9"/>
      <path d="M0,160 Q80,148 160,155 Q240,145 320,152 Q360,147 400,153 L400,200 L0,200 Z" fill="#c8a0e8" opacity="0.1"/>
      <path d="M20,162 Q80,158 150,161 Q220,156 280,160 Q340,155 380,158" stroke="white" strokeWidth="0.8" fill="none" opacity="0.25"/>
    </svg>
  )

  if (month === 2) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      {[20,50,80,110,140,170,200,230,260,290,320,350,380].map((x,i) => (
        <line key={i} x1={x} y1={i%3*20} x2={x-8} y2={i%3*20+50} stroke="#80c0f0" strokeWidth="0.8" opacity="0.22"/>
      ))}
      {[35,65,95,125,155,185,215,245,275,305,335,365].map((x,i) => (
        <line key={i} x1={x} y1={i%2*30+10} x2={x-8} y2={i%2*30+60} stroke="#80c0f0" strokeWidth="0.6" opacity="0.15"/>
      ))}
      <path d="M0,140 Q80,100 160,125 Q240,105 320,120 Q360,108 400,118 L400,200 L0,200 Z" fill={p.bg[1]} opacity="0.9"/>
      <path d="M0,148 Q100,135 200,142 Q300,132 400,140 L400,200 L0,200 Z" fill="#1a5028" opacity="0.4"/>
      <ellipse cx="100" cy="172" rx="28" ry="6" fill="#4fa8d5" opacity="0.25"/>
      <ellipse cx="280" cy="168" rx="20" ry="5" fill="#4fa8d5" opacity="0.2"/>
      <ellipse cx="100" cy="172" rx="16" ry="3" stroke="#80c0f0" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M180,142 Q183,130 188,128" stroke="#40bf70" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8"/>
      <path d="M185,133 Q190,128 195,130" stroke="#40bf70" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M200,140 Q203,128 207,126" stroke="#40bf70" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
    </svg>
  )

  if (month === 3) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs><radialGradient id="sun4" cx="70%" cy="55%" r="20%"><stop offset="0%" stopColor="#ffcc44" stopOpacity="0.95"/><stop offset="40%" stopColor="#ff8833" stopOpacity="0.6"/><stop offset="100%" stopColor="#cc4422" stopOpacity="0"/></radialGradient></defs>
      <circle cx="280" cy="110" r="35" fill="url(#sun4)" opacity="0.9"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle,i) => (
        <line key={i} x1={280+Math.cos(angle*Math.PI/180)*38} y1={110+Math.sin(angle*Math.PI/180)*38} x2={280+Math.cos(angle*Math.PI/180)*55} y2={110+Math.sin(angle*Math.PI/180)*55} stroke="#ffcc44" strokeWidth="1" opacity="0.25"/>
      ))}
      <path d="M0,148 Q200,138 400,148 L400,200 L0,200 Z" fill="#3a2010" opacity="0.95"/>
      <path d="M80,200 L80,115 Q82,100 85,90" stroke="#4a2810" strokeWidth="10" fill="none" strokeLinecap="round"/>
      <path d="M85,130 Q70,112 60,105" stroke="#4a2810" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M85,118 Q100,102 108,96" stroke="#4a2810" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {[[80,78],[65,85],[95,80],[72,95],[90,68],[60,95],[105,88]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={14+i%3*2} fill="#e8a0c0" opacity={0.7+i%2*0.15}/>
      ))}
      {[[78,75],[63,82],[96,77]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={8} fill="#f0c0d8" opacity="0.6"/>
      ))}
      {[[30,155],[55,152],[110,157],[140,153]].map(([x,y],i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="2" fill="#e8a0c0" opacity="0.5" transform={`rotate(${i*25} ${x} ${y})`}/>
      ))}
    </svg>
  )

  if (month === 4) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs><radialGradient id="sun5" cx="85%" cy="20%" r="15%"><stop offset="0%" stopColor="#ffe060" stopOpacity="0.95"/><stop offset="100%" stopColor="#ffe060" stopOpacity="0"/></radialGradient></defs>
      <circle cx="340" cy="40" r="25" fill="url(#sun5)" opacity="0.9"/>
      {[[80,35],[200,22],[320,40]].map(([cx,cy],i) => (
        <g key={i} opacity="0.65"><ellipse cx={cx} cy={cy} rx={30+i*5} ry={12} fill="white" opacity="0.6"/><ellipse cx={cx-12} cy={cy+2} rx={16} ry={10} fill="white" opacity="0.5"/><ellipse cx={cx+14} cy={cy+2} rx={18} ry={10} fill="white" opacity="0.5"/></g>
      ))}
      <path d="M0,135 Q60,110 120,125 Q180,108 240,120 Q300,106 360,118 Q385,108 400,112 L400,200 L0,200 Z" fill="#1a5028" opacity="0.95"/>
      <path d="M0,150 Q120,140 240,148 Q320,140 400,148 L400,200 L0,200 Z" fill="#206030" opacity="0.7"/>
      {[[40,132],[70,128],[130,133],[165,127],[210,130],[250,125],[290,129],[330,125],[370,130]].map(([x,y],i) => (
        <g key={i}><line x1={x} y1={y+12} x2={x} y2={y} stroke="#30a040" strokeWidth="1.5"/><circle cx={x} cy={y} r={3.5} fill={['#ffdd44','#ff8888','#ffffff','#ff99cc','#88ddff'][i%5]} opacity="0.9"/></g>
      ))}
    </svg>
  )

  if (month === 5) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs><radialGradient id="sun6" cx="50%" cy="80%" r="40%"><stop offset="0%" stopColor="#ff6020" stopOpacity="0.9"/><stop offset="100%" stopColor="#cc2020" stopOpacity="0"/></radialGradient></defs>
      <ellipse cx="200" cy="185" rx="80" ry="40" fill="url(#sun6)" opacity="0.7"/>
      <path d="M0,150 L20,150 L20,130 L30,130 L30,120 L40,120 L40,130 L60,130 L60,140 L70,140 L70,125 L80,125 L80,135 L100,135 L100,148 L130,148 L130,138 L140,138 L140,128 L150,128 L150,142 L180,142 L180,150 Q200,145 220,150 L250,150 L250,138 L260,138 L260,130 L270,130 L270,138 L290,138 L290,145 L320,145 L320,135 L330,135 L330,125 L340,125 L340,135 L360,135 L360,148 L380,148 L380,140 L390,140 L390,148 L400,148 L400,200 L0,200 Z" fill="#1a0808" opacity="0.95"/>
      {[[35,125],[145,133],[155,128],[265,132],[275,126],[335,128],[335,135]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="3" height="3" fill="#ffcc44" opacity="0.65"/>
      ))}
    </svg>
  )

  if (month === 6) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <Stars/>
      {[[120,60,14,'#ff8888'],[280,40,10,'#8888ff'],[200,75,8,'#88ffcc'],[340,65,6,'#ffdd88']].map(([cx,cy,spokes,color],fi) => (
        <g key={fi}>
          {Array.from({length:spokes}).map((_,i) => {
            const angle=(i/spokes)*Math.PI*2
            const r=25+fi*4
            return <line key={i} x1={cx} y1={cy} x2={cx+Math.cos(angle)*r} y2={cy+Math.sin(angle)*r} stroke={color} strokeWidth="1.2" opacity={0.7-fi*0.1}/>
          })}
          <circle cx={cx} cy={cy} r={4} fill={color} opacity="0.9"/>
        </g>
      ))}
      <path d="M0,155 Q80,120 160,140 Q240,115 320,135 Q360,122 400,132 L400,200 L0,200 Z" fill="#0c0c2a" opacity="0.95"/>
      <path d="M0,175 Q20,168 40,172 Q60,165 80,170 Q100,163 120,168 Q140,162 160,167 Q180,160 200,165 Q220,158 240,165 Q260,160 280,165 Q300,158 320,162 Q340,156 360,162 Q380,157 400,160 L400,200 L0,200 Z" fill="#05050f" opacity="0.95"/>
    </svg>
  )

  if (month === 7) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <defs><radialGradient id="sun8" cx="80%" cy="30%" r="20%"><stop offset="0%" stopColor="#ffe080" stopOpacity="0.95"/><stop offset="100%" stopColor="#ffe080" stopOpacity="0"/></radialGradient></defs>
      <circle cx="320" cy="60" r="30" fill="url(#sun8)" opacity="0.9"/>
      {[[60,45],[170,35],[260,50]].map(([cx,cy],i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={35+i*8} ry={10} fill="white" opacity="0.25"/>
      ))}
      <path d="M0,120 Q200,105 400,118 L400,200 L0,200 Z" fill="#705018" opacity="0.9"/>
      {Array.from({length:30}).map((_,i) => {
        const x=i*14+5, baseY=122+(i%3)*4
        return (
          <g key={i}>
            <line x1={x} y1={baseY+30} x2={x+(i%2?2:-2)} y2={baseY} stroke="#d09020" strokeWidth="1.2" opacity="0.7"/>
            <ellipse cx={x+(i%2?2:-2)} cy={baseY-4} rx="3" ry="7" fill="#e0b030" opacity="0.6" transform={`rotate(${i%3*8-8} ${x} ${baseY})`}/>
          </g>
        )
      })}
      <ellipse cx="160" cy="148" rx="22" ry="14" fill="#8a6010" opacity="0.9"/>
      <line x1="138" y1="148" x2="182" y2="148" stroke="#c09020" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  )

  if (month === 8) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <path d="M0,80 Q200,60 400,80" stroke="white" strokeWidth="40" fill="none" opacity="0.06"/>
      <path d="M0,100 Q200,82 400,98" stroke="white" strokeWidth="25" fill="none" opacity="0.05"/>
      {[[40,115],[80,108],[140,118],[330,112],[370,106]].map(([x,y],i) => (
        <g key={i}><line x1={x} y1={y+40} x2={x} y2={y} stroke="#5a3010" strokeWidth="8"/><circle cx={x} cy={y} r={22+i%2*5} fill={['#e07820','#c05010','#e09030','#d06018'][i%4]} opacity="0.85"/></g>
      ))}
      <path d="M0,148 Q200,140 400,148 L400,200 L0,200 Z" fill="#104040" opacity="0.8"/>
      <path d="M0,152 Q200,144 400,152" stroke={p.accent} strokeWidth="0.6" fill="none" opacity="0.3"/>
      {[[40,155],[80,152],[140,158]].map(([x,y],i) => (
        <line key={i} x1={x} y1={y} x2={x+(i%2?2:-2)} y2={y+25} stroke={['#e07820','#c05010','#e09030'][i]} strokeWidth="2" opacity="0.2"/>
      ))}
    </svg>
  )

  if (month === 9) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <Stars/>
      <circle cx="320" cy="55" r="36" fill="#f0d060" opacity="0.85"/>
      <line x1="30" y1="155" x2="30" y2="70" stroke="#1a0808" strokeWidth="8" opacity="0.9"/>
      <line x1="30" y1="95" x2="8" y2="70" stroke="#1a0808" strokeWidth="4" opacity="0.8"/>
      <line x1="30" y1="88" x2="55" y2="65" stroke="#1a0808" strokeWidth="3.5" opacity="0.8"/>
      <line x1="360" y1="155" x2="360" y2="80" stroke="#1a0808" strokeWidth="7" opacity="0.9"/>
      <line x1="360" y1="100" x2="340" y2="78" stroke="#1a0808" strokeWidth="3.5" opacity="0.8"/>
      <line x1="360" y1="95" x2="382" y2="72" stroke="#1a0808" strokeWidth="3" opacity="0.8"/>
      <path d="M0,155 Q200,148 400,155 L400,200 L0,200 Z" fill="#180810" opacity="0.95"/>
      {[[100,148,18],[200,144,22],[290,147,16]].map(([cx,cy,r],i) => (
        <g key={i}>
          <line x1={cx} y1={cy-r} x2={cx+2} y2={cy-r-8} stroke="#2a5010" strokeWidth="2.5"/>
          <ellipse cx={cx} cy={cy} rx={r} ry={r*0.85} fill="#e06010" opacity="0.9"/>
          <polygon points={`${cx-6},${cy-4} ${cx-4},${cy-8} ${cx-2},${cy-4}`} fill="#ffcc20" opacity="0.9"/>
          <polygon points={`${cx+6},${cy-4} ${cx+4},${cy-8} ${cx+2},${cy-4}`} fill="#ffcc20" opacity="0.9"/>
          <path d={`M${cx-6},${cy+3} Q${cx},${cy+10} ${cx+6},${cy+3}`} stroke="#ffcc20" strokeWidth="1.5" fill="none" opacity="0.9"/>
        </g>
      ))}
    </svg>
  )

  if (month === 10) return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <Stars/>
      <path d="M0,90 Q200,70 400,90" stroke="white" strokeWidth="50" fill="none" opacity="0.04"/>
      <path d="M0,120 Q200,100 400,120" stroke="white" strokeWidth="35" fill="none" opacity="0.04"/>
      <path d="M0,160 L0,130 L20,130 L20,118 L30,118 L30,105 L40,105 L40,100 L50,100 L50,110 L60,110 L60,120 L80,120 L80,108 L90,108 L90,95 L100,95 L100,85 L110,85 L110,90 L120,90 L120,115 L140,115 L140,100 L155,100 L155,88 L165,88 L165,80 L175,80 L175,88 L185,88 L185,100 L200,100 L200,112 L215,112 L215,95 L225,95 L225,85 L235,85 L235,92 L245,92 L245,108 L265,108 L265,118 L280,118 L280,105 L290,105 L290,95 L300,95 L300,105 L315,105 L315,118 L335,118 L335,108 L345,108 L345,100 L355,100 L355,108 L370,108 L370,120 L390,120 L390,132 L400,132 L400,200 L0,200 Z" fill="#101028" opacity="0.95"/>
      {[[35,108],[92,98],[107,88],[170,83],[225,88],[292,98],[348,103]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="3" height="3" fill="#9090cf" opacity="0.45"/>
      ))}
      {[15,45,75,105,135,165,195,225,255,285,315,345,375].map((x,i) => (
        <line key={i} x1={x} y1={i%4*25} x2={x-6} y2={i%4*25+40} stroke="#6060af" strokeWidth="0.7" opacity="0.18"/>
      ))}
    </svg>
  )

  // December
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <Stars/>
      {[[30,30],[80,15],[120,45],[180,20],[230,38],[280,12],[330,30],[370,22],[60,60],[150,55],[250,65],[320,50],[10,70],[200,80]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity={0.25+i%3*0.15}>
          <circle cx="0" cy="0" r="1.5" fill="white"/>
          <line x1="-4" y1="0" x2="4" y2="0" stroke="white" strokeWidth="0.8"/>
          <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth="0.8"/>
          <line x1="-3" y1="-3" x2="3" y2="3" stroke="white" strokeWidth="0.6"/>
          <line x1="3" y1="-3" x2="-3" y2="3" stroke="white" strokeWidth="0.6"/>
        </g>
      ))}
      <path d="M0,150 Q200,140 400,150 L400,200 L0,200 Z" fill="#0c1a28" opacity="0.95"/>
      <path d="M0,152 Q200,142 400,152" stroke="white" strokeWidth="2" fill="none" opacity="0.2"/>
      <rect x="150" y="135" width="100" height="55" fill="#0d2438" opacity="0.95"/>
      <polygon points="140,135 200,100 260,135" fill="#0a1a2a" opacity="0.95"/>
      <path d="M140,135 Q200,100 260,135" stroke="white" strokeWidth="3" fill="none" opacity="0.35" strokeLinecap="round"/>
      <rect x="170" y="148" width="25" height="22" rx="2" fill="#ffcc44" opacity="0.85"/>
      <rect x="205" y="148" width="25" height="22" rx="2" fill="#ffcc44" opacity="0.85"/>
      <ellipse cx="183" cy="188" rx="18" ry="5" fill="#ffcc44" opacity="0.1"/>
      <ellipse cx="218" cy="188" rx="18" ry="5" fill="#ffcc44" opacity="0.1"/>
      <rect x="190" y="162" width="20" height="28" rx="2" fill="#1a3048" opacity="0.9"/>
      <path d="M220,100 Q225,88 218,78 Q213,68 220,58" stroke="#4a6a80" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.35"/>
    </svg>
  )
}

export default function HeroPanel({ month, year }) {
  const data = MONTH_DATA[month] || MONTH_DATA[11]
  const p = data.palette
  const bgGradient = `linear-gradient(160deg, ${p.bg[0]} 0%, ${p.bg[1]} 50%, ${p.bg[2]} 100%)`

  return (
    <div style={{
      borderRadius: '1.25rem',
      overflow: 'hidden',
      position: 'relative',
      height: 200,
      minHeight: 200,
      background: bgGradient,
      flexShrink: 0,
    }}>
      <MonthScene month={month} palette={p} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
        opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute', zIndex: 2,
        bottom: 0, left: 0, right: 0,
        padding: '1.5rem 2rem',
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
      }}>
        <div style={{
          fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#ffffff',
          lineHeight: 1,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          {data.name} <span style={{ opacity: 0.55, fontWeight: 300 }}>{year}</span>
        </div>
      </div>
    </div>
  )
}
