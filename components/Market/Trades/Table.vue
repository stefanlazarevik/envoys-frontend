<template>
    <v-data-table :headers="headers" :items="data" hide-default-footer disable-filtering :mobile-breakpoint="0">
        <template v-slot:item.side="{ item }">
            <p class="mb-0" :class="item.side === 'Sell' ? 'red--text': 'teal--text' ">
                {{ item.side }}
            </p>
        </template>
        <template v-slot:item.WAPrice="{ item }">
            <p class="mb-0" :class="item.side === 'Sell' ? 'red--text': 'teal--text' ">
                {{ item.WAPrice }}
            </p>
        </template>
    </v-data-table>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                {
                    text: 'Order ID',
                    align: 'start',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'orderID',
                },
                {
                    text: 'CP ID',
                    align: 'start',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'CPID',
                },
                {
                    text: 'Instrument',
                    align: 'start',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'instrument',
                },
                {
                    text: 'Side',
                    align: 'start',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'side',
                },
                {
                    text: 'WA Price',
                    align: 'start',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'WAPrice',
                },
                {
                    text: 'Total Size',
                    align: 'start',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'totalSize',
                },
                {
                    text: 'Total Volume',
                    align: 'start',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'totalVolume',
                },
                {
                    text: 'Time',
                    align: 'start',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'time',
                },
                {
                    text: 'tradeID',
                    align: 'start',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'instrument',
                },
                {
                    text: 'Client Order ID',
                    align: 'center',
                    sortable: false,
                    filterable: false,
                    width: 100,
                    value: 'clientOrderID',
                },
            ],
            data: [
                {
                    orderID: 31459093711,
                    CPID: 87,
                    instrument: 'BTC-AUD',
                    side: 'Buy',
                    WAPrice: 29402.35200000,
                    totalSize: 1.00000000,
                    totalVolume: 29402.36000000,
                    time: '18.10.22, 16:08:45',
                    tradeID: 266327,
                    clientOrderID: '-'
                },
                {
                    orderID: 31459093711,
                    CPID: 87,
                    instrument: 'BTC-AUD',
                    side: 'Sell',
                    WAPrice: 29402.35200000,
                    totalSize: 1.00000000,
                    totalVolume: 29402.36000000,
                    time: '18.10.22, 16:08:45',
                    tradeID: 266327,
                    clientOrderID: '-'
                }
            ]
        }
    },
}
</script>

<style lang="scss" scoped>

</style>