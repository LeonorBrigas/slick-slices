import S from '@sanity/desk-tool/structure-builder';
import React from 'react';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slicks' slices`)
    .items([
      // create a new subitem
      S.listItem()
        .title(`Home Page`)
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document id, wo we dont have a random string of numbers
            .documentId('downtown')
        ),
      // add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
