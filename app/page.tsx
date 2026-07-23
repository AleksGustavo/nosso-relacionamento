'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

function IntroAnimation() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  if (isAnimationComplete) return null;

  // Estilo base do fundo luxuoso (Gradiente de Vermelho Vinho para Preto)
  const bgLuxury = {
    background: 'radial-gradient(circle at center, #7a0012 0%, #300007 50%, #0a0002 100%)',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none flex items-center justify-center">
      
      {/* 1. FUNDO LUXUOSO - Cortina Esquerda */}
      <div 
        className="absolute inset-y-0 left-0 w-1/2 animate-slide-left z-10 overflow-hidden"
        style={bgLuxury}
      >
        {/* Luz Ambiente / Partículas Bokeh Douradas na Esquerda */}
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-10 w-56 h-56 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 2. FUNDO LUXUOSO - Cortina Direita */}
      <div 
        className="absolute inset-y-0 right-0 w-1/2 animate-slide-right z-10 overflow-hidden"
        style={bgLuxury}
      >
        {/* Luz Ambiente / Partículas Bokeh Douradas na Direita */}
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 w-56 h-56 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 3. LETREIRO - Metade Esquerda com Brilho Dourado (AUMENTADO) */}
      <div className="absolute inset-0 flex items-center justify-center z-30 animate-slide-left">
        <img 
          src="/images/letreiro.png" 
          alt="Aleks & Mayara" 
          className="max-w-[95vw] md:max-w-[850px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(217,119,6,0.4)]"
          style={{ clipPath: 'inset(0 50% 0 0)' }}
        />
      </div>

      {/* 4. LETREIRO - Metade Direita com Brilho Dourado (AUMENTADO) */}
      <div className="absolute inset-0 flex items-center justify-center z-30 animate-slide-right">
        <img 
          src="/images/letreiro.png" 
          alt="Aleks & Mayara" 
          className="max-w-[95vw] md:max-w-[850px] h-auto object-contain drop-shadow-[0_15px_30px_rgba(217,119,6,0.4)]"
          style={{ clipPath: 'inset(0 0 0 50%)' }}
        />
      </div>

      {/* 5. CORAÇÃO - Animação de Expansão */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <img 
          src="/images/coracao.png" 
          alt="Coração" 
          className="w-20 h-20 object-contain animate-heart-grow drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
        />
      </div>

    </div>
  );
}

export default function Home() {
  return (
    <>
      <IntroAnimation />

      <main className="min-h-screen flex flex-col md:flex-row bg-pink-50 text-gray-800">
        
        {/* SECTION 1: A Nossa História / Apresentação */}
        <section className="flex-1 flex flex-col justify-center items-center p-8 text-center border-b md:border-b-0 md:border-r border-pink-200">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 animate-fade-in-delayed">
            Nossa História ♡
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-md mb-6 animate-fade-in-delayed-2">
            Um espaço dedicado a guardar nossos melhores momentos, memórias e sentimentos.
          </p>
          <Link 
            href="/galeria"
            className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold shadow-md hover:bg-pink-600 transition-all animate-fade-in-delayed-3"
          >
            Ver Linha do Tempo
          </Link>
        </section>

        {/* SECTION 2: Menu / Áreas de Acesso */}
        <section className="flex-1 flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6 animate-fade-in-delayed">
            Explorar Nosso Mundo
          </h2>
          
          <div className="flex flex-col gap-4 w-full max-w-xs animate-fade-in-delayed-2">
            <Link 
              href="/cartas" 
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-pink-100 text-center font-medium text-pink-600 transition-all hover:-translate-y-1"
            >
              💌 Cartas & Recados
            </Link>
            
            <Link 
              href="/fotos" 
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-pink-100 text-center font-medium text-pink-600 transition-all hover:-translate-y-1"
            >
              📸 Álbum de Fotos
            </Link>

            <Link 
              href="/músicas" 
              className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-pink-100 text-center font-medium text-pink-600 transition-all hover:-translate-y-1"
            >
              🎵 Nossa Trilha Sonora
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}