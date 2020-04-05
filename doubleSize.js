
/*
 * Complete the 'doubleSize' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER_ARRAY a
 *  2. LONG_INTEGER b
 */

function doubleSize(a, b) {
    // Write your code here
    let maxB = b;
    a.sort((i, j) => i - j);
    for (let i = 0; i < a.length; i++) {
        maxB = maxB === a[i] ? maxB * 2 : maxB;
    }
    return maxB;
}