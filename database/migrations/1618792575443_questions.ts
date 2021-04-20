import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamps(true);
      table.string('title')
      // type
      table.string('answer')
      // i will use preloading not relations
      table.integer("assessment_id");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
