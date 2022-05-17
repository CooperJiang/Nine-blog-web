import SocketIO from 'socket.io-client'
import VueSocketIoExtended from 'vue-socket.io-extended'
import Vue from 'vue'
import Config from "../configs/clientConfig"

export default ({ store, env }) => {
  const url = Config.wsURL;
  const socket = SocketIO(url, {
    transports: ['websocket'],
    path: '/chat',
    reconnection: true,
    reconnectionAttempts: Infinity,
    autoConnect: false
  })
  Vue.use(VueSocketIoExtended, socket, { store })
}
