import Discord = require("discord.js");
import Voice = require("@discordjs/voice");

type Bot = {
  client: Discord.Client;
  audio: Discord.Collection<string, AudioSettings>;
  prefix: string;
  owners: Array<string>;
  events: Discord.Collection<any, any>;
  commands: Discord.Collection<any, any>;
  slashCommands: Discord.Collection<any, any>;
};

type Event = {
  name: string;
  run: CallableFunction;
};

type Command = {
  name: string;
  category: string;
  permissions: any;
  alias: Array<string>;
  description: string;
  example: string;
  devOnly: boolean;
  permissions: any;
  run: CallableFunction;
};

type AudioSettings = {
  player: Voice.AudioPlayer;
  textChannelID: string;
  songs: Discord.Collection<any, any>;
  loopqueue: boolean;
  voiceChannel: Discord.VoiceState;
  voiceChannelID: string;
  voiceConnection?: Voice.VoiceConnection;
  subscription?: Voice.PlayerSubscription;
  disconectInterval: NodeJS.Timeout;
};

type SongData = {
  title: string;
  url: string;
  duration: string;
  thumbnail: string;
  channel: string;
};

type thumbnail = {
  url: string;
  width: number;
  height: number;
};

type ytVideo = {
  id: string;
  type: string;
  thumbnail: {
    thumbnails: Array<thumbnail>;
  };
  title: string;
  channelTitle: string;
  shortByLineText: object;
  length: {
    accessibility: object;
    simpleText: string;
  };
  isLive: boolean;
};
