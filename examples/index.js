import fs from 'fs';
import { Selector } from 'testcafe';
import { runAccessibility } from '../src/index';

fixture`Default`.page`https://www.etihad.com/en/`;

test('Run accessibility test', async t => {
  await t.click(Selector('#onetrust-accept-btn-handler'));
  await t.expect(Selector('.header-text-logo').exists).ok();
  await t.expect(Selector('.footer').exists).ok();
}).after(async t => {
  await runAccessibility({ t });
  await t.expect(fs.existsSync('tmp')).ok();
});
