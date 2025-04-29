pipeline{
    agent any

    stages{
        stage('checkout') {
            steps{
                script{
                    git branch: 'main', url:'https://github.com/enum3rat3/Software-Production-Engineering.git'
                }
            }
        }
        stage('connection-check'){
            echo 'connection check'
        }
    }
}