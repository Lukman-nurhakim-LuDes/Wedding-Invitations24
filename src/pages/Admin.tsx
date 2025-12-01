import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEventSettings, useUpdateEventSetting } from "@/hooks/useEventSettings";
import { LogOut, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const { data: settings, isLoading } = useEventSettings();
  const updateSetting = useUpdateEventSetting();
  const [localSettings, setLocalSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout berhasil");
    navigate("/");
  };

  const handleSave = (key: string) => {
    updateSetting.mutate({ key, value: localSettings[key] });
  };

  const updateLocalSetting = (key: string, field: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-gold animate-pulse mx-auto mb-4" />
          <p className="text-foreground/70">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-gold" />
            <h1 className="text-3xl md:text-4xl font-bold text-gold">Admin Panel</h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/invitation")}
              variant="outline"
              className="border-gold/30"
            >
              Lihat Undangan
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="welcome" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 h-auto bg-background/50 p-2">
            <TabsTrigger value="welcome" className="text-xs sm:text-sm">Welcome</TabsTrigger>
            <TabsTrigger value="countdown" className="text-xs sm:text-sm">Countdown</TabsTrigger>
            <TabsTrigger value="storytelling" className="text-xs sm:text-sm">Story</TabsTrigger>
            <TabsTrigger value="venue" className="text-xs sm:text-sm">Venue</TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs sm:text-sm">Timeline</TabsTrigger>
            <TabsTrigger value="dresscode" className="text-xs sm:text-sm">Dress Code</TabsTrigger>
            <TabsTrigger value="rsvp" className="text-xs sm:text-sm">RSVP</TabsTrigger>
            <TabsTrigger value="closing" className="text-xs sm:text-sm">Closing</TabsTrigger>
          </TabsList>

          {/* Welcome Section */}
          <TabsContent value="welcome" className="bg-background/80 backdrop-blur rounded-xl p-6 border-2 border-gold/20">
            <h2 className="text-2xl font-bold text-gold mb-4">Welcome Section</h2>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={localSettings.welcome?.title || ""}
                  onChange={(e) => updateLocalSetting("welcome", "title", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={localSettings.welcome?.subtitle || ""}
                  onChange={(e) => updateLocalSetting("welcome", "subtitle", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  value={localSettings.welcome?.date || ""}
                  onChange={(e) => updateLocalSetting("welcome", "date", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={localSettings.welcome?.description || ""}
                  onChange={(e) => updateLocalSetting("welcome", "description", e.target.value)}
                  rows={3}
                  className="bg-background/50"
                />
              </div>
              <Button onClick={() => handleSave("welcome")} className="w-full gap-2">
                <Save className="w-4 h-4" />
                Simpan Welcome
              </Button>
            </div>
          </TabsContent>

          {/* Countdown Section */}
          <TabsContent value="countdown" className="bg-background/80 backdrop-blur rounded-xl p-6 border-2 border-gold/20">
            <h2 className="text-2xl font-bold text-gold mb-4">Countdown Section</h2>
            <div className="space-y-4">
              <div>
                <Label>Target Date (Format: YYYY-MM-DDTHH:mm:ss)</Label>
                <Input
                  type="datetime-local"
                  value={localSettings.countdown?.targetDate?.slice(0, 16) || ""}
                  onChange={(e) => updateLocalSetting("countdown", "targetDate", e.target.value + ":00")}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={localSettings.countdown?.title || ""}
                  onChange={(e) => updateLocalSetting("countdown", "title", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={localSettings.countdown?.subtitle || ""}
                  onChange={(e) => updateLocalSetting("countdown", "subtitle", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <Button onClick={() => handleSave("countdown")} className="w-full gap-2">
                <Save className="w-4 h-4" />
                Simpan Countdown
              </Button>
            </div>
          </TabsContent>

          {/* Other sections similar pattern... */}
          <TabsContent value="venue" className="bg-background/80 backdrop-blur rounded-xl p-6 border-2 border-gold/20">
            <h2 className="text-2xl font-bold text-gold mb-4">Venue Section</h2>
            <div className="space-y-4">
              <div>
                <Label>Venue Name</Label>
                <Input
                  value={localSettings.venue?.name || ""}
                  onChange={(e) => updateLocalSetting("venue", "name", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Label>Address</Label>
                <Textarea
                  value={localSettings.venue?.address || ""}
                  onChange={(e) => updateLocalSetting("venue", "address", e.target.value)}
                  rows={2}
                  className="bg-background/50"
                />
              </div>
              <div>
                <Label>Map URL</Label>
                <Input
                  value={localSettings.venue?.mapUrl || ""}
                  onChange={(e) => updateLocalSetting("venue", "mapUrl", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <Button onClick={() => handleSave("venue")} className="w-full gap-2">
                <Save className="w-4 h-4" />
                Simpan Venue
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
