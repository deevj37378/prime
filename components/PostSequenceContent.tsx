  "use client";

  import { productData } from "@/data/product";
  
  export default function PostSequenceContent() {
    return (
      <div className="w-full relative z-10 px-6 py-24 md:py-32 pb-[40vh]">
        {/* Specs Section */}
        <section className="min-h-screen flex items-center justify-center pointer-events-none text-center">
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="text-white drop-shadow-lg">
              <h2 className="font-bebas text-5xl md:text-7xl mb-6 text-shadow-md">
                {productData.postSequenceContent.hydrationSpecs.title}
              </h2>
              <p className="text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                {productData.postSequenceContent.hydrationSpecs.description}
              </p>
              
              <ul className="mt-8 space-y-4 flex flex-col items-center">
                {productData.specs.map((spec, i) => (
                  <li key={i} className="flex items-center space-x-3 text-lg font-medium">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
  
        {/* Athlete Tested Section */}
        <section className="min-h-[80vh] flex items-center justify-center pointer-events-none text-center">
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="text-white drop-shadow-lg">
              <h2 className="font-bebas text-5xl md:text-7xl mb-6 text-shadow-md">
                {productData.postSequenceContent.athleteTested.title}
              </h2>
              <p className="text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                {productData.postSequenceContent.athleteTested.description}
              </p>
            </div>
          </div>
        </section>
  
        {/* Final CTA Section */}
        <section className="min-h-[60vh] flex flex-col items-center justify-center text-center mt-32 pointer-events-none">
          <h2 className="font-bebas text-6xl md:text-9xl text-white tracking-widest drop-shadow-2xl mb-8">
            {productData.staticAssets.finalTagline}
          </h2>
          {/* Final CTA Button (pointer-events-auto so it can be clicked) */}
          <button className="pointer-events-auto bg-white text-primeRed px-12 py-5 rounded-full font-bebas text-3xl tracking-wider hover:scale-110 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.4)]">
            FEEL THE FREEZE
          </button>
        </section>
      </div>
    );
  }
