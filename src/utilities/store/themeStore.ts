import { create } from 'zustand';

interface ThemeStoreType {
  isHovering: boolean;
  setIsHovering: (hovering: boolean) => void;

  cursorProps: any;
  setCursorProps: (props: ThemeStoreType['cursorProps']) => void;
};

const defaultCursorProps = {
    initial: {
        scale: 0,
        opacity: 0
    },
    animate: {
        scale: 1,
        opacity: 0.6,
        x: 50,
        y: 50
    },
    exit: {
        scale: 0,
        opacity: 0
    },
    transition: {
        type: 'spring',
        stiffness: 700,
        damping: 40
    },
    style: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: '#00E0FF',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference'
    }
};

export const useThemeStore = create<ThemeStoreType>((set) => ({
  isHovering: false,
  setIsHovering: (isHovering) => set({ isHovering }),

  cursorProps: defaultCursorProps,
  setCursorProps: (cursorProps) => set((old) => ({ 
    ...old.cursorProps, 
    cursorProps: (typeof cursorProps === "function") 
        ? cursorProps(old.cursorProps) 
        : cursorProps
  })),
}));
