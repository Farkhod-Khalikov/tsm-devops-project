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
                    // Checkout the code from the repository using PowerShell
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

        stage('Copy .env File') {
            steps {
                script {
                    // Ensure the .env file is available at the specified location
                    echo "Copying .env file from Jenkins credentials..."
                    // Use Jenkins 'withCredentials' to securely access the .env file stored in credentials
                    withCredentials([file(credentialsId: 'server-env', variable: 'ENV_FILE')]) {
                        powershell '''
                            if (Test-Path $env:ENV_FILE) {
                                # Copy the .env file to the server directory
                                Copy-Item -Path $env:ENV_FILE -Destination 'server/.env' -Force
                                echo ".env file copied successfully."
                            } else {
                                echo "Error: .env file not found at $env:ENV_FILE"
                                exit 1
                            }
                        '''
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
                    echo "Running tests inside the container..."
                    powershell '''
                        docker-compose -f docker-compose.yml up -d
                    '''
                    sleep(time: 10, unit: 'SECONDS')
                    powershell '''
                         docker exec backend yarn jest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying the services..."
                    powershell '''
                        docker-compose -f docker-compose.yml up
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
