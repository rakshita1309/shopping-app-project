'use client';

import React from 'react';
import ItemPage from '../../../src/components/pageComponents/Item/ItemPage.jsx';

export default function Page({ params }) {
  const { itemId } = params;

  return (
    <ItemPage itemId={itemId} />
  );
}