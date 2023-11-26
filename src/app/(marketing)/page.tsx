import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/util";
import Link from "next/link";
import Image from "next/image";
import { env } from "@/lib/env.mjs";
import axios from "axios";

const getGithubStars = async function () {
  try {
    const result = await axios.post(
      "https://api.github.com/repos/venkatsundaraj/josh-chat-app",
      {
        next: {
          revalidate: 60,
        },
      },
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
        },
      }
    );

    if (!result.data) {
      return null;
    }

    return parseInt(result.data["stargazers_count"]).toLocaleString();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default async function Home() {
  const stars = await getGithubStars();

  return (
    <>
      <section className="flex items-center justify-center w-screen py-12 md:py-16 lg:py-32">
        <div className="container flex flex-col items-center gap-4 max-w-6xl  text-center">
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Follow me on Twitter
          </Link>
          <h1 className="font-heading max-w-7xl text-foreground font-bold text-4xl md:text-5xl lg:text-6xl xl:text-8xlxl">
            Project Tracker for tracking all your Fullstack Projects
          </h1>
          <p className="font-paragraph max-w-3xl text-muted-foreground tracking-light">
            Recently, I came across taxonomy repo where I saw he has done basic
            things right. Suddenly I thought why don't I follow his Idead. So
            here I am.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Github
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
