import { create } from 'zustand';

import { useUtilityStore, UtilityStoreType, AlertType, ConfirmType, DrawerType } from "./utilityStore";
import { useFitnessStore, FitnessStoreState } from "./fitnessStore";
import { useSupabaseStore, SupabaseSession, SupabaseStore, SupabaseUser } from "./supabaseStore";
export { useUtilityStore, useFitnessStore, useSupabaseStore };
export type {
    UtilityStoreType,
    AlertType,
    ConfirmType,
    DrawerType,
    FitnessStoreState,
    SupabaseSession,
    SupabaseStore,
    SupabaseUser
};
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


// interface SupabaseStoreTypes {
//     session: any
//     setSession: (session: any) => void
// }

// const useSupabaseStore = create<SupabaseStoreTypes>((set) => ({
//     session: null,
//     setSession: (session: any) => set(() => ({ session })),
// }));


interface EReaderStore {
    isSpeaking: boolean,
    downloadOptionsOpen: boolean,
    setOpenDownloadOptions: (value: boolean) => void,
    setIsSpeaking: (value: boolean) => void
}

const useEReaderStore = create<EReaderStore>((set) => ({
    isSpeaking: true,
    downloadOptionsOpen: false,
    setOpenDownloadOptions: (value) => set(() => ({ downloadOptionsOpen: value })),
    setIsSpeaking: (value) => set(() => ({ isSpeaking: value }))
}));


export { useAppStore, useEReaderStore };