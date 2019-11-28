node('master') {
    stage('environment'){
        env.BRANCH_NAME = 'master'
        env.CI = 'true'
        env.HOME = '.'
            sh 'npm -v'
            sh 'node --version'

    }

    stage('checkout') {
        checkout scm
    }

    stage('setup') {
            sh 'npm ci'
    }

    stage('test') {
            sh 'npm test'
    }
}
