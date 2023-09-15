import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const productAtom = atom<object>({
  key: 'productAtom',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
