import { Sparkles } from "lucide-react";
import satinBerryBg from "@/assets/satin-berry-bg.jpg";
import satinEmeraldBg from "@/assets/satin-emerald-bg.jpg";
import eveningGownImg from "@/assets/dress-evening-gown.jpg";
import blackTieImg from "@/assets/dress-black-tie.jpg";
import cocktailImg from "@/assets/dress-cocktail.jpg";

const DressCodeSection = () => {
  const dressCodeImages = [
    {
      title: "Formal Evening Gown",
      description: "Gaun malam formal dengan sentuhan elegan",
      image: eveningGownImg
    },
    {
      title: "Black Tie Suit",
      description: "Setelan formal hitam dengan dasi kupu-kupu",
      image: blackTieImg
    },
    {
      title: "Cocktail Dress",
      description: "Dress cocktail dengan aksen glamour",
      image: cocktailImg
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Mixed Satin Background */}
      <div className="absolute inset-0 flex">
        <div 
          className="w-1/2 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${satinBerryBg})` }}
        />
        <div 
          className="w-1/2 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${satinEmeraldBg})` }}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-gold" />
            <h2 className="text-5xl md:text-6xl font-bold text-gold">
              Dress Code
            </h2>
            <Sparkles className="w-8 h-8 text-gold" />
          </div>
          <div className="h-1 w-32 bg-gold/50 mx-auto" />
          <p className="text-xl text-foreground/70">
            Black Tie / Formal Evening Attire
          </p>
        </div>
        
        {/* Dress Code Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {dressCodeImages.map((item, index) => (
            <div 
              key={index}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl border-4 border-gold/30 elegant-shadow group-hover:border-gold/60 transition-all duration-500">
                {/* Dress Code Image */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                
                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-bold text-gold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/80">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto">
            Kami mengundang Anda untuk tampil menawan dalam balutan busana formal terbaik Anda. 
            Mari bersama-sama ciptakan suasana malam yang penuh keanggunan dan kemewahan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DressCodeSection;
