/**
 * The object for passing the data
 * @param {Object} object 
 * @param {Number} startDateMs
 * @param {Number} endDateMs
 */

const findDateOrCreateOne = (object, startDateMs, endDateMs) => {
    if (!startDateMs) throw new Error("Missing StartDateMs param, is required for calculating the time spent.")
    if (typeof startDateMs !== "number") throw new Error(`Invalid startDateMs value, expected: number, recived: ${typeof startDateMs}`)

    if (!endDateMs) throw new Error("Missing endDateMs param, is required for calculating the time spent.")
    if (typeof endDateMs !== "number") throw new Error(`Invalid endDateMs value, expected: number, recived: ${typeof endDateMs}`)

    const initialDate = new Date(dateMs)
    const initialYear = initialDate.getFullYear()
    const initialMonth = initialDate.getMonth() + 1
    const initialDay = initialDate.getDate()

    //prefab values for better readability
    const timeSpent = endDateMs - startDateMs
    const day = {
        [initialDay]: timeSpent
    }
    const month = {
        [initialMonth]: day
    }

    //prefab checkin date for better readability too
    const checkYear = object[initialYear]
    const checkMonth = object[initialYear][initialMonth]
    const checkDay = object[initialYear][initialMonth][initialDay]

    if (!checkYear) object[initialYear] = month
    if (!checkMonth) object[initialYear][initialMonth] = day
    if (!checkDay) object[initialYear][initialMonth][initialDay] = timeSpent
    if (checkDay) object[initialYear][initialMonth][initialDay] += timeSpent

    return {
        timeSpent: timeSpent,
        savedData: object
    }

}

export default findDateOrCreateOne