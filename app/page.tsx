import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-pink-50 text-gray-800">
      
      {/* SECTION 1: A Nossa História / Apresentação */}
      <section className="flex-1 flex flex-col justify-center items-center p-8 text-center border-b md:border-b-0 md:border-r border-pink-200">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
          Nossa História ♡
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-md mb-6">
          Um espaço dedicado a guardar nossos melhores momentos, memórias e sentimentos.
        </p>
        <Link 
          href="/galeria"
          className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold shadow-md hover:bg-pink-600 transition-all"
        >
          Ver Linha do Tempo
        </Link>
      </section>

      {/* SECTION 2: Menu / Áreas de Acesso */}
      <section className="flex-1 flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Explorar Nosso Mundo
        </h2>
        
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link 
            href="/cartas" 
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-pink-100 text-center font-medium text-pink-600 transition-all"
          >
            💌 Cartas & Recados
          </Link>
          
          <Link 
            href="/fotos" 
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-pink-100 text-center font-medium text-pink-600 transition-all"
          >
            📸 Álbum de Fotos
          </Link>

          <Link 
            href="/músicas" 
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-pink-100 text-center font-medium text-pink-600 transition-all"
          >
            🎵 Nossa Trilha Sonora
          </Link>
        </div>
      </section>

    </main>
  );
}