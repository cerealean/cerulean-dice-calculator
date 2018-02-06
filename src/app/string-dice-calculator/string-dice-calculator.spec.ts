import { StringDiceCalculator } from './string-dice-calculator';

describe('StringDiceCalculator', () => {
  let classUnderTest:StringDiceCalculator;

  beforeEach(() => {
    classUnderTest = new StringDiceCalculator();
  });

  it('should create an instance', () => {
    expect(new StringDiceCalculator()).toBeTruthy();
  });
  
  describe('CalculateFromString', () => {
    it('should return 0 from an empty string', () => {
      const givenValue = "";
      const expectedValue = 0;

      const actual = classUnderTest.CalculateFromString(givenValue);

      expect(actual).toBe(expectedValue);
    });
    
    it('should return 1 if given 1', () => {
      const givenValue = "1";
      const expectedValue = 1;

      const actual = classUnderTest.CalculateFromString(givenValue);

      expect(actual).toBe(expectedValue);
    });

    it('should return 135 if given 135', () => {
      const givenValue = "135";
      const expectedValue = 135;

      const actual = classUnderTest.CalculateFromString(givenValue);

      expect(actual).toBe(expectedValue);
    });

    it('should return -8 if given -8', () => {
      const givenValue = "-8";
      const expectedValue = -8;

      const actual = classUnderTest.CalculateFromString(givenValue);

      expect(actual).toBe(expectedValue);
    });

    it('should return 4 if given 2+2', () => {
      const givenValue = "2+2";
      const expectedValue = 4;

      const actual = classUnderTest.CalculateFromString(givenValue);

      expect(actual).toBe(expectedValue);
    });

    it('should return a number between 4 and 6 if given 2+2D2', () => {
      const givenValue = "2+2D2";

      const actual = classUnderTest.CalculateFromString(givenValue);

      expect(actual).toBeGreaterThanOrEqual(4);
      expect(actual).toBeLessThanOrEqual(6);
    });  

    it('should return a number between 4 and 22 if given 2+2D10', () => {
      const givenValue = "2+2D10";
      const smallestAllowedValue = 4;
      const largestAllowedValue = 22;

      const actual = classUnderTest.CalculateFromString(givenValue);

      expect(actual).toBeGreaterThanOrEqual(smallestAllowedValue);
      expect(actual).toBeLessThanOrEqual(largestAllowedValue);
    });  

    it('should return a number between 5 and 40 if given 5D8', () => {
      const givenValue = "5D8";
      const smallestAllowedValue = 5;
      const largestAllowedValue = 40;

      const actual = classUnderTest.CalculateFromString(givenValue);

      expect(actual).toBeGreaterThanOrEqual(smallestAllowedValue);
      expect(actual).toBeLessThanOrEqual(largestAllowedValue);
    });  

    it('should return -3 when given -2-1', () => {
      const givenValue = "-2 - 1";
      const expectedValue = -3;

      const actual = classUnderTest.CalculateFromString(givenValue);

      expect(actual).toBe(expectedValue);
    });

    it('should throw an error if 2D2D is given', () => {
      const givenValue = "2D2D";

      expect(() => classUnderTest.CalculateFromString(givenValue))
        .toThrowError();
    });

    it('should throw an error if 2D2DDD is given', () => {
      const givenValue = "2D2DDD";

      expect(() => classUnderTest.CalculateFromString(givenValue))
        .toThrowError();
    });

    it('should throw an error if 2+4D+', () => {
      const givenValue = "2+4D+";

      expect(() => classUnderTest.CalculateFromString(givenValue))
        .toThrowError();
    });

    it('should throw an error if 2D is given', () => {
      const givenValue = "2D";

      expect(() => classUnderTest.CalculateFromString(givenValue))
        .toThrowError();
    });
    
    it('should throw an error if D is given', () => {
      const givenValue = "D";

      expect(() => classUnderTest.CalculateFromString(givenValue))
        .toThrowError();
    });
    
    it('should throw an error if D2 is given', () => {
      const givenValue = "D2";

      expect(() => classUnderTest.CalculateFromString(givenValue))
        .toThrowError();
    });
    
    it('should throw an error if x2 is given', () => {
      const givenValue = "x2";

      expect(() => classUnderTest.CalculateFromString(givenValue))
        .toThrowError();
    });
  });
});
