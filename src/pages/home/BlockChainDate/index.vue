<template>
  <div class="mine-data-container">
    <Title :title="isChinese && $t('mineData')" />
    <div class="coin-data-container">
      <CoinMineData
        v-for="(item,index) in coinList"
        :key="index"
        :img="item.icon"
        :title="item.symbol"
        :now-hash-rate="item.hashrate"
        :coin-produce="item.incomeCoin"
        :usdt-produce="item.incomeUsd"
        :class-name="`${item.symbol.toLowerCase()}-container`"
      />
    </div>
  </div>
</template>

<script>
import { getMineDatalist } from '@/api';
import numberUtils from 'aa-utils/lib/numberUtils';
import CoinMineData from '@/pages/home/component/CoinMineData';
import getHashrateUnit from '@/shared/utils/getHashrateUnit';
import blockChain from '@/assets/home/block-chain-title.png';
import btcIcon from '@/assets/home/btc-icon.png';
import ethIcon from '@/assets/home/eth-icon.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';
import Title from '@/pages/home/component/Title';

export default {
  components: {
    CoinMineData,
    Title,
  },
  data() {
    return {
      blockChain,
      btcIcon,
      ethIcon,
      isChinese: getIsChinese(),
      iconMap: { btc: btcIcon, eth: ethIcon },
      coinList: [
        { icon: btcIcon, symbol: 'BTC', hashrate: '-', incomeCoin: '-', incomeUsd: '-' },
        { icon: ethIcon, symbol: 'ETH', hashrate: '-', incomeCoin: '-', incomeUsd: '-' },
      ],
    };
  },
  mounted() {
    this.fetchCoinDataList();
  },
  methods: {
    getFormatBigFloatNumber(value, precision) {
      return numberUtils.formatBigFloatNumber(`${value}`,
        {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        });
    },
    fetchCoinDataList() {
      getMineDatalist().then(data => {
        const { body: { list } } = data;
        const dataList = list.map(item => {
          item.icon = this.iconMap[item.symbol];
          item.symbol = item.symbol.toUpperCase();
          item.hashrate = getHashrateUnit(item.hashrate);
          item.incomeCoin = this.getFormatBigFloatNumber(item.incomeCoin, 8);
          item.incomeUsd = this.getFormatBigFloatNumber(item.incomeUsd, 8);
          return item;
        });
        if (list.length) {
          this.coinList = dataList;
        }
      });
    },
  },

};
</script>

<style lang="less" scope>
@import './index.less';
</style>
