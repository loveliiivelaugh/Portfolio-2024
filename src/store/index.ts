import { create } from 'zustand';

interface AppStore {
    cms: any,
    appView: string | "home",
    drawerOpen: boolean,
    client: null | any,
    appContent: any,
    setCms: (cms: any) => void,
    setAppView: (appView: string) => void,
    setDrawerOpen: (drawerOpen: boolean) => void,
    setClient: (client: any) => void,
    setAppContent: (appContent: any) => void
};

const useAppStore = create<AppStore>((set) => ({

    cms: {},
    setCms: (cms) => set(() => ({ cms })),

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