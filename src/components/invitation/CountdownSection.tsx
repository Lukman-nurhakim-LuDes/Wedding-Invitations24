import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  // Set target date - ubah sesuai tanggal acara
  const targetDate = new Date("2025-12-31T19:00:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const FlipCard = ({ value, label }: { value: number; label: string }) => {
    const displayValue = value.toString().padStart(2, '0');
    
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-24 h-28 md:w-32 md:h-36">
          {/* Flip Card Container */}
          <div className="flip-card-container">
            {/* Top Half */}
            <div className="flip-card-top">
              <div className="flip-card-content bg-gradient-to-b from-primary to-primary/90 border-4 border-gold/30">
                <span className="text-4xl md:text-5xl font-bold text-gold">
                  {displayValue}
                </span>
              </div>
            </div>
            
            {/* Bottom Half */}
            <div className="flip-card-bottom">
              <div className="flip-card-content bg-gradient-to-t from-primary/80 to-primary border-4 border-gold/30">
                <span className="text-4xl md:text-5xl font-bold text-gold">
                  {displayValue}
                </span>
              </div>
            </div>
            
            {/* Middle Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-background/30 transform -translate-y-1/2 z-10" />
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-xl bg-gold/0 blur-xl group-hover:bg-gold/20 transition-all duration-500 -z-10" />
        </div>
        
        {/* Label */}
        <span className="text-gold text-sm md:text-base font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--primary))_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,hsl(var(--secondary))_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-gold" />
            <h2 className="text-4xl md:text-5xl font-bold text-gold">
              Hitung Mundur
            </h2>
            <Calendar className="w-8 h-8 text-gold" />
          </div>
          <div className="h-1 w-32 bg-gold/50 mx-auto" />
          <p className="text-lg md:text-xl text-foreground/70">
            Menuju Malam Penuh Keajaiban
          </p>
        </div>
        
        {/* Countdown Cards */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 animate-fade-in">
          <FlipCard value={timeLeft.days} label="Hari" />
          <FlipCard value={timeLeft.hours} label="Jam" />
          <FlipCard value={timeLeft.minutes} label="Menit" />
          <FlipCard value={timeLeft.seconds} label="Detik" />
        </div>
        
        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-foreground/60 text-base md:text-lg">
            Tandai kalender Anda dan bersiaplah untuk malam yang tak terlupakan
          </p>
        </div>
      </div>
      
      <style>{`
        .flip-card-container {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1000px;
        }
        
        .flip-card-top,
        .flip-card-bottom {
          position: absolute;
          width: 100%;
          height: 50%;
          overflow: hidden;
        }
        
        .flip-card-top {
          top: 0;
          border-radius: 0.75rem 0.75rem 0 0;
        }
        
        .flip-card-bottom {
          bottom: 0;
          border-radius: 0 0 0.75rem 0.75rem;
        }
        
        .flip-card-content {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 200%;
          border-radius: 0.75rem;
          box-shadow: 0 10px 30px -5px rgba(214, 177, 122, 0.3);
          transition: all 0.3s ease;
        }
        
        .flip-card-top .flip-card-content {
          align-items: flex-end;
          padding-bottom: 0.5rem;
        }
        
        .flip-card-bottom .flip-card-content {
          align-items: flex-start;
          padding-top: 0.5rem;
          transform: translateY(-100%);
        }
        
        .flip-card-container:hover .flip-card-content {
          box-shadow: 0 15px 40px -5px rgba(214, 177, 122, 0.5);
        }
        
        @keyframes flip-down {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-180deg);
          }
        }
      `}</style>
    </section>
  );
};

export default CountdownSection;
