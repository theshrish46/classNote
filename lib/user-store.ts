import { create } from 'zustand';

interface User {
    id: string
    name: string
}

interface UserStore {
    user: User | null
    setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user })
}))

export default useUserStore