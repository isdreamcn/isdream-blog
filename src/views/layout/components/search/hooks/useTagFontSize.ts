export type Tag = {
  label: string
  value: number
  count: number
  color?: string
  fontSize: number
}

export const useTagFontSize = (
  data: Omit<Tag, 'fontSize'>[],
  max: number,
  min: number
) => {
  let maxCount = 0
  data.forEach((item) => {
    if (item.count > maxCount) {
      maxCount = item.count
    }
  })

  return data.map((item) => ({
    ...item,
    fontSize: Math.max((item.count / maxCount) * max, min)
  }))
}
