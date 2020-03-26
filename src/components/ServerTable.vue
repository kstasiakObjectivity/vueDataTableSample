<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p>filter</p>
        <v-spacer></v-spacer>
        <v-text-field v-model="searchText" append-icon="mdi-manify" label="Search" single-line></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="searchText"
          :options.sync="options"
          :loading="loading"
          show-group-by
          class="elevation-1"
        >
          <template v-slot:item.glutenfree="{ item }">
            <v-simple-checkbox v-model="item.glutenfree" disabled></v-simple-checkbox>
          </template>

          <template v-slot:item.calories="{ item }">
            <v-chip :color="getColor(item.calories)" dark>{{ item.calories }}</v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import * as desserts from "./sampleData/sampleTableDesserts";
import DataTableMixin from "../mixins/DataTableMixin";

export default Vue.extend({
  mixins: [DataTableMixin],
  data() {
    return {
      totalDesserts: 0,
      desserts: [],
      loading: true,
      options: {}
    };
  },
  watch: {
    options: {
      handler() {
        this.getDataFromApi().then(data => {
          this.desserts = data.items;
          this.totalDesserts = data.total;
        });
      },
      deep: true
    }
  },
  mounted() {
    this.getDataFromApi().then(data => {
      this.desserts = data.items;
      this.totalDesserts = data.total;
    });
  },
  methods: {
    getDataFromApi() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;

        let items = this.getDesserts();
        const total = items.length;

        if (sortBy?.length === 1 && sortDesc?.length === 1) {
          items = items.sort((a, b) => {
            const sortA = a[sortBy[0]];
            const sortB = b[sortBy[0]];

            if (sortDesc[0]) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (itemsPerPage > 0) {
          items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        }

        setTimeout(() => {
          this.loading = false;
          resolve({
            items,
            total
          });
        }, 1000);
      });
    },
    getDesserts() {
      return desserts.desserts;
    }
  }
});
</script>