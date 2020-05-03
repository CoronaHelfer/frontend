pipeline {
    agent any

    stages {
        stage('Preparation') {
            steps {
                cleanWs()
                checkout scm

                sh 'npm i --noaudit'
                sh 'npx audit-ci --high'

                milestone(1)
            }
        }

        stage('Tests') {
            steps {
                //sh 'npm run test'

                milestone(2)
            }
        }

        stage('Deploy to staging') {
            when {
                branch 'development'
            }
            steps {
                //sh 'rbenv local 2.6.5'
                //sh 'bundle install'

                sshagent(['jenkins']) {
                    sh 'git clone git@github.com:CoronaHelfer/deployment.git'
                    sh "ls -lR"
                    //sh 'bundle exec cap staging deploy'
                }

                milestone(3)
            }
        }
    }
}
