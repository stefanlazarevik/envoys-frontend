export default ({ app }, inject) => {
  app.$api = {
    index: {
      getStatistic: '/index/get-statistic',
      getPairs: '/index/get-pairs'
    },
    auth: {
      actionSignup: '/auth/action-signup',
      actionSignin: '/auth/action-signin',
      actionReset: '/auth/action-reset',
      setLogout: '/auth/set-logout',
      getRefresh: '/auth/get-refresh',
      getSecure: '/auth/get-secure'
    },
    account: {
      getUser: '/account/get-user',
      setUser: '/account/set-user',
      getActions: '/account/get-actions',
      getFactor: '/account/get-factor',
      setFactor: '/account/set-factor',
      setKyc: '/account/set-kyc'
    },
    spot: {
      getPrice: '/spot/get-price',
      getSymbol: '/spot/get-symbol',
      getMarkers: '/spot/get-markers',
      getCandles: '/spot/get-candles',
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
    ads: {
      getAdvertisements: '/ads-shot/get-advertisements',
      getAdvertising: '/ads-shot/get-advertising'
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
        getAssets: '/admin/spot/get-assets',
        getReserves: '/admin/spot/get-reserves',
        setReserveUnlock: '/admin/spot/set-reserve-unlock',
        getRepayments: '/admin/spot/get-repayments',
        setRepayment: '/admin/spot/set-repayment',
      },
      account: {
        getAccounts: '/admin/account/get-accounts',
        getAccount: '/admin/account/get-account',
        setAccount: '/admin/account/set-account',
        getKycApplicant: '/admin/account/get-kyc-applicant'
      },
      ads: {
        setAdvertising: '/admin/ads-shot/set-advertising',
        deleteAdvertising: '/admin/ads-shot/delete-advertising'
      }
    },
    status: '/status',
    timestamp: '/timestamp',
  };
  inject('api', app.$api);
};