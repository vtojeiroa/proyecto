<template>
  <div>
    <!-- USO HEADFUL PARA PERSONALIZAR EL NOMBRE DE LA PÁGINA -->

    <vue-headful title="Mis datos" description="Página de datos del usuario" />
    <!-- VISTA DEL MENÚ -->
    <menucustom></menucustom>
    <!--  LINKS DATOS -->
    <section class="links">
      <article class="links">
        <menulinks></menulinks>
      </article>
    </section>
    <main id="container">
      <section id="content">
        <!--  ANIMACIÓN DE CSS CARGANDO -->

        <div v-show="loading" class="lds-ripple">
          <div></div>
          <div></div>
        </div>

        <!-- MODAL PARA EDITAR EL USUARIO -->

        <article class="content">
          <h2>Mis datos</h2>
          <!-- BOTON QUE TE ENVIA A OTRA PÁGINA PARA MODIFICAR EL EMAIL-->
          <h3 class="email">
            Si quieres cambiar el correo electrónico con el que inicias sesión,
            pulsa
            <input
              type="submit"
              value="email"
              class="button-go"
              @click="openModalEmail()"
            />
          </h3>

          <!-- IMPLEMENTACIÓN DEL MODAL PARA MODIFICAR EL EMAIL -->

          <section class="email">
            <div class="modal" v-show="modalEmail">
              <div class="modalBox">
                <h2>Cambio de correo electrónico</h2>
                <h3>
                  Por favor, introduce la nueva dirección de correo electrónico
                  con la que te gustaría acceder al Portal del Empleado a partir
                  de ahora. Te enviaremos un correo electrónico de verificación
                  a la nueva dirección para que la puedas cambiar.
                </h3>
                <p>Todos los campos marcados con * son obligatorios</p>

                <form>
                  <fieldset class="form">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <label for="email">Correo electrónico actual* :</label>
                          </td>
                          <td>
                            <input id="email" name="email" type="email" v-model="oldEmail" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="newEmail">Correo electrónico nuevo* :</label>
                          </td>
                          <td>
                            <input id="newEmail" name="newEmail" type="email" v-model="newEmail" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label for="newEmail1">Repetir correo electrónico nuevo* :</label>
                          </td>
                          <td>
                            <input
                              id="newEmail1"
                              name="newEmail1"
                              type="email"
                              v-model="newEmailRepeat"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </form>

                <div class="buttons">
                  <input
                    type="button"
                    class="button-back"
                    value="Cancelar"
                    @click="closeModalEmail()"
                  />
                  <input
                    type="submit"
                    class="button-go"
                    value="Modificar"
                    @click="updateEmail(oldEmail, newEmail, newEmailRepeat)"
                  />
                </div>
              </div>
            </div>
          </section>

          <!-- PERFIL DEL USUARIO -->

          <profiledata
            v-show="seeProfile"
            :dataUsers="dataUsers"
            v-on:edit="
              editProfile();
              showEditText();
            "
            v-on:drop="deleteUser()"
          ></profiledata>

          <article class="profile" v-show="seeEditProfile">
            <h2>¡Mantén actualizados tus datos!</h2>
            <p>Todos los campos son obligatorios.</p>
            <p>
              El código postal y la fecha de nacimiento serán necesarios para
              poder recuperar la contraseña
            </p>
            <form id="form">
              <table class="form-table">
                <tbody>
                  <tr>
                    <td class="text">
                      <label for="newName">Nombre :</label>
                    </td>
                    <td class="data">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        maxlength="255"
                        autocomplete="off"
                        v-model="newName"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="text">
                      <label for="newSurname">Apellidos :</label>
                    </td>
                    <td class="data">
                      <input
                        id="surname"
                        name="surname"
                        type="text"
                        maxlength="255"
                        autocomplete="off"
                        v-model="newSurname"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="text">
                      <label for="newDocument">Documento identidad :</label>
                    </td>
                    <td class="data">
                      <input
                        id="document"
                        name="document"
                        type="text"
                        maxlength="15"
                        autocomplete="off"
                        v-model="newDocument"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="text">
                      <label for="newAddress">Dirección :</label>
                    </td>
                    <td class="data">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        maxlength="255"
                        autocomplete="off"
                        v-model="newAddress"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="text">
                      <label for="newPostalCode">Código postal :</label>
                    </td>
                    <td class="data">
                      <input
                        id=" postal_code"
                        name=" postal_code"
                        type="text"
                        maxlength="15"
                        autocomplete="off"
                        v-model="newPostalCode"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="text">
                      <label for="newLocation">Localidad :</label>
                    </td>
                    <td class="data">
                      <input
                        id=" location"
                        name=" location"
                        type="text"
                        maxlength="50"
                        autocomplete="off"
                        v-model="newLocation"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="text">
                      <label for="newProvince">Provincia :</label>
                    </td>
                    <td class="data">
                      <input
                        id=" province"
                        name=" province"
                        type="text"
                        maxlength="50"
                        autocomplete="off"
                        v-model="newProvince"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="text">
                      <label for="country">Pais :</label>
                    </td>
                    <td class="data">
                      <input
                        id=" country"
                        name=" country"
                        type="text"
                        autocomplete="off"
                        v-model="newCountry"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="text">
                      <label for="newBirthdate">Fecha de nacimiento :</label>
                    </td>
                    <td class="data">
                      <input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        value
                        class="birthdate"
                        v-model="newBirthdate"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="text">
                      <label for="newMobile">Teléfono móvil:</label>
                    </td>
                    <td class="data">
                      <input
                        id="mobile"
                        name="mobile"
                        type="text"
                        maxlength="12"
                        autocomplete="off"
                        v-model="newMobile"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            <div class="buttons-profile">
              <input type="button-back" class="button-back" value="Cancelar" @click="editProfile()" />

              <input type="submit" class="button-go" value="Actualizar" @click="updateUser()" />

              <input
                type="submit"
                class="button-go"
                value="Editar Foto"
                @click="openModalPhoto();showEditText()"
              />
            </div>
          </article>

          <div class="modal" v-show="modalProfilePhoto">
            <div class="modalBox" v-on:edit="showEditText">
              <table>
                <tbody>
                  <tr class="editAvatar">
                    <td class="image">
                      <label>Actualiza tu imagen de perfil:</label>
                    </td>
                    <td class="tdFormField">
                      <input id="file" type="file" ref="file" @change="handleFileUpload()" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="buttons">
                <input class="button-back" value="Cancelar" @click="closeModalPhoto()" />
                <input class="button-go" type="button" value="Actualizar" @click="uploadImage()" />
              </div>
            </div>
          </div>
          <!-- IMPLEMENTACIÓN DEL MODAL PARA MODIFICAR LA CONTRASEÑA -->
          <h3 class="password">
            Si quieres modificar tu contraseña, pulsa
            <input
              type="submit"
              value="modificar"
              class="button-go"
              @click="openModal()"
            />
          </h3>
          <section class="password">
            <div class="modal" v-show="modal">
              <div class="modalBox">
                <h2>Cambiar contraseña</h2>
                <h3>En este apartado puedes modificar tu contraseña.</h3>
                <p>Todos los campos marcados con * son obligatorios</p>

                <form>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <label>Contraseña actual*:</label>
                        </td>
                        <td>
                          <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            autocomplete="off"
                            v-model="oldPassword"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Nueva contraseña*:</label>
                        </td>
                        <td>
                          <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            autocomplete="off"
                            v-model="newPassword"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label>Repetir contraseña*:</label>
                        </td>
                        <td>
                          <input
                            id="newPasswordRepeat"
                            name="newPasswordRepeat"
                            type="password"
                            autocomplete="off"
                            v-model="newPasswordRepeat"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
                <div class="buttons">
                  <input type="button" class="button-back" value="Cancelar" @click="closeModal()" />
                  <input
                    type="submit"
                    class="button-go"
                    value="Modificar"
                    @click="
                      updatePassword(
                        oldPassword,
                        newPassword,
                        newPasswordRepeat
                      )
                    "
                  />
                </div>
              </div>
            </div>
          </section>
        </article>
      </section>
    </main>
    <footercustom></footercustom>
  </div>
</template>

<script>
// IMPORTO AXIOS
import axios from "axios";

//IMPORTO LOS COMPONENTERS

import menucustom from "@/components/MenuCustom.vue";
import menulinks from "@/components/MenuLinks.vue";
import profiledata from "@/components/ProfileData.vue";
import footercustom from "@/components/FooterCustom.vue";

//IMPORTO SWAL
import Swal from "sweetalert2";

//IMPORTO LA  VARIAS FUNCION DE UTILS
import dateFormat from "dateformat";

import {
  getAuthToken,
  logOut,
  clearLogin,
  getUserName,
  isLoggedIn,
  checkAdmin,
  setName,
  setEmail,
  setAvatar,
  formatDateToFront
} from "../api/utils";

export default {
  name: "UserProfile",
  components: {
    menucustom,
    menulinks,
    profiledata,
    footercustom
  },
  data() {
    return {
      errorMessage: "",
      //DATOS PARA ACTUALIZAR EL USUARIO
      dataUsers: {},
      modalProfilePhoto: false,
      modalProfile: false,
      correctData: false,
      loading: true,
      id: null,
      seeProfile: true,
      seeEditProfile: false,
      idUser: "",
      newId: "",
      newStatus: "",
      newName: "",
      newSurname: "",
      newDocument: "",
      newAddress: "",
      newPostalCode: "",
      newLocation: "",
      newProvince: "",
      newCountry: "",
      newBirthdate: "",
      newMobile: "",
      avatar: "",
      newAvatar: "",
      file: "",
      image: "",
      newHeadquarter: "",
      date: "",
      //DATOS PARA ACTUALIZAR LA CONTRASEÑA
      modal: false,
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
      correctDataPassword: false,
      //DATOS PARA ACTUALIZAR EL EMAIL
      errorMessage: "",
      modalEmail: false,
      correctDataEmail: false,
      oldEmail: "",
      newEmail: "",
      newEmailRepeat: ""
    };
  },
  methods: {
    getUser() {
      const token = getAuthToken();
      const data = localStorage.getItem("id");
      let self = this;
      axios
        .get(`http://localhost:3000/users/` + data, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        //SI SALE BIEN
        .then(function(response) {
          self.dataUsers = response.data.data;
          const image = response.data.data.avatar;

          if (!!!self.dataUsers.avatar) {
            self.dataUsers.avatar =
              "http://localhost:3000/uploads/" + "fotoavatar.jpg";
          } else {
            self.dataUsers.avatar = "http://localhost:3000/uploads/" + image;
          }
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

    showEditText() {
      this.newStatus = this.dataUsers.active;
      this.newName = this.dataUsers.name;
      this.newSurname = this.dataUsers.surname;
      this.newDocument = this.dataUsers.identification_document;
      this.newAddress = this.dataUsers.address;
      this.newPostalCode = this.dataUsers.postal_code;
      this.newLocation = this.dataUsers.location;
      this.newProvince = this.dataUsers.province;
      this.newCountry = this.dataUsers.country;
      this.newBirthdate = new Date(this.dataUsers.birthdate).toDateString(
        "es-ES"
      );
      this.newMobile = this.dataUsers.phone;
      this.newAvatar = this.dataUsers.avatar;
      this.newHeadquarter = this.dataUsers.headquarters;
    },

    validatingData() {
      if (
        !this.newName ||
        !this.newSurname ||
        !this.newDocument ||
        !this.newAddress ||
        !this.newPostalCode ||
        !this.newLocation ||
        !this.newProvince ||
        !this.newCountry ||
        !this.newBirthdate ||
        !this.newMobile
      ) {
        this.errorMessage =
          "No has rellenado todos los datos. Todos los campos son obligatorios"; //Establecer mensaje de error
        this.correctData = false; //NO ENVIAR
      } else {
        this.correctData = true; //ENVIAR
        this.errorMessage = ""; //NO SE MUESTRA EL MENSAJE
      }
    },

    //ACTUALIZAMOS LOS DATOS DEL USUARIO Y LA FOTO

    uploadImage() {
      let self = this;
      let data = localStorage.getItem("id");

      let formData = new FormData();
      formData.append("activo", self.newStatus);
      formData.append("name", self.newName);
      formData.append("surname", self.newSurname);
      formData.append("document", self.newDocument);
      formData.append("address", self.newAddress);
      formData.append("postal_code", self.newPostalCode);
      formData.append("location", self.newLocation);
      formData.append("province", self.newProvince);
      formData.append("country", self.newCountry);
      formData.append("birthdate", self.newBirthdate);
      formData.append("phone", self.newMobile);
      formData.append("headquarters", self.newHeadquarter);
      formData.append("avatar", self.file);

      axios
        .put("http://localhost:3000/" + "users/" + data, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          self.getUser();
          self.closeModalPhoto();
          self.editProfile();
          Swal.fire({
            icon: "success",
            title: "Foto de perfil actualizada correctamente.",
            showConfirmButton: false,
            timer: 2500
          });
        })
        .catch(error =>
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 2500
          })
        );
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    //ACTUALIZAMOS LOS DATOS DEL USUARIO SIN LA FOTO

    updateUser() {
      this.validatingData(); //VALIDANDO DATOS DEL FORMULARIO
      if (this.correctData) {
        const token = getAuthToken();
        let self = this;
        let data = localStorage.getItem("id");
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
        let formData = new FormData();
        formData.append("activo", self.newStatus);
        formData.append("name", self.newName);
        formData.append("surname", self.newSurname);
        formData.append("document", self.newDocument);
        formData.append("address", self.newAddress);
        formData.append("postal_code", self.newPostalCode);
        formData.append("location", self.newLocation);
        formData.append("province", self.newProvince);
        formData.append("country", self.newCountry);
        formData.append("birthdate", self.newBirthdate);
        formData.append("phone", self.newMobile);
        formData.append("headquarters", self.newHeadquarter);

        axios
          .put("http://localhost:3000/" + "users/" + data, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(function(response) {
            self.getUser();
            self.editProfile();
            Swal.fire({
              icon: "success",
              title: "Datos de perfil actualizados correctamente.",
              showConfirmButton: false,
              timer: 2500
            });
          })
          .catch(error =>
            Swal.fire({
              icon: "error",
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 2500
            })
          );
      } else {
        Swal.fire({
          icon: "error",
          title: this.errorMessage,
          showConfirmButton: false,
          timer: 2500
        });
      }
    },

    //FUNCION PARA QUE UN USUARIO SE DE DE BAJA
    deleteUser() {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás deshacerlo!",
        text:
          "Para volver a activarla tendrás que contactar con Atención al usuario.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, bórralo!"
      }).then(result => {
        if (result.value) {
          const token = getAuthToken();
          axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
          let data = localStorage.getItem("id");
          let self = this;
          axios
            .delete("http://localhost:3000/users/" + data)
            //  SI SALE BIEN
            .then(function(response) {
              //MOSTRAR UN MENSAJE CON EL RESULTADO
              Swal.fire({
                icon: "success",
                title: `Acabas de dar de baja tu cuenta. Deberás contactar con Atención al usuario para volver a activarla `,
                showConfirmButton: false,
                timer: 2500
              }).then(result => {
                logOut();
                self.$router.push("/");
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

    tagIsAdmin() {
      return checkAdmin();
    },

    emptyFields() {
      this.active = "";
      this.name = "";
      this.surname = "";
      this.identification_document = "";
      this.address = "";
      this.postal_code = "";
      this.location = "";
      this.province = "";
      this.country = "";
      this.birthdate = "";
      this.phone = "";
      id = "button-data";
      this.headquarters = "";
    },

    // CAMBIA LA VISTA PARA MODIFICAR EL PERFIL
    editProfile() {
      this.seeEditProfile = !this.seeEditProfile;
      this.seeProfile = !this.seeProfile;
    },

    //  ABRE EL MODAL PARA MODIFICAR LA FOTO
    openModalPhoto() {
      this.modalProfilePhoto = true;
    },
    // CIERRA EL MODAL DESPUES DE MODIFICAR LA FOTO
    closeModalPhoto() {
      this.modalProfilePhoto = false;
    },

    //CAMBIO DE CONTRASEÑA

    //FUNCIONES PARA VALIDAR LOS DATOS QUE PASAMOS PARA EL CAMBIO DE CONTRASEÑA
    validatingDataPassword() {
      if (!this.oldPassword || !this.newPassword || !this.newPasswordRepeat) {
        this.errorMessage = "No has rellenado todos los datos."; //Establecer mensaje de error
        this.correctDataPassword = false; //NO ENVIAR
      } else if (this.newPassword === this.oldPassword) {
        this.errorMessage =
          "La nueva contraseña no puede se igual a la actual."; //Establecer mensaje de error
        this.correctDataPassword = false; //NO ENVIAR
      } else if (this.newPassword !== this.newPasswordRepeat) {
        this.errorMessage = "Las contraseñas nuevas no coinciden."; //Establecer mensaje de error
        this.correctDataPassword = false; //NO ENVIAR
      } else {
        this.correctDataPassword = true; //ENVIAR
        this.errorMessage = ""; //NO SE MUESTRA EL MENSAJE
      }
    },

    //FUNCIONES PARA MODIFICAR LA CONTRASEÑA

    updatePassword(oldPassword, newPassword, newPasswordRepeat) {
      this.validatingDataPassword(); //VALIDANDO DATOS DEL FORMULARIO
      if (this.correctDataPassword) {
        const token = getAuthToken();
        let data = localStorage.getItem("id");
        let self = this;
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

        axios
          .post(`http://localhost:3000/users/${data}/password`, {
            oldPassword: self.oldPassword,
            newPassword: self.newPassword,
            newPasswordRepeat: self.newPasswordRepeat
          })
          .then(function(response) {
            logOut();
            self.emptyFieldsPassword();
            //Lanzar modal de confirmación
            Swal.fire({
              icon: "success",
              title:
                "Cambio de contraseña realizado correctamente. Todos tus tokens quedan invalidados. Haz login de nuevo para conseguir un token válido. ",
              showConfirmButton: false,
              timer: 2500
            }),
              //Ir a la página de login
              self.$router.push("/");
          })
          .catch(error =>
            Swal.fire({
              icon: "error",
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 2500
            })
          );
      } else {
        Swal.fire({
          icon: "error",
          title: this.errorMessage,
          showConfirmButton: false,
          timer: 2500
        });
      }
    },

    //  ABRE EL MODAL PARA MODIFICAR LA CONTRASEÑA
    openModal() {
      this.modal = true;
    },
    // CIERRA EL MODAL DESPUES DE MODIFICAR LA CONTRASEÑA
    closeModal() {
      this.modal = false;
    },

    // VACIA LOS CAMPOS DESPUES DE MODIFICAR LA CONTRASEÑA
    emptyFieldsPassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.newPasswordRepeat = "";
    },

    //CAMBIO DE EMAIL
    validatingDataEmail() {
      if (!this.oldEmail || !this.newEmail || !this.newEmailRepeat) {
        this.errorMessage = "No has rellenado todos los datos."; //Establecer mensaje de error
        this.correctDataEmail = false; //NO ENVIAR
      } else if (this.newEmail === this.oldEmail) {
        this.errorMessage =
          "El nuevo correo electrónico no puede ser igual al actual."; //Establecer mensaje de error
        this.correctDataEmail = false; //NO ENVIAR
      } else if (this.newEmail !== this.newEmailRepeat) {
        this.errorMessage = "Los correos electrónicos nuevos no coinciden."; //Establecer mensaje de error
        this.correctDataEmail = false; //NO ENVIAR
      } else {
        this.correctDataEmail = true; //ENVIAR
        this.errorMessage = ""; //NO SE MUESTRA EL MENSAJE
      }
    },

    //FUNCION PARA ACTUALIZAR EL EMAIL DEL USUARIO

    updateEmail(oldEmail, newEmail, newEmailRepeat) {
      this.validatingDataEmail();
      if (this.correctDataEmail) {
        let self = this;
        const token = getAuthToken();
        const data = localStorage.getItem("id");
        axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

        axios
          .post(`http://localhost:3000/users/${data}/email`, {
            oldEmail: self.oldEmail,
            newEmail: self.newEmail,
            newEmailRepeat: self.newEmailRepeat
          })
          //SI SALE BIEN
          .then(function(response) {
            //MOSTRAR UN MENSAJE CON EL RESULTADOS.

            Swal.fire({
              icon: "success",
              title: `Modificación del correo electrónico realizada correctamente. `,
              showConfirmButton: false,
              timer: 2500
            });
            setEmail(newEmail);
            self.getUser();
            self.closeModalEmail();
            self.emptyFieldsEmail();
          })
          .catch(error =>
            Swal.fire({
              icon: "error",
              title: error.response.data.message,
              showConfirmButton: false,
              timer: 2500
            })
          );
      } else {
        Swal.fire({
          icon: "error",
          title: this.errorMessage,
          showConfirmButton: false,
          timer: 2500
        });
      }
    },

    //  ABRE EL MODAL PARA MODIFICAR EL EMAIL
    openModalEmail() {
      this.modalEmail = true;
    },
    // CIERRA EL MODAL DESPUES DE MODIFICAR EL EMAIL
    closeModalEmail() {
      this.modalEmail = false;
    },

    // VACIA LOS CAMPOS DESPUES DE MODIFICAR EL EMAIL
    emptyFieldsEmail() {
      this.oldEmail = "";
      this.newEmail = "";
      this.newEmailRepeat = "";
    }
  },

  created() {
    this.getUser();
    this.loading = false;
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

body main {
  background: #fff;
  margin: 10px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 4px 0 #d4d4d4;
  box-sizing: border-box;
  margin: 30px auto;
  padding: 15px 30px;
  width: 95%;
  max-width: 900px;
  border-radius: 10px;
  margin-bottom: 81px;
}
body main section#content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
body main section#content p {
  font-size: 12px;
  display: block;
  align-self: center;
  color: #8b8b8b;
}
body main section article ul.link {
  align-self: center;
  width: 100%;
}
body section article.links {
  display: flex;
  justify-content: center;
}
article.profile {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}

tr {
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

div.buttons-profile input {
  margin: 20px 5px;
}
input.button-go,
div.buttons-profile input.button-go {
  padding: 0.75px;
  vertical-align: middle;
  width: 120px;
}

div.buttons-profile input.button-back {
  padding: 0.75px;
  vertical-align: middle;
  text-align: center;
  border-radius: 10px;
  width: 110px;
  font-weight: bolder;
}
h2 {
  padding: 1rem 0;
}

section.email .modal h3 {
  text-align: left;
}

h3.password {
  align-self: center;
  text-align: center;
}
fieldset {
  border: none;
}
table {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

tbody {
  margin: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
tr {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
td {
  padding: 0.1rem 0.1rem;
}
td.text {
  text-transform: uppercase;
  font-size: 14px;
  min-width: 100px;
}
td.data {
  font-weight: bold;
  text-align: end;
  align-self: flex-end;
}

label {
  font-size: 15px;
}
input {
  padding: 5px;
  font-size: 15px;
}
input#birthdate {
  width: 210px;
}
</style>
