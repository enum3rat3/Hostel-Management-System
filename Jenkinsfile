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
	stage('OWASP Dependency-Check Vulnerabilities'){
	   steps{
		sh 'cd ./ESD_MINI_PROJECT_BACKEND/Gateway/ && mvn org.owasp:dependency-check-maven:check'
	  }	
	}

	stage('Build Docker Image') {
	   steps{
	     script{
                  gatewayImage = docker.build("${GATEWAY_IMAGE}", './ESD_MINI_PROJECT_BACKEND/Gateway/')
                  configImage  = docker.build("${CONFIG_IMAGE}", './ESD_MINI_PROJECT_BACKEND/config-server/')
                  userImage = docker.build("${USER_IMAGE}", './ESD_MINI_PROJECT_BACKEND/esd_user_service/')
                  hostelImage = docker.build("${HOSTEL_IMAGE}", './ESD_MINI_PROJECT_BACKEND/esd_hostel_service/')
                  emailImage = docker.build("${EMAIL_IMAGE}", './ESD_MINI_PROJECT_BACKEND/esd-email-service/')
                  frontendImage = docker.build("${FRONTEND_IMAGE}", './ESD_MINI_PROJECT_FRONTEND/fronend/')
	      }
	   }
	}

	stage('Push Docker Image'){
	  steps{
	    script{
		docker.withRegistry('', 'docker-hub-creds') {
			gatewayImage.push()
			configImage.push()
			userImage.push()
			hostelImage.push()
			emailImage.push()
			frontendImage.push()
	      }
	   }
	}
     }
  }
}
