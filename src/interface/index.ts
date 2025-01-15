export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  role: string;
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
