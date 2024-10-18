# Base image used  
FROM node:alpine 
COPY ./ ./
# Install project dependencies
RUN npm install
# Running default command
EXPOSE 8080
CMD ["npm", "start"]