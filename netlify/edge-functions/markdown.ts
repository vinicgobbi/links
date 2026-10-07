import type { Context } from "@netlify/edge-functions";

interface LinkEntry {
  name: string;
  link: string;
  description?: string;
  hidden?: boolean;
}

export default async (request: Request, context: Context) => {
  const accept = request.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) {
    return context.next();
  }

  const links: LinkEntry[] = await fetch(new URL("/assets/links.json", request.url)).then((res) => res.json());

  const body = [
    "# Vinícius Gobbi",
    "",
    "Desenvolvedor Full-Stack · Laravel, React e Angular. Links pessoais e redes sociais.",
    "",
    ...links
      .filter((entry) => !entry.hidden)
      .map((entry) => `- [${entry.name}](${entry.link})${entry.description ? ` — ${entry.description}` : ""}`),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      vary: "Accept",
    },
  });
};

export const config = { path: "/" };
