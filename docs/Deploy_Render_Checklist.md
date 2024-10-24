# Deploy Checklist for Render

This checklist guides you through deploying the Next.js application on Render. After successful deployment and CI/CD setup, we can integrate the Python backend.

**Instructions**: As you complete each task, mark it as done by changing `[ ]` to `[x]`.

## Prerequisites

- [x] **Render Account**: Ensure you have a Render account and are logged in.
- [x] **Git Repository**: Your code should be in a Git repository.

## Current Repository Structure

- [x] **Verify Structure**:
  ```
  .
  ├── src/               # Next.js application source
  ├── public/           # Static files
  ├── Dockerfile        # Docker configuration
  ├── package.json      # Node.js dependencies
  └── pnpm-lock.yaml    # Lock file
  ```

## Next.js Deployment

- [ ] **Create Web Service**:
  - Click **New** and select **Web Service**
  - Connect your repository
  - Set root directory to `/` (project root)
  - Set build command: `pnpm install && pnpm run build`
  - Set start command: `pnpm start`

- [ ] **Configure Service**:
  - **Name**: Choose a name (e.g., `choir-collective`)
  - **Region**: Select deployment region
  - **Instance Type**: Choose appropriate instance type
  - **Branch**: Select deployment branch (e.g., `main`)

- [ ] **Set Environment Variables**:
  - `NODE_ENV`: Set to `production`
  - `PORT`: Set to `80` for production (Render will handle HTTPS/TLS termination automatically)
  - Any other required environment variables

## Security & HTTPS

- [ ] **Verify HTTPS**:
  - Render automatically provisions and manages TLS certificates
  - All HTTP traffic is automatically redirected to HTTPS
  - No manual SSL/TLS configuration is required

## Deployment Verification

- [ ] **Test Application**: Visit the Render-provided URL and verify:
  - Application loads correctly over HTTPS
  - All pages are accessible
  - Solana integration works
  - UI components render properly
  - SSL certificate is valid

- [ ] **Monitor Logs**: Use Render's logging tools to:
  - Check for any startup issues
  - Verify application is running correctly
  - Monitor for any errors

## Continuous Deployment

- [ ] **Auto-Deploy Settings**:
  - Enable auto-deploy for the main branch
  - Configure branch deploy settings if needed
  - Test auto-deploy by pushing a small change

## Performance Monitoring

- [ ] **Configure Monitoring**:
  - Set up logging
  - Monitor service metrics
  - Set up alerts for any issues

## Future Integration Notes

- [ ] **Document Integration Points**: Identify where the Python backend will integrate
- [ ] **Plan API Structure**: Document the API endpoints needed for backend integration
- [ ] **Update Environment Variables**: List additional variables needed for backend integration

This checklist ensures the Next.js application is properly deployed and stable before adding the Python backend. Refer to Render's documentation for detailed instructions on specific steps.

Note: Render handles all HTTPS/TLS certificate management and termination automatically. Your application only needs to listen on HTTP (port 80), and Render's proxy layer will handle the SSL/TLS termination.
