import { File, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Data Transfer Object
export type CreateFileDTO = Pick<File, "name" | "path" | "size">;

export const saveFile = async (data: CreateFileDTO): Promise<File> => {
  const newFile = await prisma.file.create({ data });
  return newFile;
};

export const getFiles = async (): Promise<File[]> => {
  const files = await prisma.file.findMany();
  return files;
};
