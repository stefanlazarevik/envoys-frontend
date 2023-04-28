<template>
    <v-card elevation="0">
        <v-card-text>
            <p class="mb-2">Leverage 25x</p>
            <v-item-group class="d-flex justify-space-between">
                <v-item v-for="(item, index) in values" :key="index" style="min-width: 60px" class="justify-center">
                    <v-chip label class="ma-1">{{ item }}x</v-chip>
                </v-item>
            </v-item-group>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'v-component-leverage-card',
        data() {
            return {
                values: [25, 50, 75, 100]
            }
        }
    }
</script>