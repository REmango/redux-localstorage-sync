export function getPropertyByPath(obj, pathArr) {
  return pathArr.reduce((acc, current) => {
    return acc[current]
  }, obj)
}


export function setPropertyByPath(obj, pathArr, value) {
  pathArr.reduce((acc, current, index) => {
    return acc[current] = index === pathArr.length - 1 ? value : ((typeof acc[current] === 'object' && !Array.isArray(acc[current])) ? acc[current] : {})
  }, obj)
}
