import BaseContainer from '@/shared/components/BaseContainer';
import BlockChainDate from '@/pages/home/BlockChainDate';
import Banner from './Banner';

const Home = {
  render() {
    return (
      <div>
        <Banner />
        <BaseContainer>
          <BlockChainDate />
        </BaseContainer>
      </div>
    );
  },
};

export default Home;
