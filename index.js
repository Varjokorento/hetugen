module.exports = class HetuGen {
    static generate() {
        return this.generateSingleTemporary();
    }

    static getGeneratedListWithSize = (size) => {
        return this.generateN(size, false)
    }


    static generateN = (n, isActual) => {
        let arr = []
        for (var i = 0; i < n; i++) {
            arr.push(this.generateSingle(true, isActual))
        }
        return arr;
    }

    static generateSingleTemporary = () => {
        return this.generateSingle(false)
    }

    static generateSingleActual = () => {
        return this.generateSingle(true)
    }
    

    static generateSingle = (isActual) => {
        let year = getYear();
        const month = getMonth();
        const day = getDay(month);
        const dividor = year >= 2000 ? ("A"): ("-")
        const endCode = generateCode(isActual, year);
        const yearLastDigits = year.toString()[2] + year.toString()[3]
        const numberString = day.toString() + month.toString() + yearLastDigits + endCode.toString();
        const checkSum = generateCheckSum(numberString)
        year = year.toString();
        year = year[2] + year[3]
        return day.toString() + month.toString() + year.toString() + dividor + endCode + checkSum;
    }

    static validate = (ssn) => {
        if (!ssn.match(SSN_REGEX) || ssn.length < 11 ) {
            return false;
        }

        const array = ssn.split("-");

        if (array.length != 2) {
            return false
        }
        return isCheckSumCorrect(array);
    }
}


isCheckSumCorrect = (array) => {
    const firstPart = array[0];
    const secondPart = array[1];
    const secondNumber = secondPart[0] + secondPart[1] + secondPart[2];
    const checkSum = secondPart[3];
    const numberToDivide = parseInt(firstPart.toString() + secondNumber.toString())
    const modulo = numberToDivide % 31
    return checkSumMap[modulo] == checkSum
}

const SSN_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d-|[012]\dA)\d{3}[\dA-Z]$/;

const checkSumMap = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: 'A',
    11: 'B',
    12: 'C',
    13: 'D',
    14: 'E',
    15: 'F',
    16: 'H',
    17: 'J',
    18: 'K',
    19: 'L',
    20: 'M',
    21: 'N',
    22: 'P',
    23: 'R',
    24: 'S',
    25: 'T',
    26: 'U',
    27: 'V',
    28: 'W',
    29: 'X',
    30: 'Y'
}


generateCheckSum = (numberString) => {
    const parsedNroString = parseInt(numberString);
    const modulo = parsedNroString % 31;
    if (modulo < 10) {return modulo}
    return checkSumMap[modulo];
}

getDay = (month, year) => {
    let day;
    if (month === '02') {
        if (isLeapYear(year)) {
            day = Math.floor(Math.random() * 29) + 1;
            return formatDay(day)
        } else {
            day = Math.floor(Math.random() * 28) + 1;
            return formatDay(day)
        }
    }
    if (monthsWith31Days().has(month)) {
        day = Math.floor(Math.random() * 31) + 1;
        return formatDay(day)
    } else {
        day = Math.floor(Math.random() * 30) + 1;
        return formatDay(day)
    }
}

formatDay = (day) => {
    return day.toString().length > 1 ? (day) : ('0' + day);
}

isLeapYear = (year) => {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

monthsWith31Days = () => {
    return new Set(['01','03', '05', '07', '08', '10', '12'])
}

getMonth = () => {
    let month = Math.floor(Math.random() * 12) + 1;
    if (month.toString().length > 1) {
        return month;
    } else {
        return '0' + month;
    }
}

getYear = () => {
    const min = 1899;
    const max = new Date().getFullYear();
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

formatNumber = (number) => {
    if (number < 10 ) {
        return "00" + number.toString();
    } else if (number < 100) {
        return "0" + number.toString();
    } else {
        return number.toString();
    }
}

generateCode = (actual, year) => {
    let min, max;
    if (actual) {
        min = 2;
        max = 899;
    } else {
        min = 900;
        max = 999;
        return getRandomNumberBetween(min, max)
    }
    let number = getRandomNumberBetween(min, max)
    if ((number === 666  || number === 696)  && year > 1998) {
        return generateCode(actual, year)
    } 
    return formatNumber(number)
}

getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}