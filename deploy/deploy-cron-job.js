const deploy = require('./deploy')
const cron = require('node-cron');
 
cron.schedule('* * */5 * * *', () => {
  deploy()
});
