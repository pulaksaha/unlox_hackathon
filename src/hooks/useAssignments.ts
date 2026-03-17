import { useEffect, useState } from "react";
import { assignmentsClient } from "@/integrations/supabase/assignmentsClient";

export interface Assignment {
  id: string;
  title: string;
  type: string | null;
  deadline: string | null;
  link: string | null;
  created_at: string;
}

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = async () => {
    const { data, error } = await assignmentsClient
      .from("assignments")
      .select("*")
      .order("deadline", { ascending: true });

    if (error) {
      console.error("[useAssignments] Error:", error.message, error.details, error.hint);
      setError(error.message);
    } else {
      console.log("[useAssignments] Fetched:", data);
      setAssignments((data as Assignment[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAssignments();

    const channel = assignmentsClient
      .channel("assignments-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "assignments" },
        fetchAssignments
      )
      .subscribe();

    return () => { assignmentsClient.removeChannel(channel); };
  }, []);

  return { assignments, loading, error };
}
