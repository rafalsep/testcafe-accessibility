module.exports = {
  hostname: 'localhost',
  accessibility: {
    path: 'tmp',
    pathPattern: '${DATE}/${FIXTURE}/accessibility/[${TEST}]_[${MODULE}]_${TIME}_${QUARANTINE_ATTEMPT}.html',
  },
  color: true,
  browserInitTimeout: 20000,
  selectorTimeout: 10000,
  assertionTimeout: 10000,
  pageLoadTimeout: 10000,
  pageRequestTimeout: 10000,
  skipJsErrors: true,
  skipUncaughtErrors: true,
  clientScripts: [{ module: 'axe-core/axe.min.js' }],
};
