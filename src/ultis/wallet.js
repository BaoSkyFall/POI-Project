import {
    formatBalanceToString
} from "./balance";

export const formatWallet = (wallets) => {
    return wallets.map(wallet => {
        return {
            ...wallet,
            balance: formatBalanceToString(wallet.balance)
        }
    })
}

export const formatHistory = (histories) => {
    return histories.map(history => {
        return {
            ...history,
            previousBalance: formatBalanceToString(history.previousBalance),
            currentBalance: formatBalanceToString(history.currentBalance),
        }
    })
}