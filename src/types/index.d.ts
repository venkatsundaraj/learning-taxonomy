export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface MainNavItem {
  title: string;
  href: string;
  disabled?: boolean;
}
