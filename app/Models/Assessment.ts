import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, HasMany, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Question from './Question';
import Lesson from 'App/Models/Lesson';

export default class Assessment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public max_grade: number;

  // Relationship

  @hasMany(() => Question)
  public questions: HasMany<typeof Question>;

  @column()
  public lessonId: number
  
  @belongsTo(()=> Lesson)
  public lesson: BelongsTo<typeof Lesson>
}
