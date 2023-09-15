import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const cartDetailAtom = atom<[]>({
  key: 'cartDetailAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
