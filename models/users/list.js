module.exports = (knex, User) => {
  return async () => {
    const users = await knex.select().table("users");
    const people = users.map((user) => new User(user));
    return Promise.resolve(people); // fix me!
  };
};
