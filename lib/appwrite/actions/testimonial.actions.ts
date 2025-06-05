"use server";
import { ID } from "node-appwrite";
import { appwriteConfig } from "../config";

import { createAdminClient } from "@/lib/appwrite";

export const createTestimonial = async ({
  userId,
  name,
  avatar,
  message,
  stars,
}: {
  userId: string;
  name: string;
  avatar: string;
  message: string;
  stars: number;
}) => {
  const { databases } = await createAdminClient();

  return await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.testimonialsCollectionId,
    ID.unique(),
    {
      userId,
      name,
      avatar,
      message,
      stars,
    }
  );
};

export const getTestimonials = async () => {
  const { databases } = await createAdminClient();
  return await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.testimonialsCollectionId
  );
};
