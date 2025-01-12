export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IListUsers {
  users: {
    nodes: IUser[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      limit: number;
      offset: number;
    };
    count: number;
  };
}
