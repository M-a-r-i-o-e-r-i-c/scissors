import React from 'react';
import { expect, test } from 'vitest';
import { Home } from './Home';

test('Home component returns a valid React element', () => {
  const element = Home();
  expect(React.isValidElement(element)).toBe(true);
});
