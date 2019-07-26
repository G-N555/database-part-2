module.exports = (knex, UserMessage) => {
  return async (params) => {
    return knex("user_messages")
      .whereIn("from_id", [params.fromId, params.toId])
      .join("users", "user_messages.from_id", "users.id")
      .then((messages) => {
        console.log(messages);
        const edited = messages.map((allMessage) => {
          allMessage.from = allMessage.username;
          return allMessage;
        });
        const newMessages = edited.map((message) => new UserMessage(message));
        console.log("NEWMESSAGES", newMessages);
        return newMessages;
      });

    //return Promise.resolve(newMessages); // fix me!
  };
};
