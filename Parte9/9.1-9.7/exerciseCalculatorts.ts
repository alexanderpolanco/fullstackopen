interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

function calculateExercises(hours: number[], target: number): Result {
    try {
        if (hours.length === 0) {
            throw new Error('No training hours provided')
        }
        if (target === undefined) {
            throw new Error('No target provided')
        }
        if (hours.some(isNaN)) {
            throw new Error('Hours must be numbers')
        }
        const trainingDays = hours.length
        const totalHours = hours.reduce((a, b) => a + b)
        const average = totalHours / trainingDays
        const success = average >= target
        const rating = success ? 3 : 2
        const ratingDescription = success ? 'very good' : 'not too bad but could be better'
        return { periodLength: trainingDays, trainingDays, success, rating, ratingDescription, target, average }
    } catch (error) {
        console.log(error.message)
    }
}

const hours: number[] = process.argv.slice(3).map(Number)
const target: number = Number(process.argv.slice(2)[0])
console.log(calculateExercises(hours, target))
