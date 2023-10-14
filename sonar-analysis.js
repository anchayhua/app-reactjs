const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    token: '', 
    options: {
      'sonar.projectKey': '', 
      'sonar.sources': '',
    },
  },
  () => {
    console.log('Análisis de SonarQube completado.');
  }
);