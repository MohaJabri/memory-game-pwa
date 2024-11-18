import { expect } from '@open-wc/testing';
import { saveHighScore, getHighScore, openDB } from '../../../src/services/indexedDB.js';

describe('IndexedDB Service', () => {
  let mockIndexedDB;

  beforeEach(() => {
    // Crear un mock básico de IndexedDB
    const mockObjectStore = {
      put(value) {
        return Promise.resolve();
      },
      get(key) {
        return Promise.resolve(key === 'highScore' ? 100 : null);
      }
    };

    const mockTransaction = {
      objectStore() {
        return mockObjectStore;
      },
      complete: Promise.resolve()
    };

    const mockDB = {
      transaction() {
        return mockTransaction;
      },
      objectStoreNames: {
        contains() {
          return true;
        }
      },
      createObjectStore() {
        return mockObjectStore;
      }
    };

    mockIndexedDB = {
      open() {
        return Promise.resolve(mockDB);
      }
    };

    // Reemplazar la implementación de indexedDB
    global.indexedDB = mockIndexedDB;
  });

  describe('saveHighScore', () => {
    it('debería guardar la puntuación correctamente', async () => {
      try {
        await saveHighScore(100);
        expect(true).to.be.true; // Si llegamos aquí, la operación fue exitosa
      } catch (error) {
        expect.fail('No debería haber lanzado un error');
      }
    });
  });

  describe('getHighScore', () => {
    it('debería obtener la puntuación más alta', async () => {
      const score = await getHighScore();
      expect(score).to.equal(100);
    });

    it('debería devolver 0 si no hay puntuación guardada', async () => {
      // Modificar el mock para este test específico
      const mockObjectStore = {
        get() {
          return Promise.resolve(null);
        }
      };

      const mockTransaction = {
        objectStore() {
          return mockObjectStore;
        }
      };

      const mockDB = {
        transaction() {
          return mockTransaction;
        }
      };

      mockIndexedDB.open = () => Promise.resolve(mockDB);

      const score = await getHighScore();
      expect(score).to.equal(0);
    });
  });
});
