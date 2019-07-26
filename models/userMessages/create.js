module.exports = (knex, UserMessage) => {
  return async (params) => {
    if (params === undefined) {
      return Promise.reject(
        new Error(
          "Channel message must be provided, and be at least two characters"
        )
      );
    }
    return knex("user_messages")
      .insert({
        from_id: params.fromId,
        to_id: params.toId,
        message: params.message,
      })
      .then(() => {
        return knex
          .from("user_messages")
          .join("users", "user_messages.from_id", "users.id")
          .select();
      })
      .then((message) => {
        message[0].from = message[0].username;
        const newMessage = new UserMessage(message.pop());
        return [newMessage];
      });
  };
};
