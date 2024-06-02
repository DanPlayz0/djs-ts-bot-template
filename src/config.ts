import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

function requiredEnv(env: string, error?: string) {
  const variable = process.env[env];
  if (!variable) throw !error ? `Environment variable "${env}" is required.` : error;
  return variable;
}
function optionalEnv(env: string, defaultValue: string) {
  return process.env[env] || defaultValue;
}

const configuration = {
  token: requiredEnv('DISCORD_BOT_TOKEN'),
  mongodb_uri: requiredEnv('MONGODB_URI'),
  mainGuildId: optionalEnv('MAIN_GUILD_ID', 'some default env value here'),
}

export default configuration;