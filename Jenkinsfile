pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/Farkhod-Khalikov/tsm-devops-project.git'  // Replace with your repo URL
        BRANCH_NAME = 'main'  // Replace with your desired branch
        DOCKER_IMAGE_TAG = 'latest'  // Tag for your Docker image
    }

    stages {
        stage('Git Checkout') {
            steps {
                script {
                    // Clean the workspace before fetching to avoid any residual issues
                    deleteDir()
                    try {
                        echo "Fetching the latest code from the repository..."
                        powershell '''
                            git init
                            git remote add origin $env:GIT_REPO_URL
                            git fetch --all
                            git checkout $env:BRANCH_NAME
                        '''
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error "Git fetch failed: ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images with Docker Compose..."
                    powershell '''
                        docker-compose -f docker-compose.yml build
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo "Injecting .env file and running tests..."
                    withCredentials([file(credentialsId: 'server-env', variable: 'ENV_FILE')]) {
                        powershell '''
                            # Copy the .env file to the server directory
                            cp "$ENV_FILE" server/.env
                        '''
                    }

                    powershell '''
                        docker-compose -f docker-compose.yml up -d
                    '''
                    sleep(time: 10, unit: 'SECONDS')
                    powershell '''
                        docker exec -it backend yarn jest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying the services..."
                    powershell '''
                        docker-compose -f docker-compose.yml up -d
                    '''
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo "Cleaning up Docker containers..."
                    powershell '''
                        docker-compose -f docker-compose.yml down
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Build, test, and deploy completed successfully."
        }
        failure {
            echo "Build, test, or deploy failed."
        }
        always {
            echo "Cleaning up workspace..."
            deleteDir()
        }
    }
}
