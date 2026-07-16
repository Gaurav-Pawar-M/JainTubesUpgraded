import Image from "next/image";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 bg-transparent text-jt-ink border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center relative z-10">
        
        {/* Left: Giant Typography & Image */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-6xl md:text-8xl lg:text-[140px] leading-[0.85] tracking-tighter uppercase font-bold  text-jt-navy bg-none mb-12 relative z-20">
            Let&apos;s<br/>Build.
          </h2>
          
          <div className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-3xl group shadow-2xl -mt-12 md:-mt-24 z-10">
            <Image 
              src="/assets/contact_bg.png" 
              alt="Industrial Engineering" 
              fill
              className="object-cover grayscale mix-blend-luminosity opacity-80 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
            />
            <div className="absolute inset-0 bg-[#0a388e]/40 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0" />
            

          </div>
        </div>

        {/* Right: Contact Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-xl md:text-3xl font-light text-jt-ink/80 leading-relaxed mb-16 max-w-lg">
            Whether you&apos;re laying a municipal trunk main or outfitting an industrial plant, we have the strength and scale to deliver.
          </p>

          <div className="flex flex-col w-full">
            
            {/* Location */}
            <div className="group border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-start justify-between cursor-default">
              <span className="text-sm tracking-widest uppercase text-jt-ink/40 font-bold mb-4 md:mb-0 w-1/3 transition-colors group-hover:text-jt-navy">Location</span>
              <p className="text-lg md:text-2xl text-jt-ink/80 w-2/3 group-hover:translate-x-4 transition-transform duration-500 ease-out">
                Opp. Bharat Talkies,<br/>Bhopal 462001, M.P., India
              </p>
            </div>
            
            {/* Phone */}
            <div className="group border-t border-gray-200 py-8 flex flex-col md:flex-row md:items-start justify-between cursor-default">
              <span className="text-sm tracking-widest uppercase text-jt-ink/40 font-bold mb-4 md:mb-0 w-1/3 transition-colors group-hover:text-jt-navy">Phone</span>
              <div className="flex flex-col gap-2 w-2/3 group-hover:translate-x-4 transition-transform duration-500 ease-out">
                <a href="tel:+917554271111" className="text-lg md:text-2xl text-jt-ink/80 hover:text-jt-navy transition-colors inline-block">+91 755 427 1111</a>
                <a href="tel:+917552742222" className="text-lg md:text-2xl text-jt-ink/80 hover:text-jt-navy transition-colors inline-block">+91 755 274 2222</a>
                <a href="tel:+919425053333" className="text-lg md:text-2xl text-jt-ink/80 hover:text-jt-navy transition-colors inline-block">+91 94250 53333</a>
              </div>
            </div>
            
            {/* Email */}
            <div className="group border-t border-b border-gray-200 py-8 flex flex-col md:flex-row md:items-start justify-between cursor-default">
              <span className="text-sm tracking-widest uppercase text-jt-ink/40 font-bold mb-4 md:mb-0 w-1/3 transition-colors group-hover:text-jt-navy">Email</span>
              <a href="mailto:info@jaintubesmp.com" className="text-lg md:text-2xl text-jt-ink/80 hover:text-jt-navy transition-colors w-2/3 group-hover:translate-x-4 duration-500 ease-out inline-block">
                info@jaintubesmp.com
              </a>
            </div>

          </div>
          


        </div>
      </div>
    </section>
  );
}
