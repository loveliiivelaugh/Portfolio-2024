import { create } from 'zustand';
;
const useAppStore = create((set) => ({
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
