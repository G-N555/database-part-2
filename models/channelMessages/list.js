module.exports = (knex, ChannelMessage) => {
  return async (params) => {
    const allMessages = await knex
      .from("channel_messages")
      .where({ channel_id: params.channelId })
      .join("channels", "channel_messages.channel_id", "channels.id")
      .join("users", "channel_messages.from_id", "users.id")
      .select();
    allMessages.map((allMessage) => {
      allMessage.to = allMessage.name;
      allMessage.from = allMessage.username;
      return allMessage;
    });
    const newMessages = allMessages.map(
      (message) => new ChannelMessage(message)
    );
    return Promise.resolve(newMessages); // fix me!
  };
};
