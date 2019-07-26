exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments().index();

    t.integer("channel_id")
      .notNullable()
      .references("id")
      .inTable("channels")
      .onDelete("CASCADE");

    t.integer("from_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    t.text("message").notNullable();

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("channel_messages");
};
