<template>
    <v-card elevation="0">
        <v-card-text class="pb-0">
            <div class="d-flex justify-space-between">
                <v-checkbox label="Long TP/SL" class="ma-0 pa-0"/>
                <v-checkbox label="Short TP/SL" class="ma-0 pa-0"/>
            </div>
            <div>
                <v-hover>
                    <v-text-field outlined class="mb-4" color="primary" height="40" dense hide-details :label="$vuetify.lang.t('Take profit price')">
                        <template v-slot:append>
                            <span class="my-1">{{$vuetify.lang.t('USDT')}}</span>
                        </template>
                    </v-text-field>
                </v-hover>
                <v-hover>
                    <v-text-field outlined class="mb-4" color="primary" height="40" dense hide-details :label="$vuetify.lang.t('Stop loss price')">
                        <template v-slot:append>
                            <span class="my-1">{{$vuetify.lang.t('USDT')}}</span>
                        </template>
                    </v-text-field>
                </v-hover>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'v-component-future-threshold-card',
    }
</script>
