pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('github-token') // Replace with your GitHub PAT credential ID
        DOCKER_USER = credentials('docker-hub') // Replace with your Docker Hub credential ID (optional)
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout code from GitHub
                git branch: 'main', 
                    url: 'https://github.com/Farkhod-Khalikov/tsm-devops-project.git', 
                    credentialsId: 'github-token'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install backend dependencies
                dir('server') {
                    sh 'npm install'
                }
                // Install frontend dependencies
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('server') {
                            sh 'npm run test'
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('client') {
                            sh 'npm run test'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                // Build backend and frontend Docker images
                sh 'docker-compose build'
            }
        }

        stage('Deploy Services') {
            steps {
                // Start services using docker-compose
                sh 'docker-compose up -d'
            }
        }

        stage('Push Docker Images to Registry') {
            when {
                expression {
                    return env.DOCKER_USER != null
                }
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker-compose push
                        """
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                // Stop and remove Docker containers
                sh 'docker-compose down'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
