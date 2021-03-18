const getAsyncComponent = ({ component }) => () => ({
  component,
  loading: 'LoadingComponent',
  error: 'ErrorComponent',
  delay: 200,
  timeout: 100000,
});

export default getAsyncComponent;
