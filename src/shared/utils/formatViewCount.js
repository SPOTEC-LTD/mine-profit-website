const formatViewCount = count => {
  if (count >= 10000) {
    return '10K+';
  }
  return count;
};

export default formatViewCount;
