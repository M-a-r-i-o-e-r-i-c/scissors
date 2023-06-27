import { expect, test } from 'vitest';
import { Footer } from './Footer';
import React from 'react';

test('Footer component returns a valid React element', () => {
  const element = Footer();
  expect(React.isValidElement(element)).toBe(true);
});
