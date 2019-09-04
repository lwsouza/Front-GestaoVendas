<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Editar</strong> usuário
          </div>
          <b-form @submit.prevent="onSubmit()">
          <b-form-group
            description="Me diga seu nome completo"
            label="Nome completo"
            label-for="fullName"
            :label-cols="3"
            >
            <b-form-input v-model="item.name" id="fullName" type="text" autocomplete="name"></b-form-input>
          </b-form-group>
          <b-form-group
            description="Me diga seu nome de usuário"
            label="Nome de usuário"
            label-for="userName"
            :label-cols="3"
            >
            <b-form-input v-model="item.usuario" id="userName" type="text"></b-form-input>
          </b-form-group>
          <b-form-group
            description="Por favor digite seu e-mail"
            label="Email"
            label-for="email"
            :label-cols="3"
            >
            <b-form-input v-model="item.email" id="email" type="email" placeholder="Enter your email" autocomplete="email"></b-form-input>
          </b-form-group>
          <b-form-group
            description="Pavor digite sua senha"
            label="Senha"
            label-for="password"
            :label-cols="3"
            >
            <b-form-input v-model="item.password" id="password" type="password" placeholder="Enter your password" autocomplete="current-password"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Bloqueado"
            label-for="basicRadio"
            :label-cols="3"
            >
            <b-form-radio-group
              id="basicRadio"
              name="radioBlocked">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline1" name="radioBlocked" class="custom-control-input" v-model="item.bloqueado" value="true" :checked="item.bloqueado == true">
                <label class="custom-control-label" for="customRadioInline1">Sim</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline2" name="radioBlocked" class="custom-control-input" v-model="item.bloqueado" value="false" :checked="item.bloqueado == false">
                <label class="custom-control-label" for="customRadioInline2">Não</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <!-- <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button> -->
            <b-button size="sm" @click="goBack"><i class="fa fa-undo"></i> Back</b-button>
          </div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from './../../configs/axios'

export default {
  name: 'form-user-upd',
  data (id) {
    return {
      item: []
    }
  },
  created() {
    let id = this.$route.params.id;

    axios.get(`/admin/listuser/${id}`)
    .then((response) => {
      response.data.password = "******"
      this.item = response.data
    })
    .catch(error => {
        // console.log("Erro capturado no catch: ", error)

        if (error.response.status == 401) {
          localStorage.removeItem('access_token');
          this.$router.push('/pages/login');
        }

        if(error.response) {
            console.log('Erro [resposta]: ', error.response)
        } else if (error.request) {
            console.log('Erro [requisição]: ', error.request)
        } else {
            console.log('Erro [Outro]: ', error.message)
        }
    })
  },
  methods: {
    click () {
      // do nothing
    },
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    },
    onSubmit() {

      this.item.bloqueado = this.item.bloqueado.toLowerCase() == 'true';

      axios.put(`/admin/updateuser`, this.item)
      .then((response) =>{
        console.log(response);
        this.item = response.data
        this.$router.push('/users');
      })
      .catch(error => {
          // console.log("Erro capturado no catch: ", error)

          if (error.response.status == 401) {
            localStorage.removeItem('access_token');
            this.$router.push('/pages/login');
          }

          if(error.response) {
              console.log('Erro [resposta]: ', error.response)
          } else if (error.request) {
              console.log('Erro [requisição]: ', error.request)
          } else {
              console.log('Erro [Outro]: ', error.message)
          }
      })
    }
  }
}
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
