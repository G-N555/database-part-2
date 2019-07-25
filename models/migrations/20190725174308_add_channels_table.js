exports.up = function(knex, Promise) {
  knex.schema.createTable("channels", (t) => {
    t.increments().index();
    t.string("name")
      .unique()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {};
