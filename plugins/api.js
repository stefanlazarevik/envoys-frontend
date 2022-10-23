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
      getActivities: '/account/get-activities'
    },
    exchange: {
      getPrice: '/exchange/get-price',
      getSymbol: '/exchange/get-symbol',
      getMarkers: '/exchange/get-markers',
      getGraph: '/exchange/get-graph',
      getTrades: '/exchange/get-trades',
      getPairs: '/exchange/get-pairs',
      getPair: '/exchange/get-pair',
      getOrders: '/exchange/get-orders',
      getAsset: '/exchange/get-asset',
      getAssets: '/exchange/get-assets',
      setAsset: '/exchange/set-asset',
      setOrder: '/exchange/set-order',
      cancelOrder: '/exchange/cancel-order',
      setWithdraw: '/exchange/set-withdraw',
      cancelWithdraw: '/exchange/cancel-withdraw',
      getTransactions: '/exchange/get-transactions',
      getTransfers: '/exchange/get-transfers',
      getAnalysis: '/exchange/get-analysis'
    },
    admin: {
      exchange: {
        setCurrency: '/admin/exchange/set-currency',
        getCurrency: '/admin/exchange/get-currency',
        getCurrencies: '/admin/exchange/get-currencies',
        deleteCurrency: '/admin/exchange/delete-currency',
        getChains: '/admin/exchange/get-chains',
        getChain: '/admin/exchange/get-chain',
        setChain: '/admin/exchange/set-chain',
        deleteChain: '/admin/exchange/delete-chain',
        getPairs: '/admin/exchange/get-pairs',
        getPair: '/admin/exchange/get-pair',
        setPair: '/admin/exchange/set-pair',
        deletePair: '/admin/exchange/delete-pair',
        getMarketPrice: '/admin/exchange/get-market-price',
        getContracts: '/admin/exchange/get-contracts',
        getContract: '/admin/exchange/get-contract',
        setContract: '/admin/exchange/set-contract',
        deleteContract: '/admin/exchange/delete-contract',
        getTransactions: '/admin/exchange/get-transactions',
        getOrders: '/admin/exchange/get-orders',
        getAssets: '/admin/exchange/get-assets'
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