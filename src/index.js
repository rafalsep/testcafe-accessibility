const fs = require('fs');
const path = require('path');
const { ClientFunction } = require('testcafe');
const { runAxe } = require('@testcafe-community/axe');
const { createHtmlReport } = require('axe-html-reporter');

const runAccessibility = async ({ t }) => {
  try {
    const { accessibility } = t.testRun.opts;
    const now = new Date().toISOString();
    const getWindowLocation = ClientFunction(() => window.location, { boundTestRun: t });
    const location = await getWindowLocation();
    const accessibilityPath = path.join(
      accessibility.path,
      accessibility.pathPattern
        .replaceAll('${DATE}', now.substr(0, 10))
        .replaceAll('${TIME}', now.substr(11, 8).replaceAll(':', '-'))
        .replaceAll('${FIXTURE}', t.testRun.test.fixture.name)
        .replaceAll('${TEST}', t.testRun.test.name)
        .replaceAll('${QUARANTINE_ATTEMPT}', (t.testRun.quarantine ? t.testRun.quarantine.attempts.length : 0) + 1)
        .replaceAll('${MODULE}', location.pathname.split('/').pop().split('\\').pop()),
    );

    const { error, results } = await runAxe.with({ boundTestRun: t })();
    if (error) {
      console.error('Axe check failed with an error:', error);
    } else {
      if (!fs.existsSync(path.dirname(accessibilityPath))) {
        fs.mkdirSync(path.dirname(accessibilityPath), { recursive: true });
      }
      const screenshotPath = (await t.takeScreenshot()).split('/').pop().split('\\').pop().replace('\\', '/');
      const htmlReport = createHtmlReport({
        results,
        options: {
          doNotCreateReportFile: true,
          customSummary: `<div>Fixture: ${t.testRun.test.fixture.name}</div><div>Test: ${t.testRun.test.name}</div><div><a href="../screenshots/${screenshotPath}" target="_blank"><img src="../screenshots/${screenshotPath}" height="108" width="192" /></a></div>`,
        },
      });
      fs.writeFileSync(accessibilityPath, htmlReport);
    }
  } catch (error) {
    console.error('Error while trying to run axe accessibility check:', error);
  }
};

module.exports = { runAccessibility };
