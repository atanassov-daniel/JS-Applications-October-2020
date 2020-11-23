function subSum(array, startIndex, endIndex) {
    if (array instanceof Array === false) return NaN;

    if (startIndex < 0) startIndex = 0;
    if (endIndex > array.length) endIndex = array.length - 1;

    const sum = function (array) {
        let sum = 0;
        for (let index = startIndex; index <= endIndex; index++) {
            sum += Number(array[index]);
        }

        if (endIndex - startIndex === 0) return 0;
        return sum;
    };

    return sum(array);
}

// console.log(subSum([10, 20, 30, 40, 50, 60], 3, 300)); // 150
// console.log(subSum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1)); // 3.3
// console.log(subSum([10, 'twenty', 30, 40], 0, 2)); // NaN
// console.log(subSum([], 1, 2)); // 0
// console.log(subSum('text', 0, 2)); // NaN
console.log(subSum([], 0, 0)); // 0