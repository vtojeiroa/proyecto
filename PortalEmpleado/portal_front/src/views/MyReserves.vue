<template>
  <div class="home">
    <!-- USO HEADFUL PARA PERSONALIZAR EL NOMBRE DE LA PÁGINA -->

    <vue-headful title="Mis Reservas" description="Página que lista mis reservas" />
    <!-- VISTA DEL MENÚ -->
    <menucustom></menucustom>

    <!-- VISTA DEL MENÚLINKS -->
    <section class="links">
      <article class="links">
        <menulinks></menulinks>
        <div class="buttons">
          <router-link class="button-go" :to="{ name: 'NewReserve' }">Registrar una Reserva</router-link>
          <button
            id="buttonText"
            type="submit"
            class="button-go"
            @click="
              openAll();
              changeButtonText();
            "
          >{{ buttonText }}</button>
        </div>
      </article>
    </section>
    <!--  ANIMACIÓN DE CSS CARGANDO -->

    <div v-show="loading" class="lds-ripple">
      <div></div>
      <div></div>
    </div>

    <main id="container">
      <!--LISTAR TODAS LAS RESERVAS-->
      <section id="content" v-show="seeAllReserves">
        <h1>TODAS LAS RESERVAS</h1>
        <h2>
          Aquí puedes ver todas las reservas que se han registrado en el
          Portal
        </h2>

        <article id="searchallreserves">
          <h3>Buscador</h3>
          <div class="buttons">
            <input type="submit" class="button-back" value="Cerrar" @click="allreservesearch=false" />
            <input
              type="submit"
              class="button-go"
              value="Abrir"
              @click="allreservesearch=true ; getHeadquarters();getTypeReserves()"
            />
          </div>
        </article>
        <article class="search-input" v-show="allreservesearch">
          <h3>
            Puedes usar los filtros para buscar entre todas las reservas
            registradas
          </h3>
          <fieldset class="form">
            <form class="formsearchall">
              <ul class="searchall">
                <li class="searchall">
                  <label for="typeAll">Tipo de reserva:</label>
                  <select id="typeAll" name="typeAll" v-model="typeAll">
                    <option value>Selecciona...</option>
                    <option
                      placeholder="Nombre del servicio"
                      v-for="typereserve in typereserves"
                      :key="typereserve.id"
                      :value="typereserve.tipo"
                    >{{typereserve.tipo}}</option>
                  </select>
                </li>
                <li class="headquarter">
                  <label class="headquarter" for="headquarter">Sede :</label>
                  <select name="headquarter" id="headquarter" v-model="headquarterAll">
                    <option value>Selecciona...</option>
                    <option
                      placeholder="Nombre del servicio"
                      v-for="headquarter in headquarters"
                      :key="headquarter.id"
                      :value="headquarter.nombre"
                    >{{headquarter.nombre}}</option>
                  </select>
                </li>
                <h3>Intervalo de fechas de inicio de la reserva</h3>
                <li>
                  <label for="from">Fecha inicial &#62;&#61;</label>
                  <input type="datetime-local" id="fromAll" name="fromAll" v-model="dateInitAll" />
                </li>
                <li>
                  <label for="to">Fecha final &#60;</label>
                  <input type="datetime-local" id="toAll" name="toAll" v-model="dateEndAll" />
                </li>
              </ul>
            </form>
            <div class="buttons">
              <input type="submit" class="button-back" value="Reiniciar" @click="emptyFieldsAll()" />
              <input
                type="submit"
                class="button-go"
                value="Consultar"
                @click="
                  getReservesAll(
                    typeAll,
                    headquarterAll,
                    dateInitAll,
                    dateEndAll
                  )
                "
              />
            </div>
            <!--             <div class="buttons">
              <input type="submit" class="button-back" value="Cerrar" @click="openAll() " />
            </div>-->
          </fieldset>
        </article>
        <h1 class="title">Todas las Reservas</h1>
        <listallreserves :allreserves="allreserves"></listallreserves>
      </section>
      <section id="content" v-show="seeMyReserves">
        <!-- IMPLEMENTACIÓN DEL BUSCADOR DE MIS RESERVAS -->

        <h1>MIS RESERVAS</h1>
        <h2>
          Aquí puedes gestionar las reservas que tienes registradas en el
          Portal
        </h2>
        <article id="searchmyreserves">
          <h3>Buscador</h3>
          <div class="buttons">
            <input type="submit" class="button-back" value="Cerrar" @click="myreservesearch=false" />
            <input
              type="submit"
              class="button-go"
              value="Abrir"
              @click="myreservesearch=true ;getTypeReserves()"
            />
          </div>
        </article>
        <article class="search-input" v-show="myreservesearch">
          <h3>
            Puedes usar los filtros para buscar entre todas tus reservas
            registradas
          </h3>
          <fieldset class="form">
            <form class="formsearchmy">
              <ul class="search">
                <li class="search">
                  <label for="type">Tipo de reserva:</label>
                  <select id="type" name="type" v-model="type">
                    <option value>Selecciona...</option>
                    <option
                      placeholder="Nombre del servicio"
                      v-for="typereserve in typereserves"
                      :key="typereserve.id"
                      :value="typereserve.tipo"
                    >{{typereserve.tipo}}</option>
                  </select>
                </li>
                <li>
                  <label for="to">Fecha inicio de reserva &#62;&#61;:</label>
                  <input type="datetime-local" id="until" name="until" v-model="dateEndReserve" />
                </li>
                <h3>Intervalo de fechas de registro de la reserva</h3>
                <li>
                  <label for="from">Fecha inicial &#62;&#61;</label>
                  <input type="datetime-local" id="from" name="from" v-model="dateInit" />
                </li>
                <li>
                  <label for="to">Fecha final &#60;</label>
                  <input type="datetime-local" id="to" name="to" v-model="dateEnd" />
                </li>
              </ul>
            </form>
            <div class="buttons">
              <input type="submit" class="button-back" value="Reiniciar" @click="emptyFields()" />
              <input
                type="submit"
                class="button-go"
                value="Consultar"
                @click="getReserves(type, dateEndReserve, dateInit, dateEnd)"
              />
            </div>
            <p class="code">
              Si tienes el código de la reserva, pulsa
              <input
                type="submit"
                class="button-go"
                value="Aquí"
                @click="openModalSearch()"
              />
            </p>
          </fieldset>
        </article>
        <article class="search-data">
          <h1 class="title">Mis reservas</h1>

          <!-- VISTA DE LAS RESERVAS -->
          <listmyreserves
            :myreserves="filteredReserves"
            :rating="rating"
            :seeReserves="seeReserves"
            :seeVote="seeVote"
            :voteDescription="voteDescription"
            :date="date"
            v-on:edited="openModal"
            v-on:edit="updateReserve"
            v-on:delete="deleteReserves"
            v-on:showvote="showVoteView"
            v-on:closevote="closeVoteView"
            v-on:vote="voteReserve"
          ></listmyreserves>
        </article>
      </section>

      <!-- MODAL PARA EDITAR LA RESERVA -->
      <div class="modal" v-show="modal">
        <div class="modalBox">
          <h2>Puedes actualizar el motivo de la reserva</h2>
          <fieldset>
            <label for="newDescription">Comentario:</label>
            <input
              class="descriptionText"
              type="text"
              v-model="newDescription"
              placeholder="Introduce el nuevo comentario"
            />
          </fieldset>
          <div class="buttons">
            <input class="button-back" value="Cerrar" @click="closeModal()" />
            <input class="button-go" value="Actualizar" @click="updateReserve()" />
          </div>
        </div>
      </div>
      <!-- MODAL PARA BUSCAR UNA INCIDENCIA POR EL CÓDIGO -->
      <div class="modal" v-show="modalSearch">
        <div class="modalBox">
          <h2>Introduce el código que has recibido por correo electrónico</h2>
          <fieldset>
            <label for="search">Código:</label>
            <input v-model="search" class="text" type="text" placeholder="Introduce el código" />
          </fieldset>
          <div class="buttons">
            <input class="button-back" value="Cerrar" @click="closeModalSearch()" />
            <input class="button-go" value="Reiniciar" @click="search = ''" />
          </div>
        </div>
      </div>
    </main>
    <!-- VISTA DEL FOOTER -->
    <footercustom></footercustom>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

//IMPORTO EL MENU
import menucustom from "../components/MenuCustom.vue";
//IMPORTO EL MENULINKS
import menulinks from "../components/MenuLinks.vue";
//IMPORTO EL FOOTER
import footercustom from "../components/FooterCustom.vue";

//IMPORTO LA LISTA DE RESERVAS
import listmyreserves from "../components/ListMyReserves.vue";

//IMPORTO LA LISTA DE TODAS LAS RESERVAS
import listallreserves from "../components/ListAllReserves.vue";

//IMPORTO SWAL
import Swal from "sweetalert2";

import { getAuthToken, formatDateToBD } from "../api/utils";

export default {
  name: "MyReserves",
  components: {
    menucustom,
    menulinks,
    footercustom,
    listmyreserves,
    listallreserves
  },
  data() {
    return {
      //ARRAY DE LAS RESERVAS DE LA BBDD
      myreserves: [],
      allreserves: [],
      modal: false,
      modalSearch: false,
      date: "",
      loading: true,
      seeVote: false,
      seeReserves: true,
      voteDescription: "",
      myreserve: {},
      indexReserve: {},
      rating: {},
      id: "",
      newDescription: "",
      type: "",
      dateEndReserve: "",
      dateInit: "",
      dateEnd: "",
      vote: "",
      search: "",
      typeAll: "",
      headquarterAll: "",
      dateInitAll: "",
      dateEndAll: "",
      seeMyReserves: true,
      seeAllReserves: false,
      buttonText: "Ver todas las reservas",
      myreservesearch: false,
      allreservesearch: false,
      headquarters: [],
      typereserves: []
    };
  },
  methods: {
    //FUNCIÓN PARA CARGAR LAS RESERVAS
    getReserves() {
      const token = getAuthToken();
      const data = localStorage.getItem("id");
      let self = this;
      axios
        .get("http://localhost:3000/reserves/list", {
          headers: {
            authorization: `Bearer ${token}`
          },
          params: {
            type: this.type,
            dateEndReserve: this.dateEndReserve,
            date_init: this.dateInit,
            date_end: this.dateEnd
          }
        })
        //SI SALE BIEN
        .then(function(response) {
          self.myreserves = response.data.data;
          self.date = response.data.date;
        })
        //SI SALE MAL
        .catch(error =>
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 2500
          })
        );
    },

    showEditText(index) {
      this.id = this.myreserves[index].id;

      this.newDescription = this.myreserves[index].motivo_reserva;
    },

    //FUNCION PARA ACTUALIZAR UNA RESERVA
    updateReserve() {
      const token = getAuthToken();
      const id = this.myreserve.id;
      let self = this;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      axios
        .put("http://localhost:3000/reserves/" + id, {
          description: self.newDescription
        })
        //SI SALE BIEN
        .then(function(response) {
          //MOSTRAR UN MENSAJE CON EL RESULTADO
          Swal.fire({
            icon: "success",
            title: `Acabas de actualizar el motivo de la reserva `,

            showConfirmButton: false,
            timer: 2500
          }).then(
            //recarga la página
            result => {
              self.closeModal();
              self.getReserves();
            }
          );
        })
        //SI SALE MAL
        .catch(error =>
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 2500
          })
        );
    },
    //  ABRE EL MODAL PARA EDITAR LOS DATOS DE LA RESERVA
    openModal(index) {
      this.myreserve = this.myreserves[index];
      this.modal = true;
      this.showEditText(index);
    },
    // CIERRA EL MODAL DESPUES DE EDITAR LOS DATOS DE LA RESERVA
    closeModal() {
      this.modal = false;
    },

    //  ABRE EL MODAL PARA BUSCAR UNA RESERVA POR EL CÓDIGO
    openModalSearch() {
      this.modalSearch = true;
    },
    // CIERRA EL MODAL DESPUES DE BUSCAR LA RESERVA POR EL CÓDIGO
    closeModalSearch() {
      this.modalSearch = false;
      this.getReserves();
    },
    //FUNCION PARA ELIMINAR UNA RESERVA DE LA BBDD
    deleteReserves(data) {
      const token = getAuthToken();
      let self = this;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás deshacerlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, bórralo!"
      }).then(result => {
        if (result.value) {
          axios
            .delete("http://localhost:3000/reserves/" + data)

            //  SI SALE BIEN
            .then(function(response) {
              //MOSTRAR UN MENSAJE CON EL RESULTADO
              Swal.fire({
                icon: "success",
                title: `Acabas de borrar la reserva `,
                showConfirmButton: false,
                timer: 2500
              }).then(result => {
                self.getReserves();
              });
            })
            //SI SALE MAL
            .catch(error =>
              Swal.fire({
                icon: "error",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 2500
              })
            );
        }
      });
    },

    getReservesAll(typeAll, headquarterAll, dateInitAll, dateEndAll) {
      const token = getAuthToken();

      let self = this;
      axios
        .get("http://localhost:3000/reserves", {
          headers: {
            authorization: `Bearer ${token}`
          },
          params: {
            type: this.typeAll,
            headquarter: this.headquarterAll,
            date_init: this.dateInitAll,
            date_end: this.dateEndAll
          }
        })
        //SI SALE BIEN
        .then(function(response) {
          self.allreserves = response.data.data;
        })
        //SI SALE MAL
        .catch(error =>
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 2500
          })
        );
    },
    emptyFieldsAll() {
      this.typeAll = "";
      this.headquarterAll = "";
      this.dateInitAll = "";
      this.dateEndAll = "";
      this.searchAll = "";
      this.getReservesAll();
    },

    //  CAMBIA LA VISTA PARA lISTAR TODAS LAS RESERVAS
    openAll() {
      this.seeMyReserves = !this.seeMyReserves;
      this.seeAllReserves = !this.seeAllReserves;
      this.getReservesAll();
    },

    changeButtonText() {
      let buttonText = document.getElementById("buttonText");
      if (buttonText.textContent == "Ver mis reservas")
        buttonText.textContent = "Ver todas las reservas";
      else buttonText.textContent = "Ver mis reservas";
    },

    //FUNCIÓN PARA VOTAR LAS RESERVAS
    voteReserve(myreserve, voteDescription, rating) {
      const token = getAuthToken();
      const userId = localStorage.getItem("id");
      const id = myreserve.id;
      let self = this;
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      axios
        .post(`http://localhost:3000/reserves/${id}/vote`, {
          vote: rating,
          description: voteDescription
        })
        //SI SALE BIEN
        .then(function(response) {
          //MOSTRAR UN MENSAJE CON EL RESULTADO
          Swal.fire({
            icon: "success",
            title: `Valoración realizada con éxito. Muchas gracias!!. Vuestras opiniones nos ayudan a mejorar el Portal. `,
            showConfirmButton: false,
            timer: 2500
          }).then(
            //recarga la página
            result => {
              self.search = "";
              self.closeVoteView();
              self.getReserves();
            }
          );
        })
        //SI SALE MAL
        .catch(error =>
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 2500
          })
        );
      this.getReserves();
    },
    //FUNCIÓN PARA CARGAR LAS SEDES
    getHeadquarters() {
      const token = getAuthToken();
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      let self = this;
      axios
        .get("http://localhost:3000/headquarters")
        //SI SALE BIEN
        .then(function(response) {
          self.headquarters = response.data.data;
        })
        //SI SALE MAL
        .catch(error =>
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 2500
          })
        );
    },
    //FUNCIÓN PARA CARGAR LOS TIPOS DE RESERVAS
    getTypeReserves() {
      const token = getAuthToken();
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      let self = this;
      axios
        .get("http://localhost:3000/reserves/type")
        //SI SALE BIEN
        .then(function(response) {
          self.typereserves = response.data.data.data;
        })
        //SI SALE MAL
        .catch(error =>
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 2500
          })
        );
    },

    emptyFields() {
      this.type = "";
      this.dateEndReserve = "";
      this.dateInit = "";
      this.dateEnd = "";
      this.search = "";
      this.getReserves();
    },
    showVoteView() {
      this.seeVote = true;
      this.seeReserves = false;
    },
    closeVoteView() {
      this.seeVote = false;
      this.seeReserves = true;
    }
  },
  created() {
    this.getReserves();
    this.loading = false;
  },
  computed: {
    filteredReserves() {
      let result = this.myreserves;

      if (!this.search) {
        return result;
      } else {
        result = result.filter(
          myreserve =>
            myreserve.codigo_reserva === parseInt(this.search) ||
            myreserve.codigo_reserva
              .toLowerCase()
              .includes(this.search.toLowerCase())
        );
        if (!result.length) {
          Swal.fire({
            title: "El código introducido no corresponde a ninguna reserva",
            text: "Vuelve a intentarlo",
            showConfirmButton: false,
            timer: 2500
          });
        }
        return result;
      }
    }
  }
};
</script>
<style scoped>
.lds-ripple {
  display: inline-block;
  align-self: center;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}

section article.links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
section article.links a,
section article.links input,
section article.links button {
  background: #142850;
  color: #dae1e7;
  font-size: 0.75rem;
  font-weight: 900;
  padding: 0.75rem;
  line-height: 15px;
  border-radius: 50px;
  cursor: pointer;
  width: 150px;
  border: none;
  border: 2px solid #142850;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
}

main#container {
  background: #fff;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  box-shadow: 0 0 4px 0 #d4d4d4;
  box-sizing: border-box;
  margin: 30px auto;
  padding: 15px 30px;
  width: 95%;
  max-width: 900px;
  border-radius: 10px;
  padding-bottom: 81px;
}
main section#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
main section article#searchallreserves,
main section article#searchmyreserves,
main section article.search-input {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
}
form.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
ul li {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;

  align-items: center;
  padding: 0.2rem 0;
}

fieldset.form {
  border: none;
  border-bottom: 3px solid #142850;
  width: 90%;
  padding: 1rem;
  border-radius: 0px;
}
input.button-go {
  margin-top: 3px;
  padding: 0.75px;
  vertical-align: middle;
}
h2 {
  padding: 1rem 0;
  text-align: center;
}
h3 {
  padding: 1rem 0;
  text-align: center;
}
.modalBox fieldset {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  border: none;
}

.modalBox input.button-go,
.modalBox input.button-back,
input.button-go {
  min-width: 110px;
  text-align: center;
}
.modal input.descriptionText {
  width: 400px;
  text-align: left;
}
h1 {
  text-align: center;
  font-size: 2rem;
  padding: 0.5rem 0;
}
p.code {
  text-align: center;
}
article#searchmyreserves,
article#searchallreserves {
  border: 2px solid #142850;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

article#searchmyreserves div.buttons input,
article#searchallreserves div.buttons input {
  padding: 4px;
  vertical-align: middle;
}
</style>
