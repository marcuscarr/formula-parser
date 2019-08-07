import Parser from '../../../../src/parser';

describe('.parse() miscellaneous formulas', () => {
  let parser;

  beforeEach(() => {
    parser = new Parser();
  });
  afterEach(() => {
    parser = null;
  });

  it('NUMERAL', () => {
    // expect(parser.parse('NUMERAL()')).toMatchObject({error: null, result: '0'});
    expect(parser.parse('NUMERAL(100, "0,0.000")')).toMatchObject({error: null, result: '100.000'});
    expect(parser.parse('NUMERAL(100, "$0,0.0")')).toMatchObject({error: null, result: '$100.0'});
  });

  it('UNIQUE', () => {
    expect(parser.parse('UNIQUE()')).toMatchObject({error: null, result: []});
    expect(parser.parse('UNIQUE(1, 2, 3, 4, 4, 4, 4, 3)')).toMatchObject({error: null, result: [1, 2, 3, 4]});
    expect(parser.parse('UNIQUE("foo", "bar", "foo")')).toMatchObject({error: null, result: ['foo', 'bar']});
  });

  it('ARGS2ARRAY', () => {
    expect(parser.parse('ARGS2ARRAY()')).toMatchObject({error: null, result: []});
    expect(parser.parse('ARGS2ARRAY(1, 4, 4, 3)')).toMatchObject({error: null, result: [1, 4, 4, 3]});
    expect(parser.parse('ARGS2ARRAY("foo", "bar", "foo")')).toMatchObject({error: null, result: ['foo', 'bar', 'foo']});
  });

  it('NUMBERS', () => {
    expect(parser.parse('NUMBERS()')).toMatchObject({error: null, result: []});
    expect(parser.parse('NUMBERS(1, "4", "4", 3)')).toMatchObject({error: null, result: [1, 3]});
    expect(parser.parse('NUMBERS("foo", 2, "bar", "foo")')).toMatchObject({error: null, result: [2]});
  });
});
