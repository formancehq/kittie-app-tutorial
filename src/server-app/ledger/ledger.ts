// This file is glue code to connect to a running Ledger instance via the SDK.
// It offers two portals into the Ledger:
//  The `ledger` object for direct access to the SDK and its many useful methods
//  A helper function to execute named Numscript files for more complex interactions

import { readFileSync } from "fs";
import Cluster from "numary";
import path from "path";

const cluster = new Cluster({
  uri: `${process.env['LEDGER_PROTOCOL'] || 'http'}://${process.env['LEDGER_HOST'] || 'localhost'}:${process.env['LEDGER_PORT'] || '3068'}`
});

// Connect to ledger and expose connection for use directly.
export const ledger = cluster.getLedger(process.env['LEDGER_NAME'] || 'kittie');

// Helper function to execute NumScript by filename
export const script = (name: string) => {
  return readFileSync(path.join(__dirname, 'scripts', `${name}.num`)).toString();
}