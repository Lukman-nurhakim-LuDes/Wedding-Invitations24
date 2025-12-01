import { Heart } from "lucide-react";
import storyVenue from "@/assets/story-venue.jpg";
import storyCelebration from "@/assets/story-celebration.jpg";
import storyDetails from "@/assets/story-details.jpg";

const StorytellingSection = () => {
  const stories = [
    {
      image: storyVenue,
      title: "Venue Mewah",
      description: "Ruangan penuh kemewahan dan kehangatan"
    },
    {
      image: storyCelebration,
      title: "Momen Berharga",
      description: "Setiap detik adalah kenangan abadi"
    },
    {
      image: storyDetails,
      title: "Detail Sempurna",
      description: "Keindahan dalam setiap sentuhan"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--gold))_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-gold fill-gold" />
            <h2 className="text-5xl md:text-6xl font-bold text-gold">
              Our Story
            </h2>
            <Heart className="w-8 h-8 text-gold fill-gold" />
          </div>
          <div className="h-1 w-32 bg-gold/50 mx-auto" />
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Setiap momen adalah bagian dari cerita indah yang akan kita ciptakan bersama
          </p>
        </div>
        
        {/* Story Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div 
              key={index}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl elegant-shadow hover:shadow-2xl transition-all duration-500">
                {/* Image Container */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img 
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Gold Glow Effect */}
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-gold mb-2">
                    {story.title}
                  </h3>
                  <p className="text-foreground/90 text-sm">
                    {story.description}
                  </p>
                </div>
                
                {/* Border Glow */}
                <div className="absolute inset-0 border-4 border-gold/0 group-hover:border-gold/30 rounded-2xl transition-colors duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection;
