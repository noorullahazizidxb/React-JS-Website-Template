import { useCallback, useEffect, useState } from "react";
import { loadLiveProjects, readCachedLiveProjects } from "@/lib/cms/client";
import type { LiveProject } from "@/lib/cms/live-projects";

export type LiveProjectsState =
  | { status: "loading" }
  | { status: "ready"; projects: LiveProject[] }
  | { status: "error" };

const initialState = (): LiveProjectsState => {
  const cached = readCachedLiveProjects();
  return cached ? { status: "ready", projects: cached } : { status: "loading" };
};

/**
 * Stale-while-revalidate: render the last good CMS result at once, then refresh.
 * A failed refresh keeps cached data on screen; with no cache it reports an error.
 */
export function useLiveProjects() {
  const [state, setState] = useState<LiveProjectsState>(initialState);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    loadLiveProjects()
      .then((projects) => active && setState({ status: "ready", projects }))
      .catch(() => active && setState((prev) => (prev.status === "ready" ? prev : { status: "error" })));
    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  }, []);

  return { state, retry };
}
