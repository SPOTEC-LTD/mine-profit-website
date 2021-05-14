<template>
  <div class="mine-data-container">
    <block-title :img="blockChain" class="mine-data-title-image" :title="isChinese && $t('mineData')" />
    <div class="coin-data-container">
      <coin-mine-data
        :img="btcIcon"
        :title="BTCData.symbol"
        :now-hash-rate="BTCData.hashrate"
        :coin-produce="BTCData.incomeCoin"
        :usdt-produce="BTCData.incomeUsd"
        class-name="btc-container"
      />
      <coin-mine-data
        :img="ethIcon"
        :title="ETHData.symbol"
        :now-hash-rate="ETHData.hashrate"
        :coin-produce="ETHData.incomeCoin"
        :usdt-produce="ETHData.incomeUsd"
        class-name="eth-container"
      />
    </div>
  </div>
</template>

<script>
import { getMineDatalist } from '@/api';
import numberUtils from 'aa-utils/lib/numberUtils';
import coinMineData from '@/pages/home/component/coin-mine-data';
import BlockTitle from '@/pages/home/component/block-title';
import getHashrateUnit from '@/shared/utils/getHashrateUnit';
import blockChain from '@/assets/home/block-chain-title.png';
import btcIcon from '@/assets/home/btc-icon.png';
import ethIcon from '@/assets/home/eth-icon.png';
import { getIsChinese } from '@/shared/utils/getLocalLanguage';

export default {
  components: {
    'block-title': BlockTitle,
    'coin-mine-data': coinMineData,
  },
  data() {
    return {
      blockChain,
      btcIcon,
      ethIcon,
      BTCData: {},
      ETHData: {},
      isChinese: getIsChinese(),
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
        const btc = list.filter(item => item.symbol === 'btc').map(item => {
          item.symbol = item.symbol.toUpperCase();
          item.hashrate = getHashrateUnit(item.hashrate);
          item.incomeCoin = this.getFormatBigFloatNumber(item.incomeCoin, 8);
          item.incomeUsd = this.getFormatBigFloatNumber(item.incomeUsd, 8);
          return item;
        });
        const eth = list.filter(item => item.symbol === 'eth').map(item => {
          item.symbol = item.symbol.toUpperCase();
          item.hashrate = getHashrateUnit(item.hashrate);
          item.incomeCoin = this.getFormatBigFloatNumber(item.incomeCoin, 8);
          item.incomeUsd = this.getFormatBigFloatNumber(item.incomeUsd, 8);
          return item;
        });
        [this.BTCData] = btc;
        [this.ETHData] = eth;
      });
    },
  },

};
</script>

<style lang="less" scope>
@import './index.less';
</style>
