<template lang="pug">

  v-container
    p payload: {{payload}}
    p user: {{user}}
    v-btn( @click.prevent="logout") logout

</template>

<script>
import {
  mapState,
  // mapGetters,
  mapActions
} from 'vuex';
export default {
  name: 'home',
  components: {},
  computed: {
    ...mapState('auth', { payload: 'payload', user: 'user' })
    // ...mapGetters('users', { user: 'current' })
  },
  methods: {
    ...mapActions({
      actionsAuthLogout: 'auth/logout'
    }),
    async logout() {
      try {
        await this.actionsAuthLogout();
        this.$router.push('/login');
      } catch (error) {
        console.error('error:', error);
      }
    }
  },
  created() {
    this.$FeathersVuex;

    this.$store;
  }
};
</script>

