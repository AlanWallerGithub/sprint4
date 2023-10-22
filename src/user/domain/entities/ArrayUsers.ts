
import UserImported from "../entities/User";

type UserType = InstanceType<typeof UserImported>
  
interface User {
    
    name: UserType["name"];
  }

export let arrayUsers: Array<UserType> = []