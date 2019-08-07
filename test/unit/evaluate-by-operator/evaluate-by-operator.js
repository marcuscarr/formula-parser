import EventEmitter from 'events';
import evaluateByOperator, {registerOperation} from '../../../src/evaluate-by-operator/evaluate-by-operator';

describe('.registerOperation()', () => {
  it('should register new operator and evaluate it', () => {
    registerOperation('foo', (a, b) => a + b);

    expect(evaluateByOperator('foo', [2, 8.8])).toBe(10.8);
    expect(evaluateByOperator('foo', ['2', '8.8'])).toBe('28.8');
  });
});

describe('.evaluateByOperator()', () => {
  it('should throw exception when operator do not exist', () => {
    expect(() => {
      evaluateByOperator('bar', [2, 8.8]);
    }).toThrow('NAME');
    expect(() => {
      evaluateByOperator('baz');
    }).toThrow('NAME');
  });

  it('should not to throw exception for `add` operator', () => {
    expect(() => {
      evaluateByOperator('+', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `ampersand` operator', () => {
    expect(() => {
      evaluateByOperator('&', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `divide` operator', () => {
    expect(() => {
      evaluateByOperator('/', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `equal` operator', () => {
    expect(() => {
      evaluateByOperator('=', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `formula function` operator', () => {
    expect(() => {
      evaluateByOperator('SUM', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `greater than` operator', () => {
    expect(() => {
      evaluateByOperator('>', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `greater than or equal` operator', () => {
    expect(() => {
      evaluateByOperator('>=', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `less than` operator', () => {
    expect(() => {
      evaluateByOperator('<', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `less than or equal` operator', () => {
    expect(() => {
      evaluateByOperator('<=', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `minus` operator', () => {
    expect(() => {
      evaluateByOperator('-', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `multiply` operator', () => {
    expect(() => {
      evaluateByOperator('*', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `not equal` operator', () => {
    expect(() => {
      evaluateByOperator('<>', [2, 8.8]);
    }).not.toThrow();
  });

  it('should not to throw exception for `power` operator', () => {
    expect(() => {
      evaluateByOperator('^', [2, 2]);
    }).not.toThrow();
  });

  it('should return an error when one is passed as an argument', () => {
    const errorParam = new Error('TESTERROR');
    registerOperation('testOp', (a, b) => a + b);
    expect(evaluateByOperator('testOp', [errorParam, 2])).toBe(errorParam);
  });

  it('should return the first error more than one is passed as an argument', () => {
    const errorParam1 = new Error('TESTERROR1');
    const errorParam2 = new Error('TESTERROR2');
    registerOperation('testOp', (a, b) => a + b);
    expect(evaluateByOperator('testOp', [errorParam1, errorParam2])).toBe(errorParam1);
  });
});

describe('.evaluateByOperator().emit', () => {
  const emitter = new EventEmitter();
  const callSpy = jest.fn();
  const errorSpy = jest.fn();
  emitter.on('callFunction', callSpy);
  emitter.on('functionError', errorSpy);

  beforeEach(() => {
    callSpy.mockReset();
    errorSpy.mockReset();
  });

  it('should emit `callFunction` when called successfully', () => {
    evaluateByOperator('+', [1, 2], emitter);
    expect(callSpy).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });
  it('should emit `functionError` when passed an error', () => {
    evaluateByOperator('+', [1, new Error()], emitter);
    expect(callSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });
});
