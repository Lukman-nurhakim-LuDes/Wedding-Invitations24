import { MapPin } from "lucide-react";
import satinBerryBg from "@/assets/satin-berry-bg.jpg";
import { useEventSettings } from "@/hooks/useEventSettings";
import { Button } from "@/components/ui/button";

const VenueSection = () => {
  const { data: settings } = useEventSettings();
  const venueData = settings?.venue || {
    name: "Grand Ballroom Luxury Hotel",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    mapUrl: "https://maps.google.com/?q=Grand+Ballroom+Jakarta"
  };

  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Berry Satin Strip Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${satinBerryBg})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold">
            Informasi Acara
          </h2>
          <div className="h-1 w-24 sm:w-32 bg-gold/50 mx-auto" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Event Details */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-card/30 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gold/20">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-gold mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gold mb-2">Lokasi</h3>
                <p className="text-base sm:text-lg text-foreground/80">{venueData.name}</p>
                <p className="text-sm sm:text-base text-foreground/60 mt-2">{venueData.address}</p>
              </div>
            </div>
            
            <Button
              onClick={() => window.open(venueData.mapUrl, '_blank')}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-gold font-semibold py-5 sm:py-6"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Buka di Google Maps
            </Button>
          </div>
          
          {/* Google Maps Embed */}
          <div className="animate-fade-in">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-gold/30 elegant-shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2665474374745!2d106.80854931476907!3d-6.225408695499029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f150ba15568f%3A0xf5e2e9332e5a38f4!2sThe%20Ritz-Carlton%20Jakarta%2C%20Pacific%20Place!5e0!3m2!1sen!2sid!4v1635000000000!5m2!1sen!2sid"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Location"
                className="sm:h-[400px] md:h-[450px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
