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
          :items-per-page="5"
          :search="searchText"
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
import DataTableMixin from '../mixins/DataTableMixin'

export default Vue.extend({
    mixins:[DataTableMixin],
  data() {
    return {
      ...desserts,
    };
  }
});
</script>