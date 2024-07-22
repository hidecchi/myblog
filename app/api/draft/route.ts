import { createClient } from "contentful";
import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { IBlogFields } from "../../../@types/generated/contentful";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!secret || !slug) {
    return new Response("Missing parameters", { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN as string,
    host: "preview.contentful.com",
  });
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    "fields.slug": slug,
  });
  const blog = res.items[0];

  if (!blog) {
    return new Response("Blog not found", { status: 404 });
  }

  draftMode().enable();

  // This is a hack due to a bug with cookies and NextJS, this code might not be required in the future
  const cookieStore = cookies();
  const cookie = cookieStore.get("__prerender_bypass");
  cookies().set({
    name: "__prerender_bypass",
    value: cookie?.value || "",
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  redirect(`/post/${slug}`);
}
