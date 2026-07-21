'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart, Sparkles, Music, Play, Pause, Volume2, VolumeX,
  Bot, Send, ChevronRight, ChevronLeft, X, Gift, Lock,
  Disc, Hand, Image as ImageIcon, Video, Mail
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────── */
const IMAGES = [
  { id: 1, src: '/images/Snapchat-1257629011.jpg.jpeg', caption: 'Tumhari chhoti si bindi aur tumhari aankhein... dono bahut sundar lagti hain! ✨', tag: 'Eyes & Bindi Magic 👁️' },
  { id: 2, src: '/images/Snapchat-222109728.jpg.jpeg',  caption: 'Our official Cutie Lal Tamatar 🍅 looking effortlessly iconic!',                  tag: 'Lal Tamatar Vibe 🍅' },
  { id: 3, src: '/images/Snapchat-283870123.jpg.jpeg',  caption: "Rule #1: You're NOT a brown girl 😂, you're gori, okay na!!! 😋",                 tag: '100% Gori Cutie 💖' },
  { id: 4, src: '/images/Snapchat-389375502.jpg.jpeg',  caption: 'That million dollar smile that brightens up every single conversation 🥹✨',         tag: 'Pure Smiles 😊' },
];

const VIDEOS = [
  { id: 1,  src: '/videos/Snapchat-1012278807.mp4',  title: 'Cutie Moment #1',  tag: 'Lal Tamatar 🍅',    quote: 'That smile is illegal in all 50 states! 🫣' },
  { id: 2,  src: '/videos/Snapchat-104018395.mp4',   title: 'Cutie Moment #2',  tag: 'Vibe Master ✨',    quote: 'Effortlessly turning ordinary moments into magic.' },
  { id: 3,  src: '/videos/Snapchat-1396503234.mp4',  title: 'Cutie Moment #3',  tag: 'Main Character 👑', quote: 'Who allowed Jaya to be this pretty?' },
  { id: 4,  src: '/videos/Snapchat-1397558915.mp4',  title: 'Cutie Moment #4',  tag: 'Gori Vibe 😋',     quote: 'Proving once again why you are gori & glowing!' },
  { id: 5,  src: '/videos/Snapchat-1455710810.mp4',  title: 'Cutie Moment #5',  tag: 'Shenanigans 🤪',   quote: 'Conversations with you always leave a smile.' },
  { id: 6,  src: '/videos/Snapchat-1538511414.mp4',  title: 'Cutie Moment #6',  tag: 'Sparkle Eyes 👁️', quote: 'The eyes speak a whole love language.' },
  { id: 7,  src: '/videos/Snapchat-154661380.mp4',   title: 'Cutie Moment #7',  tag: 'Lal Tamatar 🍅',   quote: 'Maximum cute levels unlocked today at 21!' },
  { id: 8,  src: '/videos/Snapchat-1588194826.mp4',  title: 'Cutie Moment #8',  tag: 'Best Memories 💖', quote: 'May this friendship always stay like this!' },
  { id: 9,  src: '/videos/Snapchat-1617110476.mp4',  title: 'Cutie Moment #9',  tag: 'Special Chapter 📖',quote: 'Chapter 21 is going to be your best yet.' },
  { id: 10, src: '/videos/Snapchat-1803788998.mp4',  title: 'Cutie Moment #10', tag: 'Pure Joy 🎉',       quote: 'Khush rehna, smile karte rehna always!' },
  { id: 11, src: '/videos/Snapchat-1940547402.mp4',  title: 'Cutie Moment #11', tag: 'Cutie Jaya 🌸',    quote: 'Truly deserving of all the best things.' },
  { id: 12, src: '/videos/Snapchat-1961258862.mp4',  title: 'Cutie Moment #12', tag: 'Star Aura ⭐',     quote: 'Shining brighter than birthday candles!' },
  { id: 13, src: '/videos/Snapchat-1986263687.mp4',  title: 'Cutie Moment #13', tag: 'Random Laughs 😂', quote: 'Lots of laughs and random conversations!' },
  { id: 14, src: '/videos/Snapchat-2122440969.mp4',  title: 'Cutie Moment #14', tag: 'Bindi Royalty 👑', quote: 'Bindi on point, vibe on 100!' },
  { id: 15, src: '/videos/Snapchat-237346826.mp4',   title: 'Cutie Moment #15', tag: 'Cutie Vibe 🥹',    quote: 'Easily the easiest person to talk to.' },
  { id: 16, src: '/videos/Snapchat-256832633.mp4',   title: 'Cutie Moment #16', tag: 'Lal Tamatar 🍅',   quote: '100% fresh tomato energy!' },
  { id: 17, src: '/videos/Snapchat-28160896.mp4',    title: 'Cutie Moment #17', tag: 'Gori Queen 👑',    quote: 'Always glowing, always gorgeous.' },
  { id: 18, src: '/videos/Snapchat-428543530.mp4',   title: 'Cutie Moment #18', tag: 'Birthday Girl 🎂', quote: '21 years of pure perfection!' },
  { id: 19, src: '/videos/Snapchat-47553624.mp4',    title: 'Cutie Moment #19', tag: 'Good Times 💖',    quote: 'Making unforgettable memories together.' },
  { id: 20, src: '/videos/Snapchat-604481272.mp4',   title: 'Cutie Moment #20', tag: 'Star Power ✨',    quote: 'May all your wishes come true.' },
  { id: 21, src: '/videos/Snapchat-94430594.mp4',    title: 'Cutie Moment #21', tag: '21st Special 🥳',  quote: 'Finally 21! Enjoy your day to the fullest.' },
  { id: 22, src: '/videos/Snapchat-966736310.mp4',   title: 'Cutie Moment #22', tag: 'Aesthetic Queen 🎨',quote: 'Simply breathtaking every single time.' },
  { id: 23, src: '/videos/Snapchat-99173546.mp4',    title: 'Cutie Moment #23', tag: 'Love & Health ❤️', quote: 'Wishing you health, success, and endless love!' },
];

const PLAYLIST = [
  { id: 'aarzu',    title: 'Aarzu',           artist: 'Noor Khan, madhurxo',          type: 'local', src: '/music/aarzu.m4a' },
  { id: 'blacksuit',title: 'Black Suit',      artist: 'Preet Harpal ft. Fateh Doe',  type: 'yt',    ytId: 'Lp11-N1N64g' },
  { id: 'bawli',    title: 'Bawli',           artist: 'Suyash & Danny',              type: 'yt',    ytId: 'hp6Shc6wzRo' },
  { id: 'koyal',    title: 'Koyal Si Baani',  artist: 'Bigmoney & Laath Saab',       type: 'yt',    ytId: 'L_L84TjY_iA' },
  { id: 'you',      title: 'You',             artist: 'Karan Aujla & Ikky',          type: 'yt',    ytId: '1F7f1u8P5n4' },
];

type Tab = 'letter' | 'photos' | 'videos' | 'music' | 'ai';

/* ─── Dot Indicator ─────────────────────────────────────── */
function Dots({ total, current, onSelect, small = false }: { total: number; current: number; onSelect: (i: number) => void; small?: boolean }) {
  return (
    <div className="dots">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`dot ${i === current ? 'active' : 'inactive'}`}
          style={small ? { height: '6px' } : {}}
          aria-label={`Slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ─── Main App ──────────────────────────────────────────── */
export default function BirthdayApp() {
  const [entered, setEntered]           = useState(false);
  const [tab, setTab]                   = useState<Tab>('letter');
  const [letterOpen, setLetterOpen]     = useState(false);
  const [photoIdx, setPhotoIdx]         = useState(0);
  const [videoIdx, setVideoIdx]         = useState(0);
  const [trackIdx, setTrackIdx]         = useState(0);
  const [playing, setPlaying]           = useState(false);
  const [muted, setMuted]               = useState(false);
  const [lightbox, setLightbox]         = useState<{ type: 'image' | 'video'; src: string; caption?: string; title?: string } | null>(null);
  const [aiChat, setAiChat]             = useState<Array<{ from: 'user' | 'bot'; text: string }>>([
    { from: 'bot', text: 'Namaste Jaya! 🤖✨ I\'m your 21st Birthday AI Hype Bot. Tap a prompt or ask me anything!' }
  ]);
  const [aiInput, setAiInput]           = useState('');
  const [aiLoading, setAiLoading]       = useState(false);

  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const track = PLAYLIST[trackIdx];

  // Scroll AI chat to bottom
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [aiChat]);

  /* ── Confetti ── */
  const boom = () => confetti({ particleCount: 140, spread: 80, origin: { y: 0.55 } });

  /* ── Enter ── */
  const handleEnter = () => {
    setEntered(true);
    boom();
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  };

  /* ── Track ── */
  const playAt = (i: number) => {
    setTrackIdx(i);
    const t = PLAYLIST[i];
    if (t.type === 'local' && t.src && audioRef.current) {
      audioRef.current.src = t.src;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      if (audioRef.current) audioRef.current.pause();
      setPlaying(true);
    }
  };
  const nextTrack = () => playAt((trackIdx + 1) % PLAYLIST.length);
  const prevTrack = () => playAt((trackIdx - 1 + PLAYLIST.length) % PLAYLIST.length);

  /* ── Swipe ── */
  const onPhotoDrag = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 40) return;
    if (info.offset.x < 0) setPhotoIdx(p => (p + 1) % IMAGES.length);
    else setPhotoIdx(p => (p - 1 + IMAGES.length) % IMAGES.length);
  };
  const onVideoDrag = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) < 40) return;
    if (info.offset.x < 0) setVideoIdx(p => (p + 1) % VIDEOS.length);
    else setVideoIdx(p => (p - 1 + VIDEOS.length) % VIDEOS.length);
  };

  /* ── AI ── */
  const askAi = async (category?: string, custom?: string) => {
    const msg = custom || (category ? `Tell me something about ${category}!` : 'Hype me up!');
    setAiChat(p => [...p, { from: 'user', text: msg }]);
    setAiLoading(true);
    try {
      const res = await fetch('/api/compliment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, customPrompt: custom }),
      });
      const data = await res.json();
      setAiChat(p => [...p, { from: 'bot', text: data.compliment }]);
    } catch {
      setAiChat(p => [...p, { from: 'bot', text: "Jaya, you're absolute perfection! Happy 21st! 🎉❤️" }]);
    } finally {
      setAiLoading(false);
    }
  };

  /* ─── NAV TABS ─── */
  const TABS: { key: Tab; label: string; emoji: string }[] = [
    { key: 'letter', label: 'Letter',  emoji: '💌' },
    { key: 'photos', label: 'Photos',  emoji: '📸' },
    { key: 'videos', label: 'Videos',  emoji: '🎥' },
    { key: 'music',  label: 'Music',   emoji: '🎶' },
    { key: 'ai',     label: 'AI Bot',  emoji: '🤖' },
  ];

  /* ════════════════════════════════════════════════ */
  return (
    <>
      {/* Background Audio */}
      <audio ref={audioRef} src="/music/aarzu.m4a" muted={muted} onEnded={nextTrack} />

      {/* ── OPENING SCREEN ── */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            className="opening-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stars bg */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    background: 'white',
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                />
              ))}
            </div>

            {/* Lock badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ marginBottom: 28 }}
            >
              <span className="badge">
                <Lock style={{ width: 12, height: 12 }} />
                Only Jaya&apos;s eyes can see 🔒✨
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-head grad-text"
              style={{ fontSize: 'clamp(2rem, 9vw, 3rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
              Happy 21st Birthday, Jaya! 🎉❤️
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 40, maxWidth: 320 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              A magical space built with all my heart, dedicated to the prettiest eyes, the cutest bindi, and our adorable Cutie Lal Tamatar! 🥹🍅💖
            </motion.p>

            {/* Enter Button */}
            <motion.div
              style={{ width: '100%', maxWidth: 320 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button className="btn-primary glow-pulse" onClick={handleEnter}>
                <Gift style={{ width: 20, height: 20 }} />
                Open Jaya&apos;s Secret World 💖
              </button>
              <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: 12 }}>
                🎵 Tap to start background music
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN APP SHELL ── */}
      {entered && (
        <div className="app-shell">

          {/* ── TOP HEADER ── */}
          <header className="app-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <motion.span
                style={{ fontSize: 26 }}
                animate={{ rotate: [0, 15, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >🍅</motion.span>
              <div>
                <p className="font-head grad-text" style={{ fontSize: '1rem', fontWeight: 800, lineHeight: 1.1 }}>
                  Jaya&apos;s 21st 🎂
                </p>
                <p style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>
                  Cutie Lal Tamatar • Gori & Beautiful ✨
                </p>
              </div>
            </div>
            {/* Music mini-controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                onClick={() => { setPlaying(p => !p); playing ? audioRef.current?.pause() : audioRef.current?.play(); }}
                style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,71,87,0.2)', border: '1px solid rgba(255,71,87,0.4)', color: '#ff758c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {playing ? <Pause style={{ width: 15, height: 15 }} /> : <Play style={{ width: 15, height: 15 }} />}
              </button>
              <button
                onClick={() => setMuted(m => !m)}
                style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted ? '#ef4444' : '#22d3ee' }}
              >
                {muted ? <VolumeX style={{ width: 15, height: 15 }} /> : <Volume2 style={{ width: 15, height: 15 }} />}
              </button>
            </div>
          </header>

          {/* Now playing strip */}
          <div style={{ background: 'rgba(255,71,87,0.08)', borderBottom: '1px solid rgba(255,71,87,0.15)', padding: '6px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="spin-slow" style={{ width: 18, height: 18, borderRadius: '50%', background: 'conic-gradient(#ff4757, #00f2fe, #9b59b6, #ff4757)', flexShrink: 0 }} />
            <p style={{ fontSize: '0.7rem', color: '#ff758c', fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              ♪ {track.title} — {track.artist}
            </p>
          </div>

          {/* ── SCROLLABLE CONTENT ── */}
          <main className="app-content">

            {/* ═══ LETTER TAB ═══ */}
            {tab === 'letter' && (
              <motion.div
                className="page-pad"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <span className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}>💌 Sealed Birthday Note</span>
                  <h2 className="section-title grad-text">A Heartfelt Note for Jaya</h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: 6 }}>
                    Tap the wax seal to unfold your letter!
                  </p>
                </div>

                {/* Envelope Card */}
                <div className="glass-card" style={{ padding: 24, marginBottom: 16, border: '1px solid rgba(255,117,140,0.3)' }}>
                  {/* Wax Seal */}
                  <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <button className="wax-seal" onClick={() => { setLetterOpen(p => !p); if (!letterOpen) boom(); }}>
                      <Heart style={{ width: 28, height: 28, fill: 'white', color: 'white' }} />
                    </button>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ffd700', marginTop: 8, letterSpacing: '0.05em' }}>
                      {letterOpen ? 'TAP SEAL TO FOLD ✉️' : 'TAP WAX SEAL TO UNFOLD 💌'}
                    </p>
                  </div>

                  {/* Letter Content */}
                  <AnimatePresence>
                    {letterOpen && (
                      <motion.div
                        className="letter-paper"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
                          <h3 className="font-head grad-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                            Happy 21st Birthday, Jaya! 🎉❤️
                          </h3>
                          <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.7 }}>
                            Happiest Birthday to my{' '}
                            <span className="font-hand" style={{ fontSize: '1.3rem', color: '#ffd700', fontWeight: 700 }}>
                              Cutie, Jaya, Lal Tamatar
                            </span>
                            . 🥹🍅
                          </p>
                          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.7 }}>
                            Finally, you&apos;re 21! I hope this year brings you lots of happiness, success, good health, and all the things you&apos;ve been wishing for. You truly deserve the best.
                          </p>
                          <div style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)', borderRadius: 16, padding: 16 }}>
                            <p style={{ color: '#f9a8d4', fontStyle: 'italic', fontSize: '0.88rem', lineHeight: 1.7 }}>
                              &ldquo;Aur haan... ek baat bolun? You&apos;re really pretty. ✨ Tumhari chhoti si bindi aur tumhari aankhein... dono bahut sundar lagti hain.&rdquo;
                            </p>
                          </div>
                          <p style={{ color: '#7dd3fc', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Aur please, ek baat hamesha yaad rakhna... you&apos;re not a brown girl 😂, you&apos;re gori, okay na!!! 😋
                          </p>
                          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.7 }}>
                            Sach bolun toh tumse baat karke hamesha achha lagta hai. You&apos;re easy to talk to, and our conversations always leave a smile on my face.
                          </p>
                          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.7 }}>
                            I genuinely hope yeh friendship hamesha aise hi bani rahe, with lots of laughs, random conversations, and good memories.
                          </p>
                          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.7 }}>
                            Bas hamesha aise hi khush rehna, smile karte rehna, aur apna khayal rakhna. May this new chapter be full of beautiful moments and unforgettable memories.
                          </p>
                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                            <p className="font-head" style={{ color: '#ff758c', fontWeight: 700, fontSize: '1.1rem' }}>
                              Once again, Happy 21st Birthday, Jaya! 🎂🥳
                            </p>
                            <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: 4 }}>
                              Enjoy your day to the fullest — you deserve it. ❤️✨
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ═══ PHOTOS TAB ═══ */}
            {tab === 'photos' && (
              <motion.div
                className="page-pad"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <span className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}>📸 Swipeable Gallery</span>
                  <h2 className="section-title grad-text">Jaya&apos;s Photo Scrapbook</h2>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6, color: '#94a3b8', fontSize: '0.75rem' }}>
                    <Hand style={{ width: 14, height: 14, color: '#ffd700' }} />
                    Swipe left or right • Tap to expand
                  </div>
                </div>

                {/* Portrait Photo Card */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                  <div style={{ width: '100%', maxWidth: 300 }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={photoIdx}
                        className="photo-card"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.12}
                        onDragEnd={onPhotoDrag}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                        onClick={() => setLightbox({ type: 'image', src: IMAGES[photoIdx].src, caption: IMAGES[photoIdx].caption })}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={IMAGES[photoIdx].src} alt="Jaya" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 45%, rgba(0,0,0,0.1) 100%)' }} />
                        {/* Tag */}
                        <div style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(5,2,10,0.8)', backdropFilter: 'blur(8px)', padding: '5px 12px', borderRadius: 50, fontSize: '0.7rem', fontWeight: 700, color: '#ffd700', border: '1px solid rgba(255,215,0,0.3)' }}>
                          {IMAGES[photoIdx].tag}
                        </div>
                        {/* Counter */}
                        <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(5,2,10,0.8)', backdropFilter: 'blur(8px)', padding: '5px 10px', borderRadius: 50, fontSize: '0.7rem', fontWeight: 700, color: 'white' }}>
                          {photoIdx + 1}/{IMAGES.length}
                        </div>
                        {/* Caption */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 14px' }}>
                          <p style={{ fontSize: '0.8rem', color: 'white', fontWeight: 600, lineHeight: 1.5, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                            &ldquo;{IMAGES[photoIdx].caption}&rdquo;
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Dots */}
                <Dots total={IMAGES.length} current={photoIdx} onSelect={setPhotoIdx} />
                <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.7rem', marginTop: 10 }}>Tap photo to expand fullscreen ✨</p>
              </motion.div>
            )}

            {/* ═══ VIDEOS TAB ═══ */}
            {tab === 'videos' && (
              <motion.div
                className="page-pad"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <span className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}>🎥 Video Slideshow</span>
                  <h2 className="section-title grad-text">23 Cutie Moments</h2>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 6, color: '#94a3b8', fontSize: '0.75rem' }}>
                    <Hand style={{ width: 14, height: 14, color: '#ff758c' }} />
                    Swipe left or right • Tap to watch
                  </div>
                </div>

                {/* 16:9 Video Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={videoIdx}
                    className="video-card"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={onVideoDrag}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                    onClick={() => setLightbox({ type: 'video', src: VIDEOS[videoIdx].src, title: VIDEOS[videoIdx].title, caption: VIDEOS[videoIdx].quote })}
                    style={{ marginBottom: 16 }}
                  >
                    <video src={VIDEOS[videoIdx].src} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)' }} />
                    {/* Tag */}
                    <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(5,2,10,0.85)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 50, fontSize: '0.65rem', fontWeight: 700, color: '#ff758c', border: '1px solid rgba(255,117,140,0.3)' }}>
                      {VIDEOS[videoIdx].tag}
                    </div>
                    {/* Counter */}
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(5,2,10,0.85)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 50, fontSize: '0.65rem', fontWeight: 700, color: 'white' }}>
                      {videoIdx + 1}/{VIDEOS.length}
                    </div>
                    {/* Play icon */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play style={{ width: 22, height: 22, color: 'white', fill: 'white', marginLeft: 3 }} />
                      </div>
                    </div>
                    {/* Bottom info */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px' }}>
                      <p style={{ fontWeight: 700, color: 'white', fontSize: '0.85rem', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{VIDEOS[videoIdx].title}</p>
                      <p style={{ color: '#e2e8f0', fontSize: '0.72rem', fontStyle: 'italic', marginTop: 2, textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}>&ldquo;{VIDEOS[videoIdx].quote}&rdquo;</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <Dots total={VIDEOS.length} current={videoIdx} onSelect={setVideoIdx} small />
                <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.7rem', marginTop: 10 }}>Tap video to watch fullscreen 🎬</p>
              </motion.div>
            )}

            {/* ═══ MUSIC TAB ═══ */}
            {tab === 'music' && (
              <motion.div
                className="page-pad"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <span className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}>🎶 Music Lounge</span>
                  <h2 className="section-title grad-text">Jaya&apos;s Song Collection</h2>
                </div>

                {/* Vinyl Player */}
                <div className="glass-card" style={{ padding: 24, marginBottom: 16, textAlign: 'center', border: '1px solid rgba(255,71,87,0.25)' }}>
                  <div className={`vinyl ${playing ? 'spin-slow' : ''}`} style={{ marginBottom: 16 }}>
                    <div className="vinyl-inner">
                      <Disc style={{ width: 48, height: 48, color: '#ff758c' }} />
                    </div>
                  </div>
                  <p className="font-head" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: 2 }}>{track.title}</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: 20 }}>{track.artist}</p>

                  {/* Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
                    <button onClick={prevTrack} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChevronLeft style={{ width: 20, height: 20 }} />
                    </button>
                    <button
                      onClick={() => { setPlaying(p => !p); playing ? audioRef.current?.pause() : audioRef.current?.play(); }}
                      style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #ff4757, #ff758c)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(255,71,87,0.45)' }}
                    >
                      {playing ? <Pause style={{ width: 24, height: 24, fill: 'white' }} /> : <Play style={{ width: 24, height: 24, fill: 'white', marginLeft: 3 }} />}
                    </button>
                    <button onClick={nextTrack} style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChevronRight style={{ width: 20, height: 20 }} />
                    </button>
                  </div>

                  {/* YouTube embed */}
                  {track.type === 'yt' && (
                    <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', aspectRatio: '16/9' }}>
                      <iframe
                        style={{ width: '100%', height: '100%' }}
                        src={`https://www.youtube.com/embed/${track.ytId}?autoplay=1`}
                        title={track.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>

                {/* Playlist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {PLAYLIST.map((t, i) => (
                    <button key={t.id} className={`track-row ${trackIdx === i ? 'playing' : ''}`} onClick={() => playAt(i)}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: trackIdx === i ? 'linear-gradient(135deg,#ff4757,#ff758c)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.75rem', fontWeight: 800, color: 'white' }}>
                        {trackIdx === i
                          ? <div className="audio-bars">{[0, 0.2, 0.4].map((d, j) => <span key={j} className="audio-bar" style={{ animationDelay: `${d}s` }} />)}</div>
                          : i + 1
                        }
                      </div>
                      <div style={{ flex: 1, textAlign: 'left', overflow: 'hidden' }}>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', color: trackIdx === i ? 'white' : '#e2e8f0', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{t.title}</p>
                        <p style={{ fontSize: '0.72rem', color: '#64748b', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{t.artist}</p>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: '#475569', background: 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: 50, flexShrink: 0 }}>
                        {t.type === 'local' ? '🎵 Local' : '▶️ YT'}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ═══ AI BOT TAB ═══ */}
            {tab === 'ai' && (
              <motion.div
                className="page-pad"
                style={{ display: 'flex', flexDirection: 'column', minHeight: '70dvh' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <span className="badge" style={{ marginBottom: 10, display: 'inline-flex' }}>🤖 AI Hype Bot</span>
                  <h2 className="section-title grad-text">Jaya&apos;s Hype Bot</h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: 4 }}>Real-time compliments for our Cutie Lal Tamatar 🍅</p>
                </div>

                {/* Chat */}
                <div className="glass-card" style={{ flex: 1, padding: 16, marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', maxHeight: '38dvh', border: '1px solid rgba(0,242,254,0.2)' }}>
                  {aiChat.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
                      {msg.from === 'bot' && (
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#ff4757,#00f2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Bot style={{ width: 14, height: 14, color: 'white' }} />
                        </div>
                      )}
                      <div className={msg.from === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user'}>{msg.text}</div>
                    </div>
                  ))}
                  {aiLoading && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: '#64748b', fontSize: '0.78rem' }}>
                      <Bot style={{ width: 14, height: 14, color: '#00f2fe' }} />
                      <span style={{ fontStyle: 'italic' }}>Generating sweetness...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Prompts */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                  {[
                    { label: '✨ Bindi & Eyes', cat: 'bindi' },
                    { label: '🍅 Lal Tamatar', cat: 'tomato' },
                    { label: '😋 Gori Girl', cat: 'gori' },
                    { label: '🎂 21st Wish', cat: 'general' },
                  ].map(({ label, cat }) => (
                    <button
                      key={cat}
                      onClick={() => askAi(cat)}
                      style={{ padding: '10px 8px', borderRadius: 14, background: 'rgba(255,71,87,0.12)', border: '1px solid rgba(255,71,87,0.3)', color: '#ff758c', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <form
                  onSubmit={e => { e.preventDefault(); if (aiInput.trim()) { askAi(undefined, aiInput.trim()); setAiInput(''); } }}
                  style={{ display: 'flex', gap: 8 }}
                >
                  <input
                    type="text"
                    value={aiInput}
                    onChange={e => setAiInput(e.target.value)}
                    placeholder="Ask the AI for a sweet compliment..."
                    style={{ flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, padding: '12px 18px', fontSize: '0.85rem', color: 'white', outline: 'none' }}
                  />
                  <button
                    type="submit"
                    style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#ff4757,#ff758c)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 16px rgba(255,71,87,0.4)' }}
                  >
                    <Send style={{ width: 18, height: 18 }} />
                  </button>
                </form>
              </motion.div>
            )}
          </main>

          {/* ── BOTTOM NAV ── */}
          <nav className="bottom-nav">
            {TABS.map(t => (
              <button
                key={t.key}
                className={`nav-btn ${tab === t.key ? 'active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                <span className="nav-icon">{t.emoji}</span>
                <span className="nav-label">{t.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: 48, right: 20, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
            >
              <X style={{ width: 20, height: 20 }} />
            </button>
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: 480, maxHeight: '80dvh', borderRadius: 20, overflow: 'hidden' }}
            >
              {lightbox.type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={lightbox.src} alt="Expanded" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 20 }} />
              ) : (
                <video src={lightbox.src} controls autoPlay playsInline style={{ width: '100%', borderRadius: 20 }} />
              )}
            </motion.div>
            {(lightbox.title || lightbox.caption) && (
              <div style={{ textAlign: 'center', marginTop: 16, padding: '0 20px' }}>
                {lightbox.title && <p style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>{lightbox.title}</p>}
                {lightbox.caption && <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.85rem', marginTop: 4 }}>&ldquo;{lightbox.caption}&rdquo;</p>}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
