FROM node:16.19.1

RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

COPY ./entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT "/entrypoint.sh"
