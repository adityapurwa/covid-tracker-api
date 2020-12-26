FROM node:15

EXPOSE 80
VOLUME ["/var/app"]
WORKDIR "/var/app"

ENTRYPOINT yarn dev
