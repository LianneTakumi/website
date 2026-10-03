import { prisma } from "../lib/prisma";
import type { UpdateProfileInput } from "../validators/profile.validator";

export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function updateUserProfile(
  userId: string,
  input: UpdateProfileInput
) {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: input.email },
        { username: input.username },
      ],
      NOT: {
        id: userId,
      },
    },
  });

  if (existingUser) {
    if (existingUser.email === input.email) {
      throw new Error("Email is already registered");
    }

    throw new Error("Username is already taken");
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      username: input.username,
      email: input.email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
    },
  });

  return user;
}