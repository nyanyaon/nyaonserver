import { Server } from "./deps.ts";
import { contentType } from "https://deno.land/std@0.170.0/media_types/mod.ts";

const port = 80;
const HOST = `http://localhost${port === 80 ? "" : ":" + port}`;
const handler = (request: Request) => {
  // const base = request.url.replace(HOST, "");
  const base = new URL(request.url);
  const path = base.pathname;
  if (path === "/") {
    const body = Deno.readTextFileSync("./public/index.html");
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  const file_type: string = path.slice(path.indexOf("."), path.length);
  return new Response(Deno.readTextFileSync("./public/" + path), {
    status: 200,
    headers: {
      "content-type": contentType(file_type) as string,
    },
  });
};

const server = new Server({ port, handler });

console.log("server listening on " + HOST);

await server.listenAndServe();
