<template>
  <v-card class="ma-2 pa-0" elevation="0" rounded="lg">
    <v-card-title>
      Your Requests
    </v-card-title>
    <v-divider />
    <v-card-text class="text-center">
      <template v-if="requests.length">

        <v-data-table :headers="headlines" :items="requests" item-key="id" hide-default-footer>
          <template v-slot:item.cid="{ item }">
            <v-chip class="float-left ml-0 mr-2 black--text" label small>
              {{ item.cid }}
            </v-chip>
          </template>
          <template v-slot:item.name="{ item }">
            <div class="float-left">{{ item.name }}</div>
          </template>
          <template v-slot:item.amount="{ item }">
            <div class="float-left">{{ item.amount }}</div>
          </template>
          <template v-slot:item.flags="{ item }">
            <div class="float-left">
              <template v-if="item.flags">
                Sender
              </template>
              <template v-else>
                Not the sender
              </template>
            </div>
          </template>
          <template v-slot:item.comment="{ item }">
            <div class="float-left">
              <template v-if="item.comment">
                {{ item.comment }}
              </template>
              <template v-else>
                Not the comment
              </template>
            </div>
          </template>
          <template v-slot:item.remove>
            <v-icon>
              mdi-close-circle-outline
            </v-icon>
          </template>
        </v-data-table>

      </template>
      <template v-else>
        No data yet
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      requests: [],
      headlines: [
        {
          text: 'CP ID',
          align: 'start',
          sortable: false,
          value: 'cid'
        },
        {
          text: 'Asset',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Amount',
          align: 'start',
          sortable: false,
          value: 'amount'
        },
        {
          text: 'Fee payer',
          align: 'start',
          sortable: false,
          value: 'flags'
        },
        {
          text: 'Comment',
          align: 'start',
          sortable: false,
          value: 'comment'
        },
        {
          text: 'Remove',
          align: 'end',
          sortable: false,
          value: 'remove'
        }
      ]
    }
  },
  /*props: {
    requests: {
      type: Array
    }
  },*/
  mounted() {
    this.getRequests();
  },
  methods: {
    getRequests() {
      this.$axios.$post(this.$api.market.getRequests).then((response) => {
        if (response.fields.incoming) {
          this.requests = response.fields.incoming ?? [];
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>