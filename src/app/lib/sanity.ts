import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ne6u4ms8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
