"use strict"
const fs      = require('fs')

class Cookies {
  constructor(nama, ingredients) {
    this.nama        = nama
    this.ingredient  = ingredients
  }
}

class Ingredients {
  constructor(nama, amount) {
    this.nama   = nama
    this.amount = amount
  }
}

class PeanutButter extends Cookies {
  constructor(nama, ingredients) {
    super(name, ingredients)
  }
}

class ChocolateChip extends Cookies {
  constructor(nama, ingredients) {
    super(nama, ingredients)
  }
}

class ChocolateCheese extends Cookies {
  constructor(nama, ingredients) {
    super(nama, ingredients)
  }
}

class ChocolateButter extends Cookies {
  constructor(nama, ingredients) {
    super(nama, ingredients)
  }
}

function cookiesFactory(arr) {
  let num = []

  for (let i = 0; i < arr.length; i++) {
    num.push(arr[i].split(' : '))
  }

  let getA   = [],
      getB   = [],
      object = [];

  for (let i = 0; i < num.length; i++) {
    getA.push(num[i][0])
    getB.push(num[i][1])
  }

  for (let i = 0; i < getA.length; i++) {
    object.push(new Ingredients(getB[i], getA[i]))
  }
  return object
}

class CookieFactory {
  constructor() {
    this.result = []
  }

  create(option){
    let readFile    = fs.readFileSync('cookies.txt', 'utf-8').trim().split('\n')
    let resultSplit = [],
        cookies     = [],
        ingredients = [],
        composition = [];

    for (let i = 0; i < readFile.length; i++) {
      resultSplit.push(readFile[i].split('='))
    }

    for (let i = 0; i < resultSplit.length; i++) {
      cookies.push(resultSplit[i][0])
      ingredients.push(resultSplit[i][1])
    }

    for (let i = 0; i < ingredients.length; i++) {
    composition.push(ingredients[i].split(','))
    }

    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i] == "peanut butter") {
        let resultPeanut = cookiesFactory(composition[i])
        this.result.push(new PeanutButter(cookies[i], resultPeanut))
      }else if (cookies[i] == "chocolate chip") {
        let resultChip  = cookiesFactory(composition[i])
        this.result.push(new ChocolateChip(cookies[i], resultChip))
      }else if (cookies[i] == "chocolate cheese") {
        let resultCheese  = cookiesFactory(composition[i])
        this.result.push(new ChocolateCheese(cookies[i], resultCheese))
      }else if (cookies[i] == "chocolate butter") {
        let resultButter  = cookiesFactory(composition[i])
        this.result.push(new ChocolateButter(cookies[i], resultButter))
      }
    }//end for cookies
    return this.result
  }
}

let resultCookiesFactory  = new CookieFactory()
console.log(JSON.stringify(resultCookiesFactory.create("cookies.txt")));
