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
                  gateway-image = docker.build("${GATEWAY_IMAGE}", './ESD_MINI_PROJECT_BACKEND/Gateway/')
                  config-image  = docker.build("${CONFIG_IMAGE}", './ESD_MINI_PROJECT_BACKEND/config-server/')
                  user-image = docker.build("${USER_IMAGE}", './ESD_MINI_PROJECT_BACKEND/esd_user_service/')
                  hostel-image = docker.build("${HOSTEL_IMAGE}", './ESD_MINI_PROJECT_BACKEND/esd_hostel_service/')
                  email-image = docker.build("${EMAIL_IMAGE}", './ESD_MINI_PROJECT_BACKEND/esd-email-service/')
                  frontend-image = docker.build("${FRONTEND_IMAGE}", './ESD_MINI_PROJECT_FRONTEND/fronend/')
	      }
	   }
	}

	stage('Push Docker Image'){
	  steps{
	    script{
		docker.withRegistry('', 'docker-hub-creds') {
			gateway-image.push()
			config-image.push()
			user-image.push()
			hostel-image.push()
			email-image.push()
			frontend-image.push()
	      }
	   }
	}
     }
  }
}
