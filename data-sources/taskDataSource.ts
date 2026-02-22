import { OrmBaseConfig } from "../shared/db/baseConfig.ts";

class TaskDataSource extends OrmBaseConfig{
  constructor(){
     super("DB_URL_Task", "Task",import.meta.url);
  }
}

export default new TaskDataSource()