FROM registry.access.redhat.com/ubi8-minimal
RUN microdnf update && microdnf module enable nodejs:18/common && microdnf install npm -y && microdnf clean all

ENV REACT_APP_BASE_URL 
ENV REACT_APP_BASE_PATH /

WORKDIR "/app"
RUN npm cache clean --force
COPY ./package.json .

RUN npm i --legacy-peer-deps

COPY . .
ENV REACT_MODE="production"
EXPOSE $PORT
RUN mkdir /.npm
RUN chown -R nobody:nobody /.npm
RUN chown -R nobody:nobody /app
USER nobody
CMD ["npm", "run", "prod"]