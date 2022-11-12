<template>
  <div>
    <v-text-field class="mt-5" placeholder="0.00000000" label="Volume" dense hide-details outlined>
      <template v-slot:append>
        <v-menu offset-y :nudge-bottom="8" content-class="elevation-1">
          <template v-slot:activator="{ on, attrs, value }">
            <span style="border-left: 1px solid #7a7a7a" class="pl-3" v-bind="attrs" v-on="on">
              <v-layout wrap>
                <v-flex align-self-center>
                  {{ item ? item : "USDT" }}
                </v-flex>
                <v-flex align-self-center>
                  <v-icon v-if="value">
                    mdi-chevron-down
                  </v-icon>
                  <v-icon v-else>
                    mdi-chevron-up
                  </v-icon>
                </v-flex>
              </v-layout>
            </span>
          </template>
          <v-list-item-group v-model="item">
            <v-list-item :value="item.title" v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-menu>

      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "index",
  data: () => ({
    item: "USDT",
    items: [
      { title: 'EUR' },
      { title: 'BTC' },
      { title: 'ETH' },
      { title: 'TRX' },
    ]
  })
}
</script>

<style scoped>

</style>