require('dotenv').config();

const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    token: process.env.SONAR_TOKEN, 
    options: {
      'sonar.projectKey': process.env.SONAR_PROJECTKEY, 
      'sonar.sources': process.env.SONAR_SOURCES,
    },
  },
  () => {
    console.log('Análisis de SonarQube completado.');
  }
);