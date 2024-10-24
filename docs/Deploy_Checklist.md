# Deploy Checklist for Azure Container Instances

This checklist is designed to guide you through deploying a Docker container to Azure Container Instances (ACI). Follow these steps to ensure a successful deployment.

**Instructions**: As you complete each task, mark it as done by changing `[ ]` to `[x]`.

## Prerequisites

- [x] **Azure CLI**: Ensure you have the Azure CLI installed and updated to the latest version.
- [x] **Azure Subscription**: Verify you have an active Azure subscription.
- [x] **Docker Installed**: Ensure Docker is installed and running on your local machine.

## Docker Image Preparation

- [x] **Build Docker Image**: Execute `docker build -t choir-collective .` in the directory containing the Dockerfile. Ensure the build completes successfully.

- [x] **Test Docker Image Locally**: Run the container locally using `docker run -p 8080:8080 choir-collective` and verify the application is accessible at `http://localhost:8080`.

## Azure Container Registry (ACR)

- [x] **Use Existing ACR**: Use the existing Azure Container Registry named `choir` in the `Choir` resource group. The login server is `choir.azurecr.io`.

- [x] **Login to ACR**: Authenticate with the ACR using:

  ```bash
  az acr login --name choir
  ```

- [x] **Tag Docker Image**: Tag the Docker image for the ACR:

  ```bash
  docker tag choir-collective choir.azurecr.io/choir-collective
  ```

- [x] **Push Image to ACR**: Upload the Docker image to the ACR:
  ```bash
  docker push choir.azurecr.io/choir-collective
  ```

## Azure Container Instances (ACI) Deployment

- [ ] **Create ACI**: Deploy the container to ACI using:
  ```bash
  az container create --resource-group Choir --name choir-collective --image choir.azurecr.io/choir-collective --cpu 1 --memory 1 --registry-login-server choir.azurecr.io --registry-username <your-acr-username> --registry-password <your-acr-password> --dns-name-label choir-collective --ports 80 8080 --environment-variables PORT=80
  ```

## Deployment Verification

- [ ] **Access Application**: Visit the URL `http://choir-collective.eastus.azurecontainer.io` to verify the application is running. Replace `<region>` with your Azure region.

- [ ] **Monitor Logs**: Use Azure CLI to view logs and ensure everything is functioning correctly:
  ```bash
  az container logs --resource-group Choir --name choir-collective
  ```

This checklist is intended to streamline the deployment process using Azure Container Instances. Ensure all placeholders like `<your-acr-username>` and `<your-acr-password>` are replaced with actual configuration details before proceeding.
