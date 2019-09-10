<template>
  <b-row>
    <b-col cols="12" xl="12">
      <transition name="slide">
        <b-card>
          <!-- <div slot="header" v-html="caption"> -->
          <div slot="header">
            <div class="d-flex">
              <div>Categorias</div>
              <div class="ml-auto">
                <button type="button" class="btn btn-success btn-sm" @click="add()">
                  <i class="fa fa-plus-square" aria-hidden="true"></i> Adicionar
                </button>
              </div>
            </div>
          </div>
          <b-table
            :hover="hover"
            :striped="striped"
            :bordered="bordered"
            :small="small"
            :fixed="fixed"
            responsive="sm"
            :items="items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            @row-clicked="rowClicked"
          >
            <template slot="#" slot-scope="data">
              <!-- <strong>{{data.item.id}}</strong> -->
              <strong>{{data.item.id}}</strong>
            </template>
            <template slot="nome" slot-scope="data">
              <strong>{{data.item.name}}</strong>
            </template>
            <template slot="descrição" slot-scope="data">
              <span v-if="data.item.description">{{data.item.description}}</span>
              <span v-else>-</span>
            </template>
            <template
              slot="Última atualização"
              slot-scope="data"
            >{{formatarData(data.item.updatedAt)}}</template>
            <!-- <template slot="status" slot-scope="data">
            <b-badge :variant="getBadge(data.item.bloqueado)">{{data.item.bloqueado ? 'Bloqueado' : 'Ativo'}}</b-badge>
            </template>-->
            <template slot="ações" slot-scope="data">
              <button type="button" class="btn btn-primary btn-sm" @click="edit(data.item._id)">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="remove(data.item._id)"
              >
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(items)"
              :per-page="perPage"
              v-model="currentPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
            />
          </nav>
        </b-card>
      </transition>
    </b-col>
  </b-row>
</template>

<script>
// import usersData from './UsersData'
import axios from "./../../configs/axios";
import moment from "moment";

export default {
  name: "Users",
  props: {
    // caption: {
    //   type: String,
    //   default: `${btnAdd}`
    // },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      // items: usersData.filter((user) => user.id < 42),
      // fields: [
      //   {key: 'id'},
      //   {key: 'name'},
      //   {key: 'registered'},
      //   {key: 'role'},
      //   {key: 'status'}
      // ],
      items: [],
      fields: [
        { key: "#" },
        { key: "nome" },
        { key: "descrição" },
        { key: "Última atualização" },
        { key: "ações" }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      count: 0
    };
  },
  computed: {},
  created() {
    axios
      .get(`/market/categories`)
      .then(response => {
        // console.log(`GET Usuários ${response}`)
        // this.usuarios = response.data
        //  this.items = response.data.filter((user) => user._id < 42)
        this.items = response.data;
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
    getRowCount(items) {
      return items.length;
    },
    userLink(id) {
      return `users/${id.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item._id);
      this.$router.push({ path: userLink });
    },
    formatarData(data) {
      return moment(data).format("DD/MM/YYYY HH:mm:ss");
    },
    edit(id) {
      this.$router.push({ path: `edit/${id.toString()}` });
    },
    add() {
      this.$router.push({ path: `add` });
    },
    remove(id) {
      if (confirm("Tem certeza que deseja excluir essa categoria?")) {
        axios
          .delete(`/market/category/${id}`)
          .then(response => {
            this.items = this.items.filter(it => it._id !== id);
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
      }
    }
  }
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
