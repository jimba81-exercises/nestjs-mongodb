# Arguments 
ARG NODE_VERSION=20.9.0
ARG NESTJS_CLI_VERSION=11.0.2

# ---- Builder ---
FROM node:${NODE_VERSION} AS base
ARG NODE_VERSION
ARG NESTJS_CLI_VERSION
ARG DEBIAN_FRONTEND=noninteractive

LABEL node_version="$NODE_VERSION"
LABEL nestjs_cli_version="$NESTJS_CLI_VERSION"

# Install apt packages
RUN apt-get update
#RUN apt install -yq \
#    protobuf-compiler

#RUN apt-get install -y sshpass

RUN apt-get purge -y --auto-remove
RUN rm -rf /var/lib/apt/lists/* 

# Install npm packages
RUN npm install -g @nestjs/cli@$NESTJS_CLI_VERSION

# Remove setuid and setgid permissions
#RUN find / -perm /6000 -type f -exec chmod a-s {} \; || true

USER node
WORKDIR /home/node/workspace

CMD ["sh", "-c", "echo 'This is DEV Container. Run /bin/bash to start the development environment'"]

