export function useFormatDate(range: Date[]) {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  const startDay = range[0].getDate()
  const startMonth = months[range[0].getMonth()]
  const startYear = range[0].getFullYear()

  const endDay = range[1].getDate()
  const endMonth = months[range[1].getMonth()]
  const endYear = range[1].getFullYear()

  const isEqualMonth = startMonth !== endMonth ? ` de ${startMonth}` : ''
  const isEqualYear = startYear !== endYear ? ` de ${endYear}` : ''

  const format = `${startDay}${isEqualMonth}${isEqualYear} a ${endDay} de ${endMonth} de ${endYear}`

  return { format }
}
