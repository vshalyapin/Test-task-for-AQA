FROM node:20-bookworm

RUN npx -y playwright@1.42.1 install --with-deps