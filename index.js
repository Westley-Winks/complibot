import dotenv from "dotenv/config";
import express from 'express';
import {
  DiscordRequest,
  VerifyDiscordRequest,
  getRandomCompliment,
  getRandomInsult } from './utils.js';
import {
  TEST_COMMAND,
  COMPLIMENT_COMMAND,
  INSULT_COMMAND,
  HasGuildCommands } from "./commands.js";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';

const app = express();

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  };

  /**
   * Handle slash command requests
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" guild command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'hello world',
        },
      });
    } else if (name === 'compliment') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: getRandomCompliment()
        },
      });
    } else if (name === "insult") {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: getRandomInsult()
        },
      });
    }
  }
});


app.listen(3000, () => {
  console.log('Listening on port 3000');

  // Check if guild commands from commands.js are installed (if not, install them)
  HasGuildCommands(process.env.APP_ID, process.env.GUILD_ID, [
    TEST_COMMAND,
    COMPLIMENT_COMMAND,
    INSULT_COMMAND
  ]);
});
