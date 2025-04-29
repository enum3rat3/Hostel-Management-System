pipeline{
    agent any

    environment {
        CONFIG_IMAGE = 'enum3rat3/config-server'
        GATEWAY_IMAGE = 'enum3rat3/gateway-server'
        USER_IMAGE = 'enum3rat3/user-service'
        HOSTEL_IMAGE = 'enum3rat3/hostel-service'
        EMAIL_IMAGE = 'enum3rat3/email-service'
        FRONTEND_IMAGE = 'enum3rat3/frontend-service'
    }

    stages{
		stage('Build Docker Image') {
			steps{
				script{
                    docker.build("${GATEWAY_IMAGE}", './ESD_MINI_PROJECT_BACKEND/Gateway/')
                    docker.build("${CONFIG_IMAGE}", './ESD_MINI_PROJECT_BACKEND/config-server/')
                    docker.build("${USER_IMAGE}", './ESD_MINI_PROJECT_BACKEND/esd_user_service/')
                    docker.build("${HOSTEL_IMAGE}", './ESD_MINI_PROJECT_BACKEND/esd_hostel_service/')
                    docker.build("${EMAIL_IMAGE}", './ESD_MINI_PROJECT_BACKEND/esd-email-service/')
                    docker.build("${FRONTEND_IMAGE}", './ESD_MINI_PROJECT_FRONTEND/fronend/')
				}
			}
		}
    }
}