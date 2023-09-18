import { openDB } from 'idb';

const initdb = async () =>
  openDB('mte', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('mte')) {
        console.log('mte database already exists');
        return;
      }
      db.createObjectStore('mte', { keyPath: 'id', autoIncrement: true });
      console.log('mte database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('mte', 1);
  const tx = db.transaction('mte', 'readwrite');
  const store = tx.objectStore('mte');
  
  // Assuming content is a single string value, if it's an object or other data type, adjust accordingly
  await store.add({ value: content });

  await tx.done;  // Wait for the transaction to be done
  console.info('Content added to IndexedDB.');
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('mte', 1);
  const tx = db.transaction('mte', 'readonly');
  const store = tx.objectStore('mte');
  
  const allContent = await store.getAll();

  await tx.done;  // Wait for the transaction to be done

  // Assuming content was stored as an array of objects, each having a 'value' property. Adjust if stored differently.
  return allContent.map(item => item.value).join('\n');
};

initdb();
