import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface EventSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  updated_at: string;
}

export const useEventSettings = () => {
  return useQuery({
    queryKey: ["event-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_settings")
        .select("*");
      
      if (error) throw error;
      
      // Convert array to object for easier access
      const settings: Record<string, any> = {};
      data.forEach((item: EventSetting) => {
        settings[item.setting_key] = item.setting_value;
      });
      
      return settings;
    },
  });
};

export const useUpdateEventSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { error } = await supabase
        .from("event_settings")
        .update({ setting_value: value })
        .eq("setting_key", key);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event-settings"] });
      toast.success("Pengaturan berhasil diupdate!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengupdate pengaturan");
    },
  });
};
