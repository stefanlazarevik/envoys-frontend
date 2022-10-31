<template>
  <v-card class="ma-2 mt-3 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <div class="mt-1">Trades History</div>
        </v-col>
        <v-col cols="12" md="8">
          <div class="float-right">
            <v-layout fill-height wrap>
              <v-flex mx-1>
                <v-btn class="text-capitalize" height="40" color="grey darken-1" outlined elevation="0">Orders</v-btn>
              </v-flex>
              <v-flex mx-1>
                <v-btn class="text-capitalize" height="40" color="grey darken-1" outlined elevation="0">Trades</v-btn>
              </v-flex>
              <v-flex mx-1>
                <v-btn @click.stop="dialog = true" class="text-capitalize" height="40" color="grey darken-1" outlined elevation="0">Download .CSV</v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <Table />
    </v-card-text>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Download .CSV
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-text-field
              label="From date"
              outlined
              dense
              hide-details
              class="my-5"
              type="date"
          ></v-text-field>
          <v-text-field
              label="To date"
              outlined
              dense
              hide-details
              type="date"
              class="mb-5"
          ></v-text-field>
          <v-text-field
              v-model="fileNameVal"
              label="Filename"
              outlined
              dense
              hide-details
              class="mb-5"
          ></v-text-field>
          <v-checkbox
              label="Include headers"
              id="checkbox"
              color="success"
              value="success"
              hide-details
              dence
          ></v-checkbox>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" block text @click="dialog = false">
            Download
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>

  import Table from './Table.vue';

  export default {
    components: {
      Table
    },
    data() {
      return {
        fileNameVal: '',
        dialog: false,
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>