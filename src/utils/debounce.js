// 去抖函数，一般使用lodash.js包，但是有点安全问题
// 此处是将包内的去抖函数拿出直接使用

// 因为有些事件频繁触发会影响性能（例：搜索关键字事件，可以等待输入完毕后再执行）

// func是频繁触发的函数
// wait是要等待的时间
export const debounce = function (func, wait) {
  let timeout
  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}
