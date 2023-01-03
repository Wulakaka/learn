export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
}

export const defaultCompare = (a,b) => {
    if (a > b) return 1
    else if (a == b) return 0
    else return -1
}