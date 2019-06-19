<template>
  <div id="app">
    <div class="container">
      <LoginMask @connect="connect" :connected=connected />
      <Chat :connected=connected @sendMessage="(event) => {sendMessage(event)}" :messages=messages @usertyping="sendTypingEvent" :usertyping=usertyping :currentTypingUser=currentTypingUser :username=username />
    </div>
  </div>
</template>

<script>
import LoginMask from './components/LoginMask.vue';
import Chat from './components/Chat.vue';

export default {
  name: 'app',
  components: {
    LoginMask,
    Chat
  },
  data() {
    return {
      socket: '',
      connected: false,
      messages: [],
      username: '', 
      usertyping: false,
      currentTypingUser: '',  
    }
  },
  methods: {
    connect: function(username) {
      const vm = this;
      vm.username = username;
      vm.socket = /8080/.test(window.location.port) ? io.connect('localhost:6006') : io();
      if (typeof vm.socket == 'object') {
        vm.connected = true
        vm.bindSocketEvents();
      }
    },
    sendMessage: function(message) {
      const vm = this;
      this.socket.emit('message', {
        username: vm.username,
        message: message,
      })
    },
    sendTypingEvent: function() {
      const vm = this;
      this.socket.emit('usertyping', {username: vm.username});
    },
    bindSocketEvents: function() {
      const vm = this;
      let timeout = '';

      vm.socket.on('message', function(data) {
        vm.messages.push(data);
      })

      vm.socket.on('usertyping', function(data) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          vm.usertyping = false;
        }, 1000)
        vm.usertyping = true;
        vm.currentTypingUser = data.username;
        
      })
    }
  }
};
</script>

<style lang="scss">
:root {
  --yellow: #faff00;
  --black: #333;
  --grey: grey;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background-color: var(--black);
  color: var(--yellow);
}

.container {
  max-width: 768px;
  margin: 0 auto;
  padding: 0 24px;
}
</style>
