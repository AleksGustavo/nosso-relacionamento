'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// 1. ANIMAÇÃO DE ENTRADA
function IntroAnimation() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (isAnimationComplete) return null;

  const bgLuxury = {
    background: 'radial-gradient(circle at center, #7a0012 0%, #300007 50%, #0a0002 100%)',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none flex items-center justify-center">
      <div 
        className="absolute inset-y-0 left-0 w-1/2 animate-slide-left z-10 overflow-hidden"
        style={bgLuxury}
      >
        <div className="absolute top-1/4 left-1/3 w-36 h-36 md:w-72 md:h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-10 w-28 h-28 md:w-56 md:h-56 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div 
        className="absolute inset-y-0 right-0 w-1/2 animate-slide-right z-10 overflow-hidden"
        style={bgLuxury}
      >
        <div className="absolute top-1/4 right-1/3 w-36 h-36 md:w-72 md:h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 w-28 h-28 md:w-56 md:h-56 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-30 animate-slide-left">
        <img 
          src="/images/letreiro.png" 
          alt="Aleks & Mayara" 
          className="max-w-[90vw] md:max-w-[850px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(217,119,6,0.4)]"
          style={{ clipPath: 'inset(0 50% 0 0)' }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-30 animate-slide-right">
        <img 
          src="/images/letreiro.png" 
          alt="Aleks & Mayara" 
          className="max-w-[90vw] md:max-w-[850px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(217,119,6,0.4)]"
          style={{ clipPath: 'inset(0 0 0 50%)' }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <img 
          src="/images/coracao.png" 
          alt="Coração" 
          className="w-12 h-12 md:w-20 md:h-20 object-contain animate-heart-grow drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
        />
      </div>
    </div>
  );
}

// 2. CORAÇÕES FLUTUANTES 3D (Com suporte à troca de cor)
function FloatingHeartsBackground({ isDark }: { isDark: boolean }) {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    direction: 'up' | 'down';
    blur: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const generatedHearts = Array.from({ length: 25 }).map((_, index) => ({
      id: index,
      left: Math.random() * 92 + 2,
      size: Math.floor(Math.random() * 30) + 20, // tamanho um pouco mais suave no mobile
      duration: Math.floor(Math.random() * 5) + 4,
      delay: Math.random() * 5,
      direction: index % 2 === 0 ? 'up' : 'down',
      blur: Math.random() > 0.7 ? Math.random() * 1.5 : 0,
      opacity: Math.random() * 0.4 + 0.6,
    }));

    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${
            heart.direction === 'up' ? 'animate-heart-up' : 'animate-heart-down'
          }`}
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            filter: heart.blur ? `blur(${heart.blur}px)` : 'none',
            perspective: '800px',
            ['--heart-duration' as any]: `${heart.duration}s`,
            ['--heart-delay' as any]: `${heart.delay}s`,
            ['--heart-opacity' as any]: heart.opacity,
          }}
        >
          <img
            src="/images/coracao.png"
            alt=""
            className="w-full h-full object-contain transition-all duration-1000 ease-in-out"
            style={{
              filter: isDark
                ? 'brightness(0) saturate(100%) invert(100%) drop-shadow(0 4px 12px rgba(255,255,255,0.6))'
                : 'brightness(0) saturate(100%) invert(18%) sepia(85%) saturate(5423%) hue-rotate(345deg) brightness(98%) contrast(92%) drop-shadow(0 4px 12px rgba(225,29,72,0.4))',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Intervalo contínuo de 20 segundos para alternar o tema
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDarkTheme((prevTheme) => !prevTheme);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.06); }
          28% { transform: scale(1); }
          42% { transform: scale(1.06); }
          70% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 1.8s infinite ease-in-out;
        }
      `}</style>

      <IntroAnimation />

      {/* CANVAS PRINCIPAL */}
      <main 
        className={`relative min-h-screen h-full w-full overflow-x-hidden flex flex-col items-center justify-between p-3 sm:p-4 md:p-6 transition-colors duration-1000 ease-in-out ${
          isDarkTheme 
            ? 'bg-gradient-to-b from-rose-950 via-red-900 to-rose-900 text-white' 
            : 'bg-gradient-to-b from-white via-rose-50/50 to-pink-100/30 text-gray-800'
        }`}
      >
        
        {/* Luzes Suaves de Fundo */}
        <div className={`absolute top-5 right-5 w-48 h-48 md:w-80 md:h-80 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isDarkTheme ? 'bg-red-500/20' : 'bg-rose-200/30'
        }`} />
        <div className={`absolute bottom-5 left-5 w-48 h-48 md:w-80 md:h-80 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isDarkTheme ? 'bg-rose-600/20' : 'bg-pink-200/30'
        }`} />

        {/* Fundo com Corações Flutuantes */}
        <FloatingHeartsBackground isDark={isDarkTheme} />

        {/* 1. ALEKS - Canto Inferior Esquerdo */}
        <div className="absolute -bottom-8 md:bottom-4 -left-4 md:left-8 z-10 animate-fade-in-delayed flex flex-col items-start pointer-events-none opacity-35 md:opacity-100 transition-opacity duration-500">
          <div className="relative group pointer-events-auto flex flex-col items-start">
            <img 
              src="/images/aleks-.png" 
              alt="Aleks" 
              className="w-36 sm:w-48 md:w-64 lg:w-[360px] max-h-[40vh] md:max-h-[60vh] h-auto object-contain transition-transform duration-500 hover:scale-[1.01]"
              style={{
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 100%)',
                maskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 100%)',
              }}
            />
            <span className={`absolute bottom-2 left-3 md:left-6 text-[9px] md:text-xs font-semibold tracking-widest uppercase drop-shadow-sm px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full border transition-all duration-1000 ${
              isDarkTheme
                ? 'bg-rose-950/80 text-rose-100 border-rose-700/50 backdrop-blur-md'
                : 'bg-white/80 text-rose-700 border-rose-200/50 backdrop-blur-md'
            }`}>
              Aleks ♡
            </span>
          </div>
        </div>

        {/* 2. MAYARA - Canto Superior Direito */}
        <div className="absolute -top-8 md:top-4 -right-4 md:right-8 z-10 animate-fade-in-delayed flex flex-col items-end pointer-events-none opacity-35 md:opacity-100 transition-opacity duration-500">
          <div className="relative group pointer-events-auto flex flex-col items-end">
            <img 
              src="/images/mayara.png" 
              alt="Mayara" 
              className="w-36 sm:w-48 md:w-64 lg:w-[350px] max-h-[40vh] md:max-h-[60vh] h-auto object-contain transition-transform duration-500 hover:scale-[1.01]"
              style={{
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 25%, black 100%)',
                maskImage: 'linear-gradient(to top, transparent 0%, black 25%, black 100%)',
              }}
            />
            <span className={`absolute bottom-2 right-3 md:right-6 text-[9px] md:text-xs font-semibold tracking-widest uppercase drop-shadow-sm px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full border transition-all duration-1000 ${
              isDarkTheme
                ? 'bg-rose-950/80 text-rose-100 border-rose-700/50 backdrop-blur-md'
                : 'bg-white/80 text-rose-700 border-rose-200/50 backdrop-blur-md'
            }`}>
              Mayara ♡
            </span>
          </div>
        </div>

        {/* 3. ESTRUTURA CENTRAL: LOGO + CARD */}
        <div className="relative z-20 w-[92vw] max-w-[450px] md:max-w-[490px] flex flex-col items-center justify-center my-auto py-4 md:py-0 gap-1.5 animate-fade-in-delayed-2">
          
          {/* LOGOTIPO COM ANIMAÇÃO DE PALPITAÇÃO */}
          <div className="flex flex-col items-center text-center group mb-1">
            <img 
              src="/images/letreiro.png" 
              alt="Aleks & Mayara" 
              className="w-56 sm:w-64 md:w-80 lg:w-[430px] max-w-[85vw] h-auto object-contain drop-shadow-[0_6px_16px_rgba(225,29,72,0.35)] animate-heartbeat origin-center"
            />
            <p className={`text-[9px] sm:text-[10px] md:text-xs font-medium tracking-wide italic -mt-2 px-2.5 py-0.5 rounded-full border shadow-xs transition-all duration-1000 ${
              isDarkTheme
                ? 'bg-rose-900/80 text-rose-100 border-white/80 backdrop-blur-sm'
                : 'bg-white/70 text-rose-700 border-rose-500 backdrop-blur-sm'
            }`}>
              Bem-vindos ao nosso espaço especial
            </p>
          </div>

          {/* CARD DE NAVEGAÇÃO CENTRAL */}
          <div className="relative w-full">

            {/* === FLECHA 3D: ENTRADA === */}
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-8 z-30 pointer-events-none w-16 h-16 md:w-28 md:h-28 flex items-center justify-center">
              <svg className="w-full h-full drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)]" viewBox="0 0 200 200" fill="none">
                <line x1="80" y1="120" x2="160" y2="40" stroke="#78350f" strokeWidth="7" strokeLinecap="round"/>
                <line x1="80" y1="120" x2="160" y2="40" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M135 65 Q165 40 175 22 Q148 40 125 55 Z" fill="#dc2626"/>
                <path d="M140 70 Q170 45 180 27 Q153 45 130 60 Z" fill="#f8fafc"/>
                <path d="M145 75 Q175 50 185 32 Q158 50 135 65 Z" fill="#991b1b"/>
              </svg>
            </div>

            {/* === FLECHA 3D: SAÍDA === */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-9 z-30 pointer-events-none w-16 h-16 md:w-28 md:h-28 flex items-center justify-center">
              <svg className="w-full h-full drop-shadow-[0_10px_12px_rgba(0,0,0,0.6)]" viewBox="0 0 200 200" fill="none">
                <line x1="120" y1="80" x2="80" y2="120" stroke="#78350f" strokeWidth="7" strokeLinecap="round"/>
                <path d="M80 120 L30 170 L58 142 L42 128 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5"/>
                <path d="M80 120 L30 170 L42 128 Z" fill="#cbd5e1"/>
              </svg>
            </div>

            {/* O CARD PRINCIPAL */}
            <div className={`relative w-full py-4 sm:py-5 md:py-6 px-4 sm:px-5 rounded-[1.5rem] md:rounded-[1.8rem] border-2 backdrop-blur-xl overflow-hidden transition-all duration-1000 ease-in-out ${
              isDarkTheme
                ? 'bg-gradient-to-br from-white via-rose-50 to-pink-100 text-rose-950 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/80'
                : 'bg-gradient-to-br from-rose-600 via-red-700 to-rose-950 text-white shadow-[0_20px_40px_rgba(153,27,27,0.45)] border-rose-400/40'
            }`}>
              
              {/* Efeito de Vidro */}
              <div className={`absolute -top-20 -left-20 w-44 h-44 md:w-56 md:h-56 rounded-full blur-2xl pointer-events-none transition-colors duration-1000 ${
                isDarkTheme ? 'bg-rose-300/30' : 'bg-white/10'
              }`}/>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/15 via-transparent to-black/20 pointer-events-none"/>
              
              {/* Moldura Interna */}
              <div className={`absolute inset-1.5 sm:inset-2 rounded-[1.2rem] md:rounded-[1.4rem] border pointer-events-none transition-colors duration-1000 ${
                isDarkTheme ? 'border-rose-300/40' : 'border-white/20'
              }`}/>

              {/* TÍTULOS */}
              <div className="relative z-10 text-center my-1 md:my-1.5">
                <h2 className={`text-lg sm:text-xl md:text-2xl font-serif font-bold tracking-wide transition-colors duration-1000 ${
                  isDarkTheme ? 'text-rose-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]' : 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]'
                }`}>
                  Nosso Universo
                </h2>
                <p className={`text-[10px] sm:text-[11px] md:text-xs italic font-serif mt-0.5 transition-colors duration-1000 ${
                  isDarkTheme ? 'text-rose-700' : 'text-rose-100/90'
                }`}>
                  "Entre cada olhar, um mundo só nosso."
                </p>
              </div>

              {/* NAVEGAÇÃO / BOTÕES */}
              <nav className="relative z-10 flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 mt-2 md:mt-2.5">
                
                {[
                  { href: '/historia', icon: '📖', label: 'Nossa História' },
                  { href: '/galeria', icon: '📸', label: 'Galeria de Fotos' },
                  { href: '/cartas', icon: '💌', label: 'Cartas & Recados' },
                  { href: '/musicas', icon: '🎵', label: 'Trilha Sonora' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-medium text-xs shadow-xs transition-all duration-500 hover:scale-[1.01] flex items-center justify-center gap-2 backdrop-blur-md border ${
                      isDarkTheme
                        ? 'bg-rose-100/80 hover:bg-rose-200/90 border-rose-300/60 text-rose-900'
                        : 'bg-white/15 hover:bg-white/25 border-white/30 hover:border-white/60 text-white'
                    }`}
                  >
                    <span className="text-xs">{item.icon}</span> {item.label}
                  </Link>
                ))}

                {/* Botão em Destaque (Mural) */}
                <Link 
                  href="/visitantes" 
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-bold text-xs transition-all duration-500 hover:scale-[1.01] shadow-md flex items-center justify-center gap-2 mt-0.5 border ${
                    isDarkTheme
                      ? 'bg-gradient-to-r from-rose-700 to-red-800 hover:from-rose-600 hover:to-red-700 text-white border-rose-500/50'
                      : 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white border-rose-300/50'
                  }`}
                >
                  <span className="text-xs">✍️</span> Mural dos Visitantes
                </Link>

              </nav>

              {/* RODAPÉ */}
              <div className={`relative z-10 flex items-center justify-center mt-2.5 md:mt-3 pt-1.5 md:pt-2 border-t text-[9px] md:text-[10px] transition-colors duration-1000 ${
                isDarkTheme ? 'border-rose-200 text-rose-700' : 'border-white/15 text-rose-200/80'
              }`}>
                <span>Feito com carinho e amor ❤️</span>
              </div>

            </div>
          </div>

        </div>

        {/* 4. BOTÃO FLUTUANTE DE ALTERNÂNCIA DE TEMA (Canto Inferior Direito) */}
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          title="Alternar Tema"
          className={`fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full shadow-lg border transition-all duration-500 hover:scale-110 active:scale-95 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold backdrop-blur-md ${
            isDarkTheme
              ? 'bg-white/90 text-rose-900 border-rose-300 hover:bg-white shadow-rose-950/40'
              : 'bg-rose-950/80 text-rose-100 border-rose-700/60 hover:bg-rose-900 shadow-black/30'
          }`}
        >
          <span>{isDarkTheme ? '☀️ White Mode' : '🌙 Red Mode'}</span>
        </button>

      </main>
    </>
  );
}