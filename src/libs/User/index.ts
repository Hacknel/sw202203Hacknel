import { getConnection } from "@models/sqlite/SqliteConn";
import { UsersDao } from "@models/sqlite/UsersDao";
export interface IUser {
  name: string;
  email: string;
  password: string;
};
export class User {
  private dao: UsersDao;
  public constructor(){
    getConnection()
      .then(conn=>{
        this.dao = new UsersDao(conn);
      })
      .catch(ex=>console.error(ex));
  }
  // Consultas
  public getAllUsers() {
    return this.dao.getUsers()
  }
  public getUserByIndex( index:number) {
      return this.dao.getUserById({_id:index});
  }

  public addUser( user:IUser) {
    return this.dao.insertNewUser(user);
  }
  public updateUser( index:number, user:IUser){
   return this.dao.update({_id:index}, user);
  }
  public deleteUser( index:number) {
    return this.dao.deleteUser({_id:index});
  }
}
