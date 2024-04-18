import { create } from "zustand";

export const useChatStore = create((set) => ({
    // states
    messages: [],
    view: "chat" || "launching",
    mode: "chat",
    imageSrc: null,
    imageClassification: null,
    drawerOpen: false,
    activeChat: null,
    activeChatId: null,
    visionMode: 'default',
    defaultModel: 'llama2:latest',
    selectedOptionsTab: 0,
    drawerView: "read", // options: ['read', 'add']
    chatStatus: null,
    inputMessage: "",
    mutationOptions: {
      method: 'post', // ['post', 'get', 'put', 'delete']
      endpoint: 'create_row', // ['create_row', 'update_row', 'delete_row']
      table: 'chats' // ['blogs', 'inventory', 'models', 'chats']
    },
    toolsWindowDrawer: true, // true || false
    isInternetQuery: false,
  
    // handlers
    setIsInternetQuery: (isInternetQuery) => set(() => ({ isInternetQuery })),
    setToolsWindowDrawer: (toolsWindowDrawer) => set(() => ({ toolsWindowDrawer })),
    setMutationOptions : (mutationOptions) => set(() => ({ mutationOptions })), // { method, endpoint, table }
    handleInput: (inputMessage) => set(() => ({ inputMessage })), // String
    addMessage: (message) => set((prev) => ({ messages: [...prev.messages, message] })), // Object
    setMessages: (messages) => set((prev) => ({ messages })), // Array of Objects
    handleView: (view) => set(() => ({ view })), // String ["launching", "chat", "image", "voice"]
    handleMode: (mode) => set(() => ({ mode })), // String: ["chat", "create", "imagine"]
    handleImageSrc: (imageSrc) => set(() => ({ imageSrc })), // String Base64 image
    handleImageClassification: (imageClassification) => set(() => ({ imageClassification })), // Object {}
    handleDrawer: (drawerOpen) => set(() => ({ drawerOpen })), // Boolean
    setDrawerView: (drawerView) => set(() => ({ drawerView })), // String: ['read', 'add']
    handleActiveChat: (activeChat) => set(() => ({ activeChat })), // Object
    toggleVisionMode: (visionMode) => set(() => ({ visionMode })), // String ["Default", "Documents", "Receipts"]
    setDefaultModel: (defaultModel) => set(() => ({ defaultModel, drawerOpen: false, selectedOptionsTab: 0 })), // String: defaultModel
    handleSelectedOptionsTab: (selectedOptionsTab) => set(() => ({ selectedOptionsTab })), // Number
    updateChatStatus: (chatStatus) => set(() => ({ chatStatus })), // String
    clearChat: () => set(() => ({ messages: [] })), // Fn
    clearInput: () => set(() => ({ inputMessage: "" })) // Fn
  }));
  