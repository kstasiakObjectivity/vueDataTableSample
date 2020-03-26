<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <SampleTable />
      </v-col>
      <v-col cols="6">
          <ServerTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import SampleTable from "../components/SampleTable";
import ServerTable from "../components/ServerTable"

export default {
  name: "DataTable",
  components: {
    SampleTable,
    ServerTable
  }
};
</script>
