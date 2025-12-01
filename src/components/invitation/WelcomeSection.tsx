import satinEmeraldBg from "@/assets/satin-emerald-bg.jpg";
import goldBokehOverlay from "@/assets/gold-bokeh-overlay.jpg";
import { useEventSettings } from "@/hooks/useEventSettings";

const WelcomeSection = () => {
  const { data: settings } = useEventSettings();
  const welcomeData = settings?.welcome || {
    title: "Malam Keajaiban",
    subtitle: "The Miracle Night",
    date: "31 Desember 2025",
    description: "Bergabunglah bersama kami dalam perayaan malam yang penuh keanggunan, kemewahan, dan keajaiban"
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Emerald Satin Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${satinEmeraldBg})` }}
      />
      
      {/* Gold Bokeh Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
        style={{ backgroundImage: `url(${goldBokehOverlay})` }}
      />
      
      {/* Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8 animate-fade-in py-12">
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gold leading-tight">
            {welcomeData.title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gold/80 italic">
            {welcomeData.subtitle}
          </p>
          <div className="h-1 w-24 sm:w-32 bg-gold/50 mx-auto" />
        </div>
        
        <p className="text-base sm:text-lg md:text-xl text-foreground/70 font-semibold">
          {welcomeData.date}
        </p>
        
        <p className="text-base sm:text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-2xl mx-auto px-4">
          {welcomeData.description}
        </p>
        
        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8">
          <div className="h-px w-16 sm:w-24 bg-gold/50" />
          <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rotate-45 bg-gold/50" />
          <div className="h-px w-16 sm:w-24 bg-gold/50" />
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
