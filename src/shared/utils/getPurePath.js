const getPurePath = ({ path, locale }) => path.replace(`/${locale}`, '') || '/';

export default getPurePath;
