export default ({ app }, inject) => {
  app.$api = {
    index: {
      getStatistic: '/index/get-statistic',
      getCurrencies: '/index/get-currencies',
      getPairs: '/index/get-pairs'
    },
    auth: {
      actionSignup: '/auth/action-signup',
      actionSignin: '/auth/action-signin',
      actionReset: '/auth/action-reset',
      setLogout: '/auth/set-logout',
      getRefresh: '/auth/get-refresh'
    },
    account: {
      getUser: '/account/get-user',
      setUser: '/account/set-user',
      getActions: '/account/get-actions'
    },
    spot: {
      getPrice: '/spot/get-price',
      getSymbol: '/spot/get-symbol',
      getMarkers: '/spot/get-markers',
      getGraph: '/spot/get-graph',
      getTrades: '/spot/get-trades',
      getPairs: '/spot/get-pairs',
      getPair: '/spot/get-pair',
      getOrders: '/spot/get-orders',
      getAsset: '/spot/get-asset',
      getAssets: '/spot/get-assets',
      setAsset: '/spot/set-asset',
      setOrder: '/spot/set-order',
      cancelOrder: '/spot/cancel-order',
      setWithdraw: '/spot/set-withdraw',
      cancelWithdraw: '/spot/cancel-withdraw',
      getTransactions: '/spot/get-transactions',
      getTransfers: '/spot/get-transfers',
      getAnalysis: '/spot/get-analysis'
    },
    stock: {
      getSymbol: '/stock/get-symbol',
    },
    market: {
      getInstruments: "/market/get-instruments",
      getRequests: '/market/settlement/get-requests',
      getBook: '/market/get-book',
      setOrder: '/market/set-order',
      getOrders: '/market/get-orders',
    },
    admin: {
      spot: {
        setCurrency: '/admin/spot/set-currency',
        getCurrency: '/admin/spot/get-currency',
        getCurrencies: '/admin/spot/get-currencies',
        deleteCurrency: '/admin/spot/delete-currency',
        getChains: '/admin/spot/get-chains',
        getChain: '/admin/spot/get-chain',
        setChain: '/admin/spot/set-chain',
        deleteChain: '/admin/spot/delete-chain',
        getPairs: '/admin/spot/get-pairs',
        getPair: '/admin/spot/get-pair',
        setPair: '/admin/spot/set-pair',
        deletePair: '/admin/spot/delete-pair',
        getMarketPrice: '/admin/spot/get-market-price',
        getContracts: '/admin/spot/get-contracts',
        getContract: '/admin/spot/get-contract',
        setContract: '/admin/spot/set-contract',
        deleteContract: '/admin/spot/delete-contract',
        getTransactions: '/admin/spot/get-transactions',
        getOrders: '/admin/spot/get-orders',
        getAssets: '/admin/spot/get-assets'
      },
      account: {
        getAccounts: '/admin/account/get-accounts',
        getAccount: '/admin/account/get-account',
        setAccount: '/admin/account/set-account'
      }
    },
    status: '/status',
    timestamp: '/timestamp',
  };
  inject('api', app.$api);
};