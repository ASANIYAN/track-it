import { jwtVerify, SignJWT } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export const getJWTSecretKey = () => {
  const secret = process.env.JWT_TOKEN_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_TOKEN_SECRET is not set.");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJWTSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Your token has expired.");
  }
};
