export const isNumeric = (string: string) => {
  return !!string && !isNaN(Number(string))
}