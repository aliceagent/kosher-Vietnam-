import { buildBundle } from "@/lib/offline";

export function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const bundle = buildBundle(id);
    return Response.json(bundle, {
      headers: { "Cache-Control": "public, max-age=3600" },
    });
  });
}
