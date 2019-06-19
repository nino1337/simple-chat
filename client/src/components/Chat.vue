<template>
  <div class="chat" :class="{ 'is-active': connected}">
    <div class="chat__typing-user">
      <span v-if="usertyping && currentTypingUser !== username">
        {{currentTypingUser}} is currently typing...
      </span>
    </div>
    <div class="chat__window">
      <div class="chat__message-wrapper" v-for="(message, index) in messages" :key=index >
        <div class="chat__username">{{message.username}}: </div>
        <div class="chat__message">{{message.message}}</div>
      </div>
    </div>
    <textarea class="chat__textarea" Placeholder="Enter your message" @keydown.enter.prevent="emitMessageEvent" @keydown="$emit('usertyping')"></textarea>
    <div class="chat__deactivated">Please connect with a name of your choice</div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  props: {
    connected: Boolean,
    messages: Array,
    usertyping: Boolean,
    currentTypingUser: String,
    username: String,
  },
  methods: {
    emitMessageEvent: function(event) {
      if (event.target.value !== '') {
        this.$emit('sendMessage', event.target.value);
        event.target.value = '';
      }
    }
  }
}
</script>

<style lang="scss">
.chat {
  width: 100%;
  border: 1px solid var(--yellow);
  height: 80vh;
  position: relative;

  &.is-active {
    .chat__deactivated {
      display: none;
    }
  }

  &__message-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  &__username {
    margin-right: 8px;
  }

  &__deactivated {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    background-color: var(--black);
    text-align: center;
  }

  &__typing-user {
    height: 10%;
    border-bottom: 1px solid var(--yellow);
    display: flex;
    padding: 16px;
    align-items: center;
    font-style: italic;
  }

  &__window {
    height: 76%;
    border-bottom: 1px solid var(--yellow);
    padding: 16px;
    overflow-y: auto;
  }

  &__textarea {
    position: absolute; 
    padding: 16px;
    bottom: 16px;
    width: 90%;
    left: 50%;
    color: var(--yellow);
    background-color: var(--black);
    border: 1px solid var(--yellow);
    border-radius: 15px;
    transform: translateX(-50%);

    &:focus {
      outline: none;
    }
  }
}
</style>