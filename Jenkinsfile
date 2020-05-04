pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Preparation') {
            steps {
                cleanWs()
                checkout scm

                //sh 'npm i --noaudit'
                //sh 'npx audit-ci --high'
                sh 'git clone git@github.com:CoronaHelfer/deployment.git'
                sh 'cp -rT ./deployment/frontend .'
                sh 'bundle config set path "/var/lib/jenkins/.gem"'
                sh 'bundle install'

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
                sh 'bundle exec cap staging deploy'

                milestone(3)
            }
        }

        stage('Deploy to preprod') {
            when {
                tag pattern: '^preprod-*', comparator: "REGEXP"
            }
            steps {
                //sh 'bundle exec cap preprod deploy'

                milestone(4)
            }
        }

        stage('Deploy to prod') {
            when {
                tag pattern: '^release-*', comparator: "REGEXP"
            }
            steps {
                //sh 'bundle exec cap prod deploy'

                milestone(5)
            }
        }
    }
}
