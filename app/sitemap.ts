import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.photonsecurity.in";

  const staticRoutes = [
    "",
    "/about",
    "/careers",
    "/contact",
    "/services",
    "/legal/terms",
    "/legal/privacy",
    "/legal/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...staticRoutes];
}
