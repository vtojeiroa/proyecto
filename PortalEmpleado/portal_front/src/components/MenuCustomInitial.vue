<template>
  <div>
    <nav id="nav">
      <router-link :to="{ name: 'UserAttention' }">Atención al usuario</router-link>
      <router-link v-show="loggedIn()" :to="{ name: 'About' }">Sobre mí</router-link>
    </nav>
    <section id="header">
      <img src="../assets/Logo.jpg" alt="Logo del portal" />
      <h1>PORTAL DEL EMPLEADO</h1>
    </section>
  </div>
</template>

<script>
import { isLoggedIn } from "../api/utils";
export default {
  name: "MenuCustomInitial",
  data() {
    return {};
  },
  methods: {
    // ESTA LOGADO??

    loggedIn() {
      return isLoggedIn();
    }
  }
};
</script>

<style scoped>
section#header {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

section#header h1 {
  color: #142850;
  font-weight: 900;
  font-size: 2.25rem;
  text-align: center;
  padding: 1rem;
}
nav#nav {
  font-family: "Noto Sans KR", sans-serif;
  padding: 1rem;
  display: flex;
  text-align: end;
  margin: 0 1rem;
}

#nav a {
  font-weight: 900;
  font-size: 1rem;
  color: rgb(18, 50, 109);
  margin: 0 0.5rem;
  text-decoration: none;
}
#nav a:hover {
  color: #00909e;
}

#nav a.router-link-exact-active {
  color: #00909e;
}
img {
  width: 50px;
  border-radius: 10px;
}

p {
  font-weight: bolder;
  color: whitesmoke;
  margin: 0;
  padding: 0;
}
@media (min-width: 500px) {
  section#header h1 {
    font-size: 3.5rem;
  }
  img {
    width: 70px;
  }
}
</style>
