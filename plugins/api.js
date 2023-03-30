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
    },
    kyc: {
      setProcess: '/verification/set-process',
      setCanceled: '/verification/set-canceled',
      getStatus: '/verification/get-status',
      getPrivilege: '/verification/get-privilege',
      getApplicant: '/verification/get-applicant'
    },
    spot: {
      getPrice: '/spot/get-price',
      getSymbol: '/spot/get-symbol',
      getMarkers: '/spot/get-markers',
      getTicker: '/spot/get-ticker',
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
      getAnalysis: '/spot/get-analysis'
    },
    stock: {
      setAgent: '/stock/set-agent',
      getAgent: '/stock/get-agent',
      deleteAgent: '/stock/delete-agent',
      getBroker: '/stock/get-brokers',
      setBrokerAsset: '/stock/broker/set-asset',
      getRequests: '/stock/get-requests',
      getAgents: '/stock/get-agents',
      setSetting: '/stock/request/set-setting',
      setBlocked: '/stock/agent/set-blocked',
      getAssets: '/stock/get-assets',
      getAsset: '/stock/get-asset',
      setAsset: '/stock/set-asset',
      setWithdraw: '/stock/set-withdraw',
      getWithdraws: '/stock/get-withdraws',
      cancelWithdraw: '/stock/cancel-withdraw',
      getTicker: '/stock/get-ticker',
      getPair: '/stock/get-pair',
      getPairs: '/stock/get-pairs',
      getPrice: '/stock/get-price',
      cancelOrder: '/stock/cancel-order',
      getOrders: '/stock/get-orders',
      setOrder: '/stock/set-order'
    },
    ads: {
      getAdvertisements: '/ads-shot/get-advertisements',
      getAdvertising: '/ads-shot/get-advertising'
    },
    admin: {
      spot: {
        setAsset: '/admin/spot/set-asset',
        getAsset: '/admin/spot/get-asset',
        getAssets: '/admin/spot/get-assets',
        deleteAsset: '/admin/spot/delete-asset',
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
        getBalances: '/admin/spot/get-balances',
        getReserves: '/admin/spot/get-reserves',
        setReserveUnlock: '/admin/spot/set-reserve-unlock',
        getRepayments: '/admin/spot/get-repayments',
        setRepayment: '/admin/spot/set-repayment'
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