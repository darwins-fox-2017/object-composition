"use strict"

const fs = require('fs')

let list = fs.readFileSync('cookies.txt','utf-8').trim().split('\n')
// console.log(list);

class Cookie {
  constructor(ingredients) {
    this.status = 'uncooked'
    this.ingredients = ingredients
  }

  status() {
    this.status = 'well done'
  }
}

class Ingredients {
  constructor(obj) {
    this.name = obj['name']
    this.amount = obj['amount']
    this.hasGluten = obj['hasGluten']
  }
}


class PeanutButter extends Cookie {
  constructor(ingredients) {
    super(ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(ingredients) {
    super(ingredients)
    this.choc_chic_count = 200
  }
}

class ChocolateCheese extends Cookie {
  constructor(ingredients) {
    super(ingredients)
    this.choc_chic_count = 200
  }
}

class ChocolateButter extends Cookie {
  constructor(ingredients) {
    super(ingredients)
    this.choc_chic_count = 200
  }
}

class CookieFactory {
  static create(option) {
    let result = []
    for(let i = 0; i < list.length; i++) { //kalo salah list.length ganti option.length
      let cookieName = option[i].split('=')[0].trim()
      let ingredients = option[i].split('=')[1].trim().split(',')
      let arr = []

      for(let j = 0; j < ingredients.length;j++) {
        arr.push(new Ingredients({
          name: ingredients[j].split(':')[1].trim(),
          amount: ingredients[j].split(':')[0].trim(),
          hasGluten: ingredients[j].includes('gluten')
        }))
      }

      switch (cookieName) {
        case 'peanut butter':
          result.push(new PeanutButter(arr))
          break;

        case 'chocolate chip':
          result.push(new ChocolateButter(arr))
          break;

        case 'chocolate cheese':
          result.push(new ChocolateCheese(arr))
          break;

        case 'chocolate butter':
          result.push(new ChocolateButter(arr))
          break;
      }
    }
    // console.log(result);
    return result
  }

  static sugarFree(result) {
    let noSugar = []
    for (let i = 0;i < result.length;i++) {
      let tmp = []
      for(let j = 0; j < result[i].ingredients.length; j++) {
        tmp.push(result[i].ingredients[j].name)
      }
      if(tmp.indexOf('sugar') == -1) {
        noSugar.push(result[i])
      }
    }
    console.log(noSugar);
  }
}

let cookies = CookieFactory.create(list)
CookieFactory.sugarFree(cookies)
