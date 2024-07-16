export function getTimeOfDay() {
    var now = new Date()
    var hours = now.getHours()
    if (hours >= 4 && hours < 12) {
        return 'Matin'
    } else if (hours >= 12 && hours < 20) {
        return 'Après-midi'
    } else {
        return 'Soir'
    }
}
