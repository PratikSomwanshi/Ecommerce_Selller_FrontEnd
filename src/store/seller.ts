import { create } from "zustand";

type Store = {
  seller_id: string;
  addSellerId: (payload: string) => void;
};

const useStore = create<Store>()((set) => ({
  seller_id: "",
  addSellerId: (payload) => set(() => ({ seller_id: payload })),
}));

export default useStore;
