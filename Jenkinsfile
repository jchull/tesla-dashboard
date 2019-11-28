pipeline {
    agent {
        docker 'node:12-alpine'
    }
    environment {
            CI = 'true'
            HOME= '.'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm -v'
                sh 'node --version'
                sh 'ls -la'
                sh 'npm ci'
            }
        }
         stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}