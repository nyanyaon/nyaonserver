import { Server } from "./deps.ts";
import { contentType } from "https://deno.land/std@0.170.0/media_types/mod.ts";

const port = 80;
const HOST = `http://localhost${port === 80 ? "" : ":" + port}`;
const handler = (request: Request) => {
  const base = request.url.replace(HOST, "");
  if (base === "/") {
    const body = Deno.readTextFileSync("./public/index.html");
    return new Response(body + request.url, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  const file_type: string = base.slice(base.indexOf("."), base.length);
  return new Response(Deno.readTextFileSync("./public/" + base), {
    status: 200,
    headers: {
      "content-type": contentType(file_type) as string,
    },
  });
};

const server = new Server({ port, handler });

console.log("server listening on " + HOST);

await server.listenAndServe();
