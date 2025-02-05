import { User } from 'types/user'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IUserStore {
  user: User | null
  setUser: (user: User) => void

  resetState: () => void
}

const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) =>
        set((state) => ({
          ...state,
          user,
        })),
      resetState: () =>
        set(() => ({
          user: null,
        })),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useUserStore
