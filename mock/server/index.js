import express from 'express';
import isFuction from 'lodash/isFunction';
import colors from 'colors';
import cors from 'cors';
import apiMap from '../api';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const wrapResponseCallback = ({ api, method, response }) => (_req, res) => {
  console.log(`===== ${new Date()} =========================`);
  console.log(`${method.toUpperCase()}:`, api);
  Object.keys(_req.query).length && console.log('request query:\t', _req.query);
  Object.keys(_req.body).length && console.log('request body:\t', _req.body);
  Object.keys(_req.params).length && console.log('request params:\t', _req.params);
  console.log('');
  if (isFuction(response)) {
    return response(_req, res);
  }
  return res.json(response);
};

const apiData = [];
Object.keys(apiMap).forEach(key => {
  const apiItem = apiMap[key];
  const { api, method } = apiItem;

  const title = key;
  const callback = wrapResponseCallback(apiItem);

  apiData.push({ method: method.toLowerCase(), api, title });

  app[method.toLowerCase()](api, callback);
});

app.listen(4008, 'localhost', () => {
  console.log(colors.green(`mock server start at: http://localhost:${4008}\n`));
});
