import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Lessons extends BaseSchema {
  protected tableName = 'lessons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string("description");
      table.string("price");
      // i will use preloading not relations
      table.integer("classroom_id");
      table.integer("course_id");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
