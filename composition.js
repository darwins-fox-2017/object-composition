'use strict'
const fs = require('fs');
var source = fs.readFileSync('cookies.txt','utf-8').trim().split('\n')

class Cookie {
  constructor(ingridients) {
    this.status = 'mentah'
    this.ingridients = ingridients
  }

  baku() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(ingridients) {
    super(ingridients)
    this.peanutCount = 100

  }
}

class ChocholateChip extends Cookie {
  constructor(ingridients) {
    super(ingridients)
    this.ChocholateCount = 100

  }
}

class ChocolateCheese  extends Cookie {
  constructor(ingridients) {
    super(ingridients)
    this.ChocholateCount = 100

  }
}

class ChocolateButter extends Cookie {
  constructor(ingridients) {
    super(ingridients)
    this.ChocholateCount = 100

  }
}

class Ingridient {
  constructor(object) {
    this.name = object['name']
    this.amount = object['amount']
    this.hasGluten = object['hasGluten']
  }
}

class Oven {
  static create(list){
    let cookies = []
    for(let i = 0; i < list.length; i++) {
      var name = list[i].split('=')[0].trim()
      var ingridients = list[i].split('=')[1].trim().split(',')
      var array = []
      for(let j = 0; j < ingridients.length; j++) {
        array.push(new Ingridient( {name: ingridients[j].split(':')[1].trim(),
        amount: ingridients[j].split(':')[0].trim(),
        hasGluten: ingridients[j].includes('gluten') } ))
      }
      switch (name) {
        case "peanut butter":
            cookies.push(new PeanutButter(array))
          break;
        case "chocolate chip":
            cookies.push(new ChocholateChip(array))
          break;
        case "chocolate cheese":
            cookies.push(new ChocolateCheese(array))
          break;
        case "chocolate butter":
            cookies.push(new ChocolateButter(array))
          break;
      }
    }
    return cookies
  }

  static noSugar(cookies) {
    let result = []
    for(let i = 0; i < cookies.length; i++) {
      //cookies[i].ingridients.includes('')
      let arr_ingridients = []
      //console.log(cookies[i].ingridients);
      for(let j = 0; j < cookies[i].ingridients.length; j++) {
        //console.log(cookies[i].ingridients[j]['name']);
        arr_ingridients.push(cookies[i].ingridients[j]['name'])
      }
      //console.log(arr_ingridients);
      if(arr_ingridients.indexOf('sugar') == -1) {
        result.push(cookies[i])
      }
    }
    console.log(result);
  }
}

//Oven.create(source
//console.log(Oven.noSugar());
var cookies = Oven.create(source)
Oven.noSugar(cookies)
