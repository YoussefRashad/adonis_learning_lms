import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  column,
  BelongsTo,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Classroom from "./Classroom";
import Course from "./Course";

export default class Teacher extends BaseModel {
  @column()
  public university: string;

  @column()
  public grad_year: string;

  @column()
  public userId;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => Classroom)
  public classrooms: HasMany<typeof Classroom>;

  // @manyToMany(() => Course)
  // public courses: ManyToMany<typeof Course>;
}
