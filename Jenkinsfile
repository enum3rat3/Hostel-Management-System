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
		stage('Build Docker Image') {
			steps{
				script{
                    docker.build("${GATEWAY_IMAGE}", '-f ./ESD_MINI_PROJECT_BACKEND/Gateway/ .')
				}
			}
		}
    }
}