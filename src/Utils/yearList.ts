export function generateYearsList(startYear: number, numYears: 9) {
    const currentYear = new Date().getFullYear()
    const yearsList = []

    for (let i = 0; i < numYears; i++) {
        const year = currentYear - i
        yearsList.push({ id: year, name: year.toString() })
    }

    return yearsList
}
