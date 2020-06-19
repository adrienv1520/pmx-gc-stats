const { expect } = require('./Common');
const { string: { capitalize, camelCase } } = require('../lib/helpers');

describe('#string', function() {
  context('when using capitalize', function() {
    it('should return a string with the first letter in upper case when testing a string', function() {
      expect(capitalize({ string: 'abc' })).to.be.a('string').and.to.equal('Abc');
      expect(capitalize({ string: ' abc' })).to.be.a('string').and.to.equal(' abc');
      expect(capitalize({ string: 'a b c' })).to.be.a('string').and.to.equal('A b c');
    });

    it('should return a string with only the first letter in upper case when first is true', function() {
      expect(capitalize({ string: 'aBC', first: true })).to.be.a('string').and.to.equal('Abc');
      expect(capitalize({ string: ' ABC', first: true })).to.be.a('string').and.to.equal(' abc');
      expect(capitalize({ string: 'a B c', first: true })).to.be.a('string').and.to.equal('A b c');
    });

    it('should return a string with not only the first letter in upper case when first is false or missing', function() {
      expect(capitalize({ string: 'aBC', first: false })).to.be.a('string').and.to.equal('ABC');
      expect(capitalize({ string: ' ABC', first: false })).to.be.a('string').and.to.equal(' ABC');
      expect(capitalize({ string: 'a B c', first: undefined })).to.be.a('string').and.to.equal('A B c');
      expect(capitalize({ string: 'a B c', first: null })).to.be.a('string').and.to.equal('A B c');
      expect(capitalize({ string: 'a B c', first: NaN })).to.be.a('string').and.to.equal('A B c');
      expect(capitalize({ string: 'a B c' })).to.be.a('string').and.to.equal('A B c');
    });

    it('should return an empty string when testing on anything other than a string', function() {
      expect(capitalize({ string: undefined })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: null })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: NaN })).to.be.a('string').and.to.equal('');
      expect(capitalize()).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: 5 })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: new Error('error') })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: true })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: Symbol('s') })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: function f() {} })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: {} })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: [] })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: new Date() })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: new Map() })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: new Set() })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: new WeakMap() })).to.be.a('string').and.to.equal('');
      expect(capitalize({ string: new WeakSet() })).to.be.a('string').and.to.equal('');
    });
  });

  context('when using camelCase', function() {
    it('should return a string in camel case when testing a string with a string or pattern as words separator', function() {
      expect(camelCase({ string: 'camel-case-string', separator: '-' })).to.be.a('string').and.to.equal('camelCaseString');
      expect(camelCase({ string: 'camel*case*string', separator: '*' })).to.be.a('string').and.to.equal('camelCaseString');
      expect(camelCase({ string: 'camel/case/string', separator: '/' })).to.be.a('string').and.to.equal('camelCaseString');
      expect(camelCase({ string: 'camel case string', separator: ' ' })).to.be.a('string').and.to.equal('camelCaseString');
      expect(camelCase({ string: 'camel<case<string', separator: '<' })).to.be.a('string').and.to.equal('camelCaseString');
      expect(camelCase({ string: 'camel  case   string', separator: /\s+/ })).to.be.a('string').and.to.equal('camelCaseString');
      expect(camelCase({ string: 'camel1case5string', separator: /[0-9]/ })).to.be.a('string').and.to.equal('camelCaseString');
    });

    it('should return an empty string when separator is missing', function() {
      expect(camelCase({ string: 'aBC' })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: ' ABC' })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: 'a B c' })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: 'a B c', separator: undefined })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: 'a B c', separator: null })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: 'a B c', separator: NaN })).to.be.a('string').and.to.equal('');
    });

    it('should return an empty string when testing on anything other than a string', function() {
      expect(camelCase({ string: undefined })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: null })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: NaN })).to.be.a('string').and.to.equal('');
      expect(camelCase()).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: 5 })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: new Error('error') })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: true })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: Symbol('s') })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: function f() {} })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: {} })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: [] })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: new Date() })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: new Map() })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: new Set() })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: new WeakMap() })).to.be.a('string').and.to.equal('');
      expect(camelCase({ string: new WeakSet() })).to.be.a('string').and.to.equal('');
    });
  });
});
