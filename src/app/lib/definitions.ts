export interface User {
  id: string;
  name: string | undefined;
  email: string | undefined;
  githubId: string;
  avatar: string | undefined;
}

export type LiveblockUser = {
  name: string;
  color: string;
  picture: string;
};
