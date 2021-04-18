import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Teachers extends BaseSchema {
  protected tableName = 'teachers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("university");
      table.integer("grad_year");
      table.timestamps(true);

      table
        .integer("user_id")
        .unique()
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
