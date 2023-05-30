import { atom, useAtomValue, useSetAtom } from 'jotai';
import React from 'react';

const countAtom = atom(0);
const increaseAtom = atom(null, (get, set) => set(countAtom, (c) => c + 1));

export const Counter = () => {
  const count = useAtomValue(countAtom);
  const increase = useSetAtom(increaseAtom);
  return (
    <div>
      {count} <button onClick={increase}>increase</button>
    </div>
  );
};