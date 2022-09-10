<template>
  <v-container>
    <v-data-table :items="rows" class="elevation-3" :headers="headers">
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="searchText" placeholder="Buscar registros..."
            hide-details outlined dense />

          <v-spacer />

          <v-btn v-if="$vuetify.breakpoint.xs" color="primary" to="/alunos/0" class="ml-2" link>
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
          <v-btn v-else color="primary" link to="/alunos/novo" class="ml-2">
            Novo
          </v-btn>
        </v-toolbar>
      </template>

      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item: { id } }">
        <v-icon class="mr-2" @click="edit(id)"> mdi-pencil </v-icon>
        <v-icon @click="deleting(id)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <v-container>{{$environment.LISTAGEM_VAZIA}}</v-container>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="400px">
      <v-card>
        <v-card-title>
          <v-spacer />
          Tem certeza que deseja apagar?
          <v-spacer />
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="
            dialogDelete = false;
            deleteId = '0';
          " color="blue darken-1" text>
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">
            Apagar
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { IListagemTipoDeInvestimento } from '../../shared/services/data-sources/tipos-de-investimentos/TiposDeInvestimentosDataSource'

export default Vue.extend({
  data: () => ({
    deleteId: '0',
    searchText: '',
    dialogDelete: false,
    rows: [] as IListagemTipoDeInvestimento[],

    headers: [
      { text: 'Ações', value: 'actions', width: 100, sortable: false },
      { text: 'Nome', value: 'nome' }
    ]
  }),
  computed: {
    searched() {
      return this.rows.filter(student => {
        if (student.nome.toLowerCase().includes(this.searchText.toLowerCase())) return true

        return false
      })
    }
  },
  mounted() {
    console.log(this.$environment)

    this.$dataSources.tiposDeInvestimentos.getAll()
      .then(result => {
        if (result instanceof Error) {
          alert(result.message)
        } else {
          this.rows = result.data
        }
      })
  },
  methods: {
    edit(id: string) {
      this.$router.push(`/tipos-de-investimentos/${id}`)
    },
    deleting(id: string) {
      this.deleteId = id
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.dialogDelete = false
      this.$dataSources.tiposDeInvestimentos.deleteById(this.deleteId)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            this.rows = [...this.rows.filter((row) => row.id !== this.deleteId)]
          }
        })
    }
  }
})
</script>
