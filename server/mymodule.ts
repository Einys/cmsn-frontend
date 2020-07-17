let Snbot = require('snbot');
if (process.env.SNBOT_LOCAL && process.env.SNBOT_LOCAL !== '0' && process.env.SNBOT_LOCAL_ENABLED && process.env.SNBOT_LOCAL_ENABLED !== '0') {
  console.log('[server] snbot local', process.env.SNBOT_LOCAL);
  Snbot = require(process.env.SNBOT_LOCAL); // '../../snbot/dist'
} else {
  console.log('[server] snbot npm');
}

export default Snbot
