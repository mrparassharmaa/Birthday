'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Heart, Sparkles, Music, Play, Pause, Volume2, VolumeX, 
  Image as ImageIcon, Video, Bot, Send, ChevronRight, ChevronLeft, X, 
  Gift, Lock, Disc, Hand
} from 'lucide-react';

// Data for 4 Images
const IMAGES = [
  {
    id: 1,
    src: '/images/Snapchat-1257629011.jpg.jpeg',
    caption: 'Tumhari chhoti si bindi aur tumhari aankhein... dono bahut sundar lagti hain! ✨',
    tag: 'Eyes & Bindi Magic 👁️'
  },
  {
    id: 2,
    src: '/images/Snapchat-222109728.jpg.jpeg',
    caption: 'Our official Cutie Lal Tamatar 🍅 looking effortlessly iconic!',
    tag: 'Lal Tamatar Vibe 🍅'
  },
  {
    id: 3,
    src: '/images/Snapchat-283870123.jpg.jpeg',
    caption: "Rule #1: You're NOT a brown girl 😂, you're gori, okay na!!! 😋",
    tag: '100% Gori Cutie 💖'
  },
  {
    id: 4,
    src: '/images/Snapchat-389375502.jpg.jpeg',
    caption: 'That million dollar smile that brightens up every single conversation 🥹✨',
    tag: 'Pure Smiles 😊'
  }
];

// Data for 23 Videos
const VIDEOS = [
  { id: 1, src: '/videos/Snapchat-1012278807.mp4', title: 'Cutie Moment #1', tag: 'Lal Tamatar 🍅', quote: 'That smile is illegal in all 50 states! 🫣' },
  { id: 2, src: '/videos/Snapchat-104018395.mp4', title: 'Cutie Moment #2', tag: 'Vibe Master ✨', quote: 'Effortlessly turning ordinary moments into magic.' },
  { id: 3, src: '/videos/Snapchat-1396503234.mp4', title: 'Cutie Moment #3', tag: 'Main Character 👑', quote: 'Who allowed Jaya to be this pretty?' },
  { id: 4, src: '/videos/Snapchat-1397558915.mp4', title: 'Cutie Moment #4', tag: 'Gori Vibe 😋', quote: 'Proving once again why you are gori & glowing!' },
  { id: 5, src: '/videos/Snapchat-1455710810.mp4', title: 'Cutie Moment #5', tag: 'Shenanigans 🤪', quote: 'Conversations with you always leave a smile.' },
  { id: 6, src: '/videos/Snapchat-1538511414.mp4', title: 'Cutie Moment #6', tag: 'Sparkle Eyes 👁️', quote: 'The eyes speak a whole love language.' },
  { id: 7, src: '/videos/Snapchat-154661380.mp4', title: 'Cutie Moment #7', tag: 'Lal Tamatar 🍅', quote: 'Maximum cute levels unlocked today at 21!' },
  { id: 8, src: '/videos/Snapchat-1588194826.mp4', title: 'Cutie Moment #8', tag: 'Best Memories 💖', quote: 'May this friendship always stay like this!' },
  { id: 9, src: '/videos/Snapchat-1617110476.mp4', title: 'Cutie Moment #9', tag: 'Special Chapter 📖', quote: 'Chapter 21 is going to be your best yet.' },
  { id: 10, src: '/videos/Snapchat-1803788998.mp4', title: 'Cutie Moment #10', tag: 'Pure Joy 🎉', quote: 'Khush rehna, smile karte rehna always!' },
  { id: 11, src: '/videos/Snapchat-1940547402.mp4', title: 'Cutie Moment #11', tag: 'Cutie Jaya 🌸', quote: 'Truly deserving of all the best things.' },
  { id: 12, src: '/videos/Snapchat-1961258862.mp4', title: 'Cutie Moment #12', tag: 'Star Aura ⭐', quote: 'Shining brighter than birthday candles!' },
  { id: 13, src: '/videos/Snapchat-1986263687.mp4', title: 'Cutie Moment #13', tag: 'Random Laughs 😂', quote: 'Lots of laughs and random conversations!' },
  { id: 14, src: '/videos/Snapchat-2122440969.mp4', title: 'Cutie Moment #14', tag: 'Bindi Royalty 👑', quote: 'Bindi on point, vibe on 100!' },
  { id: 15, src: '/videos/Snapchat-237346826.mp4', title: 'Cutie Moment #15', tag: 'Cutie Vibe 🥹', quote: 'Easily the easiest person to talk to.' },
  { id: 16, src: '/videos/Snapchat-256832633.mp4', title: 'Cutie Moment #16', tag: 'Lal Tamatar 🍅', quote: '100% fresh tomato energy!' },
  { id: 17, src: '/videos/Snapchat-28160896.mp4', title: 'Cutie Moment #17', tag: 'Gori Queen 👑', quote: 'Always glowing, always gorgeous.' },
  { id: 18, src: '/videos/Snapchat-428543530.mp4', title: 'Cutie Moment #18', tag: 'Birthday Girl 🎂', quote: '21 years of pure perfection!' },
  { id: 19, src: '/videos/Snapchat-47553624.mp4', title: 'Cutie Moment #19', tag: 'Good Times 💖', quote: 'Making unforgettable memories together.' },
  { id: 20, src: '/videos/Snapchat-604481272.mp4', title: 'Cutie Moment #20', tag: 'Star Power ✨', quote: 'May all your wishes come true.' },
  { id: 21, src: '/videos/Snapchat-94430594.mp4', title: 'Cutie Moment #21', tag: '21st Special 🥳', quote: 'Finally 21! Enjoy your day to the fullest.' },
  { id: 22, src: '/videos/Snapchat-966736310.mp4', title: 'Cutie Moment #22', tag: 'Aesthetic Queen 🎨', quote: 'Simply breathtaking every single time.' },
  { id: 23, src: '/videos/Snapchat-99173546.mp4', title: 'Cutie Moment #23', tag: 'Love & Health ❤️', quote: 'Wishing you health, success, and endless love!' }
];

// Playlist of Songs
const MUSIC_PLAYLIST = [
  { id: 'aarzu', title: 'Aarzu', artist: 'Noor Khan, madhurxo', type: 'local', src: '/music/aarzu.m4a' },
  { id: 'blacksuit', title: 'Black Suit', artist: 'Preet Harpal ft. Fateh Doe', type: 'yt', ytId: 'Lp11-N1N64g' },
  { id: 'bawli', title: 'Bawli', artist: 'Suyash & Danny', type: 'yt', ytId: 'hp6Shc6wzRo' },
  { id: 'koyal', title: 'Koyal Si Baani', artist: 'Bigmoney & Laath Saab', type: 'yt', ytId: 'L_L84TjY_iA' },
  { id: 'you', title: 'You', artist: 'Karan Aujla & Ikky', type: 'yt', ytId: '1F7f1u8P5n4' }
];

export default function CenteredSwipeableBirthdayApp() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<'letter' | 'photos' | 'videos' | 'music' | 'ai'>('letter');
  const [isLetterUnfolded, setIsLetterUnfolded] = useState(false);

  // Audio Engine State
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Slider indices
  const [photoSliderIdx, setPhotoSliderIdx] = useState(0);
  const [videoSliderIdx, setVideoSliderIdx] = useState(0);

  // Lightbox
  const [activeMedia, setActiveMedia] = useState<{ type: 'image' | 'video'; src: string; caption?: string; title?: string } | null>(null);

  // AI Chat State
  const [aiChat, setAiChat] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Namaste Jaya! I am your 21st Birthday Holographic AI Hype Bot 🤖✨. Tap a prompt below or ask me anything!' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const currentTrack = MUSIC_PLAYLIST[currentTrackIndex];

  // Confetti burst
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Entrance action
  const handleEnter = () => {
    setHasEntered(true);
    triggerConfetti();
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Playlist Navigation
  const playTrackAtIndex = (index: number) => {
    setCurrentTrackIndex(index);
    const track = MUSIC_PLAYLIST[index];
    if (track.type === 'local' && track.src && audioRef.current) {
      audioRef.current.src = track.src;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      if (audioRef.current) audioRef.current.pause();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
    playTrackAtIndex(nextIdx);
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
    playTrackAtIndex(prevIdx);
  };

  // Hand Swipe Drag End Handlers for Photo & Video Sliders
  const handlePhotoDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      // Swiped Left -> Next Photo
      setPhotoSliderIdx((photoSliderIdx + 1) % IMAGES.length);
    } else if (info.offset.x > swipeThreshold) {
      // Swiped Right -> Prev Photo
      setPhotoSliderIdx((photoSliderIdx - 1 + IMAGES.length) % IMAGES.length);
    }
  };

  const handleVideoDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      // Swiped Left -> Next Video
      setVideoSliderIdx((videoSliderIdx + 1) % VIDEOS.length);
    } else if (info.offset.x > swipeThreshold) {
      // Swiped Right -> Prev Video
      setVideoSliderIdx((videoSliderIdx - 1 + VIDEOS.length) % VIDEOS.length);
    }
  };

  // AI Response Fetch
  const fetchAiCompliment = async (category?: string, promptText?: string) => {
    const userMessage = promptText || (category ? `Tell me something about ${category}!` : 'Hypeme up!');
    setAiChat(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/compliment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, customPrompt: promptText })
      });
      const data = await res.json();
      setAiChat(prev => [...prev, { sender: 'bot', text: data.compliment }]);
    } catch {
      setAiChat(prev => [...prev, { sender: 'bot', text: "Jaya, you're absolute perfection! Happy 21st Birthday! 🎉❤️" }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-28 text-center flex flex-col items-center justify-between">
      {/* Background Audio */}
      <audio 
        ref={audioRef} 
        src="/music/aarzu.m4a" 
        muted={isMuted}
        onEnded={nextTrack}
      />

      {/* 1. CENTERED 3D OPENING MODAL */}
      {!hasEntered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#05020a]/95 backdrop-blur-2xl">
          <motion.div 
            initial={{ scale: 0.85, opacity: 0, rotateX: 15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 110, damping: 14 }}
            className="card-3d max-w-lg w-full p-8 sm:p-10 text-center relative border-2 border-[#ff4757]/40 shadow-2xl flex flex-col items-center justify-center"
          >
            {/* BADGE: Only Jaya's eye can see 🔒✨ */}
            <div className="tomato-badge-3d mb-6 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4 text-[#ffd700]" /> Only Jaya's eye can see 🔒✨
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4 gradient-text text-center">
              Happy 21st Birthday, Jaya! 🎉❤️
            </h1>

            {/* LOVABLE DESCRIPTION */}
            <p className="text-slate-200 text-base sm:text-lg mb-8 leading-relaxed font-medium text-center">
              A magical space built with all my heart, dedicated to the prettiest eyes, the cutest bindi, and our adorable Cutie Lal Tamatar! 🥹🍅💖
            </p>

            <button 
              onClick={handleEnter}
              className="btn-3d-primary text-xl justify-center w-full shadow-2xl"
            >
              <Gift className="w-6 h-6 animate-bounce" /> Open Jaya's Secret World 💖
            </button>
            
            <p className="text-xs text-slate-400 mt-4 text-center">
              🎵 Tap to start continuous background music!
            </p>
          </motion.div>
        </div>
      )}

      {/* 2. MAIN APP CONTENT DASHBOARD */}
      {hasEntered && (
        <div className="max-w-4xl w-full mx-auto px-4 py-6 text-center flex flex-col items-center">
          
          {/* HEADER NAV BAR */}
          <header className="glass-panel-3d p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-4 z-40 w-full text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl animate-bounce">🍅</span>
              <div className="text-center md:text-left">
                <h2 className="font-heading text-xl font-bold gradient-text">Jaya's 21st Birthday</h2>
                <p className="text-xs text-slate-300">Cutie Lal Tamatar • Gori & Beautiful ✨</p>
              </div>
            </div>

            {/* NAV TABS */}
            <nav className="flex items-center justify-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0">
              <button 
                onClick={() => setActiveTab('letter')} 
                className={`nav-tab-3d ${activeTab === 'letter' ? 'active' : ''}`}
              >
                💌 Letter
              </button>
              <button 
                onClick={() => setActiveTab('photos')} 
                className={`nav-tab-3d ${activeTab === 'photos' ? 'active' : ''}`}
              >
                📸 Photos ({IMAGES.length})
              </button>
              <button 
                onClick={() => setActiveTab('videos')} 
                className={`nav-tab-3d ${activeTab === 'videos' ? 'active' : ''}`}
              >
                🎥 23 Videos
              </button>
              <button 
                onClick={() => setActiveTab('music')} 
                className={`nav-tab-3d ${activeTab === 'music' ? 'active' : ''}`}
              >
                🎶 Music Lounge
              </button>
              <button 
                onClick={() => setActiveTab('ai')} 
                className={`nav-tab-3d ${activeTab === 'ai' ? 'active' : ''}`}
              >
                🤖 AI Hype Bot
              </button>
            </nav>
          </header>

          {/* TAB 1: CENTERED 3D WAX-SEALED PAPER ENVELOPE */}
          {activeTab === 'letter' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-4 w-full text-center"
            >
              <div className="text-center mb-6">
                <span className="tomato-badge-3d mb-2">💌 Sealed Birthday Note</span>
                <h2 className="font-heading text-3xl font-bold gradient-text text-center">A Heartfelt Note for Jaya</h2>
                <p className="text-slate-300 text-sm mt-1 text-center">Tap the 3D Wax Seal below to unfold your message!</p>
              </div>

              {/* REALISTIC 3D PARCHMENT ENVELOPE CARD */}
              <div className="letter-envelope-card max-w-2xl w-full p-6 sm:p-10 text-center flex flex-col items-center justify-center">
                
                {/* WAX SEAL HEADER */}
                <div className="flex flex-col items-center justify-center mb-6">
                  <button 
                    onClick={() => {
                      setIsLetterUnfolded(!isLetterUnfolded);
                      if (!isLetterUnfolded) triggerConfetti();
                    }}
                    className="wax-seal-btn mb-2"
                    title="Tap to Unfold Letter"
                  >
                    <Heart className="w-8 h-8 fill-white" />
                  </button>
                  <span className="text-xs font-bold text-[#ffd700] tracking-wide text-center">
                    {isLetterUnfolded ? 'TAP SEAL TO FOLD ✉️' : 'TAP WAX SEAL TO UNFOLD 💌'}
                  </span>
                </div>

                {/* UNFOLDING PAPER MESSAGE */}
                <AnimatePresence>
                  {isLetterUnfolded && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="letter-paper-content text-center space-y-4 leading-relaxed w-full"
                    >
                      <h3 className="text-2xl sm:text-3xl font-extrabold gradient-text text-center mb-4">
                        Happy 21st Birthday, Jaya! 🎉❤️
                      </h3>

                      <p className="text-slate-100 text-lg text-center">
                        Happiest Birthday to my <span className="font-handwriting text-2xl text-[#ffd700] font-bold">Cutie, jaya, Lal Tamatar</span>. 🥹🍅
                      </p>

                      <p className="text-slate-200 text-center">
                        Finally, you're 21! I hope this year brings you lots of happiness, success, good health, and all the things you've been wishing for. You truly deserve the best.
                      </p>

                      <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/40 to-purple-950/40 border border-pink-500/30 italic text-pink-200 shadow-inner text-center">
                        "Aur haan... ek baat bolun? You're really pretty. ✨ Tumhari chhoti si bindi aur tumhari aankhein... dono bahut sundar lagti hain."
                      </div>

                      <p className="font-bold text-[#00f2fe] text-lg sm:text-xl text-center">
                        Aur please, ek baat hamesha yaad rakhna... you're not a brown girl 😂, you're gori, okay na!!! 😋
                      </p>

                      <p className="text-slate-200 text-center">
                        Sach bolun toh tumse baat karke hamesha achha lagta hai. You're easy to talk to, and our conversations always leave a smile on my face.
                      </p>

                      <p className="text-slate-200 text-center">
                        I genuinely hope yeh friendship hamesha aise hi bani rahe, with lots of laughs, random conversations, and good memories.
                      </p>

                      <p className="text-slate-200 text-center">
                        Bas hamesha aise hi khush rehna, smile karte rehna, aur apna khayal rakhna. May this new chapter of your life be full of beautiful moments and unforgettable memories.
                      </p>

                      <div className="pt-6 border-t border-white/15 text-center">
                        <p className="font-heading text-xl font-bold text-[#ff758c] text-center">
                          Once again, Happy 21st Birthday, Jaya! 🎂🥳
                        </p>
                        <p className="text-sm text-slate-300 text-center">Enjoy your day to the fullest—you deserve it. ❤️✨</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* TAB 2: HAND SWIPEABLE 3D PHOTO SLIDER */}
          {activeTab === 'photos' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 flex flex-col items-center w-full text-center"
            >
              <div className="text-center mb-6">
                <span className="tomato-badge-3d mb-2">📸 Hand Swipeable 3D Photos</span>
                <h2 className="font-heading text-3xl font-bold gradient-text text-center">Jaya's Photo Scrapbook</h2>
                <p className="text-slate-300 text-sm mt-1 text-center flex items-center justify-center gap-1.5">
                  <Hand className="w-4 h-4 text-[#ffd700] animate-bounce" /> Swipe with hand left or right to switch photos!
                </p>
              </div>

              {/* HAND SWIPEABLE 3D SLIDER */}
              <div className="relative w-full max-w-lg h-[460px] flex items-center justify-center mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={photoSliderIdx}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handlePhotoDragEnd}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 35 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -35 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setActiveMedia({ type: 'image', src: IMAGES[photoSliderIdx].src, caption: IMAGES[photoSliderIdx].caption })}
                    className="card-3d swipe-card-3d w-full h-full p-4 flex flex-col items-center border-2 border-[#ff4757]/40 shadow-2xl"
                  >
                    <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={IMAGES[photoSliderIdx].src} 
                        alt="Photo Item" 
                        className="w-full h-full object-cover pointer-events-none" 
                      />
                      <div className="absolute top-3 left-3 bg-[#05020a]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#ffd700]">
                        {IMAGES[photoSliderIdx].tag}
                      </div>
                    </div>
                    <div className="p-4 text-center flex-grow flex items-center justify-center">
                      <p className="text-sm font-medium text-slate-100 italic line-clamp-2 text-center">
                        "{IMAGES[photoSliderIdx].caption}"
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* SLIDER INDICATOR CONTROLS */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <button 
                  onClick={() => setPhotoSliderIdx((photoSliderIdx - 1 + IMAGES.length) % IMAGES.length)}
                  className="btn-3d-primary p-3 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-sm font-bold text-slate-200">
                  {photoSliderIdx + 1} / {IMAGES.length}
                </span>
                <button 
                  onClick={() => setPhotoSliderIdx((photoSliderIdx + 1) % IMAGES.length)}
                  className="btn-3d-primary p-3 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: HAND SWIPEABLE 3D VIDEO SLIDESHOW (23 VIDEOS) */}
          {activeTab === 'videos' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 flex flex-col items-center w-full text-center"
            >
              <div className="text-center mb-6">
                <span className="tomato-badge-3d mb-2">🎥 Hand Swipeable 3D Video Reels</span>
                <h2 className="font-heading text-3xl font-bold gradient-text text-center">23 Cutie Video Moments</h2>
                <p className="text-slate-300 text-sm mt-1 text-center flex items-center justify-center gap-1.5">
                  <Hand className="w-4 h-4 text-[#ff758c] animate-bounce" /> Swipe with hand left or right to browse 23 videos!
                </p>
              </div>

              {/* HAND SWIPEABLE 3D VIDEO SLIDE */}
              <div className="relative w-full max-w-xl h-[480px] flex items-center justify-center mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={videoSliderIdx}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleVideoDragEnd}
                    initial={{ opacity: 0, scale: 0.85, rotateY: 40 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.85, rotateY: -40 }}
                    transition={{ duration: 0.35 }}
                    onClick={() => setActiveMedia({ type: 'video', src: VIDEOS[videoSliderIdx].src, title: VIDEOS[videoSliderIdx].title, caption: VIDEOS[videoSliderIdx].quote })}
                    className="card-3d swipe-card-3d w-full h-full p-4 flex flex-col items-center border-2 border-[#ff4757]/40 shadow-2xl"
                  >
                    <div className="relative w-full h-80 bg-black rounded-2xl overflow-hidden">
                      <video 
                        src={VIDEOS[videoSliderIdx].src} 
                        autoPlay 
                        muted 
                        loop 
                        className="w-full h-full object-cover pointer-events-none" 
                      />
                      <div className="absolute top-3 left-3 bg-[#05020a]/80 px-3 py-1 rounded-full text-xs font-bold text-[#ff758c]">
                        {VIDEOS[videoSliderIdx].tag}
                      </div>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/40">
                          <Play className="w-7 h-7 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 text-center flex-grow flex flex-col justify-center items-center">
                      <h4 className="font-bold text-white text-lg mb-1 text-center">{VIDEOS[videoSliderIdx].title}</h4>
                      <p className="text-xs font-semibold text-slate-300 italic text-center">"{VIDEOS[videoSliderIdx].quote}"</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* VIDEO SLIDER CONTROLS */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <button 
                  onClick={() => setVideoSliderIdx((videoSliderIdx - 1 + VIDEOS.length) % VIDEOS.length)}
                  className="btn-3d-primary p-3 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <span className="text-sm font-bold text-slate-200">
                  Video {videoSliderIdx + 1} of {VIDEOS.length}
                </span>
                <button 
                  onClick={() => setVideoSliderIdx((videoSliderIdx + 1) % VIDEOS.length)}
                  className="btn-3d-primary p-3 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 4: BEAUTIFULLY MANAGED MUSIC LIBRARY */}
          {activeTab === 'music' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-4 w-full text-center"
            >
              <div className="text-center mb-8">
                <span className="tomato-badge-3d mb-2">🎶 Music Library</span>
                <h2 className="font-heading text-3xl font-bold gradient-text text-center">Jaya's Song Collection</h2>
                <p className="text-slate-300 text-sm mt-1 text-center">Tap any song to play instantly or let the continuous playlist auto-advance!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {/* VINYL PLAYER CARD */}
                <div className="card-3d p-6 md:col-span-1 flex flex-col items-center justify-center text-center border-2 border-[#ff4757]/40">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#ff4757] via-[#00f2fe] to-[#9b59b6] p-1.5 animate-glow-3d mb-6">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                      <Disc className="w-20 h-20 text-[#ff758c] animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-white mb-1 text-center">
                    {currentTrack.title}
                  </h3>
                  <p className="text-sm text-slate-300 mb-6 text-center">{currentTrack.artist}</p>

                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button onClick={prevTrack} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        if (audioRef.current) {
                          isPlaying ? audioRef.current.pause() : audioRef.current.play();
                        }
                      }} 
                      className="btn-3d-primary py-3 px-8 text-lg"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>
                    <button onClick={nextTrack} className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {currentTrack.type === 'yt' && (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/15">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${currentTrack.ytId}?autoplay=1`}
                        title={currentTrack.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>

                {/* PLAYLIST JUKEBOX */}
                <div className="card-3d p-6 md:col-span-2 flex flex-col justify-between items-center text-center">
                  <div className="w-full">
                    <h3 className="font-heading text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#ffd700]" /> Managed Playlist Tracks
                    </h3>

                    <div className="space-y-3 w-full">
                      {MUSIC_PLAYLIST.map((track, idx) => (
                        <div 
                          key={track.id}
                          onClick={() => playTrackAtIndex(idx)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            currentTrackIndex === idx 
                              ? 'bg-[#ff4757]/20 border-[#ff4757] text-white shadow-xl' 
                              : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-extrabold ${currentTrackIndex === idx ? 'bg-[#ff4757] text-white' : 'bg-white/10'}`}>
                              {idx + 1}
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-base">{track.title}</h4>
                              <p className="text-xs text-slate-400">{track.artist}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15">
                              {track.type === 'local' ? 'Local Audio 🎵' : 'YouTube Stream 📺'}
                            </span>
                            {currentTrackIndex === idx && (
                              <div className="flex gap-1 items-end h-5">
                                <span className="audio-bar" style={{ animationDelay: '0s' }} />
                                <span className="audio-bar" style={{ animationDelay: '0.2s' }} />
                                <span className="audio-bar" style={{ animationDelay: '0.4s' }} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: AI HYPE BOT */}
          {activeTab === 'ai' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-4 max-w-3xl w-full mx-auto text-center"
            >
              <div className="text-center mb-8">
                <span className="tomato-badge-3d mb-2">🤖 Holographic AI Bot</span>
                <h2 className="font-heading text-3xl font-bold gradient-text text-center">Jaya's Personal Hype Bot</h2>
                <p className="text-slate-300 text-sm mt-1 text-center">Real-time compliments crafted for our Cutie Lal Tamatar 🍅</p>
              </div>

              <div className="card-3d p-6 min-h-[480px] flex flex-col justify-between items-center border-2 border-[#00f2fe]/40 w-full">
                <div className="space-y-4 mb-6 max-h-[360px] overflow-y-auto pr-2 w-full">
                  {aiChat.map((msg, idx) => (
                    <div 
                      key={idx}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff4757] via-[#00f2fe] to-[#9b59b6] flex items-center justify-center text-white shrink-0 shadow-lg">
                          <Bot className="w-5 h-5" />
                        </div>
                      )}

                      <div className={`max-w-md p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#ff4757] to-[#ff758c] text-white rounded-br-none shadow-lg font-medium text-left'
                          : 'bg-white/10 border border-white/15 text-slate-100 rounded-bl-none text-left'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isAiLoading && (
                    <div className="flex gap-3 justify-start items-center text-slate-400 text-sm italic">
                      <Bot className="w-5 h-5 animate-spin text-[#00f2fe]" />
                      Generating custom sweetness...
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  <button 
                    onClick={() => fetchAiCompliment('bindi')}
                    className="btn-3d-primary py-2 px-4 text-xs font-semibold"
                  >
                    ✨ Bindi & Eyes
                  </button>
                  <button 
                    onClick={() => fetchAiCompliment('tomato')}
                    className="btn-3d-primary py-2 px-4 text-xs font-semibold"
                  >
                    🍅 Lal Tamatar Vibe
                  </button>
                  <button 
                    onClick={() => fetchAiCompliment('gori')}
                    className="btn-3d-primary py-2 px-4 text-xs font-semibold"
                  >
                    😋 Gori Girl Truth
                  </button>
                  <button 
                    onClick={() => fetchAiCompliment('general')}
                    className="btn-3d-primary py-2 px-4 text-xs font-semibold"
                  >
                    🎂 21st Wish
                  </button>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (aiInput.trim()) {
                      fetchAiCompliment(undefined, aiInput.trim());
                      setAiInput('');
                    }
                  }}
                  className="flex gap-2 w-full"
                >
                  <input 
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask the AI for a sweet compliment..."
                    className="flex-grow bg-white/10 border border-white/20 rounded-full px-5 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#00f2fe] text-center"
                  />
                  <button type="submit" className="btn-3d-primary py-3 px-6 text-sm">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* LIGHTBOX MODAL */}
          {activeMedia && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative max-w-4xl w-full card-3d p-4 flex flex-col items-center border-2 border-white/30"
              >
                <button 
                  onClick={() => setActiveMedia(null)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {activeMedia.type === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={activeMedia.src} 
                    alt="Enlarged Photo" 
                    className="max-h-[75vh] w-auto object-contain rounded-xl"
                  />
                ) : (
                  <video 
                    src={activeMedia.src} 
                    controls 
                    autoPlay 
                    className="max-h-[75vh] w-auto rounded-xl"
                  />
                )}

                {(activeMedia.caption || activeMedia.title) && (
                  <div className="mt-4 text-center">
                    {activeMedia.title && <h3 className="font-bold text-lg text-white mb-1 text-center">{activeMedia.title}</h3>}
                    {activeMedia.caption && <p className="text-slate-300 italic text-sm text-center">"{activeMedia.caption}"</p>}
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {/* PERSISTENT FLOATING MUSIC PLAYER BAR */}
          <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] glass-panel-3d p-3 px-5 flex items-center justify-between border-2 border-[#ff4757]/40 shadow-2xl">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#ff4757] to-[#00f2fe] flex items-center justify-center shrink-0 animate-spin" style={{ animationDuration: '10s' }}>
                <Music className="w-5 h-5 text-white" />
              </div>
              <div className="overflow-hidden text-left">
                <p className="font-bold text-sm text-white truncate">{currentTrack.title}</p>
                <p className="text-xs text-slate-300 truncate">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button onClick={prevTrack} className="p-2 text-white hover:text-[#ff758c]">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  if (audioRef.current) {
                    isPlaying ? audioRef.current.pause() : audioRef.current.play();
                  }
                }}
                className="p-2.5 rounded-full bg-[#ff4757] text-white hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              <button onClick={nextTrack} className="p-2 text-white hover:text-[#ff758c]">
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-slate-300 hover:text-white"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
