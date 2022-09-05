import { readFileSync } from "fs";
import Cluster from "numary";
import path from "path";

const cluster = new Cluster({
  uri: `${process.env['LEDGER_PROTOCOL'] || 'http'}://${process.env['LEDGER_HOST']}:${process.env['LEDGER_PORT']}`
});

export const ledger = cluster.getLedger(process.env['LEDGER_NAME'] || 'main-1');

export const script = (name: string) => {
  return readFileSync(path.join(__dirname, 'scripts', `${name}.num`)).toString();
}

export const getTransactions = async function* (account: string) {
  let after = '';

  while (true) {
    const {data, has_more} = await ledger.getTransactions({
      account,
      after,
    });

    for (const tx of data) {
      yield tx;
    }

    if (!has_more) {
      break;
    }

    after = `${data[data.length - 1].txid}`;
  }
}