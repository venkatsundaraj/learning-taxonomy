import { FC } from "react";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Image from "next/image";
import { formatDate } from "@/lib/util";
import Link from "next/link";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <section className="container max-w-5xl p-4">
      <h1 className="font-heading font-bold tracking-normal text-5xl">Blog</h1>
      <p className="text-muted-foreground font-paragraph mt-4 text-xl">
        All blogs you see here written using MDX
      </p>
      <hr className="my-8" />
      <div className="grid grid-cols-2 gap-8">
        {posts?.length ? (
          posts.map((item) => (
            <article
              key={item._id}
              className="relative group flex items-start justify-between flex-col gap-2"
            >
              {item.image && (
                <div className="relative w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={804}
                    height={452}
                    className="border rounded-md bg-muted"
                  />
                </div>
              )}
              <h2 className="font-heading text-2xl font-bold text-primary">
                {item.title}
              </h2>
              <p className="font-paragraph text-secondary-foreground">
                {item.description}
              </p>
              <p className="font-paragraph text-muted-foreground">
                {formatDate(item.date)}
              </p>
              <Link className="absolute inset-0" href={item.slug}>
                <span className="sr-only">View article</span>
              </Link>
            </article>
          ))
        ) : (
          <p className="text-muted-foreground font-paragraph mt-4 text-md">
            No posts are updated
          </p>
        )}
      </div>
    </section>
  );
};

export default page;
