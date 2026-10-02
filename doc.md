## Dockerfile

```dockerfile
# Step 1: Build the textutils app
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Step 2: Serve production files
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## Build and run the Docker container

Run these commands in PowerShell from the project root:

```powershell
# Step 0: Check Docker setup
docker --version
docker info

# Step 1: Build the Docker image
docker build -t jaykishorc/textutils:latest .
Or,
docker build --pull --no-cache -t jaykishorc/textutils:latest .
or,
docker build --platform linux/arm64 -t jaykishorc/textutils:latest .

# docker build → builds the image
# --pull → checks for the latest version of the base image
# --no-cache → rebuilds all layers from scratch
# . → uses the current directory as the build context

#  Update a version tag to the image to push on regitery eg. tag docker_hub_username/image_name:version
docker tag jaykishorc/textutils:latest jaykishorc/textutils:v1

# Step 2: Run the container
docker run -d --name textutils -p 8080:80 -t textutils:latest

# Step 3: Verify the running container and logs
docker ps
docker logs container_name
# -a -> to see all avilable container
# Open the app at http://localhost:8080

# Step 4: Push the image to the docker registery(Docker Hub), if already not logged in then do login first
docker login
docker push image_name

# Step 5: Pull the image from the docker registry(Docker Hub)
docker pull image_name

# Stop and remove the container when finished
docker stop textutils
docker rm textutils
# docker rm  → removes a container
# docker rmi → removes an image
```

## Inspect and manage a running container

Replace `textutils-app` with the actual container name when necessary.

```powershell
# Enter the running container's shell
docker exec -it textutils-app sh

# Show detailed container information
docker inspect textutils-app

# Rename the container
docker rename textutils-app textutils-prod

# Show live CPU, memory, and network usage for all containers
docker stats

# Show processes running inside the container
docker top textutils-app
```
