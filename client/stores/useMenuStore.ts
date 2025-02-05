import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IMenuStore {
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void

  resetState: () => void
}

const useMenuStore = create<IMenuStore>()(
  persist(
    (set) => ({
      isExpanded: true,
      setIsExpanded: (isExpanded: boolean) =>
        set((state) => ({
          ...state,
          isExpanded,
        })),
      resetState: () =>
        set(() => ({
          isExpanded: true,
        })),
    }),
    {
      name: 'menu-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useMenuStore
