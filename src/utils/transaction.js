import { formatBalanceToString } from "./balance";

export const formatTransaction = (transactions) => {
   return transactions.map(transaction => {
       return {
           ...transaction,
           amount: formatBalanceToString(transaction.amount),
           chargeFee: formatBalanceToString(transaction.chargeFee)
       }
   })
}