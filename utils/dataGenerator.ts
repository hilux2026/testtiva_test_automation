export function generateData() {
    const random = Date.now();

    return {
        name: `trainer_${random}`,
        email: `trainer_${random}@gmail.com`,
        phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
        password: `Pass@${random}`
    };
}