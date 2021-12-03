const obj1 = {a:'str1', b:1, c:true};
const obj2 = {}
const obj3 = null;
let obj4;
const obj5 = {aa:undefined, bb:null, cc:false, dd:0, ee:''};
const arr1 = [{a1:'str1', b1:1, c1:true}, {a1:undefined, b1:null, c1:false, d1:0, e1:''}, {}, {x:23}, {y: 'yes'}, {z:'no'}];
const arr2 = [{ a: 'str1', b: 1, c: false }, { aa: undefined, bb: null, cc: false, dd: 0, ee: '' }, { aaa: 'Hello', bbb: 1000, ccc: false }, {eee:231}, {www: 'this is nice', ff: 100000}];
const arr3 = [];


// const a = [{a11:1,a12:2}, {a21:3,a22:4}]
// const b = [{b11:5,b12:6}, {b21:7,b22:8}]
// const c = [{c11:9,c12:10}, {c21:11,c22:12}]

const {log} = console;

//=========== Old ========================
// Объединяет фильтры
// farr - либо array либо object
// fuser - только объект
// function mergeFilters(farr, fuser) {
//   if (farr && farr instanceof Array) {
//     if (!farr.length) return fuser
//     for (const f of farr) Object.assign(f, fuser)
//   } else {
//     farr = Object.assign(farr || {}, fuser || {})
//   }
//   return farr
// }

//============ New ========================

// o,o a,o o,a a,a -> 
// @param {null | undefined | Array<object> | object} a,b
// @return {Array<Object> | object}
function mergeFiltersTwo(a, b) {

  // !filter1 ? arr1 : filter1 instanceof Array ? arr1 = filter1 : arr1 = Array.from(filter1)
  // !filter2 ? arr2 : filter2 instanceof Array ? arr2 = filter2 : arr2 = Array.from(filter2)   
  if (!a || a instanceof Array && !a.length) return b || {}
  if (!b || b instanceof Array && !b.length) return a || {}
  
  if (!(a instanceof Array)) a = [a || {}]
  if (!(b instanceof Array)) b = [b || {}]
    
  const res = []
  for (const ela of a)
    for (const elb of b)
      res.push(Object.assign({}, ela, elb))
  return res

  /* 
    Объединение массива объектов с массивом объектов  
    [{a:1, b:2}] and [{c:3, d:4}] => [{a:1, c:3}, {a:1, d:4}, {b:2, c:3}, {b:2, d:4}] 
  */ 
  // if (filter1 instanceof Array && filter2 instanceof Array) {
    // return filter1.map(item => filter2.map(element => Object.assign({}, item, element))).flat() 
  // }
  /*
   Объединение массива объектов с объектом  
   [{a:1}, {b:2}] and {c:3} => [{a:1, c:3}, {b:2, c:3}] 
  */ 
  // if (filter1 instanceof Array) return filter1.map(item => Object.assign({}, item, filter2))
  // if (filter1 instanceof Array) return filter1.map(item => assignToObject(item, filter2))
  
  // if (filter2 instanceof Array) return filter2.map(item => Object.assign({}, item, filter1))
  // if (filter2 instanceof Array) return filter2.map(item => assignToObject(item, filter1))

  // Объединение объектов
  // return Object.assign({}, filter1, filter2)
  // return assignToObject(filter1, filter2)
}


function mergeFiltersRec(...filters) {  
  if (filters.length == 1) return filters[0]
  const f1 = filters.pop()
  const f2 = filters.pop()
  filters.push(mergeFiltersTwo(f1, f2))
  return mergeFiltersRec(...filters)
}



function mergeLoopV1(...filters) {  
  
  if (filters.length == 1) return filters[0]    
  
  let acc = [{}]

  filters.forEach(f => {
    if (typeof f === 'string') f = [{}] 
    if (!(f instanceof Array)) f = [f || {}]    
    const res = []  
    f.forEach(i => acc.forEach(a => res.push(Object.assign({}, i, a)))) 
    acc = res 
  }) 
  return acc
} 

function mergeLoop(...filters) {  
  let acc = [{}]
  
  for (let f of filters) {
    if (!(f instanceof Array)) f = [f || {}]
    
    const res = []    
    for (const a of f)   
      for (const b of acc) 
        res.push(Object.assign({}, a, b))        
        
    acc = res
  }    
  return acc
}

function mergeReduce(...filters) {
  return (
    filters.reduce((acc, f) => 
      f.reduce((res, a) => 
          [...res, ...acc.map(b =>
            Object.assign({}, a, b))], 
      []), 
    [{}])
  )
}


function mergeFilters(...filters) {  return null
  
  let [a, b] = filters 
 
  for (let i = 0; i < filters.length; i++) {
    if (!filters[i] || filters[i] instanceof Array && !filters[i].length) return filters[i + 1] || {}
    if (!filters[i + 1] || filters[i + 1] instanceof Array && !filters[i + 1].length) return filters[i - 1] || {}
  } 
  if (!a || a instanceof Array && !a.length) return b || {}  // Если а не массив и не имеет длинну или это null и прочая хрень, то вернуть второй аргумент
  if (!b || b instanceof Array && !b.length) return a || {} // Если а не массив и не имеет длинну или это null и прочая хрень, то вернуть первый аргумент
  
  if (!(a instanceof Array)) a = [a || {}] // Если это не массив, то положить это в массив
  if (!(b instanceof Array)) b = [b || {}]
    
  const res = []
  for (const ela of a)
    for (const elb of b)
      res.push(Object.assign({}, ela, elb))
  return res
}


log('*********************************************************************')
log(`01. merge({a:'str1', b:1, c:true}, {}) => `, mergeFilters(obj1, obj2)); // > [{ a: 'str1', b: 1, c: true }]
log(`02. merge({a:'str1', b:1, c:true}, null) => `, mergeFilters(obj1, obj3)); // > [{ a: 'str1', b: 1, c: true }]
log(`03. merge({a:'str1', b:1, c:true}, undefined) => `, mergeFilters(obj1, obj4)); // > [{ a: 'str1', b: 1, c: true }]
log(`04. merge({a:'str1', b:1, c:true}, {aa:undefined, bb:null, cc:false, dd:0, ee:''}) => `, mergeFilters(obj1, obj5)); // > [{a: 'str1', b: 1, c: true, aa: undefined, bb: null, cc: false, dd: 0, ee: '' }]

log(`05. merge([{a1:'str1', b1:1, c1:true}, {a1:undefined, b1:null, c1:false, d1:0, e1:''}, {}, {x:23}, {y: 'yes'}, {z:'no'}], [{ a: 'str1', b: 1, c: false }, { aa: undefined, bb: null, cc: false, dd: 0, ee: '' }, { aaa: 'Hello', bbb: 1000, ccc: false }, {eee:231}, {www: 'this is nice', ff: 100000}]) => `, mergeFilters(arr1, arr2)); // >
    // [
      // { a1: 'str1', b1: 1, c1: true, a: 'str1', b: 1, c: false },
      // {
      //   a1: 'str1',
      //   b1: 1,
      //   c1: true,
      //   aa: undefined,
      //   bb: null,
      //   cc: false,
      //   dd: 0,
      //   ee: ''
      // },
      // { a1: 'str1', b1: 1, c1: true, aaa: 'Hello', bbb: 1000, ccc: false },
      // { a1: 'str1', b1: 1, c1: true, eee: 231 },
      // { a1: 'str1', b1: 1, c1: true, www: 'this is nice', ff: 100000 },
      // {
      //   a1: undefined,
      //   b1: null,
      //   c1: false,
      //   d1: 0,
      //   e1: '',
      //   a: 'str1',
      //   b: 1,
      //   c: false
      // },
      // {
      //   a1: undefined,
      //   b1: null,
      //   c1: false,
      //   d1: 0,
      //   e1: '',
      //   aa: undefined,
      //   bb: null,
      //   cc: false,
      //   dd: 0,
      //   ee: ''
      // },
      // {
      //   a1: undefined,
      //   b1: null,
      //   c1: false,
      //   d1: 0,
      //   e1: '',
      //   aaa: 'Hello',
      //   bbb: 1000,
      //   ccc: false
      // },
      // { a1: undefined, b1: null, c1: false, d1: 0, e1: '', eee: 231 },
      // {
      //   a1: undefined,
      //   b1: null,
      //   c1: false,
      //   d1: 0,
      //   e1: '',
      //   www: 'this is nice',
      //   ff: 100000
      // },
      // { a: 'str1', b: 1, c: false },
      // { aa: undefined, bb: null, cc: false, dd: 0, ee: '' },
      // { aaa: 'Hello', bbb: 1000, ccc: false },
      // { eee: 231 },
      // { www: 'this is nice', ff: 100000 },
      // { x: 23, a: 'str1', b: 1, c: false },
      // { x: 23, aa: undefined, bb: null, cc: false, dd: 0, ee: '' },
      // { x: 23, aaa: 'Hello', bbb: 1000, ccc: false },
      // { x: 23, eee: 231 },
      // { x: 23, www: 'this is nice', ff: 100000 },
      // { y: 'yes', a: 'str1', b: 1, c: false },
      // { y: 'yes', aa: undefined, bb: null, cc: false, dd: 0, ee: '' },
      // { y: 'yes', aaa: 'Hello', bbb: 1000, ccc: false },
      // { y: 'yes', eee: 231 },
      // { y: 'yes', www: 'this is nice', ff: 100000 },
      // { z: 'no', a: 'str1', b: 1, c: false },
      // { z: 'no', aa: undefined, bb: null, cc: false, dd: 0, ee: '' },
      // { z: 'no', aaa: 'Hello', bbb: 1000, ccc: false },
      // { z: 'no', eee: 231 },
      // { z: 'no', www: 'this is nice', ff: 100000 }
    // ]

log(`06. merge([{a1:'str1', b1:1, c1:true}, {a1:undefined, b1:null, c1:false, d1:0, e1:''}, {}, {x:23}, {y: 'yes'}, {z:'no'}], {a:'str1', b:1, c:true}) => `, mergeFilters(arr1, obj1)); // >   
    // [
    //   { a1: 'str1', b1: 1, c1: true, a: 'str1', b: 1, c: true },    
    //   {  a1: undefined,
    //     b1: null,
    //     c1: false,   
    //     d1: 0,
    //     e1: '',
    //     a: 'str1',
    //     b: 1,
    //     c: true
    //   },
    //   { a: 'str1', b: 1, c: true },
    //   { x: 23, a: 'str1', b: 1, c: true },
    //   { y: 'yes', a: 'str1', b: 1, c: true },
    //   { z: 'no', a: 'str1', b: 1, c: true }
    // ]


log(`07. merge({a:'str1', b:1, c:true}, [{a1:'str1', b1:1, c1:true}, {a1:undefined, b1:null, c1:false, d1:0, e1:''}, {}, {x:23}, {y: 'yes'}, {z:'no'}]) => `, mergeFilters(obj1, arr1)); // >
    // [
    //   { a1: 'str1', b1: 1, c1: true, a: 'str1', b: 1, c: true },
    //   {
    //     a1: undefined,
    //     b1: null,
    //     c1: false,
    //     d1: 0,
    //     e1: '',
    //     a: 'str1',
    //     b: 1,
    //     c: true
    //   },
    //   { a: 'str1', b: 1, c: true },
    //   { x: 23, a: 'str1', b: 1, c: true },
    //   { y: 'yes', a: 'str1', b: 1, c: true },
    //   { z: 'no', a: 'str1', b: 1, c: true }
    // ]


log('08.  merge([], {}) => ', mergeFilters(arr3, obj2));     // > {}
log('09.  merge({}, []) => ', mergeFilters(obj2, arr3));     // > {}
log('10.  merge(null, {}) => ', mergeFilters(obj3, obj2));   // > {}
log('11.  merge({}, null) => ', mergeFilters(obj2, obj3));   // > {}
log('12.  merge([], null) => ', mergeFilters(arr3, obj3));   // > {}
log('13.  merge(null, []) => ', mergeFilters(obj3, arr3));   // > []
log('14.  merge([], []) => ', mergeFilters(arr3, arr3));     // > []
log(`15.  merge([{a1:'str1', b1:1, c1:true}, {a1:undefined, b1:null, c1:false, d1:0, e1:''}, {}, {x:23}, {y: 'yes'}, {z:'no'}], []) => `, mergeFilters(arr1, arr3)); // >
    // [
    //   { a1: 'str1', b1: 1, c1: true },
    //   { a1: undefined, b1: null, c1: false, d1: 0, e1:b
    //   {},
    //   { x: 23 },
    //   { y: 'yes' },
    //   { z: 'no' }
    // ]
log(`16.  merge([], [{a1:'str1', b1:1, c1:true}, {a1:undefined, b1:null, c1:false, d1:0, e1:''}, {}, {x:23}, {y: 'yes'}, {z:'no'}]) => `, mergeFilters(arr3, arr1)); // >
    // [
    //   { a1: 'str1', b1: 1, c1: true },
    //   { a1: undefined, b1: null, c1: false, d1: 0, e1: '' },
    //   {},
    //   { x: 23 },
    //   { y: 'yes' },
    //   { z: 'no' }
    // ]

const a = [{a11:1,a12:2}, {a21:3,a22:4}]
const b = [{b11:5,b12:6}, {b21:7,b22:8}]
const c = [{c11:9,c12:10}, {c21:11,c22:12}]
const d = [{d11:13,d12:14}, {d21:15,d22:16}]
const e = {e11:17, e12:18}

const rrr = mergeFilters(a,b)
const ddd = mergeFilters(rrr, c)

//(a*b)*c

log('rrr: ', rrr)
log('ddd: ', ddd)


//log('mergeRec: ', mergeFiltersRec(a, b, c))
// log('mergeLoop 0: ', mergeLoop())
// log('mergeLoop 1: ', mergeLoop(a))
// log('mergeLoop 2: ', mergeLoop(a, b))
// log('mergeLoop 3: ', mergeLoop(a, b, c))
// log('mergeLoop 4: ', mergeLoop(a, b, c, d))
// log('mergeLoop 5: ', mergeLoop(d, a, c, b, d))
// log('mergeLoop 6: ', mergeLoop(null, undefined, 'asd'))
// log('mergeLoop 7: ', mergeLoop(a, b, e))
log('mergeLoop 8: ', mergeLoop(null))
log('reduce', mergeReduce(a,b,c))