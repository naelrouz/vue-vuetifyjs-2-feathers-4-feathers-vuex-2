<template lang="pug">
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item v-for="item in navigationDrawerItems" :key="item.title" :to="item.to">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {},
  data: () => ({
    drawer: null,
    navigationDrawerItems: [
      { icon: 'mdi-home', title: 'home', to: '/' },
      { icon: 'mdi-account-plus', title: 'signup', to: '/signup' },
      { icon: 'mdi-account-arrow-right', title: 'login', to: '/login' }
    ]
  })
};
</script>
