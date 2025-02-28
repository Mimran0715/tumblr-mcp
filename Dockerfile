# 1️⃣ Use an official Node.js image as the base image
FROM node:18-alpine AS builder

# 2️⃣ Set the working directory in the container
WORKDIR /app

# 3️⃣ Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json* ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy the rest of the application files
COPY . .

# 6️⃣ Compile TypeScript to JavaScript
RUN npm run build

# 7️⃣ Use a smaller Node.js image for production
FROM node:18-alpine AS runner

# 8️⃣ Set working directory again
WORKDIR /app

# 9️⃣ Copy only the compiled files and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# 🔟 Expose the port your MCP server runs on
EXPOSE 3000

# 1️⃣1️⃣ Define the command to run the server
CMD ["node", "dist/index.js"]
