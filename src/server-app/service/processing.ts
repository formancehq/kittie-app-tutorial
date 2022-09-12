import { Monetary } from "../types/Monetary"
import { stripe } from "./stripe";
import { deposit, wallet } from "../ledger/chart";
import { ledger, script } from "../ledger/ledger";
import { v4 as uuid } from 'uuid';

export const createDepositLink = async({
  amount,
  userId,
  redirect,
} : {
  amount: Monetary,
  userId: string,
  redirect: {
    success: string,
    fallback: string,
  }
}) : Promise<string> => {
  const session = await stripe().checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'EUR',
          product_data: {
            name: 'Deposit',
          },
          unit_amount: amount.amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: redirect.success,
    cancel_url: redirect.fallback,
    metadata: {
      userId: userId,
    }
  });

  return session.url;
}

export const processDeposit = async ({payment} : {
  payment: any,
}) => {
  const dep = deposit(uuid());

  await ledger.execute(script('create-deposit'), {
    deposit: dep,
    amount: {
      amount: payment['amount_total'],
      asset: 'EUR/2',
    },
  });

  await ledger.setAccountMeta(dep, {
    user: {
      type: 'account',
      value: wallet({
        id: payment['metadata']['userId'],
      }),
    },
  });

  await ledger.execute(script('process-deposit'), {
    deposit: dep,
  });
}