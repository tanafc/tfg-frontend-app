export enum Role {
  REGULAR = "regular",
  ADMIN = "admin",
}

export type Authentication = {
  username: string;
  email: string;
  role: Role;
  accessToken: string;
};
