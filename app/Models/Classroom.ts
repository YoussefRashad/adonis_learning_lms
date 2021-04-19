import { DateTime } from "luxon";
import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import Lesson from './Lesson';
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

  @hasMany(()=> Lesson)
  public lessons: HasMany<typeof Lesson>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
