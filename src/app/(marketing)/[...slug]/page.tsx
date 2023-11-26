import { Mdx } from "@/components/mdx-components";
import { env } from "@/lib/env.mjs";
import { absoluteUrl } from "@/lib/util";
import { Page, allPages } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";

interface PageProps {
  params: {
    slug: string[];
  };
}

export const getPageFromParams = async function ({ params }: PageProps) {
  const post = allPages.find(
    (page) => page.slugAsParams === params.slug.join("/")
  );

  if (!post) notFound();

  return post;
};

export const generateMetadata = async function ({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams({ params });

  if (!page) notFound();

  const newUrl = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${newUrl}/og/api`);

  ogUrl.searchParams.set("heading", page.title);
  ogUrl.searchParams.set("type", "Page");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: absoluteUrl(page.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogUrl.toString()],
    },
  };
};

export const generateStaticParams = async function ({
  params,
}: PageProps): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
};

const page = async ({ params }: PageProps) => {
  const page = await getPageFromParams({ params });

  if (!page) notFound();
  return (
    <section className="container py-4 bg-transparent">
      {page.title ? (
        <h1 className=" tracking-normal font-heading text-4xl">{page.title}</h1>
      ) : null}
      <hr className="w-full my-6" />
      <Mdx code={page.body.code} />
    </section>
  );
};

export default page;
