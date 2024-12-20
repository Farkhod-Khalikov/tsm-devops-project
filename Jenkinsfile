pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/Farkhod-Khalikov/tsm-devops-project.git'  // Replace with your repository URL
        BRANCH_NAME = 'main'  // Replace with your desired branch
    }

    stages {
        stage('Git Checkout') {
            steps {
                script {
                    // Clean the workspace before fetching to avoid any residual issues
                    deleteDir()
                    // Checkout the code from the repository
                    try {
                        echo "Fetching the latest code from the repository..."
                        // Fetch with options to avoid issues with timeouts or remote issues
                        sh '''
                            git init
                            git remote add origin $GIT_REPO_URL
                            git fetch --tags --force --progress --prune origin +refs/heads/$BRANCH_NAME:refs/remotes/origin/$BRANCH_NAME
                        '''
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error "Git fetch failed: ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo "Building the project..."
                // Add your build steps here
                // For example: sh './build.sh'
            }
        }

        // Additional stages can be added here

        stage('Deploy') {
            steps {
                echo "Deploying the application..."
                // Add your deployment steps here
            }
        }
    }

    post {
        success {
            echo "Build and deploy completed successfully."
        }
        failure {
            echo "Build or deploy failed."
        }
        always {
            echo "Cleaning up..."
            // Optional: Clean up after the build
            deleteDir()
        }
    }
}
