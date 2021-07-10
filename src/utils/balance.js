export const formatBalanceToString = (balance) => {
    if (balance === 0)
        return '0.00';
    
    return balance.toLocaleString('en-US');
}

export const formatBalanceToInt = (balance) => {
    if (balance === 0)
        return '0.00';

    return parseInt(balance.split(',').join(''));
}