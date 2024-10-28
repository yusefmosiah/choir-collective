# Porting Documentation 




==
Porting_Checklist
==


# Deployment & CI/CD Checklist

## 1. CI/CD Setup
- [x] Setup GitHub Actions workflow
- [x] Configure build pipeline
- [x] Add linting and formatting checks
- [x] Setup test automation
- [x] Configure deployment triggers

### 1.1 Render Deploy Hook Setup
- [x] Get Deploy Hook URL:
  1. Go to Render Dashboard
  2. Select the `choir-collective` service
  3. Go to "Settings" tab
  4. Find "Deploy Hook" section
  5. Copy the deploy hook URL

- [x] Add GitHub Secret:
  1. Go to GitHub repo settings
  2. Click "Secrets and variables > Actions"
  3. Click "New repository secret"
  4. Name: `RENDER_DEPLOY_HOOK_URL`
  5. Value: Paste the deploy hook URL
  6. Click "Add secret"

- [x] Disable Render Auto-Deploy:
  1. Go to Render Dashboard
  2. Select the `choir-collective` service
  3. Go to "Settings" tab
  4. Find "Auto-Deploy" section
  5. Disable auto-deploy

- [x] Test CI/CD Pipeline:
  1. Make a small change to the codebase
  2. Push to main branch
  3. Verify GitHub Actions workflow runs
  4. Verify deployment triggers on Render
  5. Check application updates successfully

## 2. Testing Infrastructure
- [x] Use already set-up testing framework
- [ ] Configure test data
- [ ] Add test fixtures
- [ ] Setup test coverage reporting
- [ ] Add integration tests for Solana program interaction

## 3. Frontend Deployment ✅
- [x] Deploy Next.js app to Render
- [x] Configure environment variables
- [x] Verify HTTPS/SSL setup
- [x] Test Solana integration
- [x] Verify all pages working

## 4. Backend Deployment

### 4.1 Render Service Setup
- [ ] Create new Web Service for backend:
  1. Go to Render Dashboard
  2. Click "New +" and select "Web Service"
  3. Connect to GitHub repo
  4. Configure service:
     - Name: `choir-collective-api`
     - Root Directory: `api`
     - Environment: `Docker`
     - Region: Choose nearest
     - Instance Type: Start with "Starter" plan
     - Auto-Deploy: Disable  # We'll use GitHub Actions instead

- [ ] Get Deploy Hook URL for backend:
  1. Go to service settings
  2. Find "Deploy Hook" section
  3. Copy the deploy hook URL
  4. Add as GitHub secret: `RENDER_DEPLOY_HOOK_URL_BACKEND`

### 4.2 Environment Variables
- [ ] Add environment variables in Render:
  ```
  PORT=8000
  ```

### 4.3 Update Frontend Configuration
- [ ] Update frontend environment in Render:
  ```
  NEXT_PUBLIC_API_URL=https://choir-collective-api.onrender.com
  ```

### 4.4 CORS Configuration
- [ ] Update CORS in main.py to allow frontend domain:
  ```python
  app.add_middleware(
      CORSMiddleware,
      allow_origins=[
          "https://choir-collective.onrender.com",
          "http://localhost:3000"  # For local development
      ],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```

### 4.5 Verify Deployment
- [ ] Check backend health endpoint: https://choir-collective-api.onrender.com/health
- [ ] Test button click from frontend
- [ ] Verify logs in Render dashboard

## 5. Integration
- [ ] Connect frontend to new backend
- [ ] Test WebSocket connections
- [ ] Verify Solana program interactions
- [ ] Test end-to-end message flow
- [ ] Verify state synchronization

## 6. Monitoring
- [ ] Setup logging
- [ ] Configure error tracking
- [ ] Add performance monitoring
- [ ] Setup alerts
- [ ] Add health checks

### 6.1 Backend Monitoring
- [ ] Add logging configuration:
  ```python
  import logging
  logging.basicConfig(level=logging.INFO)
  ```

- [ ] Setup health check endpoint:
  ```python
  @app.get("/health")
  async def health_check():
      return {"status": "healthy"}
  ```

- [ ] Configure Render health checks:
  1. Go to service settings
  2. Set health check path to "/health"
  3. Configure check interval and timeout
