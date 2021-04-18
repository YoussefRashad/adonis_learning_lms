import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Student extends BaseModel {
  @column()
  public ssn: number;

  @column()
  public edu_type: string;

  @column()
  public address: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public userId;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
