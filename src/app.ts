import { Server } from "./deps.ts";
import { contentType } from "https://deno.land/std@0.170.0/media_types/mod.ts";

const port = 80;
const HOST = `http://localhost${port === 80 ? "" : ":" + port}`;
const handler = async (request: Request) => {
  // const base = request.url.replace(HOST, "");
  const base = new URL(request.url);
  const path = base.pathname;
  if (path === "/") {
    let file;
    try {
      file = await Deno.open("src/public/index.html", { read: true });
    } catch (e) {
      console.log(e);
      return new Response("404 Not Found", { status: 404 });
    }

    const body = file.readable;

    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  const file_type: string = path.slice(path.indexOf("."), path.length);
  return new Response(Deno.readFileSync("src/public/" + path), {
    status: 200,
    headers: {
      "content-type": contentType(file_type) as string,
    },
  });
};

const server = new Server({ port, handler });

console.log("server listening on " + HOST);

await server.listenAndServe();
