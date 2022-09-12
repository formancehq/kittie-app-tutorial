import { wallet } from "../ledger/chart";
import { ledger, script } from "../ledger/ledger";
import { User as UserInterface } from "../types/User"

export const getMyBalance = async (u: UserInterface) => {
  const { balances } = await ledger.getAccount(wallet(u));

  return {
    'EUR/2': 0,
    ...balances,
  }
}