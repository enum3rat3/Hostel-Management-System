pipeline{
    agent any

    environment {
        CONFIG_IMAGE = 'enum3rat3/config-server:latest'
        GATEWAY_IMAGE = 'enum3rat3/gateway-server:latest'
        USER_IMAGE = 'enum3rat3/user-service:latest'
        HOSTEL_IMAGE = 'enum3rat3/hostel-service:latest'
        EMAIL_IMAGE = 'enum3rat3/email-service:latest'
        FRONTEND_IMAGE = 'enum3rat3/frontend-service:latest'
    }

    stages{
        stage('checkout') {
            steps{
                script{
                    git branch: 'main', url:'https://github.com/enum3rat3/Software-Production-Engineering.git'
                }
            }
        }
		stage('Build Docker Image') {
			steps{
				script{
                    sh '''
                        docker build -t $GATEWAY_IMAGE ./ESD_MINI_PROJECT_BACKEND/Gateway/
                    '''
				}
			}
		}
    }
}