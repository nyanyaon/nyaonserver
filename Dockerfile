FROM denoland/deno:1.29.1
EXPOSE 80

WORKDIR /app

USER deno

COPY ./src/deps.ts .
RUN deno cache deps.ts

ADD ./src/ .
RUN deno cache app.ts

CMD ["run", "--allow-net","--allow-read", "app.ts"]
