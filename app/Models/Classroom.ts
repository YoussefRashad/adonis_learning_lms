import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Classroom extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public teacherId: number;

  @column()
  public name: string;

  @column()
  public title: string;

  @column()
  public needAdmission: boolean;

  @column()
  public level: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
