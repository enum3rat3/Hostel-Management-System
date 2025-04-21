# Hostel Management System

## Overview
The **Hostel Management System** is a microservices-based application designed to manage hostel operations efficiently. It includes features such as user authentication, room allocation, vacancy management, and email notifications. The system is built using a combination of backend microservices, a React.js frontend, and Kubernetes for deployment.

---

## Features
- **User Management**:
  - User registration and login with JWT-based authentication.
  - Role-based access control (e.g., Warden).

- **Hostel Management**:
  - Add, allocate, and vacate hostel rooms.
  - Filter rooms by name, floor, and availability.

- **Email Notifications**:
  - Notify users about room allocation and vacancy via email.

- **Frontend**:
  - User-friendly interface built with React.js.
  - Real-time updates using Redux for state management.

- **Backend**:
  - Microservices architecture with Spring Boot.
  - Kafka for asynchronous communication between services.

- **Deployment**:
  - Docker and Kubernetes for containerized deployment.
  - Config Server for centralized configuration management.

---

## Technologies Used
### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- Material-UI

### Backend
- Spring Boot
- Spring Security (JWT Authentication)
- Kafka (Event-driven communication)
- PostgreSQL (Database)

### Deployment
- Docker
- Kubernetes
- Nginx (Frontend hosting)

---

## Folder Structure
### Backend
- **`esd_user_service`**: Handles user authentication and profile management.
- **`esd_hostel_service`**: Manages hostel operations like room allocation and vacancy.
- **`esd_email_service`**: Sends email notifications for room allocation and vacancy.
- **`config-server`**: Centralized configuration for all microservices.

### Frontend
- **React.js application**: Provides the user interface for the system.

### Kubernetes Configurations
- **`kubernetes-config`**: Contains YAML files for deploying microservices, databases, and Kafka.

---

## How to Run the Project
### Prerequisites
- Docker
- Kubernetes (Minikube or any Kubernetes cluster)
- Node.js and npm (for frontend development)

### Steps
1. **Clone the Repository**:
   ```bash