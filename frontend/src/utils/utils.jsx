export function newUTCDate() {
    let date = new Date();

    return new Date(date.getUTCFullYear(), date.getUTCMonth(),
        date.getUTCDate(), date.getUTCHours(),
        date.getUTCMinutes(), date.getUTCSeconds());
}

export function formatDate(date) {
    return date.toISOString().split('T')[0]
}

export function getDateOneMonthAgo() {
    let date = newUTCDate();
    date = new Date(date.setMonth(date.getMonth() - 1))

    return date.toISOString().split('T')[0]
}

export function getDateLastNDays(n_days, is_formatted = true) {
    let date = newUTCDate()
    date = date.setDate(date.getDate() - n_days);
    date = new Date(date)

    return is_formatted ? formatDate(date) : date
}

export function getDateFirstDayCurrentMonth(is_formatted = true) {
    let date = newUTCDate();
    date = new Date(date.getFullYear(), date.getMonth(), 1);
    date = new Date(date)

    return is_formatted ? formatDate(date) : date
}


export function getDateLastMonthFirstDay(is_formatted = true) {
    let date = newUTCDate();
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    date = new Date(date)

    return is_formatted ? formatDate(date) : date
}

export function getDateLastMonthLastDate(is_formatted = true) {
    let firstDayCurrentMonthDate = getDateFirstDayCurrentMonth(false)
    let date = new Date(firstDayCurrentMonthDate.getFullYear(), firstDayCurrentMonthDate.getMonth(), firstDayCurrentMonthDate.getDay() - 1)

    return is_formatted ? formatDate(date) : date
}

export function getCurrentYearFirsDayDate(is_formatted = true) {
    let date = newUTCDate();
    date = new Date(date.getFullYear(), 0, 1);

    return is_formatted ? formatDate(date) : date
}

export function getLastYearFirsDayDate(is_formatted = true) {
    let date = newUTCDate();
    date = new Date(date.getFullYear() - 1, 0, 1);

    return is_formatted ? formatDate(date) : date
}

export function getLastYearLastDayDate(is_formatted = true) {
    let current_year_firs_day_date = getCurrentYearFirsDayDate(false);
    let date = new Date(current_year_firs_day_date.getFullYear(), current_year_firs_day_date.getMonth(), current_year_firs_day_date.getDay() - 1)

    return is_formatted ? formatDate(date) : date
}

