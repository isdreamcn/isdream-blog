export const htmlToText = (str: string) => {
  return str.replace(/<.*?>/g, '').replace(/&.*;/g, '')
}
