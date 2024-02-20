import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  seller_id: string;
  addSellerId: (payload: string) => void;
  removeSellerId: (payload: string) => void;
};

const useStore = create<Store>()(
  persist(
    (set) => ({
      seller_id: "default",
      addSellerId: (payload) => set(() => ({ seller_id: payload })),
      removeSellerId: (payload) => set(() => ({ seller_id: payload })),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useStore;
