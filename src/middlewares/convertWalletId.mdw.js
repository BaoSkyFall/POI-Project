const firstNumberWallet = 1208;
const lastNumberWallet = 12;
const minusNumberWallet = 7;
const numberWallet = 1000;
const encodeWalletId = (number) => {
    return firstNumberWallet * numberWallet + number * minusNumberWallet + lastNumberWallet;
}
const decodeWalletId = (walletId) => {
    return (walletId - lastNumberWallet) % (firstNumberWallet * numberWallet) / minusNumberWallet
}

export {
    encodeWalletId,
    decodeWalletId
}