export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

export const formatDateWithHour = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hour = date.getHours()
  const minutes = date.getMinutes()

  return `${day}-${month}-${year} ${hour}:${minutes}`
} 

export const addDaysTo = (date: Date, daysToAdd: number) =>  {
  const newDate = new Date(date);

  return newDate.setDate(newDate.getDate() + daysToAdd);
}

export const substractDaysTo = (date: Date, daysToSubstract: number) =>  {
  const newDate = new Date(date);

  return newDate.setDate(newDate.getDate() - daysToSubstract);
}