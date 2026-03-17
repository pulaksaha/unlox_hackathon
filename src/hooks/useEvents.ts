import { useEffect, useState } from "react";
import { assignmentsClient } from "@/integrations/supabase/assignmentsClient";

export interface CampusEvent {
  id: string;
  title: string;
  deadline: string;
  icon: string;
  accent: string;
  created_at: string;
}

export function useEvents() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    const { data, error } = await assignmentsClient
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[useEvents] Error:", error.message);
      setError(error.message);
    } else {
      setEvents((data as CampusEvent[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();

    // Subscribe to realtime changes from n8n
    const channel = assignmentsClient
      .channel("events-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        fetchEvents
      )
      .subscribe();

    return () => { assignmentsClient.removeChannel(channel); };
  }, []);

  return { events, loading, error };
}
