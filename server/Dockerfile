# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

RUN yarn global add typescript

# Step 3: Copy package.json and yarn.lock files first (for dependency installation)
COPY package.json yarn.lock ./

# Step 4: Install dependencies
RUN yarn install

# Step 5: Copy the rest of the application code
COPY . .

RUN yarn build

# Step 6: Expose the application port
EXPOSE 3000

# Step 7: Command to run the application
CMD ["yarn", "start"]
