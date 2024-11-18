import { generateRandomNumbers, calculateScore } from '../../utils/gameUtils.js';

describe('Game Utilities', () => {
  describe('generateRandomNumbers', () => {
    it('debería generar array de longitud correcta', () => {
      const numbers = generateRandomNumbers(9);
      expect(numbers.length).toBe(9);
    });

    it('debería generar números únicos', () => {
      const numbers = generateRandomNumbers(9);
      const uniqueNumbers = new Set(numbers);
      expect(uniqueNumbers.size).toBe(9);
    });

    it('debería generar números dentro del rango', () => {
      const numbers = generateRandomNumbers(9);
      numbers.forEach(num => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(9);
      });
    });
  });

  describe('calculateScore', () => {
    it('debería calcular puntuación correcta según dificultad', () => {
      expect(calculateScore('bajo')).toBe(10);
      expect(calculateScore('medio')).toBe(20);
      expect(calculateScore('alto')).toBe(30);
    });

    it('debería manejar dificultad inválida', () => {
      expect(calculateScore('invalido')).toBe(0);
    });
  });
});
