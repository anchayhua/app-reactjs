pipeline {
    agent any // Esto indica que se puede ejecutar en cualquier agente de Jenkins

    options {
        buildDiscarder (logRotator (numToKeepStr: '5'))        
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('jenkins-dockerhub')
        SONAR_CREDENTIALS = credentials('app-reactjs')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm // Esto verifica el código fuente desde el repositorio
            }
        }

        stage('Análisis de SonarQube') {
            steps {
                script {
                    // Aquí ejecuta el escáner de SonarQube
                    sh 'npm run sonar-scanner \
                            -Dsonar.projectKey=app-reactjs 
                            -Dsonar.sources=src 
                            -Dsonar.host.url=http://localhost:9000 
                            -Dsonar.token=$SONAR_CREDENTIALS_PSW'
                }
            }
        }

        // stage('Build, Login & Push Image Docker Hub') {
        //     steps {
        //         sh 'docker build -t anchayhua/app-reactjs:latest .' // Construye la imagen Docker
        //         sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
        //         sh 'docker push anchayhua/app-reactjs' // Sube la imagen a un registro de Docker
        //     }
        // }

        stage('Test kubectl') {
            steps {
                echo 'Configurando contexto de Kubernetes'
                sh 'kubectl config use-context minikube'
                sh 'kubectl version'
            }
        }

        stage('Deploy to k8s') {
            steps {
                sh 'kubectl apply -f deployment.yaml'
                sh 'kubectl apply -f service.yaml'
            }
        }

        stage('Deploy API Gateway') {
            steps {
                sh 'kubectl apply -f api-gateway.yaml'
            }
        }
    }

    post {
        // always {
        //     sh 'docker logout'
        // }
        success {
            // Acciones a realizar si el pipeline se ejecuta con éxito
            echo 'El pipeline se ha ejecutado con éxito.'
        }
        failure {
            // Acciones a realizar si el pipeline falla
            echo 'El pipeline ha fallado. Se requiere atención.'
        }
    }

}
