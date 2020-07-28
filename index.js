module.exports = () => {
    let year = getYear();
    const month = getMonth();
    const day = getDay(month);
    const dividor = year >= 2000 ? ("A"): ("-")
    const endCode = generateCode();
    const numberString = day.toString() + month.toString() + year.toString() + endCode.toString();
    const checkSum = generateCheckSum(numberString)
    year = year.toString();
    year = year[2] + year[3]
    return day.toString() + month.toString() + year.toString() + dividor + endCode + checkSum;
}


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
        day = Math.floor(Math.random() * 28) + 1;
    }
    if (monthsWith31Days().has(month)) {
        day = Math.floor(Math.random() * 31) + 1;
    } else {
        day = Math.floor(Math.random() * 30) + 1;
    }

    return day.toString().length > 1 ? (day) : ('0' + day);
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

generateCode = () => {
    const min = 2;
    const max = 899;
    let number = Math.floor(Math.random() * (max - min + 1) + min);
    return formatNumber(number)
}