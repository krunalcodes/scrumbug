export interface IAuthUser {
  sub: number;
}

export interface IReqWithAuthUser {
  user: IAuthUser;
}
