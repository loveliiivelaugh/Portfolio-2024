import { create } from 'zustand'

export const useFitnessStore = create((set) => ({
    // states
    userID: "90aeb288-01fe-43ef-b536-c202a3176a78",
    isDrawerOpen: false,
    activeDrawer: "weight",
    drawerAnchor: "right",
    selectedSearchItem: null,

    // Deprecated profile 
    profile: {},
    setProfile: (profile) => set(() => ({ profile })),

    // profile lives in fitnessTables
    fitnessTables: {},
    setFitnessTables: (fitnessTables) => set(() => ({ fitnessTables })),

    // actions
    toggleDrawer: (options) => set((state) => ({ 
        isDrawerOpen: options?.open ? options.open : !state.isDrawerOpen, 
        drawerAnchor: options?.anchor ? options.anchor : "right" 
    })),
    setActiveDrawer: (activeDrawer) => set(() => ({ activeDrawer })),
    setSelectedSearchItem: (selectedSearchItem) => set(() => ({ selectedSearchItem })),
}));