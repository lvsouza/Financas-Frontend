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
          <v-btn v-else color="primary" class="ml-2" @click="$confirmation('result.message', 'confirmation')">
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { IListagemTipoDeInvestimento } from '../../shared/services/data-sources/tipos-de-investimentos/TiposDeInvestimentosDataSource'

export default Vue.extend({
  data: () => ({
    searchText: '',
    rows: [] as IListagemTipoDeInvestimento[],

    headers: [
      { text: 'Ações', value: 'actions', width: 100, sortable: false },
      { text: 'Nome', value: 'nome' }
    ]
  }),
  computed: {
    searched() {
      return this.rows.filter(student => {
        return student.nome.toLowerCase().includes(this.searchText.toLowerCase())
      })
    }
  },
  mounted() {
    this.$dataSources.tiposDeInvestimentos.getAll()
      .then(result => {
        if (result instanceof Error) {
          this.$feedback(result.message, 'error')
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
      this.$confirmation('A exclusão não pode ser desfeito.', 'delete', () => {
        this.$dataSources.tiposDeInvestimentos.deleteById(id)
          .then(result => {
            if (result instanceof Error) {
              this.$feedback(result.message, 'error')
            } else {
              this.rows = [...this.rows.filter((row) => row.id !== id)]
            }
          })
      })
    }
  }
})
</script>
