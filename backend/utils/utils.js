const convertDate = (date) =>{
    const d = date.getDate().toString()
    const m = (date.getMonth() + 1).toString()
    const y = date.getFullYear().toString()
    const formattedDate = d + m + y;
    return formattedDate;
}

module.exports = {
    convertDate
}
