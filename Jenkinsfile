pipeline {
    agent {
        dockerfile true
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
                sh 'whoami'
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