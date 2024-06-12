import { create } from 'zustand';

interface AppStore {
    appView: string | "home",
    drawerOpen: boolean,
    client: null | any,
    appContent: any,
    setAppView: (appView) => void,
    setDrawerOpen: (drawerOpen) => void,
    setClient: (client) => void,
    setAppContent: (appContent) => void
};

const useAppStore = create<AppStore>((set) => ({
    appView: "home",
    setAppView: (appView) => set(() => ({ appView })),

    drawerOpen: false,
    setDrawerOpen: (drawerOpen) => set(() => ({ drawerOpen })),

    client: null,
    setClient: (client) => set(() => ({ client })),

    appContent: {},
    setAppContent: (appContent) => set(() => ({ appContent }))
}));

export { useAppStore };