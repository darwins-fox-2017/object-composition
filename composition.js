class Cookies{
  constructor(name, ingredients){
    this.name = name
    this.status = 'mentah'
    this.ingredients = ingredients

  }

  bake(){
    this.status = "cooked"
  }
}

class Ingredients{
  constructor(options){
    this.name     = options['name']
    this.amount   = options['amount']
    this.has_gluten   = options['has_gluten']
  }
}

class PeanutButter extends Cookies{
  constructor(name,ingredients){
    super(name,ingredients)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookies{
  constructor(ingredients){
    super(name, ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookies{
  constructor(name,ingredients){
    super(name, ingredients)
    this.other_count = 150
  }
}

class CookiesFactory{
  constructor(){
    this.listsCookies = []
  }

  create(option){
    for(let i=0; i<option.length; i++){

      let list = option[i].split("=")
      let name = list[0].trim()
      let ingredients = list[1].trim().split(",")
      let ingredientsDetail = []
      let glutenFree  = false

      for (let j=0; j < ingredients.length; j++) {
        if(ingredients[j].includes('(gluten)')){
          glutenFree  = true
        }else{
          glutenFree  = false
        }
        
        ingredients[j] = ingredients[j].split(":")
        ingredientsDetail.push(new Ingredients({
          'name' : ingredients[j][1].trim(),
          'amount' : ingredients[j][0].trim(),
          'has_gluten' : glutenFree,
        }))
      }

      switch (name) {
        case "choco chip":
          this.listsCookies.push(new ChocolateChip(name,ingredientsDetail))
          break;
        case "peanut butter":
          this.listsCookies.push(new PeanutButter(name,ingredientsDetail))
        break;
        default:
          this.listsCookies.push(new OtherCookie(name,ingredientsDetail))
      }
    }
    return this.listsCookies
  }

  freeSugar(cookiesDetails){
    let SugarCookies =[]
    let freeSugarCookies =[]
    for(let i=0; i<cookiesDetails.length; i++){
      var temp = cookiesDetails[i].ingredients
      for (var j = 0; j<temp.length; j++) {
        if(temp[j].name == 'sugar'){
          SugarCookies.push(cookiesDetails[i].name)
          break
        }
      }
      if(!SugarCookies.includes(cookiesDetails[i].name)){
        console.log(`Free Sugar ?`);
        console.log(`- ${cookiesDetails[i].name}`);
      }
    }
  }

  checkAmount(cookiesDetails, name, Ingredients){
    let detailsAmount =[]
    for(let i=0; i<cookiesDetails.length; i++){
      if(cookiesDetails[i].name == name){
        var temp = cookiesDetails[i].ingredients
        for (var j = 0; j<temp.length; j++) {
          if(temp[j].name == Ingredients){
            console.log(`this ${cookiesDetails[i].name} cookie contains ${temp[j].amount} of ${temp[j].name}`);
            break
          }
        }
      }
    }
  }
}

let fs = require('fs')
let data = fs.readFileSync("cookies.txt","utf-8").trim().split("\n")
let CookieFactory = new CookiesFactory()
let batch_of_cookies = CookieFactory.create(data)

console.log(batch_of_cookies);
CookieFactory.freeSugar(batch_of_cookies)
//CookieFactory.checkAmount(batch_of_cookies,'peanut butter','butter')
