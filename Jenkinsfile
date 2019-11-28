node('master') {
    stage('environment'){
        env.BRANCH_NAME = 'master'
        env.CI = 'true'
        env.HOME = '.'
        withNPM() {
            sh 'npm -v'
            sh 'node --version'
        }

    }

    stage('checkout') {
        checkout scm
    }

    stage('setup') {
        withNPM() {
            sh 'npm ci'
        }
    }

    stage('test') {
         withNPM() {
            sh 'npm test'
        }
    }
}
