<template>
  <div>
    <v-navigation-drawer clipped fixed v-model="drawer" app>
      <v-flex class="nav-user-info">
        <v-flex xs12 text-xs-center py-3>
          <v-avatar size="80" class="nav-profile-img">
            <img :src="user.image" alt="avatar">
          </v-avatar>
        </v-flex>
        <v-flex display-1 text-truncate py-1 text-xs-center>{{user.first_name}} {{user.last_name}}</v-flex>
        <v-flex subheading text-truncate py-3 text-xs-center>
          <v-flex py-2>Following {{followings}}</v-flex>
          <v-flex py-2>Followers {{followers}}</v-flex>
        </v-flex>
      </v-flex>
      <v-list class="pb-3 pt-0" dense>
        <router-link to="/home" class="nav-text-link py-2 d-block">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon medium>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title display-1>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/profile" class="nav-text-link py-2 d-block">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon medium>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title display-1>Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
      <v-flex text-xs-center>
        <v-btn round color="red darken-1" class="white--text" @click="logout">
          Logout
          <v-icon right dark>lock</v-icon>
        </v-btn>
      </v-flex>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <div class="display-1">
          <span class="display-2 px-2 py-1 B-logo">B</span>INZO
        </div>
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      drawer: true,
      user: "",
      followings: 0,
      followers: 0
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    logout() {
      this.$cookies.remove("Utoken");
      this.$router.push("/login");
    },
    getUserInfo() {
      let token = this.$cookies.get("Utoken");
      this.$http
        .get("http://localhost/binzo/backend/apis/user/getUserInfo.php", {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(response => {
          this.user = response.data.user;
          this.followings = response.data.statistics.followings;
          this.followers = response.data.statistics.followers;
        })
        .catch(error => {});
    }
  }
};
</script>
<style>
.router-link-active {
  background-color: #6d6c6c;
}
.nav-text-link {
  color: white;
  text-decoration: none;
}
.nav-profile-img {
  box-shadow: 0px 1px 2px 2px #0000005e;
}
.nav-user-info {
  background-color: #212121;
}
.B-logo {
  background-color: #ffa726;
  border-radius: 10px;
}
</style>