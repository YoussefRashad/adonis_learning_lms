import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Assessments extends BaseSchema {
  protected tableName = 'assessments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamps(true);
      table.integer("max_grade");
      // i will use preloading not relations
      table.integer('lesson_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
