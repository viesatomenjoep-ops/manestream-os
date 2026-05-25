"use client";
import { useState, useEffect } from "react";

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

export const TRANSLATIONS = {
  nl: {
    nav: { dashboard: 'Dashboard', horses: 'Paarden', flights: 'Vluchten', vault: 'Digitale Kluis', invoicing: 'Invoicing', staff: 'Personeel', plan: 'Technisch Plan' },
    ui: { newBooking: 'Nieuwe Boeking', loggedIn: 'INGELOGD ALS', role: 'Global Ops Manager', sysBenefits: 'SYSTEEM VOORDELEN' },
    status: { in_flight: 'In vlucht', pre_flight: 'Pre-vlucht', docs_pending: 'Docs ontbreken', delivered: 'Afgeleverd', booking: 'Boeking' },
    docStatus: { signed: 'Ondertekend', uploaded: 'Geüpload', pending: 'Handtekening nodig', missing: 'Ontbreekt' },
    kpis: { activeFlights: 'Actieve Vluchten', horsesTransit: 'Paarden Onderweg', docsComplete: 'Docs Compleet', docsVault: 'Docs in Vault', inAir: 'momenteel in lucht', euUs: 'Europe ↔ North America', missingParts: 'met ontbrekende stukken', digitized: 'Gedigitaliseerd & veilig' },
    dash: { date: 'Maandag 25 mei 2026', activeShipments: 'actieve zendingen', alerts: 'Actieve Waarschuwingen — Pijnpunten', fix: '→ Fix', liveFlight: 'Live vlucht nu', upcoming: 'Aankomende vluchten', dep: 'Vertrek', arr: 'Aankomst', completed: 'voltooid', groom: 'Groom', benefits: ['Alle docs automatisch naar vault','E-handtekening in 1 klik','Automatische checklist per vlucht','Camera-scan → direct gedigitaliseerd','Nooit meer een missende handtekening'] },
    horses: { title: 'Paardenregister', active: 'paarden actief', search: 'Zoek paard of eigenaar...', allStat: 'Alle statussen', route: 'Route', docs: 'Documenten', complete: 'compleet', year: 'jaar' },
    profile: { back: '← Terug naar paardenregister', owner: 'Eigenaar', email: 'Email', from: 'Van', to: 'Naar', tabs: { docs: 'Documenten & Kluis', info: 'Reisinfo', history: 'Activiteit' }, allReq: 'Alle vereiste documenten voor transport', vaultSub: 'Vault: Cloudinary + Viesa Automations', scanBtn: '📷 Scan', reqSigBtn: '✎ Handtekening aanvragen', signBtn: '✓ Digitaal ondertekenen', downBtn: '↓ Downloaden', scanning: 'Scannen...' },
    flights: { title: 'Vluchten', planned: 'vluchten gepland of actief', checkDocs: 'Documenten checken', viewHorse: 'Paard bekijken' },
    vault: { title: 'Digitale Kluis', sub: 'Versleuteld archief · Cloudinary + Viesa Automations', total: 'Totaal docs' },
    staff: { title: 'Personeelsbeheer', sub: 'Beheer toegang en inloggegevens voor het team', name: 'Naam', email: 'E-mailadres', phone: 'Telefoon', role: 'Rol', status: 'Status', manage: 'Beheer credentials', credentials: 'Inloggegevens beheren', genPass: 'Genereer nieuw wachtwoord', save: 'Opslaan', close: 'Sluiten', sendEmail: 'Stuur inloggegevens per e-mail', access: 'Systeemtoegang' },
    plan: { title: 'Technisch Plan', sub: 'Van papierwerk naar volledig digitale operatie', stackTitle: 'Tech Stack', dbSchema: 'Database Schema (Viesa Automations / JSON)' },
    booking: { title: 'Nieuwe Boeking', cancel: 'Annuleren', prev: '← Vorige', next: 'Volgende →', confirm: '✓ Bevestig boeking', steps: ['Paard info','Route & datum','Documenten checklist','Bevestigen'], hInfo: 'Paard informatie', hName: 'Naam paard', hBreed: 'Ras', hOwner: 'Eigenaar', hEmail: 'Email eigenaar', rInfo: 'Route & vertrektijd', rFrom: 'Van (ophaaladres)', rTo: 'Naar (bestemming)', rDate: 'Gewenste vertrekdatum', docCheck: 'Auto-gegenereerde documenten checklist', docMsg: '✓ Systeem heeft automatisch een checklist aangemaakt op basis van de route', req: 'Vereist', readyMsg: '✓ Klaar om te bevestigen' }
  },
  en: {
    nav: { dashboard: 'Dashboard', horses: 'Horses', flights: 'Flights', vault: 'Digital Vault', invoicing: 'Invoicing', staff: 'Staff', plan: 'Tech Plan' },
    ui: { newBooking: 'New Booking', loggedIn: 'LOGGED IN AS', role: 'Global Ops Manager', sysBenefits: 'SYSTEM BENEFITS' },
    status: { in_flight: 'In flight', pre_flight: 'Pre-flight', docs_pending: 'Docs missing', delivered: 'Delivered', booking: 'Booking' },
    docStatus: { signed: 'Signed', uploaded: 'Uploaded', pending: 'Signature needed', missing: 'Missing' },
    kpis: { activeFlights: 'Active Flights', horsesTransit: 'Horses in Transit', docsComplete: 'Docs Complete', docsVault: 'Docs in Vault', inAir: 'currently in air', euUs: 'Europe ↔ North America', missingParts: 'with missing parts', digitized: 'Digitized & secure' },
    dash: { date: 'Monday, May 25, 2026', activeShipments: 'active shipments', alerts: 'Active Alerts — Pain Points', fix: '→ Fix', liveFlight: 'Live flight now', upcoming: 'Upcoming flights', dep: 'Departure', arr: 'Arrival', completed: 'completed', groom: 'Groom', benefits: ['All docs auto to vault','E-signature in 1 click','Auto checklist per flight','Camera-scan → instant digitize','No more missing signatures'] },
    horses: { title: 'Horse Registry', active: 'horses active', search: 'Search horse or owner...', allStat: 'All statuses', route: 'Route', docs: 'Documents', complete: 'complete', year: 'years' },
    profile: { back: '← Back to horse registry', owner: 'Owner', email: 'Email', from: 'From', to: 'To', tabs: { docs: 'Documents & Vault', info: 'Travel Info', history: 'Activity' }, allReq: 'All required documents for transport', vaultSub: 'Vault: Cloudinary + Viesa Automations', scanBtn: '📷 Scan', reqSigBtn: '✎ Request signature', signBtn: '✓ Digitally sign', downBtn: '↓ Download', scanning: 'Scanning...' },
    flights: { title: 'Flights', planned: 'flights planned or active', checkDocs: 'Check documents', viewHorse: 'View horse' },
    vault: { title: 'Digital Vault', sub: 'Encrypted archive · Cloudinary + Viesa Automations', total: 'Total docs' },
    staff: { title: 'Staff Management', sub: 'Manage access and login credentials for the team', name: 'Name', email: 'Email', phone: 'Phone', role: 'Role', status: 'Status', manage: 'Manage credentials', credentials: 'Login Credentials', genPass: 'Generate new password', save: 'Save', close: 'Close', sendEmail: 'Send credentials via email', access: 'System Access' },
    plan: { title: 'Tech Plan', sub: 'From paperwork to fully digital operation', stackTitle: 'Tech Stack', dbSchema: 'Database Schema (Viesa Automations / JSON)' },
    booking: { title: 'New Booking', cancel: 'Cancel', prev: '← Previous', next: 'Next →', confirm: '✓ Confirm booking', steps: ['Horse info','Route & date','Documents checklist','Confirm'], hInfo: 'Horse information', hName: 'Horse name', hBreed: 'Breed', hOwner: 'Owner', hEmail: 'Owner email', rInfo: 'Route & departure', rFrom: 'From (pickup)', rTo: 'To (destination)', rDate: 'Desired departure date', docCheck: 'Auto-generated documents checklist', docMsg: '✓ System automatically created a checklist based on the route', req: 'Required', readyMsg: '✓ Ready to confirm' }
  },
  es: {
    nav: { dashboard: 'Panel', horses: 'Caballos', flights: 'Vuelos', vault: 'Bóveda Digital', invoicing: 'Facturación', staff: 'Personal', plan: 'Plan Técnico' },
    ui: { newBooking: 'Nueva Reserva', loggedIn: 'CONECTADO COMO', role: 'Gerente Global', sysBenefits: 'BENEFICIOS DEL SISTEMA' },
    status: { in_flight: 'En vuelo', pre_flight: 'Pre-vuelo', docs_pending: 'Faltan docs', delivered: 'Entregado', booking: 'Reserva' },
    docStatus: { signed: 'Firmado', uploaded: 'Subido', pending: 'Firma necesaria', missing: 'Falta' },
    kpis: { activeFlights: 'Vuelos Activos', horsesTransit: 'Caballos en Tránsito', docsComplete: 'Docs Completos', docsVault: 'Docs en Bóveda', inAir: 'actualmente en el aire', euUs: 'Europa ↔ Norteamérica', missingParts: 'con partes faltantes', digitized: 'Digitalizado y seguro' },
    dash: { date: 'Lunes, 25 de mayo de 2026', activeShipments: 'envíos activos', alerts: 'Alertas Activas — Puntos Críticos', fix: '→ Arreglar', liveFlight: 'Vuelo en vivo ahora', upcoming: 'Próximos vuelos', dep: 'Salida', arr: 'Llegada', completed: 'completado', groom: 'Mozo', benefits: ['Docs automáticos a bóveda','Firma electrónica en 1 clic','Checklist auto por vuelo','Escaneo de cámara → digitalizado','No más firmas faltantes'] },
    horses: { title: 'Registro de Caballos', active: 'caballos activos', search: 'Buscar caballo o dueño...', allStat: 'Todos los estados', route: 'Ruta', docs: 'Documentos', complete: 'completo', year: 'años' },
    profile: { back: '← Volver al registro', owner: 'Propietario', email: 'Email', from: 'De', to: 'A', tabs: { docs: 'Documentos y Bóveda', info: 'Info de Viaje', history: 'Actividad' }, allReq: 'Todos los documentos requeridos', vaultSub: 'Bóveda: Cloudinary + Viesa Automations', scanBtn: '📷 Escanear', reqSigBtn: '✎ Solicitar firma', signBtn: '✓ Firmar digitalmente', downBtn: '↓ Descargar', scanning: 'Escaneando...' },
    flights: { title: 'Vuelos', planned: 'vuelos planeados o activos', checkDocs: 'Revisar documentos', viewHorse: 'Ver caballo' },
    vault: { title: 'Bóveda Digital', sub: 'Archivo encriptado · Cloudinary + Viesa Automations', total: 'Total docs' },
    staff: { title: 'Gestión de Personal', sub: 'Administrar acceso y credenciales para el equipo', name: 'Nombre', email: 'Correo electrónico', phone: 'Teléfono', role: 'Rol', status: 'Estado', manage: 'Gestionar credenciales', credentials: 'Credenciales de acceso', genPass: 'Generar nueva contraseña', save: 'Guardar', close: 'Cerrar', sendEmail: 'Enviar credenciales por correo', access: 'Acceso al sistema' },
    plan: { title: 'Plan Técnico', sub: 'De papeleo a operación totalmente digital', stackTitle: 'Tech Stack', dbSchema: 'Database Schema (Viesa Automations / JSON)' },
    booking: { title: 'Nueva Reserva', cancel: 'Cancelar', prev: '← Anterior', next: 'Siguiente →', confirm: '✓ Confirmar reserva', steps: ['Info caballo','Ruta y fecha','Lista de docs','Confirmar'], hInfo: 'Información del caballo', hName: 'Nombre del caballo', hBreed: 'Raza', hOwner: 'Propietario', hEmail: 'Email propietario', rInfo: 'Ruta y salida', rFrom: 'De (origen)', rTo: 'A (destino)', rDate: 'Fecha deseada', docCheck: 'Lista de docs auto-generada', docMsg: '✓ El sistema creó la lista según la ruta', req: 'Requerido', readyMsg: '✓ Listo para confirmar' }
  }
};

const DOC_TYPES = {
  nl: [
    { type:'passport', name:'Paardenpaspoort', note:'UELN + microchip' },
    { type:'health', name:'Gezondheidscertificaat', note:'Max 10 dgn voor vlucht' },
    { type:'coggins', name:'Coggins Test (EIA)', note:'Negatief vereist' },
    { type:'usda', name:'USDA Endorsement', note:'Federale goedkeuring VS' },
    { type:'export', name:'Exportvergunning', note:'NVWA / BMEL / DDPP' },
    { type:'vaccine', name:'Vaccinatiepaspoort', note:'Optioneel maar aanbevolen' }
  ],
  en: [
    { type:'passport', name:'Horse Passport', note:'UELN + microchip' },
    { type:'health', name:'Health Certificate', note:'Max 10 days before flight' },
    { type:'coggins', name:'Coggins Test (EIA)', note:'Negative required' },
    { type:'usda', name:'USDA Endorsement', note:'Federal approval US' },
    { type:'export', name:'Export Permit', note:'NVWA / BMEL / DDPP' },
    { type:'vaccine', name:'Vaccination Passport', note:'Optional but recommended' }
  ],
  es: [
    { type:'passport', name:'Pasaporte Equino', note:'UELN + microchip' },
    { type:'health', name:'Certificado de Salud', note:'Máx 10 días antes del vuelo' },
    { type:'coggins', name:'Prueba de Coggins (AIE)', note:'Negativo requerido' },
    { type:'usda', name:'Endoso USDA', note:'Aprobación federal EE.UU.' },
    { type:'export', name:'Permiso de Exportación', note:'NVWA / BMEL / DDPP' },
    { type:'vaccine', name:'Pasaporte de Vacunación', note:'Opcional pero recomendado' }
  ]
};

const STAFF_MEMBERS = [
  { id: 'S01', name: 'Lucas Porter', email: 'lucas@flymanestream.com', phone: '+1 214 707 4991', role: 'Directeur / Oprichter' },
  { id: 'S02', name: 'Lois de Kramer', email: 'lois@flymanestream.com', phone: '+31 6 31 16 26 84', role: 'Global Ops Manager' },
  { id: 'S03', name: 'Olivia Pleijsier', email: 'olivia@flymanestream.com', phone: '+31 6 23 14 23 29', role: 'Logistics Coordinator' },
  { id: 'S04', name: 'Linn Hofsté', email: 'linn@flymanestream.com', phone: '+31 6 21 41 37 38', role: 'Export Specialist' },
  { id: 'S05', name: 'Jet Eppink', email: 'jet@flymanestream.com', phone: '+31 6 57 18 12 61', role: 'Veterinary Coordinator' },
  { id: 'S06', name: 'Camilla Bracco', email: 'camilla@flymanestream.com', phone: '+1 561 818 5156', role: 'US Operations Manager' },
  { id: 'S07', name: 'Emily Sanders', email: 'emily@flymanestream.com', phone: '+31 6 24 60 56 53', role: 'Head Groom' },
  { id: 'S08', name: 'Tania van Leeuwen', email: 'tania@flymanestream.com', phone: '+31 6 12 94 69 16', role: 'Flight Attendant' },
  { id: 'S09', name: 'Chris Hagenvoort', email: 'chris@flymanestream.com', phone: '+31 6 23 41 26 95', role: 'Ground Transport' },
];

const HORSES = [
  { id:'H001', name:'Quantum Leap', breed:'KWPN', age:8, col:'Bay', owner:'Sophie van den Berg', email:'sophie@vdb.nl', from:'Amsterdam, NL', to:'Wellington, FL', flight:'MS-2026-041', status:'in_flight', dc:6, dt:6 },
  { id:'H002', name:'Grand Finale', breed:'Oldenburg', age:12, col:'Chestnut', owner:'James Whitfield', email:'j.whitfield@eq.com', from:'Wellington, FL', to:'Weerselo, NL', flight:'MS-2026-042', status:'pre_flight', dc:3, dt:5 },
  { id:'H003', name:'Black Pearl', breed:'Hanoverian', age:6, col:'Black', owner:'Camille Dubois', email:'c.dubois@equi.fr', from:'Paris, FR', to:'New York, NY', flight:'MS-2026-043', status:'docs_pending', dc:1, dt:5 },
  { id:'H004', name:'Silver Storm', breed:'Belgian WB', age:10, col:'Grey', owner:'Marcus Klein', email:'m.klein@horses.de', from:'Düsseldorf, DE', to:'Miami, FL', flight:'MS-2026-039', status:'delivered', dc:5, dt:5 },
  { id:'H005', name:'Mystique', breed:'KWPN', age:5, col:'Darkbay', owner:'Isabella Torres', email:'i.torres@eq.es', from:'Madrid, ES', to:'Los Angeles, CA', flight:null, status:'booking', dc:0, dt:5 },
  { id:'H006', name:'Force Majeure', breed:'Selle Français', age:9, col:'Bay', owner:'Thomas Laurent', email:'t.laurent@ecuries.fr', from:'Lyon, FR', to:'Wellington, FL', flight:'MS-2026-044', status:'docs_pending', dc:2, dt:5 },
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

// ─── UI primitives ───────────────────────────────────────────────────────────

const Chip = ({label,color,bg}) => (
  <span style={{fontSize:11,fontWeight:600,letterSpacing:.4,padding:'3px 9px',borderRadius:99,color,background:bg,textTransform:'uppercase',whiteSpace:'nowrap'}}>{label}</span>
);

const Btn = ({children,onClick,variant='primary',size='md',disabled,style={}}) => {
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
    <button onClick={onClick} disabled={disabled} style={{...styles[variant],padding:pad,fontSize:fs,fontWeight:500,borderRadius:8,cursor:disabled?'not-allowed':'pointer',opacity:disabled?.5:1,fontFamily:'inherit',transition:'all .15s',...style}}>
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

// ─── Views ───────────────────────────────────────────────────────────────────

function Sidebar({view, setView, onBook, lang, setLang}) {
  const t = TRANSLATIONS[lang];
  const NAV = [
    {id:'dashboard', icon:'⬡', label:t.nav.dashboard},
    {id:'horses',    icon:'◈', label:t.nav.horses},
    {id:'flights',   icon:'◎', label:t.nav.flights},
    {id:'vault',     icon:'◫', label:t.nav.vault},
    {id:'invoicing', icon:'€', label:t.nav.invoicing},
    {id:'staff',     icon:'👥', label:t.nav.staff},
    {id:'plan',      icon:'◻', label:t.nav.plan},
  ];

  return (
    <div style={{width:220,background:C.surface,borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',flexShrink:0}}>
      <div style={{padding:'20px 20px 16px',borderBottom:`1px solid ${C.border}`}}>
        <div style={{marginBottom: 8}}>
          <img src="/logo-white.svg" alt="Manestream" style={{height: 44, objectFit: 'contain'}} />
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
          {t.ui.newBooking}
        </button>
      </div>

      <div style={{padding:'12px 16px 16px',borderTop:`1px solid ${C.border}`}}>
        <select value={lang} onChange={e=>setLang(e.target.value)} style={{width:'100%',background:C.card,border:`1px solid ${C.border}`,borderRadius:6,padding:'6px 10px',color:C.text,fontSize:11,marginBottom:12,outline:'none'}}>
          <option value="nl">Nederlands</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        <div style={{fontSize:11,color:C.dim,marginBottom:6}}>{t.ui.loggedIn}</div>
        <div style={{fontSize:13,color:C.text,fontWeight:500}}>Lois de Kramer</div>
        <div style={{fontSize:11,color:C.muted}}>{t.ui.role}</div>
      </div>
    </div>
  );
}

function DashboardView({horses, flights, onHorse, showToast, lang}) {
  const t = TRANSLATIONS[lang];
  const STATUS = {
    in_flight:    {label:t.status.in_flight,       color:C.blue,  bg:C.blueBg},
    pre_flight:   {label:t.status.pre_flight,      color:C.amber, bg:C.amberBg},
    docs_pending: {label:t.status.docs_pending,  color:C.red,   bg:C.redBg},
    delivered:    {label:t.status.delivered,      color:C.green, bg:C.greenBg},
    booking:      {label:t.status.booking,         color:C.orange,bg:C.orangeDim},
  };

  const alerts = [
    {type:'red', icon:'!', msg:'Grand Finale — Coggins handtekening ontbreekt', action:t.dash.fix, hid:'H002'},
    {type:'red', icon:'!', msg:'Grand Finale — USDA & Exportvergunning ontbreken', action:t.dash.fix, hid:'H002'},
    {type:'amber', icon:'⏱', msg:'Black Pearl — 4/5 documenten ontbreken', action:t.dash.fix, hid:'H003'},
    {type:'amber', icon:'⏱', msg:'Force Majeure — Gezondheidscertificaat', action:t.dash.fix, hid:'H006'},
  ];

  return (
    <div style={{padding:28,maxWidth:1100}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>{t.nav.dashboard}</h1>
        <div style={{fontSize:13,color:C.muted,marginTop:2}}>{t.dash.date} — 4 {t.dash.activeShipments}</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
        {[
          {label:t.kpis.activeFlights, val:'4', sub:`1 ${t.kpis.inAir}`, color:C.blue},
          {label:t.kpis.horsesTransit, val:'6', sub:t.kpis.euUs, color:C.orange},
          {label:t.kpis.docsComplete, val:'2/6', sub:`4 ${t.kpis.missingParts}`, color:C.amber},
          {label:t.kpis.docsVault, val:'18', sub:t.kpis.digitized, color:C.green},
        ].map(k => (
          <div key={k.label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:'14px 18px'}}>
            <div style={{fontSize:11,color:C.muted,fontWeight:600,letterSpacing:.5,textTransform:'uppercase',marginBottom:8}}>{k.label}</div>
            <div style={{fontSize:28,fontWeight:700,color:k.color,letterSpacing:-1}}>{k.val}</div>
            <div style={{fontSize:11,color:C.dim,marginTop:4}}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:16}}>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:10,display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:8,height:8,borderRadius:99,background:C.red,display:'inline-block'}} />
            {t.dash.alerts}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
            {alerts.map((a,i) => (
              <div key={i} style={{background:a.type==='red'?C.redBg:C.amberBg,border:`1px solid ${a.type==='red'?C.red:C.amber}25`,borderRadius:10,padding:'10px 14px',display:'flex',alignItems:'center',gap:12}}>
                <span style={{fontSize:16,color:a.type==='red'?C.red:C.amber,flexShrink:0}}>{a.icon}</span>
                <span style={{flex:1,fontSize:13,color:C.text}}>{a.msg}</span>
                <button onClick={()=>onHorse(horses.find(h=>h.id===a.hid))} style={{fontSize:12,color:a.type==='red'?C.red:C.amber,background:'transparent',border:'none',cursor:'pointer',fontWeight:600}}>{a.action}</button>
              </div>
            ))}
          </div>

          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:10,display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:8,height:8,borderRadius:99,background:C.blue,display:'inline-block',animation:'pulse 1.5s infinite'}} />
            {t.dash.liveFlight}
          </div>
          <div style={{background:C.card,border:`1px solid ${C.blue}30`,borderRadius:12,padding:'16px 20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:C.text}}>MS-2026-041 · AMS → MIA</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>Quantum Leap · {t.dash.groom}: Emily Sanders</div>
              </div>
              <Chip label={t.status.in_flight} color={C.blue} bg={C.blueBg} />
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:C.muted,marginBottom:8}}>
              <span>{t.dash.dep}: 06:00</span>
              <span style={{fontWeight:600,color:C.blue}}>65% {t.dash.completed}</span>
              <span>{t.dash.arr}: 14:30</span>
            </div>
            <Bar value={65} max={100} color={C.blue} />
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:2}}>{t.dash.upcoming}</div>
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
            <div style={{fontSize:12,fontWeight:700,color:C.orange,letterSpacing:.4,marginBottom:8}}>{t.ui.sysBenefits}</div>
            {t.dash.benefits.map(b => (
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

function HorsesView({horses, onSelect, lang}) {
  const t = TRANSLATIONS[lang];
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const STATUS = {
    in_flight:    {label:t.status.in_flight,       color:C.blue,  bg:C.blueBg},
    pre_flight:   {label:t.status.pre_flight,      color:C.amber, bg:C.amberBg},
    docs_pending: {label:t.status.docs_pending,  color:C.red,   bg:C.redBg},
    delivered:    {label:t.status.delivered,      color:C.green, bg:C.greenBg},
    booking:      {label:t.status.booking,         color:C.orange,bg:C.orangeDim},
  };

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
          <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>{t.horses.title}</h1>
          <div style={{fontSize:13,color:C.muted,marginTop:2}}>{horses.length} {t.horses.active}</div>
        </div>
      </div>

      <div style={{display:'flex',gap:10,marginBottom:20}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.horses.search} style={{flex:1,background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px 14px',color:C.text,fontSize:13,outline:'none'}} />
        <select value={filter} onChange={e=>setFilter(e.target.value)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px 14px',color:C.text,fontSize:13,outline:'none',cursor:'pointer'}}>
          <option value="all">{t.horses.allStat}</option>
          {Object.entries(STATUS).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {filtered.map(h => {
          const st = STATUS[h.status];
          const pct = h.dt>0 ? Math.round((h.dc/h.dt)*100) : 0;
          return (
            <div key={h.id} onClick={() => onSelect(h)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:'14px 20px',cursor:'pointer',display:'grid',gridTemplateColumns:'1fr 160px 160px 140px',gap:12,alignItems:'center'}}>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:C.text}}>{h.name}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>{h.breed} · {h.age} {t.horses.year} · {h.col}</div>
                <div style={{fontSize:11,color:C.dim,marginTop:2}}>{h.owner}</div>
              </div>
              <div>
                <div style={{fontSize:11,color:C.muted,marginBottom:2}}>{t.horses.route}</div>
                <div style={{fontSize:12,color:C.text}}>{h.from}</div>
                <div style={{fontSize:12,color:C.orange}}>→ {h.to}</div>
              </div>
              <div>
                <div style={{fontSize:11,color:C.muted,marginBottom:4}}>{t.horses.docs} {h.dc}/{h.dt}</div>
                <Bar value={h.dc} max={Math.max(h.dt,1)} color={pct===100?C.green:pct>50?C.amber:C.red} />
                <div style={{fontSize:11,color:pct===100?C.green:pct>50?C.amber:C.red,marginTop:3}}>{pct}% {t.horses.complete}</div>
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

function HorseProfileView({horse, docs, onBack, onScan, onReqSig, onSign, scanning, showToast, lang}) {
  const t = TRANSLATIONS[lang];
  const [activeTab, setActiveTab] = useState('docs');
  
  const STATUS = {
    in_flight:    {label:t.status.in_flight,       color:C.blue,  bg:C.blueBg},
    pre_flight:   {label:t.status.pre_flight,      color:C.amber, bg:C.amberBg},
    docs_pending: {label:t.status.docs_pending,  color:C.red,   bg:C.redBg},
    delivered:    {label:t.status.delivered,      color:C.green, bg:C.greenBg},
    booking:      {label:t.status.booking,         color:C.orange,bg:C.orangeDim},
  };
  const DOC_STATUS = {
    signed:  {label:t.docStatus.signed, color:C.green, bg:C.greenBg},
    uploaded:{label:t.docStatus.uploaded,    color:C.blue,  bg:C.blueBg},
    pending: {label:t.docStatus.pending, color:C.amber, bg:C.amberBg},
    missing: {label:t.docStatus.missing,   color:C.red,   bg:C.redBg},
  };

  const st = STATUS[horse.status];
  const docsMap = {};
  docs.forEach(d => { docsMap[d.type] = d; });

  const allTypes = horse.dt === 6 ? DOC_TYPES[lang] : DOC_TYPES[lang].slice(0,5);

  return (
    <div style={{padding:28,maxWidth:900}}>
      <button onClick={onBack} style={{background:'transparent',border:'none',color:C.muted,fontSize:13,cursor:'pointer',marginBottom:16,display:'flex',alignItems:'center',gap:6}}>
        {t.profile.back}
      </button>

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:'20px 24px',marginBottom:16}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div style={{display:'flex',gap:16,alignItems:'center'}}>
            <div style={{width:56,height:56,borderRadius:12,background:C.orangeDim,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>🐴</div>
            <div>
              <div style={{fontSize:20,fontWeight:700,letterSpacing:-.3,color:C.text}}>{horse.name}</div>
              <div style={{fontSize:13,color:C.muted,marginTop:2}}>{horse.breed} · {horse.age} {t.horses.year} · {horse.col}</div>
              <div style={{fontSize:12,color:C.dim,marginTop:1}}>{t.profile.owner}: {horse.owner}</div>
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <Chip label={st.label} color={st.color} bg={st.bg} />
            {horse.flight && <div style={{fontSize:11,color:C.dim,marginTop:4}}>{horse.flight}</div>}
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:16,paddingTop:16,borderTop:`1px solid ${C.border}`}}>
          {[
            {label:t.profile.from, val:horse.from},
            {label:t.profile.to, val:horse.to},
            {label:t.horses.docs, val:`${horse.dc}/${horse.dt} ${t.horses.complete}`},
          ].map(f=>(
            <div key={f.label}>
              <div style={{fontSize:11,color:C.dim,letterSpacing:.4,textTransform:'uppercase',marginBottom:3}}>{f.label}</div>
              <div style={{fontSize:13,fontWeight:500,color:C.text}}>{f.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'flex',gap:4,marginBottom:16}}>
        {[['docs',t.profile.tabs.docs],['info',t.profile.tabs.info],['history',t.profile.tabs.history]].map(([id,label]) => (
          <button key={id} onClick={()=>setActiveTab(id)} style={{padding:'7px 16px',borderRadius:8,border:`1px solid ${activeTab===id?C.orange:C.border}`,background:activeTab===id?C.orangeDim:'transparent',color:activeTab===id?C.orange:C.muted,fontSize:13,fontWeight:activeTab===id?600:400,cursor:'pointer'}}>
            {label}
          </button>
        ))}
      </div>

      {activeTab==='docs' && (
        <div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <div style={{fontSize:13,color:C.muted}}>{t.profile.allReq}</div>
            <div style={{fontSize:12,color:C.dim}}>{t.profile.vaultSub}</div>
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
                    {d?.date && !d?.sig && <div style={{fontSize:11,color:C.blue,marginTop:1}}>{t.docStatus.uploaded} {d.date}</div>}
                  </div>
                  <Chip label={s.label} color={s.color} bg={s.bg} />
                  <div style={{display:'flex',gap:6,flexShrink:0}}>
                    {isScanning && <div style={{fontSize:12,color:C.orange,padding:'5px 12px',borderRadius:6,background:C.orangeDim}}>{t.profile.scanning}</div>}
                    {isMissing && !isScanning && <Btn size="sm" variant="outline" onClick={()=>onScan(horse.id, dt.type)}>{t.profile.scanBtn}</Btn>}
                    {isUploaded && <Btn size="sm" variant="outline" onClick={()=>onReqSig(horse.id, dt.type)}>{t.profile.reqSigBtn}</Btn>}
                    {isPending && <Btn size="sm" variant="success" onClick={()=>onSign(horse.id, dt.type)}>{t.profile.signBtn}</Btn>}
                    {isSigned && <Btn size="sm" variant="ghost" onClick={()=>showToast('Downloaded')}>{t.profile.downBtn}</Btn>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab==='info' && (
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {[
            {label:t.profile.owner, val:horse.owner},
            {label:t.profile.email, val:horse.email},
            {label:t.profile.from, val:horse.from},
            {label:t.profile.to, val:horse.to},
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
    </div>
  );
}

function FlightsView({flights, horses, onHorse, lang}) {
  const t = TRANSLATIONS[lang];
  const STATUS = {
    in_flight:    {label:t.status.in_flight,       color:C.blue,  bg:C.blueBg},
    pre_flight:   {label:t.status.pre_flight,      color:C.amber, bg:C.amberBg},
    docs_pending: {label:t.status.docs_pending,  color:C.red,   bg:C.redBg},
    delivered:    {label:t.status.delivered,      color:C.green, bg:C.greenBg},
    booking:      {label:t.status.booking,         color:C.orange,bg:C.orangeDim},
  };

  return (
    <div style={{padding:28,maxWidth:900}}>
      <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text,marginBottom:4}}>{t.flights.title}</h1>
      <div style={{fontSize:13,color:C.muted,marginBottom:20}}>{flights.length} {t.flights.planned}</div>

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
                  <div style={{fontSize:13,color:C.muted,marginTop:3}}>{f.horse} · {t.dash.groom}: {f.groom}</div>
                </div>
                <Chip label={st.label} color={st.color} bg={st.bg} />
              </div>

              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:14}}>
                {[
                  {label:t.dash.dep, val:f.dep},
                  {label:t.dash.arr, val:f.arr},
                  {label:t.horses.docs, val:`${h?.dc||0}/${h?.dt||5} (${pct}%)`},
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
                    <span style={{color:C.blue,fontWeight:600}}>✈ {f.prog}% {t.dash.completed}</span>
                    <span>MIA</span>
                  </div>
                  <Bar value={f.prog} max={100} color={C.blue} />
                </div>
              )}

              {pct < 100 && (
                <div style={{padding:'8px 12px',background:C.redBg,border:`1px solid ${C.red}25`,borderRadius:8,fontSize:12,color:C.red,marginBottom:10}}>
                  ⚠ {t.status.docs_pending}
                </div>
              )}

              <div style={{display:'flex',gap:8}}>
                <Btn size="sm" variant="outline" onClick={()=>onHorse(f.horseId)}>{t.flights.viewHorse}</Btn>
                <Btn size="sm" variant="outline" onClick={()=>{}}>{t.flights.checkDocs}</Btn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VaultView({horses, horseDocs, onHorse, lang}) {
  const t = TRANSLATIONS[lang];
  const DOC_STATUS = {
    signed:  {label:t.docStatus.signed, color:C.green, bg:C.greenBg},
    uploaded:{label:t.docStatus.uploaded,    color:C.blue,  bg:C.blueBg},
    pending: {label:t.docStatus.pending, color:C.amber, bg:C.amberBg},
    missing: {label:t.docStatus.missing,   color:C.red,   bg:C.redBg},
  };

  const total = Object.values(horseDocs).flat().length;
  const signed = Object.values(horseDocs).flat().filter(d=>d.s==='signed').length;
  const missing = Object.values(horseDocs).flat().filter(d=>d.s==='missing').length;
  const pending = Object.values(horseDocs).flat().filter(d=>d.s==='pending').length;

  return (
    <div style={{padding:28,maxWidth:900}}>
      <div style={{marginBottom:20}}>
        <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>{t.vault.title}</h1>
        <div style={{fontSize:13,color:C.muted,marginTop:2}}>{t.vault.sub}</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:20}}>
        {[
          {label:t.vault.total, val:total, color:C.text},
          {label:t.docStatus.signed, val:signed, color:C.green},
          {label:t.docStatus.missing, val:missing, color:C.red},
          {label:t.docStatus.pending, val:pending, color:C.amber},
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
                  const dt = DOC_TYPES[lang].find(x=>x.type===d.type);
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

function InvoicingView({lang, setLang}) {
  const [isEditing, setIsEditing] = useState(true);
  const [currency, setCurrency] = useState('EUR');
  const [dueDate, setDueDate] = useState('2026-06-08');
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(21);
  const [clientName, setClientName] = useState('Sophie van den Berg');
  const [clientEmail, setClientEmail] = useState('sophie@vdb.nl');
  const [clientAddress, setClientAddress] = useState('Herengracht 102\n1015 CE Amsterdam');
  const [flightRoute, setFlightRoute] = useState('MS-2026-041 (AMS → MIA)');
  const [flightDetails, setFlightDetails] = useState('Horse: Quantum Leap\nAWB: 129-84738221\nExport: 25 May 2026');

  const currencies = {
    EUR: { label: 'Euro (€)', rate: 1, symbol: '€' },
    USD: { label: 'US Dollar ($)', rate: 1.08, symbol: '$' },
    GBP: { label: 'British Pound (£)', rate: 0.85, symbol: '£' },
    JPY: { label: 'Japanese Yen (¥)', rate: 168.5, symbol: '¥' },
    AUD: { label: 'Australian Dollar (A$)', rate: 1.63, symbol: 'A$' },
    CAD: { label: 'Canadian Dollar (C$)', rate: 1.48, symbol: 'C$' },
    CHF: { label: 'Swiss Franc (CHF)', rate: 0.98, symbol: 'CHF' },
  };

  const t = {
    nl: { title: 'Facturatie & Financiën', subtitle: 'Beheer facturen en bekijk uitgebreide financiële overzichten', invNum: 'Factuur #', date: 'Factuurdatum', due: 'Vervaldatum', client: 'Klant', flight: 'Vlucht', desc: 'Omschrijving', qty: 'Aantal', amt: 'Bedrag', total: 'Totaal', genBtn: 'Factuur Genereren', payStatus: 'Betalingsstatus', paid: 'Betaald', pending: 'Openstaand', subtotal: 'Subtotaal', tax: 'Btw', discount: 'Korting', amountDue: 'Te betalen', settings: 'Factuur Instellingen', taxRate: 'Btw Tarief (%)', discountAmt: 'Korting (%)' },
    en: { title: 'Invoicing & Finance', subtitle: 'Manage invoices and view comprehensive financial summaries', invNum: 'Invoice #', date: 'Issue Date', due: 'Due Date', client: 'Client', flight: 'Flight Route', desc: 'Description', qty: 'Qty', amt: 'Amount', total: 'Total', genBtn: 'Generate Invoice', payStatus: 'Payment Status', paid: 'Paid', pending: 'Pending', subtotal: 'Subtotal', tax: 'Tax', discount: 'Discount', amountDue: 'Amount Due', settings: 'Invoice Settings', taxRate: 'Tax Rate (%)', discountAmt: 'Discount (%)' },
    es: { title: 'Facturación y Finanzas', subtitle: 'Gestione facturas y vea resúmenes financieros detallados', invNum: 'Factura #', date: 'Fecha de Emisión', due: 'Vencimiento', client: 'Cliente', flight: 'Ruta del Vuelo', desc: 'Descripción', qty: 'Cant', amt: 'Monto', total: 'Total', genBtn: 'Generar Factura', payStatus: 'Estado de Pago', paid: 'Pagado', pending: 'Pendiente', subtotal: 'Subtotal', tax: 'Impuestos', discount: 'Descuento', amountDue: 'Monto a Pagar', settings: 'Ajustes de Factura', taxRate: 'Tasa de Impuesto (%)', discountAmt: 'Descuento (%)' }
  };

  const [items, setItems] = useState([
    { id: 1, desc: 'International Flight Costs', qty: 1, unit: 8500 },
    { id: 2, desc: 'Export Docs & Customs Clearance', qty: 1, unit: 450 },
    { id: 3, desc: 'Veterinary Inspection Fees', qty: 1, unit: 300 },
    { id: 4, desc: 'Airport Handling & Quarantine', qty: 1, unit: 650 },
    { id: 5, desc: 'Road Transport', qty: 2, unit: 400 },
  ]);

  const currentT = t[lang];
  const rate = currencies[currency].rate;
  const sym = currencies[currency].symbol;

  const formatMoney = (amount) => {
    return new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : lang === 'en' ? 'en-US' : 'es-ES', { style: 'currency', currency: currency }).format(amount * rate);
  };

  const subtotal = items.reduce((acc, val) => acc + (val.unit * val.qty), 0);
  const discountVal = subtotal * (discount / 100);
  const taxableAmount = subtotal - discountVal;
  const taxVal = taxableAmount * (taxRate / 100);
  const totalAmt = taxableAmount + taxVal;

  if (isEditing) {
    return (
      <div style={{padding:28,maxWidth:900}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24}}>
          <div>
            <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>{currentT.title} (Editor)</h1>
            <div style={{fontSize:13,color:C.muted,marginTop:2}}>{currentT.subtitle}</div>
          </div>
          <Btn variant="primary" onClick={()=>setIsEditing(false)}>👁 Preview & Show Invoice</Btn>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:24}}>
          <div style={{background:C.card,padding:20,borderRadius:12,border:`1px solid ${C.border}`}}>
            <h3 style={{fontSize:14,color:C.text,marginBottom:12}}>Client Info</h3>
            <input value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Client Name" style={{width:'100%',marginBottom:8,background:C.surface,border:`1px solid ${C.border}`,padding:8,color:C.text,borderRadius:6,outline:'none'}} />
            <input value={clientEmail} onChange={e=>setClientEmail(e.target.value)} placeholder="Client Email" style={{width:'100%',marginBottom:8,background:C.surface,border:`1px solid ${C.border}`,padding:8,color:C.text,borderRadius:6,outline:'none'}} />
            <textarea value={clientAddress} onChange={e=>setClientAddress(e.target.value)} placeholder="Address" style={{width:'100%',background:C.surface,border:`1px solid ${C.border}`,padding:8,color:C.text,borderRadius:6,minHeight:60,outline:'none'}} />
          </div>
          <div style={{background:C.card,padding:20,borderRadius:12,border:`1px solid ${C.border}`}}>
            <h3 style={{fontSize:14,color:C.text,marginBottom:12}}>Flight Info</h3>
            <input value={flightRoute} onChange={e=>setFlightRoute(e.target.value)} placeholder="Flight Route" style={{width:'100%',marginBottom:8,background:C.surface,border:`1px solid ${C.border}`,padding:8,color:C.text,borderRadius:6,outline:'none'}} />
            <textarea value={flightDetails} onChange={e=>setFlightDetails(e.target.value)} placeholder="Flight Details" style={{width:'100%',background:C.surface,border:`1px solid ${C.border}`,padding:8,color:C.text,borderRadius:6,minHeight:60,outline:'none'}} />
          </div>
        </div>

        <div style={{background:C.card,padding:20,borderRadius:12,border:`1px solid ${C.border}`}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
            <h3 style={{fontSize:14,color:C.text}}>Line Items</h3>
            <button onClick={()=>setItems([...items, {id:Date.now(), desc:'', qty:1, unit:0}])} style={{background:'transparent',color:C.orange,border:'none',cursor:'pointer'}}>+ Add Item</button>
          </div>
          {items.map((item, idx) => (
            <div key={item.id} style={{display:'flex',gap:10,marginBottom:10}}>
              <input value={item.desc} onChange={e=>{const n=[...items]; n[idx].desc=e.target.value; setItems(n);}} style={{flex:1,background:C.surface,border:`1px solid ${C.border}`,padding:8,color:C.text,borderRadius:6,outline:'none'}} placeholder="Description" />
              <input type="number" value={item.qty} onChange={e=>{const n=[...items]; n[idx].qty=Number(e.target.value); setItems(n);}} style={{width:60,background:C.surface,border:`1px solid ${C.border}`,padding:8,color:C.text,borderRadius:6,outline:'none'}} />
              <input type="number" value={item.unit} onChange={e=>{const n=[...items]; n[idx].unit=Number(e.target.value); setItems(n);}} style={{width:100,background:C.surface,border:`1px solid ${C.border}`,padding:8,color:C.text,borderRadius:6,outline:'none'}} />
              <button onClick={()=>setItems(items.filter(i=>i.id!==item.id))} style={{background:C.redBg,color:C.red,border:`1px solid ${C.red}30`,borderRadius:6,padding:'0 12px',cursor:'pointer'}}>✕</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{padding:28,maxWidth:1100}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:24}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>{currentT.title}</h1>
          <div style={{fontSize:13,color:C.muted,marginTop:2}}>{currentT.subtitle}</div>
        </div>
        <div style={{display:'flex',gap:12}}>
          <Btn variant="outline" onClick={()=>setIsEditing(true)}>← Back to Editor</Btn>
          <select value={currency} onChange={e=>setCurrency(e.target.value)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px 14px',color:C.text,fontSize:13,outline:'none',cursor:'pointer',fontWeight:600}}>
            {Object.entries(currencies).map(([code, info]) => <option key={code} value={code}>{info.label}</option>)}
          </select>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 300px',gap:24}}>
        <div style={{background:'#ffffff',color:'#111',borderRadius:12,padding:'40px',boxShadow:'0 4px 20px rgba(0,0,0,0.1)'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:32,paddingBottom:32,borderBottom:'2px solid #f0f0f0'}}>
            <div>
              <div style={{marginBottom:12}}>
                <img src="/logo-dark.svg" alt="Manestream" style={{height: 80, objectFit: 'contain'}} />
              </div>
              <div style={{fontSize:13,color:'#555',lineHeight:1.6}}>Manestream Europe<br/>7595 WE Weerselo<br/>The Netherlands<br/>info@flymanestream.com<br/>VAT: NL123456789B01</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:32,fontWeight:300,color:'#ccc',marginBottom:12,textTransform:'uppercase'}}>{currentT.title.split(' ')[0]}</div>
              <div style={{fontSize:18,fontWeight:700,color:'#111',marginBottom:12}}>{currentT.invNum} INV-2026-089</div>
              <div style={{fontSize:13,color:'#555',lineHeight:1.6}}>
                <span style={{fontWeight:600,color:'#111'}}>{currentT.date}:</span> 25 May 2026<br/>
                <span style={{fontWeight:600,color:'#111'}}>{currentT.due}:</span> {dueDate}<br/>
                <span style={{fontWeight:600,color:'#111'}}>{currentT.payStatus}:</span> <span style={{color:C.orange,fontWeight:700}}>{currentT.pending}</span>
              </div>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:40}}>
            <div>
              <div style={{fontSize:11,color:'#888',textTransform:'uppercase',letterSpacing:.5,marginBottom:6,fontWeight:700}}>{currentT.client}</div>
              <div style={{fontSize:15,fontWeight:700,color:'#111'}}>{clientName}</div>
              <div style={{fontSize:13,color:'#555',marginTop:4,lineHeight:1.5}}>
                {clientEmail}<br/>
                {clientAddress.split('\n').map((line, i)=><div key={i}>{line}</div>)}
              </div>
            </div>
            <div>
              <div style={{fontSize:11,color:'#888',textTransform:'uppercase',letterSpacing:.5,marginBottom:6,fontWeight:700}}>{currentT.flight}</div>
              <div style={{fontSize:15,fontWeight:700,color:'#111'}}>{flightRoute}</div>
              <div style={{fontSize:13,color:'#555',marginTop:4,lineHeight:1.5}}>
                {flightDetails.split('\n').map((line, i)=><div key={i}>{line}</div>)}
              </div>
            </div>
          </div>

          <table style={{width:'100%',borderCollapse:'collapse',marginBottom:32}}>
            <thead>
              <tr style={{borderBottom:'2px solid #111'}}>
                <th style={{textAlign:'left',padding:'12px 0',fontSize:12,color:'#111',fontWeight:700,textTransform:'uppercase'}}>{currentT.desc}</th>
                <th style={{textAlign:'center',padding:'12px 0',fontSize:12,color:'#111',fontWeight:700,textTransform:'uppercase'}}>{currentT.qty}</th>
                <th style={{textAlign:'right',padding:'12px 0',fontSize:12,color:'#111',fontWeight:700,textTransform:'uppercase'}}>Prijs ({sym})</th>
                <th style={{textAlign:'right',padding:'12px 0',fontSize:12,color:'#111',fontWeight:700,textTransform:'uppercase'}}>{currentT.total}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{borderBottom:'1px solid #eee'}}>
                  <td style={{padding:'16px 0',fontSize:13,color:'#333'}}>{item.desc}</td>
                  <td style={{padding:'16px 0',fontSize:13,color:'#333',textAlign:'center'}}>{item.qty}</td>
                  <td style={{padding:'16px 0',fontSize:13,color:'#333',textAlign:'right'}}>{formatMoney(item.unit)}</td>
                  <td style={{padding:'16px 0',fontSize:13,fontWeight:600,color:'#111',textAlign:'right'}}>{formatMoney(item.unit * item.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <div style={{width:'320px'}}>
              <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:13,color:'#555'}}>
                <span>{currentT.subtotal}:</span>
                <span style={{fontWeight:600,color:'#111'}}>{formatMoney(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:13,color:C.orange}}>
                  <span>{currentT.discount} ({discount}%):</span>
                  <span>-{formatMoney(discountVal)}</span>
                </div>
              )}
              <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:13,color:'#555',borderBottom:'2px solid #111',marginBottom:12}}>
                <span>{currentT.tax} ({taxRate}%):</span>
                <span style={{fontWeight:600,color:'#111'}}>{formatMoney(taxVal)}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:18,fontWeight:800,color:'#111'}}>
                <span>{currentT.amountDue}:</span>
                <span>{formatMoney(totalAmt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:'20px',height:'fit-content'}}>
          <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:16}}>{currentT.settings}</div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:C.muted,display:'block',marginBottom:6}}>{currentT.due}</label>
            <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} style={{width:'100%',background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:'10px 12px',color:C.text,fontSize:13,outline:'none'}} />
          </div>
          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,color:C.muted,display:'block',marginBottom:6}}>{currentT.taxRate}</label>
            <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} style={{width:'100%',background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:'10px 12px',color:C.text,fontSize:13,outline:'none'}} />
          </div>
          <div style={{marginBottom:24}}>
            <label style={{fontSize:12,color:C.muted,display:'block',marginBottom:6}}>{currentT.discountAmt}</label>
            <input type="number" value={discount} onChange={e=>setDiscount(Number(e.target.value))} style={{width:'100%',background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:'10px 12px',color:C.text,fontSize:13,outline:'none'}} />
          </div>
          <Btn variant="primary" style={{width:'100%',marginBottom:8}}>{currentT.genBtn} (PDF)</Btn>
        </div>
      </div>
    </div>
  );
}

function StaffView({lang, showToast}) {
  const t = TRANSLATIONS[lang];
  const [selected, setSelected] = useState(null);

  return (
    <div style={{padding:28,maxWidth:1000}}>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text}}>{t.staff.title}</h1>
        <div style={{fontSize:13,color:C.muted,marginTop:2}}>{t.staff.sub}</div>
      </div>

      <div style={{display:'flex',gap:24,alignItems:'flex-start'}}>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:8}}>
          {STAFF_MEMBERS.map(s => (
            <div key={s.id} onClick={()=>setSelected(s)} style={{background:selected?.id===s.id?C.orangeDim:C.card,border:`1px solid ${selected?.id===s.id?C.orange:C.border}`,borderRadius:10,padding:'14px 18px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:C.text}}>{s.name}</div>
                <div style={{fontSize:12,color:C.muted,marginTop:2}}>{s.role}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:12,color:C.dim}}>{s.email}</div>
                <div style={{fontSize:11,color:C.orange,marginTop:4,fontWeight:500}}>{t.staff.manage} →</div>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div style={{width:340,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:24,position:'sticky',top:28}}>
            <div style={{width:56,height:56,borderRadius:99,background:C.orangeDim,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,color:C.orange,marginBottom:16,fontWeight:700}}>
              {selected.name.charAt(0)}
            </div>
            <div style={{fontSize:18,fontWeight:700,color:C.text}}>{selected.name}</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:24}}>{selected.role}</div>

            <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:12,textTransform:'uppercase',letterSpacing:.5}}>{t.staff.credentials}</div>
            
            <div style={{marginBottom:12}}>
              <label style={{fontSize:11,color:C.dim,display:'block',marginBottom:4}}>{t.staff.email}</label>
              <input value={selected.email} readOnly style={{width:'100%',background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:'8px 12px',color:C.muted,fontSize:13,outline:'none'}} />
            </div>

            <div style={{marginBottom:16}}>
              <label style={{fontSize:11,color:C.dim,display:'block',marginBottom:4}}>{t.staff.access}</label>
              <select style={{width:'100%',background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:'8px 12px',color:C.text,fontSize:13,outline:'none'}}>
                <option>Global Ops Manager</option>
                <option>Logistics Coordinator</option>
                <option>Veterinary Coordinator</option>
                <option>Groom / Flight Attendant</option>
                <option>Directeur</option>
              </select>
            </div>

            <div style={{marginBottom:24}}>
              <Btn variant="outline" style={{width:'100%',marginBottom:8}} onClick={()=>showToast('Password reset link sent!')}>
                {t.staff.genPass}
              </Btn>
              <Btn variant="primary" style={{width:'100%'}} onClick={()=>showToast('Credentials saved & emailed!')}>
                {t.staff.sendEmail}
              </Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlanView({lang}) {
  const t = TRANSLATIONS[lang];
  const painPoints = [
    {icon:'📄', problem:'Papierwerk per PDF', solution:'Digitale formulieren'},
    {icon:'📷', problem:'Foto van document', solution:'Camera-scan'},
    {icon:'✍', problem:'Handtekeningen missen', solution:'E-handtekening'},
  ];

  const stack = [
    {cat:'Frontend', items:['React / Next.js 14', 'Tailwind CSS', 'Framer Motion']},
    {cat:'Backend', items:['Viesa Automations Back-end (Database + Auth)', 'Viesa Automations Storage', 'Edge Functions']},
    {cat:'Documenten', items:['Cloudinary (scan/foto upload)', 'PDF-lib (document generatie)', 'DocuSign / Sign.plus (e-sign)']},
    {cat:'Integraties', items:['Twilio (SMS alerts)', 'SendGrid (email flows)', 'Zapier (workflows)']},
    {cat:'Infra', items:['Vercel hosting', 'Viesa Automations hosting', 'Cloudinary CDN']},
  ];

  return (
    <div style={{padding:28,maxWidth:900}}>
      <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.4,color:C.text,marginBottom:4}}>{t.plan.title}</h1>
      <div style={{fontSize:13,color:C.muted,marginBottom:24}}>{t.plan.sub}</div>

      <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:12}}>{t.plan.stackTitle}</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:28}}>
        {stack.map(s=>(
          <div key={s.cat} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:'12px 16px'}}>
            <div style={{fontSize:11,fontWeight:600,color:C.orange,letterSpacing:.5,textTransform:'uppercase',marginBottom:8}}>{s.cat}</div>
            {s.items.map(i=><div key={i} style={{fontSize:12,color:C.text,marginBottom:4}}>· {i}</div>)}
          </div>
        ))}
      </div>

      <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:12}}>{t.plan.dbSchema}</div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:'16px 20px',fontFamily:'monospace',fontSize:11,color:C.muted,lineHeight:1.7}}>
        <div style={{color:C.orange}}>// horses</div>
        <div>{'{ id, name, breed, age, color, microchip, passport_nr, owner_id, created_at }'}</div>
        <div style={{marginTop:8,color:C.orange}}>// bookings</div>
        <div>{'{ id, horse_id, origin, destination, flight_id, status, groom_id, created_at }'}</div>
        <div style={{marginTop:8,color:C.orange}}>// documents</div>
        <div>{'{ id, horse_id, booking_id, type, status, cloudinary_url, signed_by, vault_path }'}</div>
      </div>
    </div>
  );
}

function BookingModal({step, setStep, onClose, onComplete, lang}) {
  const t = TRANSLATIONS[lang];
  const [form, setForm] = useState({ horse:'', breed:'', owner:'', email:'', from:'', to:'', date:'' });
  const upd = (k,v) => setForm(p=>({...p,[k]:v}));

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.75)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,width:520,maxHeight:'85vh',overflowY:'auto',padding:28}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div style={{fontSize:16,fontWeight:700,color:C.text}}>{t.booking.title}</div>
          <button onClick={onClose} style={{background:'transparent',border:'none',color:C.muted,cursor:'pointer',fontSize:18}}>✕</button>
        </div>

        <div style={{display:'flex',gap:4,marginBottom:24}}>
          {t.booking.steps.map((s,i)=>(
            <div key={i} style={{flex:1,textAlign:'center'}}>
              <div style={{width:24,height:24,borderRadius:99,background:i+1<=step?C.orange:C.card,border:`1px solid ${i+1<=step?C.orange:C.border}`,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 4px',fontSize:11,fontWeight:600,color:i+1<=step?'#fff':C.dim}}>{i+1}</div>
              <div style={{fontSize:10,color:i+1===step?C.orange:C.dim}}>{s}</div>
            </div>
          ))}
        </div>

        {step===1 && (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>{t.booking.hInfo}</div>
            {[['horse',t.booking.hName,''],['breed',t.booking.hBreed,''],['owner',t.booking.hOwner,''],['email',t.booking.hEmail,'']].map(([k,l,ph])=>(
              <div key={k}>
                <label style={{fontSize:12,color:C.muted,display:'block',marginBottom:4}}>{l}</label>
                <input value={form[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} style={{width:'100%',background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px 12px',color:C.text,fontSize:13,fontFamily:'inherit',outline:'none'}} />
              </div>
            ))}
          </div>
        )}

        {step===2 && (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:4}}>{t.booking.rInfo}</div>
            {[['from',t.booking.rFrom,''],['to',t.booking.rTo,''],['date',t.booking.rDate,'']].map(([k,l,ph])=>(
              <div key={k}>
                <label style={{fontSize:12,color:C.muted,display:'block',marginBottom:4}}>{l}</label>
                <input value={form[k]} onChange={e=>upd(k,e.target.value)} placeholder={ph} type={k==='date'?'date':'text'} style={{width:'100%',background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:'9px 12px',color:C.text,fontSize:13,fontFamily:'inherit',outline:'none'}} />
              </div>
            ))}
          </div>
        )}

        {step===3 && (
          <div>
            <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:12}}>{t.booking.docCheck}</div>
            <div style={{padding:'10px 14px',background:C.orangeDim,border:`1px solid ${C.orange}25`,borderRadius:8,fontSize:12,color:C.orange,marginBottom:12}}>
              {t.booking.docMsg}
            </div>
            {DOC_TYPES[lang].slice(0,5).map(dt=>(
              <div key={dt.type} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:20,height:20,borderRadius:4,border:`1px solid ${C.border}`,background:C.card}} />
                <div>
                  <div style={{fontSize:13,color:C.text}}>{dt.name}</div>
                  <div style={{fontSize:11,color:C.dim}}>{dt.note}</div>
                </div>
                <Chip label={t.booking.req} color={C.orange} bg={C.orangeDim} />
              </div>
            ))}
          </div>
        )}

        {step===4 && (
          <div>
            <div style={{padding:'16px',background:C.greenBg,border:`1px solid ${C.green}30`,borderRadius:10,marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:600,color:C.green,marginBottom:8}}>{t.booking.readyMsg}</div>
            </div>
          </div>
        )}

        <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
          <Btn variant="outline" onClick={step===1?onClose:()=>setStep(s=>s-1)}>{step===1?t.booking.cancel:t.booking.prev}</Btn>
          <Btn variant="primary" onClick={step===4?onComplete:()=>setStep(s=>s+1)}>{step===4?t.booking.confirm:t.booking.next}</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ManestreamOS() {
  const [view, setView] = useState('dashboard');
  const [lang, setLang] = useState('en');
  const [selHorse, setSelHorse] = useState(null);
  const [horses, setHorses] = useState(HORSES);
  const [horseDocs, setHorseDocs] = useState(INIT_DOCS);
  const [toast, setToast] = useState(null);
  const [scanning, setScanning] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => setShowSplash(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const showToast = (msg, type='success') => {
    setToast({msg,type});
    setTimeout(()=>setToast(null), 3500);
  };

  const goHorse = (h) => { setSelHorse(h); setView('horse'); };

  if (showSplash) {
    return (
      <div style={{width:'100vw',height:'100vh',background:C.bg,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        <div style={{marginBottom: 24}}>
          <img src="/logo-white.svg" alt="Manestream" style={{height: 140, objectFit: 'contain', animation: 'pulse 2s infinite'}} />
        </div>
        <div style={{fontSize: 12, color: C.orange, marginTop: 8, letterSpacing: 2, fontWeight: 600}}>OPERATIONS OS</div>
        <button onClick={() => setShowSplash(false)} style={{marginTop: 40, background: 'transparent', border: `1px solid ${C.border}`, padding: '8px 20px', borderRadius: 20, color: C.muted, cursor: 'pointer', fontSize: 11, textTransform: 'uppercase'}}>Skip Intro</button>
      </div>
    );
  }

  return (
    <div style={{display:'flex',height:'100vh',background:C.bg,color:C.text,fontFamily:'"Helvetica Neue",system-ui,sans-serif',overflow:'hidden'}}>
      <Sidebar view={view} setView={v=>{setView(v);setSelHorse(null);}} lang={lang} setLang={setLang} onBook={()=>{setBookingOpen(true);setBookingStep(1);}} />

      <div style={{flex:1,overflowY:'auto'}}>
        {view==='dashboard' && <DashboardView horses={horses} flights={FLIGHTS} onHorse={goHorse} showToast={showToast} lang={lang} />}
        {view==='horses' && <HorsesView horses={horses} onSelect={goHorse} lang={lang} />}
        {view==='horse' && selHorse && (
          <HorseProfileView
            horse={horses.find(h=>h.id===selHorse.id)||selHorse}
            docs={horseDocs[selHorse.id]||[]}
            onBack={()=>setView('horses')}
            onScan={()=>{}}
            onReqSig={()=>{}}
            onSign={()=>{}}
            scanning={scanning}
            showToast={showToast}
            lang={lang}
          />
        )}
        {view==='flights' && <FlightsView flights={FLIGHTS} horses={horses} onHorse={goHorse} lang={lang} />}
        {view==='vault' && <VaultView horses={horses} horseDocs={horseDocs} onHorse={goHorse} lang={lang} />}
        {view==='invoicing' && <InvoicingView lang={lang} setLang={setLang} />}
        {view==='staff' && <StaffView lang={lang} showToast={showToast} />}
        {view==='plan' && <PlanView lang={lang} />}
      </div>

      {bookingOpen && (
        <BookingModal
          step={bookingStep}
          setStep={setBookingStep}
          onClose={()=>setBookingOpen(false)}
          onComplete={()=>{setBookingOpen(false);showToast('✓ Booking created!');}}
          lang={lang}
        />
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}
