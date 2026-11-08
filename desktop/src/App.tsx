import { useRef, useState } from 'react';
import { invoke, isTauri } from '@tauri-apps/api/core';
import { MAX_INPUT, originalText, recoveryNeedsReview, verifyArchive, type VerifiedArchive } from './archive';

type Page = 'archive' | 'devices' | 'registry' | 'integrity';
const pages: { id: Page; label: string; icon: string }[] = [
  { id: 'archive', label: 'Conversazioni', icon: '◫' }, { id: 'devices', label: 'Acquisizione', icon: '⇄' },
  { id: 'registry', label: 'Registro gruppi', icon: '◎' }, { id: 'integrity', label: 'Integrità', icon: '◇' }
];
export default function App() {
  const [page, setPage] = useState<Page>('archive');
  const [verified, setVerified] = useState<VerifiedArchive | null>(null);
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [source, setSource] = useState('');
  const [demo, setDemo] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const desktop = isTauri();
  async function accept(text: string, name: string, isDemo: boolean) {
    // Commit new state only after both frontend and (on desktop) native verification succeed.
    const candidate = await verifyArchive(text);
    if (desktop) await invoke('verify_archive', { json: text });
    setVerified(candidate); setSelected(candidate.archive.manifest[0].path);
    setSearch(''); setSource(name); setDemo(isDemo); setPage('archive');
  }
  async function openDemo() {
    setError(''); setBusy(true);
    try {
      const response = await fetch(new URL('fixtures/synthetic-archive.json', document.baseURI));
      if (!response.ok) throw new Error('Archivio dimostrativo non disponibile.');
      await accept(await response.text(), 'Archivio dimostrativo', true);
    } catch (e) { setError(e instanceof Error ? e.message : 'Impossibile aprire l’archivio.'); }
    finally { setBusy(false); }
  }
  async function openFile(file: File) {
    setError(''); setBusy(true);
    try {
      if (file.size > MAX_INPUT) throw new Error('Archivio troppo grande: limite preview 8 MiB.');
      await accept(await file.text(), file.name, false);
    } catch (e) { setError(e instanceof Error ? e.message : 'Impossibile aprire il file.'); }
    finally { setBusy(false); if (input.current) input.current.value = ''; }
  }
  const archive = verified?.archive;
  const texts = verified ? archive!.manifest.filter(entry => entry.path.endsWith('.txt')) : [];
  const content = verified && selected ? originalText(verified.originals.get(selected)!) : null;
  const normalizedSearch = search.toLocaleLowerCase();
  const filtered = texts.filter(entry => entry.path.toLocaleLowerCase().includes(normalizedSearch)
    || (originalText(verified!.originals.get(entry.path)!) ?? '').toLocaleLowerCase().includes(normalizedSearch));
  const bytes = archive?.manifest.reduce((sum, f) => sum + f.byteCount, 0) ?? 0;
  return <div className="app-shell">
    <aside className="sidebar">
      <a className="brand" href="#" onClick={e => { e.preventDefault(); setPage('archive'); }} aria-label="ChatHarbor home"><img className="brand-mark" src="./brand.svg" alt=""/><span>ChatHarbor<small>Il tuo archivio indipendente</small></span></a>
      <div className="workspace-label">SPAZIO PERSONALE</div>
      <nav aria-label="Navigazione principale">{pages.map(item => <button key={item.id} className={page === item.id ? 'nav-item active' : 'nav-item'} aria-current={page === item.id ? 'page' : undefined} onClick={() => setPage(item.id)}><span aria-hidden="true">{item.icon}</span>{item.label}</button>)}</nav>
      <div className="local-card"><span className="status-dot"/> Elaborazione locale<p>I file aperti restano in memoria. Nessun caricamento su server.</p></div>
      <div className="sidebar-footer">PREVIEW 0.1 <span>{desktop ? 'Desktop' : 'Browser'}</span></div>
    </aside>
    <main>
      <header className="topbar"><span>Il tuo spazio / <strong>{pages.find(p => p.id === page)?.label}</strong></span><span className="badge">◉ Solo sul tuo dispositivo</span></header>
      <div className="page-heading"><div><p className="eyebrow">CONSERVA. VERIFICA. RITROVA.</p><h1>{pages.find(p => p.id === page)?.label}</h1><p className="subtitle">{page === 'archive' ? 'Le tue conversazioni, oltre il tuo account.' : page === 'devices' ? 'Un’acquisizione consapevole, con limiti verificabili.' : page === 'registry' ? 'Prepara un percorso indipendente per ritrovare i tuoi gruppi.' : 'Controlla i byte conservati, prima di affidarti a una copia.'}</p></div><button className="primary" onClick={() => input.current?.click()} disabled={busy}>↥ Apri archivio JSON</button></div>
      <input ref={input} className="file-input" type="file" accept=".json,application/json" aria-label="Seleziona archivio JSON" onChange={e => { const file = e.target.files?.[0]; if (file) void openFile(file); }}/>
      {error && <div role="alert" className="error">{error}</div>}
      {busy && <p role="status">Verifica dell’archivio in corso…</p>}
      {verified && <div className="archive-strip"><span>✓ SHA-256 verificato · {archive!.manifest.length} file · {bytes.toLocaleString('it')} byte</span><span>{demo ? 'DATI SINTETICI' : 'FILE LOCALE'} · {source}</span></div>}
      {page === 'archive' && (!verified ? <section className="welcome"><div className="welcome-symbol" aria-hidden="true">◫</div><p className="eyebrow">UNO SPAZIO PER QUELLO CHE CONTA</p><h2>Le conversazioni restano con te.</h2><p>Apri un archivio JSON v1 per verificarne gli originali, oppure esplora una raccolta interamente dimostrativa.</p><button className="primary" onClick={() => void openDemo()} disabled={busy}>Esplora archivio dimostrativo <span aria-hidden="true">→</span></button><p className="small-print">Nessun dato reale. Backup del telefono e Vault cifrati non ancora supportati.</p></section> : <section className="reader" aria-label="Archivio conversazioni"><aside className="conversation-list"><div className="list-heading"><h2>Originali testuali</h2><span>{texts.length}</span></div><label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Cerca conversazioni e testo" placeholder="Cerca nome o contenuto" value={search} onChange={e => setSearch(e.target.value)}/></label><div className="chat-items">{filtered.map(entry => <button key={entry.path} className={selected === entry.path ? 'chat-item selected' : 'chat-item'} onClick={() => setSelected(entry.path)}><span className="avatar">{entry.path[0]}</span><span><strong>{entry.path.replace(/\.txt$/, '')}</strong><small>{originalText(verified.originals.get(entry.path)!)?.slice(0, 85)}</small></span></button>)}{filtered.length === 0 && <p className="empty-search">Nessun risultato.</p>}</div><button className="text-button" onClick={() => void openDemo()} disabled={busy}>Riapri la dimostrazione</button></aside><article className="transcript"><header><div><h2>{selected.replace(/\.txt$/, '')}</h2><p>Originale UTF-8 · nessuna ricostruzione dei messaggi</p></div><span className="verified-pill">✓ Verificato</span></header><div className="transcript-body">{content === null ? <p>Anteprima testuale non disponibile per questo file.</p> : <pre>{content}</pre>}</div><footer>La verifica conferma i file presenti. Non dimostra che la cronologia WhatsApp sia completa.</footer></article></section>)}
      {page === 'devices' && <section className="device-grid"><article className="panel"><div className="device-icon">▯</div><span className="tag">DA QUALIFICARE</span><h2>iPhone → computer</h2><p>Acquisizione via USB senza passaggio manuale in Finder. Pairing, cifratura e selezione dei dati WhatsApp devono essere verificati sul dispositivo.</p><button disabled>Acquisizione non ancora disponibile</button><small>Un filtro locale non garantisce un trasferimento limitato a WhatsApp.</small></article><article className="panel"><div className="device-icon">⇄</div><span className="tag">PIANIFICATO</span><h2>Android → computer</h2><p>Acquisizione tramite ADB, con autorizzazione del telefono e disponibilità dei backup e delle relative chiavi.</p><button disabled>Acquisizione non ancora disponibile</button><small>{desktop ? 'Questa preview non esegue comandi sul telefono.' : 'La versione web autonoma non acquisisce il backup via USB.'}</small></article></section>}
      {page === 'registry' && <section className="panel registry"><div className="section-heading"><h2>Contatti per ricominciare</h2><span className="tag">SOLA LETTURA</span></div><p>I contatti e le istruzioni provengono dall’archivio verificato. Nessun accesso automatico ai gruppi.</p>{archive?.registry.groups.map(group => <article key={group.id} className="group-card"><div><h3>{group.name}</h3><p>{group.community || 'Nessuna comunità indicata'} · {group.role}</p><span className="tag">{recoveryNeedsReview(group) ? 'DA RIVERIFICARE' : 'VERIFICATO DI RECENTE'}</span></div><div><h4>Contatto indipendente</h4>{group.contacts.length ? group.contacts.map((contact, i) => <p key={i}>{contact.displayName}<br/><span className="contact-channel">{contact.independentChannel}</span></p>) : <p>Nessun contatto disponibile.</p>}<h4>Passaggi manuali</h4><ol>{group.manualRecoverySteps.map((step, i) => <li key={i}>{step}</li>)}</ol></div></article>)}{!archive?.registry.groups.length && <p className="empty-search">Apri un archivio con un registro gruppi, oppure esplora la dimostrazione.</p>}</section>}
      {page === 'integrity' && <section className="panel"><div className="section-heading"><h2>Manifest degli originali</h2><span className="tag">SHA-256</span></div><p>Confrontiamo nomi, dimensioni e digest prima di mostrare un archivio. Gli hash non certificano autore o completezza dei dati.</p>{archive ? <><div className="table-wrap"><table><thead><tr><th>File</th><th>Byte</th><th>Digest verificato</th></tr></thead><tbody>{archive.manifest.map(entry => <tr key={entry.path}><td>{entry.path}</td><td>{entry.byteCount}</td><td><code>{entry.sha256}</code></td></tr>)}</tbody></table></div><h3>Avvisi dell’archivio</h3><ul>{archive.warnings.map((warning, i) => <li key={i}>{warning}</li>)}</ul></> : <p className="empty-search">Nessun archivio aperto.</p>}<div className="notice">La copia esterna cifrata e il ripristino indipendente restano requisiti dell’MVP. Questa preview non li implementa e non conserva i file dopo la chiusura.</div></section>}
      <footer className="page-footer"><span>ChatHarbor · indipendente da WhatsApp / Meta</span><span>Anteprima locale · nessuna sincronizzazione</span></footer>
    </main>
  </div>;
}
