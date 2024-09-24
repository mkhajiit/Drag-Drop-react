import { atom } from 'recoil';

export interface IItem {
  id: number;
  name: string;
}

export const zone1DataState = atom<IItem[]>({
  key: 'zone1Data',
  default: [],
});

export const zone2DataState = atom<IItem[]>({
  key: 'zone2Data',
  default: [],
});
