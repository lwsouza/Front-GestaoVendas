<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="onSubmit()">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <p class="alert alert-danger" v-if="msgRetorno !== undefined">{{ msgRetorno }}</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="username"
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      autocomplete="username email"
                      required
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="icon-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      v-model="password"
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                      required
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button type="submit" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <!-- <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>-->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from "../../configs/config";

export default {
  name: "Login",
  // props: {
  //   initialLogin: String,
  //   initialPassword: String,
  //   msg: String
  // },
  data: function() {
    return {
      username: undefined,
      password: undefined,
      msgRetorno:undefined
    };
  },
  methods: {
    onSubmit() {
      console.log("AQUI");
      console.log(this.username);
      console.log(this.password);

      let userLogin = { email: this.username, password: this.password }

      console.log(config)

      axios.request({
          method: 'post',
          headers: { 'content-type': 'application/json' },
          baseURL: config.apiURL,
          url: `/auth/token`,
          data: userLogin
      }).then((response) => {
          console.log("POST / token", response)

          var token = response.data.token
          localStorage.setItem('access_token', token);
          this.$router.push('/dashboard');
          // this.tarefas.push(response.data)
          // this.resetar()
      }). catch(error => {
        let respostaError = error.response.data
        
        if (respostaError.error === "Invalid password")
          this.msgRetorno = "Senha inválida";
        console.log(error.response)
      })

      // axios.post(`auth/token`, userLogin).then(response => {
      //   console.log(`POST auth/token`, response);

      //   // const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
      //   // this.tarefas.splice(indice, 1, tarefa);
      // });
    }
  }
};
</script>
