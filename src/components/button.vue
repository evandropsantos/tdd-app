<template>
  <button :class="setClass"></button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    setClass() {
      return {
        button: true,
        'button--active': this.type === 'active',
      };
    },
  },
};
</script>

<style>

</style>
