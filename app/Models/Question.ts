import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import Assessment from './Assessment';

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public title: string;

  @column()
  public answer: string;

  // Relationship
  @column()
  public assessmentId: number;

  @belongsTo(() => Assessment)
  public assessment: BelongsTo<typeof Assessment>;
}
