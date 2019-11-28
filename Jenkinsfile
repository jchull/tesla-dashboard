pipeline {
    agent {
        docker {
            image 'node:12-buster'
            args '-p 3001:3001'
        }
    }
    environment {
            CI = 'true'
    }
    stages {

        stage('Build') {
            steps {
                sh 'npm -v'
                sh 'node --version'
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