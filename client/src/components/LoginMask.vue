<template>
  <form class="login-mask" @submit.prevent="$emit('connect', getUsername())">
    <input type="text" required placeholder="Enter your name" ref="username">
    <button type="submit" :disabled=connected>Connect</button>
  </form>
</template>

<script>
export default {
  name: 'LoginMask',
  props: {
    connected: Boolean
  },
  methods: {
    getUsername: function() {
      return this.$refs.username.value;
    }
  }
};
</script>

<style lang="scss">
.login-mask {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 32px;

  @media screen and (min-width: 768px) {
    max-width: 50%;
    margin: 0 auto 32px;
  }

  input {
    margin-bottom: 16px;
  }

  input,
  button {
    text-align: center;
    padding: 12px 16px;
    letter-spacing: 1px;
    background-color: transparent;
    border: 1px solid var(--yellow);
    color: var(--yellow);
  }

  button {
    overflow: hidden;
    position: relative;
    cursor: pointer;
    text-transform: uppercase;

    &::after {
      content: '';
      position: absolute;
      width: 15px;
      height: 100%;
      transform: rotate(30deg) scale(1.5);
      top: 0;
      left: -50px;
      transition: left 0.5s;
      z-index: 1;
      background-color: rgba(var(--yellow), 0.5);
      visibility: hidden;
    }

    &:disabled {
      color: var(--grey);
      border-color: var(--grey);
    }

    &:hover {
      &::after {
        left: 120%;
        visibility: visible;
      }
    }
  }
}
</style>
