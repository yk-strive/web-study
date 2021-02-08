/**
 * 题目一
 */
let objA = {
  name: 'ykk',
  age: 18
}
let objB = objA
console.log(objA.name, 'objA-1')
objB.name = 'bmm'
console.log(objA.name, 'objA-2')

/**
 * 题目二
 */
let objC = {
  name: 'objCC',
  age: 20
}
function change (obj) {
  obj.age = 24
  obj = {
    name: 'objChange',
    age: 30
  }
  return obj
}
function change2 (obj) {
  obj.age = 26
  obj = {
    name: 'objChange',
    age: 30
  }
}
let objD = change(objC)
console.log(objC.age, 'objC-1')
console.log(objD.age, 'objD')
let objE = change2(objC)
console.log(objC.age, 'objC-2')
console.log(objE && objE.age, 'objE')

/**
 * 题目三: 几种类型检测方式
 */
// typeof
console.log('typeof 1:', typeof 1)
console.log('typeof "1":', typeof '1')
console.log('typeof unfidend:', typeof undefined)
console.log('typeof null:', typeof null)
console.log('typeof true:', typeof true)
console.log('typeof Symbol():', typeof Symbol())
console.log('typeof []:', typeof [])
console.log('typeof {}:', typeof {})
console.log('typeof console:', typeof console)
console.log('typeof console.log:', typeof console.log)

// instanceof
!(function i () {
  let Car = function() {}
  let benz = new Car()
  console.log('benz instanceof Car:', benz instanceof Car)
  let car = new String('Mercedes Benz')
  console.log('car instanceof String:', car instanceof String)
  let str = 'Covid-19'
  console.log('str instanceof String:', str instanceof String)
  let num = 6
  console.log('num instanceof Number:', num instanceof Number)
}())

// Object.prototype.toString.call()
console.log('Object.prototype.toString.call({}): ', Object.prototype.toString.call({}))
console.log('Object.prototype.toString.call(1): ', Object.prototype.toString.call(1))
console.log('Object.prototype.toString.call("1"): ', Object.prototype.toString.call('1'))
console.log('Object.prototype.toString.call(true): ', Object.prototype.toString.call(true))
console.log('Object.prototype.toString.call(function() {}): ', Object.prototype.toString.call(function() {}))
console.log('Object.prototype.toString.call(null): ', Object.prototype.toString.call(null))
console.log('Object.prototype.toString.call(undefined): ', Object.prototype.toString.call(undefined))
console.log('Object.prototype.toString.call(/123/g): ', Object.prototype.toString.call(/123/g))
console.log('Object.prototype.toString.call(new Date()): ', Object.prototype.toString.call(new Date()))
console.log('Object.prototype.toString.call([]):', Object.prototype.toString.call([]))
// console.log('Object.prototype.toString.call(document):', Object.prototype.toString.call(document))
// console.log('Object.prototype.toString.call(window):', Object.prototype.toString.call(window))