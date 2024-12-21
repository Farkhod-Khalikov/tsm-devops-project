pipeline {
    agent any

    environment {
        // Define your repository URL and branch name
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
                    // Checkout the code from the repository using Git Bash
                    try {
                        echo "Fetching the latest code from the repository..."
                    sh '''
                        git init
                        git remote add origin $GIT_REPO_URL
                        git fetch --tags --force --progress --prune origin +refs/heads/$BRANCH_NAME:refs/remotes/origin/$BRANCH_NAME
                        git checkout -B $BRANCH_NAME origin/$BRANCH_NAME
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
                    sh '''
                        docker-compose -f docker-compose.yml build
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo "Running tests inside the container..."
                    // Start containers, but in detached mode (background)
                    sh '''
                        docker-compose -f docker-compose.yml up -d
                    '''
                    // Wait for the services to initialize
                    sleep(time: 10, unit: 'SECONDS')
                    // Run tests (for example, backend tests)
                    // Replace with your actual test command, e.g., running Mocha, Jest, etc.
                    sh '''
                        docker exec -it backend yarn jest
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying the services..."
                    // Start the containers in the foreground to simulate a deployment stage
                    sh '''
                        docker-compose -f docker-compose.yml up
                    '''
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo "Cleaning up Docker containers..."
                    // Stop and remove the containers after the deployment
                    sh '''
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
            // Clean workspace after every build
            deleteDir()
        }
    }
}
