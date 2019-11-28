pipeline {
    agent none
    environment {
            CI = 'true'
            HOME= '.'
    }
    stages {
        stage('Build') {
            agent {
                docker 'node:12-alpine'
            }
            steps {
                sh 'npm -v'
                sh 'node --version'
                sh 'ls -la'
                sh 'npm ci'
            }
        }
         stage('Test') {
            agent {
                docker 'node:12-alpine'
            }
            steps {
                sh 'npm test'
            }
        }
    }
}