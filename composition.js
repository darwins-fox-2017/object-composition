
let fs = require('fs')
class Cookies {
  constructor(ingredient) {
    this.status = "MENTAH"
    this.ingredient = ingredient
  }
}

class Ingredient {
  constructor(bahan) {
    this.amount = bahan[0]
    this.name = bahan[1]
  }
}

class peanutCookies extends Cookies {
  constructor(ingredient) {
    super(ingredient)
    this.name = "Peanut Cookies"
    this.count = 100
  }
}

class chocolateChip extends Cookies {
  constructor(ingredient) {
    super(ingredient)
    this.name = "Chocolate Chip"
    this.count = 200
  }
}

class otherCookies extends Cookies {
  constructor(ingredient) {
    super(ingredient)
    this.name = "Other Cookies"
    this.count = 150
  }
}

class CookieFactory {
  constructor() {
    this.cookies = []
  }

  create(cookies, ingredient) {
    // console.log(ingredient[0])
    let isiIngredient = []

    for(let i=0; i<cookies.length; i++) {
      let ingredients = []
      if(/peanut butter/.test(cookies[i])) {
        for(let j=0; j<ingredient[i].length; j++) {
          isiIngredient = new Ingredient(ingredient[i][j])
          ingredients.push(isiIngredient)
        }
        let cookiez = new peanutCookies(ingredients)
        this.cookies.push(cookiez)
      }
      else if(/chocolate chip/.test(cookies[i])) {
        for(let j=0; j<ingredient[i].length; j++) {
          isiIngredient = new Ingredient(ingredient[i][j])
          ingredients.push(isiIngredient)
        }
        let cookiez = new chocolateChip(ingredients)
        this.cookies.push(cookiez)
      }
      else {
        for(let j=0; j<ingredient[i].length; j++) {
          isiIngredient = new Ingredient(ingredient[i][j])
          ingredients.push(isiIngredient)
        }
        let cookiez = new otherCookies(ingredients)
        this.cookies.push(cookiez)
      }

    }
    console.log(this.cookies)
  }

  gratisGula() {
    let gulaGratis = []
    for(let i=0; i<this.cookies.length; i++) {
      let sugarFree = []
      for(let j=0; j<this.cookies[i].ingredient.length; j++) {
        sugarFree.push(this.cookies[i].ingredient[j].name)
      }
      if(sugarFree.indexOf(' sugar') === -1)
        {gulaGratis.push(this.cookies[i])}
    }
    console.log(JSON.stringify(gulaGratis))
  }



}

let data = fs.readFileSync("cookies.txt", "utf-8").split('\n')

// List kue yang harus dibuat.
let splitted = []
let listCreateCookies = []
for(let i=0; i<data.length-1; i++) {
  splitted[i] = data[i].split('=')
  listCreateCookies.push(splitted[i][0])
}
// console.log(listCreateCookies)

// List ingredient.
let ingredientCookies = []
for(let i=0; i<listCreateCookies.length; i++) {
  ingredientCookies[i] = splitted[i][1].split(',')
}

let detailIngredient = []
for(let i=0; i<listCreateCookies.length; i++) {
  detailIngredient[i]=[]
  for(let j=0; j<ingredientCookies[i].length; j++) {
    detailIngredient[i][j] = ingredientCookies[i][j].split(':')
  }
}
// console.log(detailIngredient)


let PabrikKue = new CookieFactory()
PabrikKue.create(listCreateCookies, detailIngredient)
console.log("-----------------------------")
PabrikKue.gratisGula()
