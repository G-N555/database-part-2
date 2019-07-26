module.exports = (knex, Channel) => {
  return async () => {
    const channels = await knex.select().table("channels");
    const newChannels = channels.map((channel) => new Channel(channel));
    return Promise.resolve(newChannels); // fix me!
  };
};
