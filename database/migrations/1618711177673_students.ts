import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Students extends BaseSchema {
  protected tableName = 'students'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer('ssn');
      table.string("edu_type");
      table.string("address");
      table.timestamps(true);
      
      table
        .integer("user_id")
        .unsigned()
        .unique()
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
