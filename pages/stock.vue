<template>
  <div>
    <template v-if="create">
      <v-container>
        <v-component-stock-agent-create @back="back" />
      </v-container>
    </template>
    <template v-else>
      <section class="pa-0 main-role">

        <v-row class="ma-1">

          <!-- Start: assets list component -->
          <v-col class="pa-1" cols="12" md="3" sm="12">
            <v-card class="fill-height" elevation="0">

              <template v-if="agent.type === 'AGENT'">

                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon class="mt-3 mr-3">
                      <v-icon>mdi-shield-account-variant-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      Счет агента <small><i>{{ agent.name }}</i></small>
                    </v-list-item-content>
                    <v-list-item-action>
                      <template v-if="agent.status === 'REJECTED'">
                        <v-chip class="ml-0 mr-2 black--text" label small>
                          {{ agent.status }}
                        </v-chip>
                      </template>
                      <template v-else-if="agent.status === 'PENDING'">
                        <v-chip class="ml-0 mr-2 black--text" label small>
                          {{ agent.status }}
                        </v-chip>
                      </template>
                      <template v-else-if="agent.status === 'ACCESS'">
                        <v-chip class="ml-0 mr-2 black--text" label small>
                          {{ agent.status }}
                        </v-chip>
                      </template>
                      <template v-else-if="agent.status === 'BLOCKED'">
                        <v-chip class="ml-0 mr-2 black--text" label small>
                          {{ agent.status }}
                        </v-chip>
                      </template>
                    </v-list-item-action>

                    <v-list-item-action v-if="agent.status === 'REJECTED' || agent.status === 'PENDING' || agent.status === 'ACCESS'">
                      <v-menu offset-x offset-y bottom center :nudge-left="80" content-class="elevation-1" transition="slide-y-transition">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on">
                            mdi-cog
                          </v-icon>
                        </template>
                        <v-list>
                          <v-list-item @click="deleteAgent" link>
                            <v-list-item-title>Удалить агента</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-list-item-action>

                  </v-list-item>
                </v-list>

              </template>
              <template v-else-if="agent.type === 'BROKER'">

                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon class="mt-3 mr-3">
                      <v-icon>mdi-police-badge-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      Счет брокера
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-chip class="ml-0 mr-2 black--text" label small>
                        {{ agent.name }}
                      </v-chip>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>

              </template>
              <template v-else>
                <v-card-actions>
                  <v-btn style="text-transform: none !important;" color="black--text yellow darken-1 text-capitalize" @click="create = true" block large elevation="0">
                    Открыть торговый счет
                  </v-btn>
                </v-card-actions>
              </template>

              <v-divider />

              <template v-if="agent.type === 'BROKER'">
                <v-list dense>
                  <v-list-group color="primary">
                    <template v-slot:activator>
                      <v-list-item-icon class="mr-3">
                        <v-icon>mdi-contain</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title class="text-uppercase mr-2">Брокер</v-list-item-title>
                    </template>
                    <v-list-item v-for="(item, i) in navs.broker" :key="i" :to="`/stock/${item.to}`" exact link>
                      <v-list-item-icon class="mr-3">
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        {{ item.title }}
                      </v-list-item-content>
                      <v-list-item-action>
                        <template v-if="item.to === 'requests'">
                          <v-badge v-if="counts.request" class="mt-3" color="black--text yellow darken-1" :content="counts.request"></v-badge>
                        </template>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-group>
                </v-list>
                <v-divider />
              </template>

              <v-component-stock-assets />

              <v-divider />
              <v-card-actions>
                <v-btn to="?type=trade" color="black--text yellow darken-1 text-capitalize" large block elevation="0">Перейти к торгам</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <!-- End: assets list component -->

          <!-- Start: child container -->
          <v-col class="pa-1" cols="12" md="9" sm="12">
            <v-card class="fill-height" elevation="0">
              <nuxt-child />
            </v-card>
          </v-col>
          <!-- End: child container -->

        </v-row>

      </section>
    </template>
  </div>
</template>

<script>

  import Create from "../components/Stock/Create";
  import Assets from "../components/Stock/Assets";

  export default {
    auth: true,
    components: {
      'v-component-stock-agent-create': Create,
      'v-component-stock-assets': Assets
    },
    data() {
      return {
        create: false,
        agent: {
          id: 0,
          user_id: 0,
          broker_id: 0,
          name: null,
          type: 0,
          status: null,
        },
        counts: {
          request: 0
        }
      }
    },
    mounted() {

      this.$publish.bind('status/agent', (data) => {
        if (Number(this.agent.user_id) === data.user_id) {
          switch (data.status) {
            case 3:
              this.agent.status = 'ACCESS';
              break
            case 4:
              this.agent.status = 'REJECTED';
              break
          }
        }
      });

      this.$publish.bind('create/agent', (data) => {
        if (Number(this.agent.id) === data.broker_id) {
          this.counts.request +=1;
        }
        if (Number(this.$auth.$state.user.fields[0].id) === data.user_id) {
          this.agent.id = data.id;
          this.agent.user_id = data.user_id;
          this.agent.broker_id = data.broker_id;
          this.agent.name = data.name;

          switch (data.status) {
            case 2:
              this.agent.status = 'PENDING';
              break
            case 3:
              this.agent.status = 'ACCESS';
              break
          }

          this.agent.type = 'AGENT';
          if (data.type) {
            this.agent.type = 'BROKER';
          }
        }
      });

      this.$nuxt.$on('agent/count', () => {
        this.counts.request -=1;
      });

      this.getAgent();
    },
    methods: {

      /**
       * @param b
       */
      back(b) {
        this.create = b;
      },

      /**
       *
       */
      deleteAgent() {
        this.$axios.$post(this.$api.stock.deleteAgent, {id: this.agent.id}).then(() => {
          this.agent.id = 0;
          this.agent.user_id = 0;
          this.agent.broker_id = 0;
          this.agent.name = null;
          this.agent.type = 0;
          this.agent.status = 0;
        });
      },

      /**
       *
       */
      getRequests() {
        this.$axios.$post(this.$api.stock.getRequests).then((response) => {
          this.counts.request = response.count ?? 0;
        });
      },

      /**
       *
       */
      getAgent() {
        this.$axios.$post(this.$api.stock.getAgent).then((response) => {
          let fields = response.fields ?? [];
          if (fields.length > 0) {
            this.agent.id = fields[0].id;
            this.agent.user_id = fields[0].user_id;
            this.agent.broker_id = fields[0].broker_id ?? 0;
            this.agent.name = fields[0].name ?? null;
            this.agent.type = fields[0].type ?? 'AGENT';
            this.agent.status = fields[0].status;
          }

          this.getRequests();
        });
      },

    },
    computed: {
      navs() {
        return {
          broker: [
            {
              title: 'Запросы',
              icon: "mdi-account-multiple-plus-outline",
              to: 'requests'
            },
            {
              title: 'Мои агенты',
              icon: "mdi-account-multiple-outline",
              to: 'agents'
            },
            {
              title: 'Запросы на вывод',
              icon: "mdi-credit-card-check-outline",
              to: 'withdraw'
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>