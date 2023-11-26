import { env } from "@/lib/env.mjs";
import { allAuthors, allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";
import { absoluteUrl, cn, formatDate } from "@/lib/util";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";
import Image from "next/image";
import { Mdx } from "@/components/mdx-components";

interface PageProps {
  params: {
    slug: string[];
  };
}

export const getPostFromParams = async function ({ params }: PageProps) {
  const post = allPosts.find((p) => p.slugAsParams === params?.slug?.join("/"));

  if (!post) notFound();
  return post;
};

export const generateMetadata = async function ({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostFromParams({ params });

  if (!post) {
    notFound();
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/api/og`);

  ogUrl.searchParams.set("heading", post.title);
  ogUrl.searchParams.set("type", "Blog Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((auth) => ({
      name: auth,
    })),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(post.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  };
};

export const generateStaticParams = async function (): Promise<
  PageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
};

const page = async ({ params }: PageProps) => {
  const post = await getPostFromParams({ params });

  if (!post) notFound();

  const author = post.authors.map((author, i) => {
    return allAuthors.find(({ slug }) => `/author/${author}` === slug);
  });

  return (
    <article className="container relative flex gap-10 gap- max-w-5xl py-4">
      <Link
        href={"/blog"}
        className={cn(
          buttonVariants({ variant: "secondary", size: "lg" }),
          "hidden md:inline-flex whitespace-nowrap"
        )}
      >
        <Icons.ChevronLeft />
        All blogs
      </Link>
      <div className="flex flex-col gap-2 items-start">
        {post.date ? (
          <time dateTime={post.date} className="text-muted-foreground">
            {`Published On ${formatDate(post.date)}`}
          </time>
        ) : null}
        {post.title ? (
          <h1 className="font-heading block text-4xl tracking-normal font-bold text-secondary-foreground">
            {post.title}
          </h1>
        ) : null}
        {author.length
          ? author.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  target="_blank"
                  className={cn(
                    "flex items-center justify-center gap-4 bg-white mt-4"
                  )}
                  href={`https://twitter.com/${author.twitter}`}
                >
                  {author.avatar ? (
                    <Image
                      src={author.avatar}
                      className={cn("rounded-full bg-white")}
                      alt={author.name}
                      width={40}
                      height={40}
                    />
                  ) : null}
                  {author.name ? (
                    <div className="flex flex-col items-start justify-between">
                      <p className="font-paragraph text-[14px] text-secondary-foregroung leading-5">
                        {author.name}
                      </p>
                      <p className="font-paragraph text-[14px] text-muted-foregroung leading-5">
                        @{author.twitter}
                      </p>
                    </div>
                  ) : null}
                </Link>
              ) : null
            )
          : null}
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={720}
            height={405}
            className="my-8 rounded-md border bg-muted transition-colors"
            priority
          />
        )}
        <Mdx code={post.body.code} />
        <hr className="my-12 w-full" />
        <Link
          href="/blog"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "self-center"
          )}
        >
          <Icons.ChevronLeft />
          All blogs
        </Link>
      </div>
    </article>
  );
};

export default page;
