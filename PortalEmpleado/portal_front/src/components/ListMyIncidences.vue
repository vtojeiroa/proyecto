<template>
  <div class="home">
    <main>
      <section>
        <div class="myincidences" v-show="seeIncidences">
          <article class="myincidences">
            <div
              class="myincidence"
              v-for="(myincidence, index) in myincidences"
              :key="myincidence.id"
            >
              <table>
                <tbody>
                  <tr>
                    <td class="text">Id incidencia:</td>
                    <td class="data">{{ myincidence.id }}</td>
                  </tr>

                  <tr>
                    <td class="text">Tipo:</td>
                    <td class="data">{{ myincidence.tipo }}</td>
                  </tr>
                  <tr>
                    <td class="text">Fecha de registro:</td>
                    <td
                      class="data"
                    >{{ new Date(myincidence.fecha_registro).toLocaleString('es-ES',{timeZone:'UTC'}) }}</td>
                  </tr>

                  <tr>
                    <td class="text">Descripción:</td>
                    <td class="data">{{ myincidence.descripcion }}</td>
                  </tr>
                  <tr v-show="myincidence.fecha_resolucion">
                    <td class="text">Fecha de resolución:</td>
                    <td class="data">
                      {{
                      new Date(myincidence.fecha_resolucion).toLocaleString('es-ES',{timeZone:'UTC'})
                      }}
                    </td>
                  </tr>
                  <tr v-show="myincidence.comentario_resolucion">
                    <td class="text">Comentario:</td>
                    <td class="data">{{ myincidence.comentario_resolucion }}</td>
                  </tr>
                  <tr v-show="myincidence.valoracion">
                    <td class="text">Valoracíon:</td>
                    <td class="data">
                      <star-rating
                        class="starsValoration"
                        :inline="true"
                        :star-size="20"
                        :read-only="true"
                        :rating="Number(myincidence.valoracion)"
                        :increment="0.01"
                        :show-rating="false"
                      ></star-rating>
                    </td>
                  </tr>
                  <tr v-show="myincidence.comentario_valoracion">
                    <td class="text">Comentario valoración:</td>
                    <td class="data">{{ myincidence.comentario_valoracion }}</td>
                  </tr>
                  <tr v-show="myincidence.fecha_registro_valoracion">
                    <td class="text">Fecha valoración:</td>
                    <td class="data">
                      {{
                      new Date(myincidence.fecha_registro_valoracion).toLocaleString('es-ES',{timeZone:'UTC'})
                      }}
                    </td>
                  </tr>
                  <tr
                    v-show="
                      myincidence.codigo_incidencia &&
                        myincidence.codigo_incidencia !== 'close' &&
                        !myincidence.valoracion
                    "
                  >
                    <td class="text">Código incidencia:</td>
                    <td class="data">{{ myincidence.codigo_incidencia }}</td>
                  </tr>
                  <div class="buttons">
                    <input
                      class="button-back"
                      @click="deleteIncidenceEvent(index)"
                      v-show="!myincidence.fecha_resolucion"
                      value="BORRAR"
                    />
                    <input
                      class="button-go"
                      @click="editIncidenceEvent(index)"
                      v-show="!myincidence.fecha_resolucion"
                      value="EDITAR"
                    />
                    <input
                      class="button-go"
                      @click="
                        seeVoteEvent(index);
                        openModalVote();
                      "
                      v-show="
                        myincidence.fecha_resolucion && !myincidence.valoracion
                      "
                      value="VALORAR"
                    />
                  </div>
                </tbody>
                <p
                  v-show="!myincidence.fecha_resolucion"
                >La incidencia está activa, puedes modificarla o borrarla.</p>
                <p
                  v-show="
                    myincidence.fecha_resolucion && !myincidence.valoracion
                  "
                >La incidencia ha sido cerrada, puedes valorarla.</p>
                <p v-show="myincidence.valoracion">Incidencia cerrada, ya has valorado esta reserva.</p>
              </table>
            </div>
          </article>
        </div>
      </section>
      <section>
        <div class="vote" v-show="seeVote">
          <div class="modal" style="overflow-y: scroll;" v-show="modalVote">
            <div class="modalBox">
              <article class="search-input">
                <h2>Valora la resolucion de esta incidencia</h2>
                <h3>Selecciona la valoración y escribe un comentario</h3>
                <div class="form">
                  <fieldset>
                    <form>
                      <ul>
                        <li class="star">
                          <!--  <label for="vote">Valoración :</label> -->

                          <star-rating
                            inactive-color="#142850"
                            @rating-selected="rating = $event"
                            :rating="rating"
                          ></star-rating>
                        </li>
                        <li>
                          <!--  <label for="description">Comentario:</label> -->
                          <textarea
                            type="text"
                            rows="10"
                            cols="40"
                            v-model="voteDescription"
                            placeholder="Introduce el comentario"
                          />
                        </li>
                      </ul>
                    </form>

                    <div class="buttons">
                      <input
                        class="button-back"
                        @click="
                          closeVoteEvent();
                          closeModalVote();

                        "
                        value="CERRAR"
                      />
                      <input
                        class="button-go"
                        @click="
                          voteIncidenceEvent(newIncidence, voteDescription);closeModalVote()"
                        value="Valorar"
                      />
                    </div>
                  </fieldset>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ListMyIncidences",
  data() {
    return {
      rating: 0,
      voteDescription: "",
      newIncidence: {},
      modalVote: false
    };
  },
  props: {
    myincidences: Array,
    seeVote: Boolean,
    seeIncidences: Boolean
  },
  methods: {
    //FUNCION QUE EMITE UN EVENTO PARA EDITAR UNA INCIDENCIA
    editIncidenceEvent(index) {
      //GUARDANDO LA INFORMACIÓN DEL INCIDENCIA SELECCIONADO
      let data = this.myincidences[index];
      //ENVIANDO LA INFORMACIÓN DEL INCIDENCIA A LA VISTA
      this.$emit("edit", data);
    },

    //FUNCION QUE EMITE UN EVENTO PARA BORRAR UNA INCIDENCIA
    deleteIncidenceEvent(index) {
      let data = this.myincidences[index].id;
      this.$emit("delete", data);
    },
    //FUNCION QUE EMITE UN EVENTO PARA VOTAR UNA INCIDENCIA
    seeVoteEvent(index) {
      this.newIncidence = this.myincidences[index];
      this.$emit("showvote");
    },

    voteIncidenceEvent(newIncidence, voteDescription, rating) {
      this.$emit("vote", newIncidence, voteDescription, this.rating);
    },
    //FUNCION QUE EMITE UN EVENTO PARA VOTAR UNA INCIDENCIA
    closeVoteEvent() {
      this.$emit("closevote");
    },
    //  ABRE EL MODAL PARA VOTAR LA INCIDENCIEA
    openModalVote() {
      this.modalVote = true;
    },
    // CIERRA EL MODAL DESPUES DE VOTAR LA INCIDENCIEA
    closeModalVote() {
      this.voteDescription = "";
      this.rating = 0;
      this.modalVote = false;
    }
  }
};
</script>
<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
}

.myincidence {
  border: 4px solid #142850;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-radius: 2%;
  min-width: 200px;
}

tbody {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 5px;
}
tr {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
td {
  padding: 0.2rem 0;
}
td.text {
  text-transform: uppercase;
  font-size: 14px;
  align-self: flex-start;
}
td.data {
  font-weight: bold;
  max-width: 300px;
  text-align: end;
}

input {
  text-align: center;
}

div.buttons {
  display: flex;
  flex-wrap: wrap;
}
ul,
.modalBox ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
li {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.modalBox fieldset {
  padding: 2rem 2rem;
  background: #dae1e7;
}
.modalBox fieldset form ul li.star {
  padding-bottom: 1rem;
}
.modalBox fieldset form ul li textarea {
  font-size: 16px;
  padding: 10px;
  max-height: 200px;
  max-width: 300px;
}

p {
  text-align: center;
}
</style>
