import Vue from 'vue'
import axios from 'axios'

Vue.config.productionTip = false

Vue.config.errorHandler = (err, vm, info) => {
  console.log('error Handler')
  console.log({message : err.message, stack: err.stack})
  console.log( process.env.SERVER_URL )
  console.log('vm',vm)
  console.log('info',info)

  axios.post('/1.0/data/error/', {message : err.message, stack: err.stack} )


  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.

  // TODO: Perform any custom logic or log to server

};
