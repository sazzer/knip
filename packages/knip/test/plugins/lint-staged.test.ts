import assert from 'node:assert/strict';
import test from 'node:test';
import { default as lintStaged } from '../../src/plugins/lint-staged/index.js';
import { resolve, join } from '../../src/util/path.js';
import { buildOptions } from '../helpers/index.js';

const cwd = resolve('fixtures/plugins/lint-staged');
const options = buildOptions(cwd);

test('Find dependencies in lint-staged configuration (json)', async () => {
  const configFilePath = join(cwd, 'package.json');
  const dependencies = await lintStaged.findDependencies(configFilePath, options);
  assert.deepEqual(dependencies, ['bin:eslint', 'bin:prettier']);
});

test('Find dependencies in lint-staged configuration (js)', async () => {
  const configFilePath = join(cwd, '.lintstagedrc.js');
  const dependencies = await lintStaged.findDependencies(configFilePath, options);
  assert.deepEqual(dependencies, ['bin:eslint', 'bin:prettier']);
});
