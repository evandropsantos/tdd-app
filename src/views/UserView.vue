<template>
  <div>
    <VUserSearchForm @submitted="searchUser" />
    <VUserProfile :user="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VUserSearchForm from '@/components/VUserSearchForm.vue';
import VUserProfile from '@/components/VUserProfile.vue';

export default {
  name: 'UserView',
  components: {
    VUserSearchForm,
    VUserProfile,
  },
  methods: {
    searchUser(username) {
      this.$store.dispatch('SEARCH_USER', { username });
    },
  },
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
};
</script>
