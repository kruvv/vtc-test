Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Передаём определение компонента в коллбэк resolve
    resolve({
      template: '<div>Я — асинхронный!</div>'
    })
  }, 1000)
})
