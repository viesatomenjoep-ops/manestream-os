"use client";
import { useState } from "react";

const C = {
  orange: '#f56e2e', orangeHov: '#e05a1e', orangeDim: '#f56e2e22',
  bg: '#09090b', surface: '#111113', card: '#18181b', cardHov: '#1f1f23',
  border: '#2d2d32', borderLight: '#3a3a42',
  text: '#f4f4f5', muted: '#8b8b9a', dim: '#52525e',
  green: '#22c55e', greenBg: '#0d2016',
  red: '#f87171', redBg: '#1f0d0d',
  amber: '#fbbf24', amberBg: '#1f1608',
  blue: '#60a5fa', blueBg: '#0b1523',
  purple: '#a78bfa', purpleBg: '#120f1f',
};

const HORSES = [
  { id:'H001', name:'Quantum Leap', breed:'KWPN', age:8, col:'Bay', owner:'Sophie van den Berg', email:'sophie@vdb.nl', from:'Amsterdam, NL', to:'Wellington, FL', flight:'MS-2026-041', status:'in_flight', dc:6, dt:6 },
  { id:'H002', name:'Grand Finale', breed:'Oldenburg', age:12, col:'Chestnut', owner:'James Whitfield', email:'j.whitfield@eq.com', from:'Wellington, FL', to:'Weerselo, NL', flight:'MS-2026-042', status:'pre_flight', dc:3, dt:5 },
  { id:'H003', name:'Black Pearl', breed:'Hanoverian', age:6, col:'Black', owner:'Camille Dubois', email:'c.dubois@equi.fr', from:'Paris, FR', to:'New York, NY', flight:'MS-2026-043', status:'docs_pending', dc:1, dt:5 },
  { id:'H004', name:'Silver Storm', breed:'Belgian WB', age:10, col:'Grey', owner:'Marcus Klein', email:'m.klein@horses.de', from:'Düsseldorf, DE', to:'Miami, FL', flight:'MS-2026-039', status:'delivered', dc:5, dt:5 },
  { id:'H005', name:'Mystique', breed:'KWPN', age:5, col:'Darkbay', owner:'Isabella Torres', email:'i.torres@eq.es', from:'Madrid, ES', to:'Los Angeles, CA', flight:null, status:'booking', dc:0, dt:5 },
  { id:'H006', name:'Force Majeure', breed:'Selle Français', age:9, col:'Bay', owner:'Thomas Laurent', email:'t.laurent@ecuries.fr', from:'Lyon, FR', to:'Wellington, FL', flight:'MS-2026-044', status:'docs_pending', dc:2, dt:5 },
];

const DOC_TYPES = [
  { type:'passport', name:'Paardenpaspoort', note:'UELN + microchip' },
  { type:'health', name:'Gezondheidscertificaat', note:'Max 10 dgn voor vluchtt' },
  { type:'coggins', name:'Coggins Test (EIA)', note:'Negatief vereist' },
  { type:'usda', name:'USDA Endorsement', note:'Federale goedkeuring VS' },
  { type:'export', name:'Exportvergunning', note:'NVWA / BMEL / DDPP' },
  { type:'vaccine', name:'Vaccinatiepaspoort', note:'Optioneel maar aanbevolen' },
];

const INIT_DOCS = {
  H001: [
    {type:'passport',s:'signed',date:'18 mei',sig:'Dr. van Houten'},
    {type:'health',s:'signed',date:'19 mei',sig:'Dr. van Houten'},
    {type:'coggins',s:'signed',date:'20 mei',sig:'Lab NL'},
    {type:'usda',s:'signed',date:'21 mei',sig:'USDA Office'},
    {type:'export',s:'signed',date:'22 mei',sig:'NVWA'},
    {type:'vaccine',s:'signed',date:'17 mei',sig:'Dr. van Houten'},
  ],
  H002: [
    {type:'passport',s:'signed',date:'20 mei',sig:'Dr. Smith'},
    {type:'health',s:'signed',date:'21 mei',sig:'Dr. Smith'},
    {type:'coggins',s:'pending',date:'23 mei',sig:null},
    {type:'usda',s:'missing',date:null,sig:null},
    {type:'export',s:'missing',date:null,sig:null},
  ],
  H003: [
    {type:'passport',s:'uploaded',date:'24 mei',sig:null},
    {type:'health',s:'missing',date:null,sig:null},
    {type:'coggins',s:'missing',date:null,sig:null},
    {type:'usda',s:'missing',date:null,sig:null},
    {type:'export',s:'missing',date:null,sig:null},
  ],
  H004: [
    {type:'passport',s:'signed',date:'10 mei',sig:'Dr. Brauer'},
    {type:'health',s:'signed',date:'11 mei',sig:'Dr. Brauer'},
    {type:'coggins',s:'signed',date:'12 mei',sig:'Lab DE'},
    {type:'usda',s:'signed',date:'13 mei',sig:'USDA Frankfurt'},
    {type:'export',s:'signed',date:'14 mei',sig:'BMEL'},
  ],
  H005: [],
  H006: [
    {type:'passport',s:'signed',date:'22 mei',sig:'Dr. Martin'},
    {type:'health',s:'uploaded',date:'24 mei',sig:null},
    {type:'coggins',s:'missing',date:null,sig:null},
    {type:'usda',s:'missing',date:null,sig:null},
    {type:'export',s:'missing',date:null,sig:null},
  ],
};

const FLIGHTS = [
  {id:'MS-2026-041', route:'AMS → MIA', horseId:'H001', horse:'Quantum Leap', groom:'Emily Sanders', status:'in_flight', dep:'25 mei, 06:00', arr:'25 mei, 14:30', prog:65},
  {id:'MS-2026-042', route:'MIA → AMS', horseId:'H002', horse:'Grand Finale', groom:'Emily Sanders', status:'pre_flight', dep:'28 mei, 09:00', arr:'28 mei, 23:00', prog:0},
  {id:'MS-2026-043', route:'CDG → JFK', horseId:'H003', horse:'Black Pearl', groom:'TBD', status:'docs_pending', dep:'3 jun, 11:00', arr:'3 jun, 15:00', prog:0},
  {id:'MS-2026-044', route:'LYS → MIA', horseId:'H006', horse:'Force Majeure', groom:'TBD', status:'docs_pending', dep:'7 jun, 08:00', arr:'7 jun, 16:00', prog:0},
];

const STATUS = {
  in_flight:    {label:'In vlucht',       color:C.blue,  bg:C.blueBg},
  pre_flight:   {label:'Pre-vlucht',      color:C.amber, bg:C.amberBg},
  docs_pending: {label:'Docs ontbreken',  color:C.red,   bg:C.redBg},
  delivered:    {label:'Afgeleverd',      color:C.green, bg:C.greenBg},
  booking:      {label:'Boeking',         color:C.orange,bg:C.orangeDim},
};

const DOC_STATUS = {
  signed:  {label:'Ondertekend', color:C.green, bg:C.greenBg},
  uploaded:{label:'Geüpload',    color:C.blue,  bg:C.blueBg},
  pending: {label:'Handtekening nodig', color:C.amber, bg:C.amberBg},
  missing: {label:'Ontbreekt',   color:C.red,   bg:C.redBg},
};

// ─── UI primitives ───────────────────────────────────────────────────────────

const Chip = ({label,color,bg}) => (
  <span style={{fontSize:11,fontWeight:600,letterSpacing:.4,padding:'3px 9px',borderRadius:99,color,background:bg,textTransform:'uppercase',whiteSpace:'nowrap'}}>{label}</span>
);

const Btn = ({children,onClick,variant='primary',size='md',disabled}) => {
  const pad = size==='sm' ? '5px 12px' : size==='lg' ? '12px 28px' : '8px 18px';
  const fs = size==='sm' ? 12 : size==='lg' ? 15 : 13;
  const styles = {
    primary:  {background:C.orange,color:'#fff',border:'none'},
    outline:  {background:'transparent',color:C.text,border:`1px solid ${C.border}`},
    ghost:    {background:'transparent',color:C.muted,border:'none'},
    danger:   {background:C.redBg,color:C.red,border:`1px solid ${C.red}30`},
    success:  {background:C.greenBg,color:C.green,border:`1px solid ${C.green}30`},
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{...styles[variant],padding:pad,fontSize:fs,fontWeight:500,borderRadius:8,cursor:disabled?'not-allowed':'pointer',opacity:disabled?.5:1,fontFamily:'inherit',transition:'all .15s'}}>
      {children}
    </button>
  );
};

const Card = ({children,style,onClick}) => (
  <div onClick={onClick} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:'16px 20px',cursor:onClick?'pointer':'default',transition:'border-color .15s',':hover':{borderColor:C.borderLight},...style}}>
    {children}
  </div>
);

const Bar = ({value,max,color=C.orange}) => (
  <div style={{height:4,borderRadius:2,background:C.border,overflow:'hidden'}}>
    <div style={{height:'100%',width:`${Math.round((value/max)*100)}%`,background:color,borderRadius:2,transition:'width .4s'}} />
  </div>
);

const Toast = ({msg,type='success'}) => (
  <div style={{position:'fixed',bottom:24,right:24,background:type==='success'?C.greenBg:C.redBg,border:`1px solid ${type==='success'?C.green:C.red}40`,color:type==='success'?C.green:C.red,padding:'12px 20px',borderRadius:10,fontSize:13,fontWeight:500,zIndex:9999,maxWidth:360,boxShadow:'0 8px 32px rgba(0,0,0,.5)'}}>
    {msg}
  </div>
);

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const NAV = [
  {id:'dashboard', icon:'⬡', label:'Dashboard'},
  {id:'horses',    icon:'◈', label:'Paarden'},
  {id:'flights',   icon:'◎', label:'Vluchten'},
  {id:'vault',     icon:'◫', label:'Digitale Kluis'},
  {id:'invoicing', icon:'€', label:'Invoicing'},
  {id:'plan',      icon:'◻', label:'Technisch Plan'},
];

function Sidebar({view, setView, onBook}) {
  return (
    <div style={{width:220,background:C.surface,borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',flexShrink:0}}>
      <div style={{padding:'20px 20px 16px',borderBottom:`1px solid ${C.border}`}}>
        <div style={{fontSize:18,fontWeight:700,letterSpacing:-.3,color:C.text}}>
          <span style={{color:C.orange}}>Mane</span>stream
        </div>
        <div style={{fontSize:11,color:C.dim,marginTop:2,letterSpacing:.5}}>OPERATIONS OS · v1.0</div>
      </div>

      <div style={{padding:'12px 12px',flex:1}}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setView(n.id)} style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'9px 12px',borderRadius:8,border:'none',background:view===n.id?C.orangeDim:'transparent',color:view===n.id?C.orange:C.muted,fontSize:13,fontWeight:view===n.id?600:400,cursor:'pointer',fontFamily:'inherit',marginBottom:2,transition:'all .15s'}}>
            <span style={{fontSize:16,lineHeight:1}}>{n.icon}</span>
            {n.label}
          </button>
        ))}

        <div style={{margin:'16px 0 8px',borderTop:`1px solid ${C.border}`}} />
        <button onClick={onBook} style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'9px 12px',borderRadius:8,border:`1px dashed ${C.orange}50`,background:C.orangeDim,color:C.orange,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all .15s'}}>
          <span style={{fontSize:16}}>＋</span>
          Nieuwe Boeking
        </button>
      </div>

      <div style={{padding:'12px 16px 16px',borderTop:`1px solid ${C.border}`}}>
        <div style={{fontSize:11,color:C.dim,marginBottom:6}}>INGELOGD ALS</div>
        <div style={{fontSize:13,color:C.text,fontWeight:500}}>Lois de Kramer</div>
        <div style={{fontSize:11,color:C.muted}}>Global Ops Manager</div>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function DashboardView({horses, flights, onHorse, showToast}) {
  const alerts = [
    {type:'red', icon:'!', msg:'Grand Finale — Coggins handtekening ontbreekt', action:'→ Fix', hid:'H002'},
    {type:'red', icon:'!', msg:'Grand Finale — USDA & Exportvergunning ontbreken (vlucht 28 mei)', action:'→ Fix', hid:'H002'},
    {type:'amber', icon:'⏱', msg:'Black Pearl — 4/5 documenten ontbreken (vlucht 3 jun)', action:'→ Fix', hid:'H003'},
    {type:'amber', icon:'⏱', msg:'Force Majeure — Gezondheidscertificaat moet nog worden ondertekend', action:'→ Fix', hid:'H006'},
  ];

  return (
    <div style={{padding:28,maxWidth:1100}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>Dashboard</h1>
        <div style={{fontSize:13,color:C.muted,marginTop:2}}>Maandag 25 mei 2026 — 4 actieve zendingen</div>
      </div>

      {/* KPIs */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
        {[
          {label:'Actieve Vluchten', val:'4', sub:'1 momenteel in lucht', color:C.blue},
          {label:'Paarden Onderweg', val:'6', sub:'Europe ↔ North America', color:C.orange},
          {label:'Docs Compleet', val:'2/6', sub:'4 met ontbrekende stukken', color:C.amber},
          {label:'Docs in Vault', val:'18', sub:'Gedigitaliseerd & veilig', color:C.green},
        ].map(k => (
          <div key={k.label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:'14px 18px'}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:600,letterSpacing:.5,textTransform:'uppercase',marginBottom:8}}>{k.label}</div>
            <div style={{fontSize:28,fontWeight:700,color:k.color,letterSpacing:-1}}>{k.val}</div>
            <div style={{fontSize:11,color:C.dim,marginTop:4}}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:16}}>
        {/* Alerts */}
        <div>
          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:10,display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:8,height:8,borderRadius:99,background:C.red,display:'inline-block'}} />
            Actieve Waarschuwingen — Pijnpunten
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
            {alerts.map((a,i) => (
              <div key={i} style={{background:a.type==='red'?C.redBg:C.amberBg,border:`1px solid ${a.type==='red'?C.red:C.amber}25`,borderRadius:10,padding:'10px 14px',display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:16,color:a.type==='red'?C.red:C.amber,flexShrink:0}}>{a.icon}</span>
                <span style={{flex:1,fontSize:13,color:C.text}}>{a.msg}</span>
                <button onClick={()=>onHorse(horses.find(h=>h.id===a.hid))} style={{fontSize:12,color:a.type==='red'?C.red:C.amber,background:'transparent',border:'none',cursor:'pointer',fontWeight:600,fontFamily:'inherit',whiteSpace:'nowrap'}}>{a.action}</button>
              </div>
            ))}
          </div>

          {/* Active flight */}
          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:10,display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:8,height:8,borderRadius:99,background:C.blue,display:'inline-block',animation:'pulse 1.5s infinite'}} />
            Live vlucht nu
          </div>
          <div style={{background:C.card,border:`1px solid ${C.blue}30`,borderRadius:12,padding:'16px 20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:C.text}}>MS-2026-041 · AMS → MIA</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>Quantum Leap · Groom: Emily Sanders</div>
              </div>
              <Chip label="In vlucht" color={C.blue} bg={C.blueBg} />
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:C.muted,marginBottom:8}}>
              <span>Vertrek: 25 mei, 06:00</span>
              <span style={{fontWeight:600,color:C.blue}}>65% voltooid</span>
              <span>Aankomst: 25 mei, 14:30</span>
            </div>
            <Bar value={65} max={100} color={C.blue} />
          </div>
        </div>

        {/* Right panel: process + upcoming */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:2}}>Aankomende vluchten</div>
          {FLIGHTS.filter(f=>f.status!=='in_flight').map(f => (
            <div key={f.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:'12px 14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                <div style={{fontSize:13,fontWeight:600,color:C.text}}>{f.route}</div>
                <Chip label={STATUS[f.status].label} color={STATUS[f.status].color} bg={STATUS[f.status].bg} />
              </div>
              <div style={{fontSize:11,color:C.muted}}>{f.horse} · {f.dep}</div>
            </div>
          ))}

          <div style={{background:C.orangeDim,border:`1px solid ${C.orange}25`,borderRadius:10,padding:'14px 16px',marginTop:4}}>
            <div style={{fontSize:12,fontWeight:700,color:C.orange,letterSpacing:.4,marginBottom:8}}>SYSTEEM VOORDELEN</div>
            {['Alle docs automatisch naar vault','E-handtekening in 1 klik','Automatische checklist per vlucht','Camera-scan → direct gedigitaliseerd','Nooit meer een missende handtekening'].map(b => (
              <div key={b} style={{fontSize:12,color:C.text,display:'flex',gap:8,marginBottom:5}}>
                <span style={{color:C.green}}>✓</span>{b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Horses list ─────────────────────────────────────────────────────────────

function HorsesView({horses, onSelect}) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const filtered = horses.filter(h => {
    const q = search.toLowerCase();
    const match = !q || h.name.toLowerCase().includes(q) || h.owner.toLowerCase().includes(q);
    const sf = filter==='all' || h.status===filter;
    return match && sf;
  });

  return (
    <div style={{padding:28,maxWidth:1000}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>Paardenregister</h1>
          <div style={{fontSize:13,color:C.muted,marginTop:2}}>{horses.length} paarden actief</div>
        </div>
      </div>

      <div style={{display:'flex',gap:10,marginBottom:20}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Zoek paard of eigenaar..." style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px 14px',color:C.text,fontSize:13,fontFamily:'inherit',outline:'none'}} />
        <select value={filter} onChange={e=>setFilter(e.target.value)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px 14px',color:C.text,fontSize:13,fontFamily:'inherit',outline:'none',cursor:'pointer'}}>
          <option value="all">Alle statussen</option>
          {Object.entries(STATUS).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {filtered.map(h => {
          const st = STATUS[h.status];
          const pct = h.dt>0 ? Math.round((h.dc/h.dt)*100) : 0;
          return (
            <div key={h.id} onClick={() => onSelect(h)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:'14px 20px',cursor:'pointer',transition:'border-color .15s,background .15s',display:'grid',gridTemplateColumns:'1fr 160px 160px 140px',gap:12,alignItems:'center'}}>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:C.text}}>{h.name}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>{h.breed} · {h.age} jaar · {h.col}</div>
                <div style={{fontSize:11,color:C.dim,marginTop:2}}>{h.owner}</div>
              </div>
              <div>
                <div style={{fontSize:11,color:C.muted,marginBottom:2}}>Route</div>
                <div style={{fontSize:12,color:C.text}}>{h.from}</div>
                <div style={{fontSize:12,color:C.orange}}>→ {h.to}</div>
              </div>
              <div>
                <div style={{fontSize:11,color:C.muted,marginBottom:4}}>Documenten {h.dc}/{h.dt}</div>
                <Bar value={h.dc} max={Math.max(h.dt,1)} color={pct===100?C.green:pct>50?C.amber:C.red} />
                <div style={{fontSize:11,color:pct===100?C.green:pct>50?C.amber:C.red,marginTop:3}}>{pct}% compleet</div>
              </div>
              <div style={{textAlign:'right'}}>
                <Chip label={st.label} color={st.color} bg={st.bg} />
                {h.flight && <div style={{fontSize:11,color:C.dim,marginTop:4}}>{h.flight}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Horse Profile ────────────────────────────────────────────────────────────

function HorseProfileView({horse, docs, onBack, onScan, onReqSig, onSign, scanning, showToast}) {
  const [activeTab, setActiveTab] = useState('docs');
  const st = STATUS[horse.status];
  const docsMap = {};
  docs.forEach(d => { docsMap[d.type] = d; });

  const allTypes = horse.dt === 6 ? DOC_TYPES : DOC_TYPES.slice(0,5);

  return (
    <div style={{padding:28,maxWidth:900}}>
      <button onClick={onBack} style={{background:'transparent',border:'none',color:C.muted,fontSize:13,cursor:'pointer',fontFamily:'inherit',marginBottom:16,display:'flex',alignItems:'center',gap:6}}>
        ← Terug naar paardenregister
      </button>

      {/* Header */}
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:'20px 24px',marginBottom:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div style={{display:'flex',gap:16,alignItems:'center'}}>
            <div style={{width:56,height:56,borderRadius:12,background:C.orangeDim,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>🐴</div>
            <div>
              <div style={{fontSize:20,fontWeight:700,letterSpacing:-.3,color:C.text}}>{horse.name}</div>
              <div style={{fontSize:13,color:C.muted,marginTop:2}}>{horse.breed} · {horse.age} jaar · {horse.col}</div>
              <div style={{fontSize:12,color:C.dim,marginTop:1}}>Eigenaar: {horse.owner}</div>
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <Chip label={st.label} color={st.color} bg={st.bg} />
            {horse.flight && <div style={{fontSize:11,color:C.dim,marginTop:4}}>{horse.flight}</div>}
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:16,paddingTop:16,borderTop:`1px solid ${C.border}`}}>
          {[
            {label:'Van', val:horse.from},
            {label:'Naar', val:horse.to},
            {label:'Documenten', val:`${horse.dc}/${horse.dt} compleet`},
          ].map(f=>(
            <div key={f.label}>
              <div style={{fontSize:11,color:C.dim,letterSpacing:.4,textTransform:'uppercase',marginBottom:3}}>{f.label}</div>
              <div style={{fontSize:13,fontWeight:500,color:C.text}}>{f.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,marginBottom:16}}>
        {[['docs','Documenten & Kluis'],['info','Reisinfo'],['history','Activiteit']].map(([id,label]) => (
          <button key={id} onClick={()=>setActiveTab(id)} style={{padding:'7px 16px',borderRadius:8,border:`1px solid ${activeTab===id?C.orange:C.border}`,background:activeTab===id?C.orangeDim:'transparent',color:activeTab===id?C.orange:C.muted,fontSize:13,fontWeight:activeTab===id?600:400,cursor:'pointer',fontFamily:'inherit'}}>
            {label}
          </button>
        ))}
      </div>

      {activeTab==='docs' && (
        <div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <div style={{fontSize:13,color:C.muted}}>Alle vereiste documenten voor transport</div>
            <div style={{fontSize:12,color:C.dim}}>Vault: Cloudinary + Supabase</div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {allTypes.map(dt => {
              const d = docsMap[dt.type];
              const s = d ? DOC_STATUS[d.s] : DOC_STATUS.missing;
              const isMissing = !d || d.s==='missing';
              const isPending = d && d.s==='pending';
              const isUploaded = d && d.s==='uploaded';
              const isSigned = d && d.s==='signed';
              const isScanning = scanning && scanning.horseId===horse.id && scanning.docType===dt.type;

              return (
                <div key={dt.type} style={{background:C.card,border:`1px solid ${isMissing?C.red+'25':isPending?C.amber+'25':C.border}`,borderRadius:10,padding:'12px 16px',display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:36,height:36,borderRadius:8,background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:s.color,flexShrink:0}}>
                    {isSigned?'✓':isUploaded?'↑':isPending?'✎':'!'}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:C.text}}>{dt.name}</div>
                    <div style={{fontSize:11,color:C.dim,marginTop:1}}>{dt.note}</div>
                    {d?.sig && <div style={{fontSize:11,color:C.green,marginTop:1}}>✓ {d.sig} · {d.date}</div>}
                    {d?.date && !d?.sig && <div style={{fontSize:11,color:C.blue,marginTop:1}}>Geüpload {d.date}</div>}
                  </div>
                  <Chip label={s.label} color={s.color} bg={s.bg} />
                  <div style={{display:'flex',gap:6,flexShrink:0}}>
                    {isScanning && (
                      <div style={{fontSize:12,color:C.orange,padding:'5px 12px',borderRadius:6,background:C.orangeDim}}>Scannen...</div>
                    )}
                    {isMissing && !isScanning && (
                      <Btn size="sm" variant="outline" onClick={()=>onScan(horse.id, dt.type)}>📷 Scan</Btn>
                    )}
                    {isUploaded && (
                      <Btn size="sm" variant="outline" onClick={()=>onReqSig(horse.id, dt.type)}>✎ Handtekening aanvragen</Btn>
                    )}
                    {isPending && (
                      <Btn size="sm" variant="success" onClick={()=>onSign(horse.id, dt.type)}>✓ Digitaal ondertekenen</Btn>
                    )}
                    {isSigned && (
                      <Btn size="sm" variant="ghost" onClick={()=>showToast('Document geopend vanuit Digital Vault')}>↓ Downloaden</Btn>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{marginTop:16,padding:'12px 16px',background:C.purpleBg,border:`1px solid ${C.purple}25`,borderRadius:10}}>
            <div style={{fontSize:12,fontWeight:600,color:C.purple,marginBottom:6}}>Digital Vault · Supabase Storage + Cloudinary</div>
            <div style={{fontSize:12,color:C.muted}}>
              Alle ondertekende documenten worden automatisch versleuteld opgeslagen. Toegang op basis van rol. Audit trail van elke actie. Nooit meer een lost PDF.
            </div>
          </div>
        </div>
      )}

      {activeTab==='info' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {[
            {label:'Eigenaar', val:horse.owner},
            {label:'Email', val:horse.email},
            {label:'Vertreklocatie', val:horse.from},
            {label:'Bestemming', val:horse.to},
            {label:'Vlucht ID', val:horse.flight || 'Nog niet geboekt'},
            {label:'Status', val:STATUS[horse.status].label},
          ].map(f=>(
            <div key={f.label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:'12px 16px'}}>
              <div style={{fontSize:11,color:C.dim,letterSpacing:.4,textTransform:'uppercase',marginBottom:4}}>{f.label}</div>
              <div style={{fontSize:13,color:C.text}}>{f.val}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab==='history' && (
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {[
            {time:'2026-05-25 09:14', user:'Lois de Kramer', action:'Document Quantum Leap - Export Permit gedownload'},
            {time:'2026-05-24 16:30', user:'Jet Eppink', action:'Nieuw document geüpload: Paspoort Black Pearl'},
            {time:'2026-05-23 11:05', user:'Linn Hofsté', action:'Handtekening aangevraagd: Coggins Grand Finale'},
            {time:'2026-05-22 14:22', user:'Systeem', action:'Automatische checklist aangemaakt voor MS-2026-043'},
            {time:'2026-05-21 09:00', user:'Lois de Kramer', action:'USDA Endorsement Quantum Leap ondertekend & gearchiveerd'},
          ].map((l,i)=>(
            <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'10px 14px',display:'flex',gap:12,alignItems:'center'}}>
              <div style={{fontSize:11,color:C.dim,minWidth:120}}>{l.time}</div>
              <div style={{width:1,height:20,background:C.border}} />
              <div style={{fontSize:12,color:C.muted,minWidth:100}}>{l.user}</div>
              <div style={{fontSize:12,color:C.text}}>{l.action}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Flights view ─────────────────────────────────────────────────────────────

function FlightsView({flights, horses, onHorse}) {
  return (
    <div style={{padding:28,maxWidth:900}}>
      <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text,marginBottom:4}}>Vluchten</h1>
      <div style={{fontSize:13,color:C.muted,marginBottom:20}}>{flights.length} vluchten gepland of actief</div>

      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {flights.map(f => {
          const st = STATUS[f.status];
          const h = horses.find(x=>x.id===f.horseId);
          const pct = h ? Math.round((h.dc/Math.max(h.dt,1))*100) : 0;
          return (
            <div key={f.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:'18px 22px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <div style={{fontSize:16,fontWeight:700,color:C.text}}>{f.id}</div>
                    <div style={{fontSize:18,fontWeight:700,color:C.orange}}>{f.route}</div>
                  </div>
                  <div style={{fontSize:13,color:C.muted,marginTop:3}}>{f.horse} · Groom: {f.groom}</div>
                </div>
                <Chip label={st.label} color={st.color} bg={st.bg} />
              </div>

              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:14}}>
                {[
                  {label:'Vertrek', val:f.dep},
                  {label:'Aankomst', val:f.arr},
                  {label:'Documenten', val:`${h?.dc||0}/${h?.dt||5} (${pct}%)`},
                ].map(x=>(
                  <div key={x.label}>
                    <div style={{fontSize:11,color:C.dim,textTransform:'uppercase',letterSpacing:.4,marginBottom:3}}>{x.label}</div>
                    <div style={{fontSize:13,color:C.text}}>{x.val}</div>
                  </div>
                ))}
              </div>

              {f.status==='in_flight' && (
                <div style={{marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:C.muted,marginBottom:4}}>
                    <span>AMS</span>
                    <span style={{color:C.blue,fontWeight:600}}>✈ {f.prog}% voltooid</span>
                    <span>MIA</span>
                  </div>
                  <Bar value={f.prog} max={100} color={C.blue} />
                </div>
              )}

              {pct < 100 && (
                <div style={{padding:'8px 12px',background:C.redBg,border:`1px solid ${C.red}25`,borderRadius:8,fontSize:12,color:C.red,marginBottom:10}}>
                  ⚠ Documenten niet compleet — vlucht kan vertraging oplopen
                </div>
              )}

              <div style={{display:'flex',gap:8}}>
                <Btn size="sm" variant="outline" onClick={()=>onHorse(f.horseId)}>Paard bekijken</Btn>
                <Btn size="sm" variant="outline" onClick={()=>{}}>Documenten checken</Btn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Vault ───────────────────────────────────────────────────────────────────

function VaultView({horses, horseDocs, onHorse}) {
  const total = Object.values(horseDocs).flat().length;
  const signed = Object.values(horseDocs).flat().filter(d=>d.s==='signed').length;
  const missing = Object.values(horseDocs).flat().filter(d=>d.s==='missing').length;
  const pending = Object.values(horseDocs).flat().filter(d=>d.s==='pending').length;

  return (
    <div style={{padding:28,maxWidth:900}}>
      <div style={{marginBottom:20}}>
        <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>Digitale Kluis</h1>
        <div style={{fontSize:13,color:C.muted,marginTop:2}}>Versleuteld archief · Cloudinary + Supabase Storage</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:20}}>
        {[
          {label:'Totaal docs', val:total, color:C.text},
          {label:'Ondertekend', val:signed, color:C.green},
          {label:'Ontbreekt', val:missing, color:C.red},
          {label:'Handtekening nodig', val:pending, color:C.amber},
        ].map(k=>(
          <div key={k.label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:'12px 16px'}}>
            <div style={{fontSize:11,color:C.muted,textTransform:'uppercase',letterSpacing:.4,marginBottom:6}}>{k.label}</div>
            <div style={{fontSize:24,fontWeight:700,color:k.color}}>{k.val}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {horses.filter(h => (horseDocs[h.id]||[]).length > 0).map(horse => {
          const docs = horseDocs[horse.id] || [];
          return (
            <div key={horse.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:'14px 18px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div style={{fontSize:14,fontWeight:600,color:C.text}}>{horse.name} <span style={{color:C.dim,fontWeight:400,fontSize:12}}>· {horse.from} → {horse.to}</span></div>
                <button onClick={()=>onHorse(horse)} style={{fontSize:12,color:C.orange,background:'transparent',border:'none',cursor:'pointer',fontFamily:'inherit'}}>Details →</button>
              </div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {docs.map(d => {
                  const dt = DOC_TYPES.find(x=>x.type===d.type);
                  const ds = DOC_STATUS[d.s];
                  return (
                    <div key={d.type} style={{display:'flex',alignItems:'center',gap:5,background:ds.bg,border:`1px solid ${ds.color}25`,borderRadius:6,padding:'4px 9px'}}>
                      <span style={{fontSize:10,color:ds.color}}>{d.s==='signed'?'✓':d.s==='uploaded'?'↑':d.s==='pending'?'✎':'!'}</span>
                      <span style={{fontSize:11,color:C.text}}>{dt?.name || d.type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Invoicing ────────────────────────────────────────────────────────────────

function InvoicingView({horses, flights}) {
  const [currency, setCurrency] = useState('EUR');
  const [lang, setLang] = useState('en');
  
  const t = {
    en: {
      title: 'Invoicing',
      subtitle: 'Generate and manage invoices for flights',
      invNum: 'Invoice #',
      date: 'Date',
      client: 'Client',
      flight: 'Flight Route',
      desc: 'Description',
      amt: 'Amount',
      total: 'Total',
      genBtn: 'Generate Invoice',
      payStatus: 'Payment Status',
      paid: 'Paid',
      pending: 'Pending',
      curr: 'Currency',
      lang: 'Language',
      flightCosts: 'Flight Costs',
      exportDocs: 'Export Documents',
      vetFees: 'Veterinary Fees',
      handling: 'Handling & Ground Transport'
    },
    es: {
      title: 'Facturación',
      subtitle: 'Generar y gestionar facturas de vuelos',
      invNum: 'Factura #',
      date: 'Fecha',
      client: 'Cliente',
      flight: 'Ruta del Vuelo',
      desc: 'Descripción',
      amt: 'Monto',
      total: 'Total',
      genBtn: 'Generar Factura',
      payStatus: 'Estado de Pago',
      paid: 'Pagado',
      pending: 'Pendiente',
      curr: 'Moneda',
      lang: 'Idioma',
      flightCosts: 'Costos de Vuelo',
      exportDocs: 'Documentos de Exportación',
      vetFees: 'Honorarios Veterinarios',
      handling: 'Manejo y Transporte Terrestre'
    }
  };

  const currentT = t[lang];
  const rate = currency === 'USD' ? 1.08 : 1;
  const formatMoney = (amount) => {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-ES', { style: 'currency', currency: currency }).format(amount * rate);
  };

  const invoiceData = [
    { desc: currentT.flightCosts, amt: 8500 },
    { desc: currentT.exportDocs, amt: 450 },
    { desc: currentT.vetFees, amt: 300 },
    { desc: currentT.handling, amt: 650 },
  ];

  const totalAmt = invoiceData.reduce((acc, val) => acc + val.amt, 0);

  return (
    <div style={{padding:28,maxWidth:900}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>{currentT.title}</h1>
          <div style={{fontSize:13,color:C.muted,marginTop:2}}>{currentT.subtitle}</div>
        </div>
        <div style={{display:'flex',gap:12}}>
          <select value={currency} onChange={e=>setCurrency(e.target.value)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'8px 12px',color:C.text,fontSize:13,outline:'none',cursor:'pointer'}}>
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
          </select>
          <select value={lang} onChange={e=>setLang(e.target.value)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'8px 12px',color:C.text,fontSize:13,outline:'none',cursor:'pointer'}}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:'28px',marginBottom:24}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:28,paddingBottom:28,borderBottom:`1px solid ${C.border}`}}>
          <div>
            <div style={{fontSize:24,fontWeight:800,letterSpacing:-.5,color:C.orange,marginBottom:8}}>MANESTREAM</div>
            <div style={{fontSize:13,color:C.muted,lineHeight:1.5}}>Amsterdam, The Netherlands<br/>info@manestream.com</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontSize:18,fontWeight:600,color:C.text,marginBottom:8}}>{currentT.invNum} INV-2026-089</div>
            <div style={{fontSize:13,color:C.muted,lineHeight:1.5}}>{currentT.date}: 25 May 2026<br/>{currentT.payStatus}: <span style={{color:C.amber,fontWeight:600}}>{currentT.pending}</span></div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:32}}>
          <div>
            <div style={{fontSize:11,color:C.dim,textTransform:'uppercase',letterSpacing:.5,marginBottom:6}}>{currentT.client}</div>
            <div style={{fontSize:14,fontWeight:600,color:C.text}}>Sophie van den Berg</div>
            <div style={{fontSize:13,color:C.muted,marginTop:2}}>sophie@vdb.nl</div>
          </div>
          <div>
            <div style={{fontSize:11,color:C.dim,textTransform:'uppercase',letterSpacing:.5,marginBottom:6}}>{currentT.flight}</div>
            <div style={{fontSize:14,fontWeight:600,color:C.text}}>MS-2026-041 (AMS → MIA)</div>
            <div style={{fontSize:13,color:C.muted,marginTop:2}}>Horse: Quantum Leap</div>
          </div>
        </div>

        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{borderBottom:`1px solid ${C.borderLight}`}}>
              <th style={{textAlign:'left',padding:'12px 0',fontSize:11,color:C.dim,fontWeight:600,textTransform:'uppercase',letterSpacing:.5}}>{currentT.desc}</th>
              <th style={{textAlign:'right',padding:'12px 0',fontSize:11,color:C.dim,fontWeight:600,textTransform:'uppercase',letterSpacing:.5}}>{currentT.amt}</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((item, i) => (
              <tr key={i} style={{borderBottom:`1px solid ${C.border}40`}}>
                <td style={{padding:'16px 0',fontSize:13,color:C.text}}>{item.desc}</td>
                <td style={{padding:'16px 0',fontSize:13,fontWeight:500,color:C.text,textAlign:'right'}}>{formatMoney(item.amt)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td style={{padding:'20px 0',fontSize:14,fontWeight:600,color:C.text,textAlign:'right'}}>{currentT.total}:</td>
              <td style={{padding:'20px 0',fontSize:20,fontWeight:700,color:C.orange,textAlign:'right'}}>{formatMoney(totalAmt)}</td>
            </tr>
          </tfoot>
        </table>

        <div style={{marginTop:32,display:'flex',justifyContent:'flex-end'}}>
          <Btn variant="primary">{currentT.genBtn} (PDF)</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Tech Plan ───────────────────────────────────────────────────────────────

function PlanView() {
  const painPoints = [
    {icon:'📄', problem:'Papierwerk per PDF, met de hand ingevuld', now:'~4u per paard', solution:'Digitale formulieren + e-sign → automatisch opgeslagen'},
    {icon:'📷', problem:'Foto van document met telefoon maken', now:'Foutgevoelig, lagekwaliteit', solution:'Camera-scan functie met auto-crop & OCR'},
    {icon:'✍', problem:'Handtekeningen missen → vlucht vertraagd', now:'Terugbellen / emailen', solution:'E-handtekening via email link in 1 klik'},
    {icon:'🗂', problem:'Documenten verspreid in emails & mappen', now:'Chaos bij controle', solution:'Centrale digitale kluis per paard per vlucht'},
    {icon:'🔄', problem:'Geen status per document', now:'Handmatig bijhouden', solution:'Automatische statustracking per doc'},
    {icon:'💸', problem:'Eén factuur handmatig samengesteld', now:'~2u per zending', solution:'Automatische kostenregistratie → factuur-generator'},
  ];

  const stack = [
    {cat:'Frontend', items:['React / Next.js 14', 'Tailwind CSS', 'Framer Motion']},
    {cat:'Backend', items:['Supabase (Postgres + Auth)', 'Supabase Storage', 'Edge Functions']},
    {cat:'Documenten', items:['Cloudinary (scan/foto upload)', 'PDF-lib (document generatie)', 'DocuSign / Sign.plus (e-sign)']},
    {cat:'Integraties', items:['Twilio (SMS alerts)', 'SendGrid (email flows)', 'Zapier (workflows)']},
    {cat:'Infra', items:['Vercel hosting', 'Supabase cloud', 'Cloudinary CDN']},
  ];

  return (
    <div style={{padding:28,maxWidth:900}}>
      <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text,marginBottom:4}}>Technisch Plan</h1>
      <div style={{fontSize:13,color:C.muted,marginBottom:24}}>Van papierwerk naar volledig digitale operatie</div>

      <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:12}}>Pijnpunten → Oplossingen</div>
      <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:28}}>
        {painPoints.map(p=>(
          <div key={p.problem} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:'12px 16px',display:'grid',gridTemplateColumns:'32px 1fr 120px 1fr',gap:12,alignItems:'center'}}>
            <span style={{fontSize:18}}>{p.icon}</span>
            <div>
              <div style={{fontSize:13,color:C.text}}>{p.problem}</div>
              <div style={{fontSize:11,color:C.red,marginTop:2}}>{p.now}</div>
            </div>
            <div style={{textAlign:'center',fontSize:18,color:C.orange}}>→</div>
            <div style={{fontSize:12,color:C.green}}>{p.solution}</div>
          </div>
        ))}
      </div>

      <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:12}}>Tech Stack</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:28}}>
        {stack.map(s=>(
          <div key={s.cat} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:'12px 16px'}}>
            <div style={{fontSize:11,fontWeight:600,color:C.orange,letterSpacing:.5,textTransform:'uppercase',marginBottom:8}}>{s.cat}</div>
            {s.items.map(i=><div key={i} style={{fontSize:12,color:C.text,marginBottom:4}}>· {i}</div>)}
          </div>
        ))}
      </div>

      <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:12}}>Database Schema (Supabase / JSON)</div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:'16px 20px',fontFamily:'monospace',fontSize:11,color:C.muted,lineHeight:1.7}}>
        <div style={{color:C.orange}}>// horses</div>
        <div>{'{ id, name, breed, age, color, microchip, passport_nr, owner_id, created_at }'}</div>
        <div style={{marginTop:8,color:C.orange}}>// bookings</div>
        <div>{'{ id, horse_id, origin, destination, flight_id, status, groom_id, created_at }'}</div>
        <div style={{marginTop:8,color:C.orange}}>// documents</div>
        <div>{'{ id, horse_id, booking_id, type, status, cloudinary_url, signed_by, signed_at, vault_path }'}</div>
        <div style={{marginTop:8,color:C.orange}}>// signature_requests</div>
        <div>{'{ id, document_id, requested_by, requested_to_email, token, status, completed_at }'}</div>
        <div style={{marginTop:8,color:C.orange}}>// flights</div>
        <div>{'{ id, route_from, route_to, departs_at, arrives_at, status, groom_id }'}</div>
        <div style={{marginTop:8,color:C.orange}}>// audit_log</div>
        <div>{'{ id, entity_type, entity_id, action, user_id, metadata, created_at }'}</div>
      </div>
    </div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────

function BookingModal({step, setStep, onClose, onComplete}) {
  const [form, setForm] = useState({ horse:'', breed:'', owner:'', email:'', from:'', to:'', date:'' });
  const upd = (k,v) => setForm(p=>({...p,[k]:v}));

  const steps = ['Paard info','Route & datum','Documenten checklist','Bevestigen'];

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.75)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,width:520,maxHeight:'85vh',overflowY:'auto',padding:28}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div style={{fontSize:16,fontWeight:700,color:C.text}}>Nieuwe Boeking</div>
          <button onClick={onClose} style={{background:'transparent',border:'none',color:C.muted,cursor:'pointer',fontSize:18}}>✕</button>
        </div>

        {/* Steps */}
        <div style={{display:'flex',gap:4,marginBottom:24}}>
          {steps.map((s,i)=>(
            <div key={i} style={{flex:1,textAlign:'center'}}>
              <div style={{width:24,height:24,borderRadius:99,background:i+1<=step?C.orange:C.card,border:`1px solid ${i+1<=step?C.orange:C.border}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 4px',fontSize:11,fontWeight:600,color:i+1<=step?'#fff':C.dim}}>{i+1}</div>
              <div style={{fontSize:10,color:i+1===step?C.orange:C.dim}}>{s}</div>
            </div>
          ))}
        </div>

        {step===1 && (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>Paard informatie</div>
            {[['horse','Naam paard','bijv. Quantum Leap'],['breed','Ras','bijv. KWPN'],['owner','Eigenaar','Volledige naam'],['email','Email eigenaar','contact@eigenaar.nl']].map(([k,l,ph])=>(
              <div key={k}>
                <label style={{fontSize:12,color:C.muted,display:'block',marginBottom:4}}>{l}</label>
                <input value={form[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} style={{width:'100%',background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px 12px',color:C.text,fontSize:13,fontFamily:'inherit',outline:'none'}} />
              </div>
            ))}
          </div>
        )}

        {step===2 && (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>Route & vertrektijd</div>
            {[['from','Van (ophaaladres)','Amsterdam, NL'],['to','Naar (bestemming)','Wellington, FL'],['date','Gewenste vertrekdatum','']].map(([k,l,ph])=>(
              <div key={k}>
                <label style={{fontSize:12,color:C.muted,display:'block',marginBottom:4}}>{l}</label>
                <input value={form[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} type={k==='date'?'date':'text'} style={{width:'100%',background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px 12px',color:C.text,fontSize:13,fontFamily:'inherit',outline:'none'}} />
              </div>
            ))}
          </div>
        )}

        {step===3 && (
          <div>
            <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:12}}>Auto-gegenereerde documenten checklist</div>
            <div style={{padding:'10px 14px',background:C.orangeDim,border:`1px solid ${C.orange}25`,borderRadius:8,fontSize:12,color:C.orange,marginBottom:12}}>
              ✓ Systeem heeft automatisch een checklist aangemaakt op basis van de route
            </div>
            {DOC_TYPES.slice(0,5).map(dt=>(
              <div key={dt.type} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:20,height:20,borderRadius:4,border:`1px solid ${C.border}`,background:C.card}} />
                <div>
                  <div style={{fontSize:13,color:C.text}}>{dt.name}</div>
                  <div style={{fontSize:11,color:C.dim}}>{dt.note}</div>
                </div>
                <Chip label="Vereist" color={C.orange} bg={C.orangeDim} />
              </div>
            ))}
          </div>
        )}

        {step===4 && (
          <div>
            <div style={{padding:'16px',background:C.greenBg,border:`1px solid ${C.green}30`,borderRadius:10,marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:600,color:C.green,marginBottom:8}}>✓ Klaar om te bevestigen</div>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>
                Na bevestiging:<br/>
                · Boeking wordt aangemaakt in het systeem<br/>
                · Documenten checklist wordt gegenereerd<br/>
                · Email bevestiging naar eigenaar ({form.email || 'eigenaar@email.com'})<br/>
                · Team notificatie verstuurd<br/>
                · Digitale kluis map aangemaakt
              </div>
            </div>
          </div>
        )}

        <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
          <Btn variant="outline" onClick={step===1?onClose:()=>setStep(s=>s-1)}>{step===1?'Annuleren':'← Vorige'}</Btn>
          <Btn variant="primary" onClick={step===4?onComplete:()=>setStep(s=>s+1)}>{step===4?'✓ Bevestig boeking':'Volgende →'}</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ManestreamOS() {
  const [view, setView] = useState('dashboard');
  const [selHorse, setSelHorse] = useState(null);
  const [horses, setHorses] = useState(HORSES);
  const [horseDocs, setHorseDocs] = useState(INIT_DOCS);
  const [toast, setToast] = useState(null);
  const [scanning, setScanning] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const showToast = (msg, type='success') => {
    setToast({msg,type});
    setTimeout(()=>setToast(null), 3500);
  };

  const handleScan = (horseId, docType) => {
    setScanning({horseId, docType});
    setTimeout(() => {
      setScanning(null);
      setHorseDocs(prev => {
        const docs = [...(prev[horseId]||[])];
        const idx = docs.findIndex(d=>d.type===docType);
        const nd = {type:docType, s:'uploaded', date:'25 mei', sig:null};
        if(idx>=0) docs[idx]=nd; else docs.push(nd);
        return {...prev,[horseId]:docs};
      });
      setHorses(prev=>prev.map(h=>h.id!==horseId?h:{...h,dc:Math.min(h.dc+1,h.dt)}));
      showToast('📷 Document gescand en opgeslagen in Digital Vault');
    }, 2200);
  };

  const handleReqSig = (horseId, docType) => {
    setHorseDocs(prev=>{
      const docs=[...(prev[horseId]||[])];
      const idx=docs.findIndex(d=>d.type===docType);
      if(idx>=0) docs[idx]={...docs[idx],s:'pending'};
      return {...prev,[horseId]:docs};
    });
    showToast('✉ Handtekening aanvraag verstuurd via email');
  };

  const handleSign = (horseId, docType) => {
    setHorseDocs(prev=>{
      const docs=[...(prev[horseId]||[])];
      const idx=docs.findIndex(d=>d.type===docType);
      if(idx>=0) docs[idx]={...docs[idx],s:'signed',sig:'Digitaal geverifieerd',date:'25 mei'};
      return {...prev,[horseId]:docs};
    });
    setHorses(prev=>prev.map(h=>h.id!==horseId?h:{...h,dc:Math.min(h.dc+1,h.dt)}));
    showToast('✓ Document digitaal ondertekend & gearchiveerd in Vault');
  };

  const goHorse = (h) => { setSelHorse(h); setView('horse'); };

  return (
    <div style={{display:'flex',height:'100vh',background:C.bg,color:C.text,fontFamily:'"Helvetica Neue",system-ui,sans-serif',overflow:'hidden',position:'relative'}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:${C.surface}}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px}
        button,input,select{font-family:inherit}
        input::placeholder{color:${C.dim}}
      `}</style>

      <Sidebar view={view} setView={v=>{setView(v);setSelHorse(null);}} onBook={()=>{setBookingOpen(true);setBookingStep(1);}} />

      <div style={{flex:1,overflowY:'auto'}}>
        {view==='dashboard' && <DashboardView horses={horses} flights={FLIGHTS} onHorse={goHorse} showToast={showToast} />}
        {view==='horses' && <HorsesView horses={horses} onSelect={goHorse} />}
        {view==='horse' && selHorse && (
          <HorseProfileView
            horse={horses.find(h=>h.id===selHorse.id)||selHorse}
            docs={horseDocs[selHorse.id]||[]}
            onBack={()=>setView('horses')}
            onScan={handleScan}
            onReqSig={handleReqSig}
            onSign={handleSign}
            scanning={scanning}
            showToast={showToast}
          />
        )}
        {view==='flights' && <FlightsView flights={FLIGHTS} horses={horses} onHorse={id=>{const h=horses.find(x=>x.id===id);if(h)goHorse(h);}} />}
        {view==='vault' && <VaultView horses={horses} horseDocs={horseDocs} onHorse={goHorse} />}
        {view==='invoicing' && <InvoicingView horses={horses} flights={FLIGHTS} />}
        {view==='plan' && <PlanView />}
      </div>

      {bookingOpen && (
        <BookingModal
          step={bookingStep}
          setStep={setBookingStep}
          onClose={()=>setBookingOpen(false)}
          onComplete={()=>{setBookingOpen(false);showToast('✓ Nieuwe boeking aangemaakt! Checklist & kluis map gegenereerd.');}}
        />
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}
