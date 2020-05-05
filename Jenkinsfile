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
                anyOf {
                    branch 'development'
                    branch 'release/*'
                }
            }
            steps {
                sh 'bundle exec cap staging deploy'

                milestone(3)
            }
        }

        stage('Deploy to prod') {
            when {
                buildingTag()
            }
            steps {
                sh 'bundle exec cap production deploy'

                milestone(4)
            }
        }
    }

    post {
        success {
            mail (
                to: 'david@coronahelfer.eu, kevin.l@coronahelfer.eu',
                subject: "${env.JOB_NAME} succeeded!",
                body: """Build ${env.JOB_NAME} [${env.BUILD_NUMBER}] succeeded!\n Status: ${currentBuild.result}""",
            )
        }

        failure {
            mail (
                to: 'david@coronahelfer.eu, kevin.l@coronahelfer.eu',
                subject: "${env.JOB_NAME} failed!",
                body: """Build '${env.JOB_NAME} [${env.BUILD_NUMBER}] failed!\n Status: ${currentBuild.result}\n Check console output at ${env.BUILD_URL}/console""",
            )
        }
    }
}
