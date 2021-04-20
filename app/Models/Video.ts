import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import { belongsTo } from '@ioc:Adonis/Lucid/Orm';
import Lesson from 'App/Models/Lesson';
export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public link: string;

  @column.dateTime()
  public duration: DateTime;

  // Relationships
  @column()
  public lessonId: number;
  
  @belongsTo(() => Lesson)
  public lesson: BelongsTo<typeof Lesson>;
}
