node('master') {
    stage('environment'){
        env.BRANCH_NAME = 'master'
        env.CI = 'true'
        env.HOME = '.'
        withNPM('nodejs') {
            sh 'npm -v'
            sh 'node --version'
        }

    }

    stage('checkout') {
        checkout scm
    }

    stage('setup') {
        withNPM('nodejs') {
            sh 'npm ci'
        }
    }

    stage('test') {
         withNPM('nodejs') {
            sh 'npm test'
        }
    }
}
