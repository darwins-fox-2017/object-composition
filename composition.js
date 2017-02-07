class Cookies{
  constructor(nameOfCookie,ingredients){
    this.name = nameOfCookie
    this.status = 'mentah'
    this.ingredients = ingredients

  }

  bake(){
    this.status = "cooked"
  }
}

class Ingredients{
  constructor(options){
    this.name     = options['name'] // name of bahan
    this.amount   = options['amount']
    this.has_sugar   = options['has_sugar']
  }
}

class PeanutButter extends Cookies{
  constructor(nameOfCookie,ingredients){
    super(nameOfCookie,ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookies{
  constructor(ingredients){
    super(nameOfCookie,ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookies{
  constructor(nameOfCookie,ingredients){
    super(nameOfCookie,ingredients)
    this.other_count = 150
  }
}

class CookiesFactory{
  constructor(){
    this.lists = []
  }

  create(option){
    for(let i=0; i<option.length; i++){

      let list = option[i].split("=")
      let nameOfCookie = list[0].trim()// nama kue
      let ingredients = list[1].trim().split(",")// nama2 bahan
      let bahan = [] // bahan dalam bentuk objek?
      let sugarFree  = false

      for (let j=0; j < ingredients.length; j++) {
        if(ingredients[j].includes('sugar')){
          sugarFree  = true
        }else{
          sugarFree  = false
        }
        ingredients[j] = ingredients[j].split(":")
        bahan.push(new Ingredients({
          'name' : ingredients[j][1].trim(),
          'amount' : ingredients[j][0].trim(),
          'has_sugar' : sugarFree,

        }))
      }

      switch (nameOfCookie) {
        case "choco chip":
          this.lists.push(new ChocolateChip(nameOfCookie,bahan))
          break;
        case "peanut butter":
          this.lists.push(new PeanutButter(nameOfCookie,bahan))
        break;
        default:
          this.lists.push(new OtherCookie(nameOfCookie,bahan))
      }
    }
    return this.lists
  }
}

let fs = require('fs')
let data = fs.readFileSync("cookies.txt","utf-8").trim().split("\n")
let CookieFactory = new CookiesFactory()
let batch_of_cookies = CookieFactory.create(data)

console.log(batch_of_cookies);
