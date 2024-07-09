import { create } from 'zustand';

interface AppStore {
    appConfig: any,
    appView: string | "home",
    drawerOpen: boolean,
    setAppConfig: (appConfig: any) => void,
    setAppView: (appView: string) => void,
    setDrawerOpen: (drawerOpen: boolean) => void,
};

const useAppStore = create<AppStore>((set) => ({
    appConfig: null,
    appView: "home",
    drawerOpen: false,
    setAppConfig: (appConfig) => set(() => ({ appConfig })),
    setAppView: (appView) => set(() => ({ appView })),
    setDrawerOpen: (drawerOpen) => set(() => ({ drawerOpen })),
}));

export { useAppStore };