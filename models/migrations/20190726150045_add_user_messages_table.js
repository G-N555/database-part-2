exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("user_messages", (t) => {
    t.increments().index();

    t.integer("from_id")
      .notNullable()
      .references("id")
      .inTable("users");

    t.integer("to_id")
      .notNullable()
      .references("id")
      .inTable("users");

    t.text("message").notNullable();

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("user_messages");
};
