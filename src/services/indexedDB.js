export const saveHighScore = async (score) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('userScores', 'readwrite');
    const store = tx.objectStore('userScores');
    const request = store.put(score, 'highScore');
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getHighScore = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('userScores', 'readonly');
    const store = tx.objectStore('userScores');
    const request = store.get('highScore');
    
    request.onsuccess = () => resolve(request.result || 0);
    request.onerror = () => reject(request.error);
  });
};

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('memoryGameDB', 5);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true
        });
        userStore.createIndex('name', 'name', { unique: false });
      }
      
      if (!db.objectStoreNames.contains('userScores')) {
        const userScoresStore = db.createObjectStore('userScores', {
          keyPath: 'id',
          autoIncrement: true
        });
        userScoresStore.createIndex('userId', 'userId', { unique: false });
      }
    };
  });
};

export const checkUserExists = async (userName) => {
  const db = await openDB();
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const index = store.index('name');
  
  try {
    const result = await index.get(userName);
    return result !== undefined;
  } catch (error) {
    console.error('Error checking user:', error);
    return false;
  } finally {
    tx.complete;
  }
};

export const getUserByName = async (userName) => {
  const db = await openDB();
  const tx = db.transaction('users', 'readonly');
  const store = tx.objectStore('users');
  const index = store.index('name');

  try {
    const user = await index.get(userName);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  } finally {
    tx.complete; // No necesitas await aquí
  }
};

export const saveUser = async (userName) => {
  const db = await openDB();
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  const user = {
    name: userName,
    lastLogin: new Date()
  }
  const userId = await store.add(user);
  await tx.complete;
  
  sessionStorage.setItem('currentUser', JSON.stringify({
    id: userId,
    name: userName
  }));
  return userId;
};

export const saveUserScore = async (score) => {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  const db = await openDB();
  const tx = db.transaction('userScores', 'readwrite');
  const store = tx.objectStore('userScores');
  const scoreData = {
    userId: currentUser.id,
    score: score,
    date: new Date()
  };
  await store.add(scoreData);
  await tx.complete;
};

export const getCurrentUser = () => {
  const user = sessionStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const getUserScores = async (userId) => {
  try {
    const db = await openDB();
    const tx = db.transaction('userScores', 'readonly');
    const store = tx.objectStore('userScores');
    const index = store.index('userId');
    const scores = await index.getAll(userId);
    return scores;
  } catch (error) {
    console.error('Error obteniendo puntuaciones:', error);
    return [];
  }
};