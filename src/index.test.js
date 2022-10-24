import { createHtmlReport } from 'axe-html-reporter';
import { writeFileSync } from 'fs';
import { runAccessibility } from './index';

jest.mock('@testcafe-community/axe', () => ({ runAxe: { with: () => () => ({ results: 'accessibilityResults' }) } }));
jest.mock('testcafe', () => ({ ClientFunction: () => () => ({ pathname: 'http://localhost:3000/path' }) }));
jest.mock('fs', () => ({ existsSync: () => false, mkdirSync: () => {}, writeFileSync: jest.fn() }));
jest.mock('axe-html-reporter', () => ({ createHtmlReport: jest.fn(() => 'htmlReport') }));

test('Verify runAccessibility logic', async () => {
  const t = {
    testRun: {
      opts: {
        accessibility: {
          path: 'tmp',
          pathPattern: '${DATE}/${FIXTURE}/accessibility/[${TEST}]_[${MODULE}]_${TIME}_${QUARANTINE_ATTEMPT}.html',
        },
      },
      test: { name: 'testName', fixture: { name: 'fixtureName' }, quarantine: { attempts: [1, 2, 3] } },
    },
    takeScreenshot: async () => Promise.resolve('/path/to/screenshot.png'),
  };

  await runAccessibility({ t });

  expect(createHtmlReport).toHaveBeenCalledWith({
    results: 'accessibilityResults',
    options: {
      doNotCreateReportFile: true,
      customSummary:
        '<div>Fixture: fixtureName</div><div>Test: testName</div><div><a href="../screenshots/screenshot.png" target="_blank"><img src="../screenshots/screenshot.png" height="108" width="192" /></a></div>',
    },
  });
  expect(writeFileSync).toHaveBeenCalledWith(expect.any(String), 'htmlReport');
});
