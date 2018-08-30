module.exports = (date) => {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (mm < 10) {
        mm = '0' + mm
    }

    if (dd < 10) {
        dd = '0' + dd
    }

    date = dd + "-" + mm + "-" + date.getFullYear();

    return date;
}