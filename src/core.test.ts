import { pxToRem } from './core';

describe(pxToRem.name, () => {
  test('single / int', () => {
    const str = '.class {width: 12px;}';
    const newStr = pxToRem(str);
    expect(newStr).toBe('.class {width: 1.2rem;}');
  });
  test('single / float', () => {
    const str = '.class {width: 1.2px;}';
    const newStr = pxToRem(str);
    expect(newStr).toBe('.class {width: 0.12rem;}');
  });
  test('single / invalid', () => {
    const str = '.class {width: foopx;}';
    const newStr = pxToRem(str);
    expect(newStr).toBe('.class {width: foopx;}');
  });
  test('multiple / int', () => {
    const str = '.class {width: 12px; height: 12px;}';
    const newStr = pxToRem(str);
    expect(newStr).toBe('.class {width: 1.2rem; height: 1.2rem;}');
  });
  test('multiple / float', () => {
    const str = '.class {width: 1.2px; height: 1.2px;}';
    const newStr = pxToRem(str);
    expect(newStr).toBe('.class {width: 0.12rem; height: 0.12rem;}');
  });
  test('multiple / invalid', () => {
    const str = '.class {width: foopx; height: foopx;}';
    const newStr = pxToRem(str);
    expect(newStr).toBe('.class {width: foopx; height: foopx;}');
  });
});
