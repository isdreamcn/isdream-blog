export type Item = {
  count: number
}

export const useTagFontSize = <T extends Item = any>(
  data: T[],
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
