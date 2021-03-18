// import getUserInfo from './api';

const Test = {
  data() {
    return ({
      posts: {},
    });
  },
  props: {
    name: String,
  },
  async fetch() {
    // this.posts = await getUserInfo()
    console.log('this.posts', this.posts);
  },
  // call fetch only on client-side
  fetchOnServer: true,

  render() {
    console.log('-00 test render');
    return <span>test compoennts{this.name}</span>;
  },
};

export default Test;
