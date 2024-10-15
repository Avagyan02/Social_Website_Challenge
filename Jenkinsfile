pipeline {
    agent any

    stages {
        stage('Install Dependencies & Run Tests') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Also can use pm2
                sh 'npm run start'
            }
        }
    }

    post {
        success {
            echo 'Pipeline runned successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
