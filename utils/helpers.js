export const objectToArray = (obj) => {
    return obj && Object.entries(obj).map((arr) => arr[1])
}