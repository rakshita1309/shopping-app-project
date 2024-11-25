'use client';

import React, { useEffect } from 'react';
import KidsJSON from '../../data/kids';
import MenJSON from '../../data/men';
import WomenJSON from '../../data/women';
import ItemStore from '../../stores/Items/ItemStore';
import { observer } from 'mobx-react';
import Navbar from './Navbar';


function MainLayout({ children }) {
  useEffect(() => {
    ItemStore.addItems(KidsJSON);
    ItemStore.addItems(MenJSON);
    ItemStore.addItems(WomenJSON);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexGrow: 1,
        flexDirection: 'column',
      }}
    >
      <Navbar />
      {children}
    </div>
  )
}

export default observer(MainLayout);