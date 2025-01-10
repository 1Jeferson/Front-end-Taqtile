export interface IUser {
  id: string;
  name: string;
  email: string;
}
export interface IListUsers {
  users: {
    nodes: IUser[];
  };
}
