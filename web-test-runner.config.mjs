import { chromeLauncher } from '@web/test-runner-chrome';

export default {
  files: 'src/tests/**/*.spec.js',
  nodeResolve: true,
  browsers: [
    chromeLauncher()
  ],
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '10000'
    }
  },
  testRunnerHtml: testFramework => `
    <html>
      <body>
        <script>
          // Mock global.indexedDB si no existe
          if (typeof indexedDB === 'undefined') {
            window.indexedDB = {};
          }
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  middleware: [
    function (context, next) {
      return next();
    },
  ],
};