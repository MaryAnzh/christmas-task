function shuffle(array: Array<any>) {
    array.sort(() => Math.random() - 0.5);
};
function randomNumbers(startNumber: number, endNumber: number) {
    function shuffle(array: Array<any>) {
        array.sort(() => Math.random() - 0.5);
    }

    let randomArr = [];
    for (let i = startNumber; i < (endNumber + 1); i++) {

        randomArr.push(i);
    }
    shuffle(randomArr);
    return randomArr[1];
};

function randomNumbersArr(startNumber: number, endNumber: number, arrayLength: number) {
    function shuffle(array: Array<any>) {
        array.sort(() => Math.random() - 0.5);
    }

    let randomArr = [];
    for (let i = startNumber; i < (endNumber + 1); i++) {

        randomArr.push(i);
    }

    shuffle(randomArr);
    const newArr = [];
    for (let i = 0; i < (arrayLength + 1); i++) {
        newArr.push(randomArr[i]);
        
    }
    return newArr;
};
let nu,ber = 

export { randomNumbers, randomNumbersArr };