<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Editar</strong> categoria
          </div>
          <b-form @submit.prevent="onSubmit()">
            <p class="alert alert-danger" v-if="msgRetorno !== undefined">{{ msgRetorno }}</p>
            <b-form-group
              description="Nome da categoria"
              label="Nome"
              label-for="fullName"
              :label-cols="3"
            >
              <b-form-input
                v-model="item.name"
                id="fullName"
                type="text"
                autocomplete="name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Descrição" label-for="basicTextarea" :label-cols="3">
              <b-form-textarea
                v-model="item.description"
                id="basicTextarea"
                :rows="3"
                placeholder="Conteúdo.."
              ></b-form-textarea>
            </b-form-group>

            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <b-button size="sm" @click="goBack">
                <i class="fa fa-undo"></i> Back
              </b-button>
            </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "./../../configs/axios";

export default {
  name: "form-category-edit",
  data(id) {
    return {
      item: [],
      msgRetorno: undefined
    };
  },
  created() {
      let id = this.$route.params.id;

      axios
        .get(`/market/category/${id}`)
        .then(response => {
          this.item = response.data;
        })
        .catch(error => {
          // console.log("Erro capturado no catch: ", error)

          if (error.response.status == 401) {
            localStorage.removeItem("access_token");
            this.$router.push("/pages/login");
          }

          if (error.response) {
            console.log("Erro [resposta]: ", error.response);
          } else if (error.request) {
            console.log("Erro [requisição]: ", error.request);
          } else {
            console.log("Erro [Outro]: ", error.message);
          }
        });
    },
  methods: {
    click() {
      // do nothing
    },
    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    },
    onSubmit() {
      axios
        .put(`/market/category`, this.item)
        .then(response => {
          console.log(response);
          this.item = response.data;
          this.$router.push("/category/categories");
        })
        .catch(error => {
          // console.log("Erro capturado no catch: ", error)

          if (error.response.status == 401) {
            localStorage.removeItem("access_token");
            this.$router.push("/pages/login");
          }

          // if (error.response.status == 400) {
          //   this.msgRetorno = "Categoria já cadastrado!";
          // }

          if (error.response) {
            console.log("Erro [resposta]: ", error.response);
          } else if (error.request) {
            console.log("Erro [requisição]: ", error.request);
          } else {
            console.log("Erro [Outro]: ", error.message);
          }
        });
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
