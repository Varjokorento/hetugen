module.exports = class HetuGen {

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
        const numberString = day.toString() + month.toString() + year.toString() + endCode.toString();
        const checkSum = generateCheckSum(numberString)
        year = year.toString();
        year = year[2] + year[3]
        return day.toString() + month.toString() + year.toString() + dividor + endCode + checkSum;
    }

    static validate = (ssn) => {
        if (!ssn.match(SSN_REGEX) || ssn.length < 11 ) {
            return false;
        }
        return true;
    }
}

const SSN_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d-|[012]\dA)\d{3}[\dA-Z]$/;



generateCheckSum = (numberString) => {
    const modulo = parseInt(numberString) % 31;
    if (modulo < 10) {return modulo}
    const map = {
        10: 'A',
        11: 'B',
        12:'C',
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
    return map[modulo];
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