import React from 'react';
import { expect, test } from 'vitest';
import Sidebar from './Sidebar';

test('Sidebar component returns a valid React element', () => {
  const element = Sidebar();
  expect(React.isValidElement(element)).toBe(true);
});
