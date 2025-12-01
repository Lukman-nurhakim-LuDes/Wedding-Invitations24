import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles, Mail, Lock } from "lucide-react";
import goldBokeh from "@/assets/gold-bokeh-overlay.jpg";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Login berhasil!");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`
          }
        });
        if (error) throw error;
        toast.success("Akun berhasil dibuat! Silakan login.");
        setIsLogin(true);
      }
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${goldBokeh})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-background to-secondary" />
      
      {/* Auth Form */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-background/95 backdrop-blur-lg rounded-3xl p-8 md:p-10 border-4 border-gold/30 elegant-shadow">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-gold" />
              <h1 className="text-3xl md:text-4xl font-bold text-gold">
                Admin Panel
              </h1>
              <Sparkles className="w-8 h-8 text-gold" />
            </div>
            <p className="text-foreground/70">
              {isLogin ? "Login untuk mengelola undangan" : "Buat akun admin baru"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/90">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 border-gold/30 focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/90">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="bg-background/50 border-gold/30 focus:border-gold"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-gold font-bold text-lg py-6"
            >
              {loading ? "Memproses..." : isLogin ? "Login" : "Daftar"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-gold hover:underline"
            >
              {isLogin ? "Belum punya akun? Daftar" : "Sudah punya akun? Login"}
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-foreground/60 hover:text-gold transition-colors text-sm"
            >
              Kembali ke Undangan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
