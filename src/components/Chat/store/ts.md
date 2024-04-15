import { create, SetState } from "zustand";

interface MutationOptions {
  method: 'post' | 'get' | 'put' | 'delete';
  endpoint: 'create_row' | 'update_row' | 'delete_row';
  table: 'blogs' | 'inventory' | 'models' | 'chats';
}

interface Message {
  // Define your message object structure here
}

interface ChatStore {
  messages: Message[];
  view: "chat" | "launching";
  mode: "chat" | "create" | "imagine";
  imageSrc: string | null;
  imageClassification: any | null; // Define the object structure for image classification
  drawerOpen: boolean;
  activeChat: any | null; // Define the object structure for active chat
  activeChatId: any | null; // Define the type for active chat id
  visionMode: 'default' | 'Documents' | 'Receipts';
  defaultModel: string;
  selectedOptionsTab: number;
  drawerView: "read" | "add";
  chatStatus: string | null;
  inputMessage: string;
  mutationOptions: MutationOptions;

  // handlers
  setMutationOptions: (mutationOptions: MutationOptions) => void;
  handleInput: (inputMessage: string) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  handleView: (view: "launching" | "chat" | "image" | "voice") => void;
  handleMode: (mode: "chat" | "create" | "imagine") => void;
  handleImageSrc: (imageSrc: string | null) => void;
  handleImageClassification: (imageClassification: any | null) => void;
  handleDrawer: (drawerOpen: boolean) => void;
  setDrawerView: (drawerView: "read" | "add") => void;
  handleActiveChat: (activeChat: any | null) => void;
  toggleVisionMode: (visionMode: 'default' | 'Documents' | 'Receipts') => void;
  setDefaultModel: (defaultModel: string) => void;
  handleSelectedOptionsTab: (selectedOptionsTab: number) => void;
  updateChatStatus: (chatStatus: string | null) => void;
  clearChat: () => void;
  clearInput: () => void;
}

export const useChatStore = create<ChatStore>((set: SetState<ChatStore>) => ({
  // states
  messages: [],
  view: "chat",
  mode: "chat",
  imageSrc: null,
  imageClassification: null,
  drawerOpen: false,
  activeChat: null,
  activeChatId: null,
  visionMode: 'default',
  defaultModel: 'llama2:latest',
  selectedOptionsTab: 0,
  drawerView: "read",
  chatStatus: null,
  inputMessage: "",
  mutationOptions: {
    method: 'post',
    endpoint: 'create_row',
    table: 'chats'
  },

  // handlers
  setMutationOptions: (mutationOptions) => set(() => ({ mutationOptions })),
  handleInput: (inputMessage) => set(() => ({ inputMessage })),
  addMessage: (message) => set((prev) => ({ messages: [...prev.messages, message] })),
  setMessages: (messages) => set(() => ({ messages })),
  handleView: (view) => set(() => ({ view })),
  handleMode: (mode) => set(() => ({ mode })),
  handleImageSrc: (imageSrc) => set(() => ({ imageSrc })),
  handleImageClassification: (imageClassification) => set(() => ({ imageClassification })),
  handleDrawer: (drawerOpen) => set(() => ({ drawerOpen })),
  setDrawerView: (drawerView) => set(() => ({ drawerView })),
  handleActiveChat: (activeChat) => set(() => ({ activeChat })),
  toggleVisionMode: (visionMode) => set(() => ({ visionMode })),
  setDefaultModel: (defaultModel) => set(() => ({ defaultModel, drawerOpen: false, selectedOptionsTab: 0 })),
  handleSelectedOptionsTab: (selectedOptionsTab) => set(() => ({ selectedOptionsTab })),
  updateChatStatus: (chatStatus) => set(() => ({ chatStatus })),
  clearChat: () => set(() => ({ messages: [] })),
  clearInput: () => set(() => ({ inputMessage: "" }))
}));
