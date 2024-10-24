# Deploy Predeployment Checklist for AI Execution

This checklist is designed to guide an AI model through the process of deploying a project locally and on Azure. Follow these steps to ensure a successful deployment. This is part of our documentation-driven development approach with AI supercoders.

**Instructions**: As you complete each task, mark it as done by changing `[ ]` to `[x]`.

## Dockerfile Creation

- [x] **Select Base Image**: Choose a base image that matches the application's runtime environment (e.g., `node:18-alpine` for Node.js). Ensure compatibility with the application's dependencies.

- [x] **Set Working Directory**: Define the working directory inside the container using `WORKDIR /app`. This is where the application files will reside.

- [x] **Copy Application Files**: Transfer the application files into the container using `COPY . .`. Ensure that all necessary files are included.

- [x] **Install Dependencies**: Use `pnpm` to install all necessary dependencies with `RUN pnpm install`. Ensure `pnpm-lock.yaml` is present for consistent dependency resolution.

- [x] **Build Application**: Execute a build step if required by the application (e.g., for a React app) using `RUN pnpm run build`. Verify that the build completes without errors.

- [x] **Expose Application Ports**: Specify the ports that need to be exposed for the application using `EXPOSE 3000`. Ensure the port matches the application's configuration.

- [x] **Define Run Command**: Set the command to start the application using `CMD ["pnpm", "start"]`. Verify that the command correctly starts the application.

### Sample Dockerfile

```dockerfile
# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application (if needed)
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["pnpm", "start"]
```

## Local Docker Image Build and Run

- [ ] **Build Docker Image**: Execute `docker build -t choir-collective .` in the directory containing the Dockerfile. Ensure the build completes successfully.

- [ ] **Run Docker Container**: Start the container using `docker run -p 3000:3000 choir-collective`. Verify that the application is accessible at `http://localhost:3000`.

## Azure Deployment

- [ ] **Create Azure Container Registry (ACR)**: If not already created, set up an ACR using the Azure portal or CLI. Ensure the registry is accessible and configured correctly.

- [ ] **Login to ACR**: Authenticate with the ACR using `az acr login --name <your-acr-name>`. Verify successful login.

- [ ] **Tag Docker Image**: Tag the Docker image for the ACR with `docker tag choir-collective <your-acr-name>.azurecr.io/choir-collective`. Ensure the tag is correct.

- [ ] **Push Image to ACR**: Upload the Docker image to the ACR using `docker push <your-acr-name>.azurecr.io/choir-collective`. Confirm the image is available in the registry.

- [ ] **Deploy to Azure App Service**: Deploy the container using:
  ```bash
  az webapp create --resource-group <your-resource-group> --plan <your-app-service-plan> --name <your-app-name> --deployment-container-image-name <your-acr-name>.azurecr.io/choir-collective
  ```
  Ensure the deployment completes without errors.

- [ ] **Configure Continuous Deployment (Optional)**: Set up continuous deployment from the ACR to Azure App Service for automatic updates. Verify the setup is correct.

## Deployment Verification

- [ ] **Access Application**: Visit the URL provided by Azure App Service to verify the application is running. Check for any issues.

- [ ] **Monitor Logs**: Use Azure's monitoring tools to check logs and ensure everything is functioning correctly. Address any errors or warnings.

This checklist is intended for AI execution. Ensure all placeholders like `<your-acr-name>`, `<your-resource-group>`, `<your-app-service-plan>`, and `<your-app-name>` are replaced with actual configuration details before proceeding. This approach supports documentation-driven development with AI supercoders.
