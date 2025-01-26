import { create } from "zustand";

interface IDev {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    contributions: number;
}
interface DeveloperStore {
    developers: IDev[];
    lastFetch: number;
    setDevelopers: (developers: IDev[]) => void;
    setLastFetch: (timestamp: number) => void;
}

export const useDeveloperStore = create<DeveloperStore>(set => ({
    developers: [],
    lastFetch: 0,
    setDevelopers: (developers: IDev[]) => set({ developers }),
    setLastFetch: (timestamp: number) => set({ lastFetch: timestamp })
}));
