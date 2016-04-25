# Rx-factory

Factories for Rx.Observable methods of [rx.js](https://github.com/Reactive-Extensions/RxJS).  

```bash
npm i rx-factory -S
```

```js
import {just, merge, interval} from 'rx-factory'

let source$ = merge([
 just(0),
 interval(1000)
])     
```

It also provides `combine` factory that acts like `combineLatest` 
and also acts like [`combineLatestObj`](https://github.com/staltz/combineLatestObj) if single plain object is passed. 

```js
import {just, interval, combine} from 'rx-factory'

let foo$ = interval(1000)
let bar$ = interval(5000)

let source$ = combine({foo$, bar$})
  .map(({foo, bar}) =>  foo + bar)  
```