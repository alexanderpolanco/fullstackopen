 export function calculateBmi(height: number, weight: number): string {
    height = height / 100
    const bmi = weight / (height * height)
    if (bmi < 18.5) {
        return 'Underweight'
    } else if (bmi < 25) {
        return 'Normal (healthy weight)'
    } else if (bmi < 30) {
        return 'Overweight'
    } else {
        return 'Obesity'
    }
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight))