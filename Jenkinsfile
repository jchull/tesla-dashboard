pipeline {
    agent {
        docker {
            image 'node:12-alpine'
            args '-u 0:0 -p 3001:3001'
        }
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