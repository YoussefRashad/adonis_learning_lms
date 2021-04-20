import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Videos extends BaseSchema {
  protected tableName = 'videos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamps(true);
      table.string("link");
      table.dateTime("duration").defaultTo("2021-04-19T00:54:35.451+02:00");
      // i will use preloading not relations
      table.integer("lesson_id");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
