import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classrooms extends BaseSchema {
  protected tableName = 'classrooms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary().notNullable();
      table.timestamps(true);
      table.string("name");
      table.string("title");
      table.boolean("need_admission");
      table.integer("level");

      table
        .integer("teacher_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("teachers");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
