import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Classroom from './Classroom';
import { BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Course from './Course';

export default class Lesson extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public description: string;

  @column()
  public classroomId: number;

  @column()
  public courseId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Relationship
  @belongsTo(() => Classroom)
  public classroom: BelongsTo<typeof Classroom>;
  
  @belongsTo(() => Course)
  public course: BelongsTo<typeof Course>;
}
