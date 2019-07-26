module.exports = (knex, ChannelMessage) => {
  return (params) => {
    if (params === undefined) {
      return Promise.reject(
        new Error(
          "Channel message must be provided, and be at least two characters"
        )
      );
    }
    const { fromId, channelId, message } = params;

    return knex("channel_messages")
      .insert({
        channel_id: channelId,
        from_id: fromId,
        message,
      })
      .then(() => {
        return knex
          .from("channel_messages")
          .join("channels", "channel_messages.channel_id", "channels.id")
          .join("users", "channel_messages.from_id", "users.id")
          .select();
      })
      .then((channelMessages) => {
        const channelMessageArray = channelMessages.map((channelMessage) => {
          channelMessage.to = channelMessage.name;
          channelMessage.from = channelMessage.username;
          return channelMessage;
        });

        const newMessages = new ChannelMessage(channelMessageArray.pop());
        return [newMessages];
      })
      .catch((err) => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That username already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
