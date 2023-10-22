import UserImported from "../entities/User";

type UserType = InstanceType<typeof UserImported>;

export const arrayUsers: Array<UserType> = [];
