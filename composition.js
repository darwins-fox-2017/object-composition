"use strict"
const fs        = require('fs')
const readFile  = fs.readFileSync('cookies.txt', 'utf-8').trim().split('\n')

class Cookies {
  constructor(nama, ingredients) {
    this.nama        = nama
    this.ingredient  = ingredients
  }
}

class Ingredients {
  constructor(nama, amount, has_sugar) {
    this.nama   = nama
    this.amount = amount
    this.sugar  = has_sugar
  }
}

class PeanutButter extends Cookies {
  constructor(nama, ingredients) {
    super(nama, ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookies {
  constructor(nama, ingredients) {
    super(nama, ingredients)
    this.choc_chip = 200
  }
}

class OtherCookies extends Cookies {
  constructor(nama, ingredients) {
    super(nama, ingredients)
    this.choc_chesse = 150
  }
}

function cookiesFactory(arr) {
  var num = []

  for (let i = 0; i < arr.length; i++) {
    num.push(arr[i].split(':'))
  }

  let getA      = [],
      getB      = [],
      object    = [],
      sugarFree = false

  for (let i = 0; i < num.length; i++) {
    getA.push(num[i][0])
    if (num[i][1].includes("sugar")) {
      sugarFree = true
    }
    getB.push(num[i][1])
  }
  // console.log("Punya A "+getA);
  // console.log("Punya B "+getB);
  for (let i = 0; i < getA.length; i++) {
    object.push(new Ingredients(getB[i], getA[i], sugarFree))
  }
  return object
}

class CookieFactory {
  constructor() {
    this.result = []
  }

  create(option){
    let resultSplit = [],
        cookies     = [],
        ingredients = [],
        composition = [];

    for (let i = 0; i < readFile.length; i++) {
      resultSplit.push(readFile[i].trim().split(' = '))
    }

    for (let i = 0; i < resultSplit.length; i++) {
      cookies.push(resultSplit[i][0])
      ingredients.push(resultSplit[i][1])
    }

    for (let i = 0; i < ingredients.length; i++) {
    composition.push(ingredients[i].split(','))
    }
    console.log(cookies);
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i] == "peanut butter") {
        let resultPeanut = cookiesFactory(composition[i])
        this.result.push(new PeanutButter(cookies[i], resultPeanut))
      }else if (cookies[i] == "chocolate chip") {
        let resultChip  = cookiesFactory(composition[i])
        this.result.push(new ChocolateChip(cookies[i], resultChip))
      }else{
        let resultOther  = cookiesFactory(composition[i])
        this.result.push(new OtherCookies(cookies[i], resultOther))
      }
    }//end for cookies
    return this.result
  }
}

let resultCookiesFactory  = new CookieFactory()
console.log(JSON.stringify(resultCookiesFactory.create("cookies.txt")));
