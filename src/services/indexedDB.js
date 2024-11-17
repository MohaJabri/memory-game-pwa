export const saveHighScore = async (score) => {
    const db = await openDB();
    const tx = db.transaction('scores', 'readwrite');
    const store = tx.objectStore('scores');
    await store.put(score, 'highScore');
    await tx.complete;
  };
  
  export const getHighScore = async () => {
    const db = await openDB();
    const tx = db.transaction('scores', 'readonly');
    const store = tx.objectStore('scores');
    const score = await store.get('highScore');
    return score || 0;
  };
  
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('memoryGameDB', 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('scores')) {
          db.createObjectStore('scores');
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = (e) => reject(e.target.error);
    });
  };
  