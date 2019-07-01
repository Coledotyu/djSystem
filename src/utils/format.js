/**
 * 格式化时间(将标准时区转化为常用格式)
 * @param {*} data 
 */
export const formatTime = (data) => {
  if (!data) {
    return;
  }
  const date = new Date(data);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D =
    date.getDate() < 10
      ? "0" + (date.getDate() + " ")
      : date.getDate() + " ";
  return Y + M + D;
}
