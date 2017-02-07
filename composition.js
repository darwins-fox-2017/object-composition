let fs = require('fs')

class Cookies{
  constructor(cookiesProperties){
    this.type = cookiesProperties.type
    this.state = 'mentah'
    this.nowState = 0
    this.interval = 5
    this.overCookingAt = cookiesProperties.overCookingAt // in minute
    this.ingredients = null
  }

  bake(){
    this.state = 'selesai'
  }
}
// Read write file
class Ingredient{
  constructor(ingredientFile){
    this.ingredientFile = ingredientFile
    this.ingredients = []
  }

  parseIngredientFile(){
    let dataFromFile = fs.readFileSync(this.ingredientFile).toString().split('\n');
    let result = []
    for (var i = 0; i < dataFromFile.length; i++) {
      if (!dataFromFile[i] == '') {
        result.push(dataFromFile[i].replace(/\r?\n|\r/g, " "))
      }
    }
    return result
  }

  splitting(parsedData){
    let result = []
    for (let i = 0; i < parsedData.length; i++) {
      let element = {}
      element.ingredients = []
      // bagi dengan tanda baca
      let row = parsedData[i].match(/[^=,]+/g)
      // object
      //remove spasi akhir
      element.name = row[0].substring(0, row[0].length - 1);
      // split by koma
      let subRow = parsedData[i].split(', ')
      // ulang sebanyak item ingredient
      for (let j= 0; j < subRow.length; j++) {
        let ingredient  = {}
        if (j == 0) {
          let getRow = this.removeName(subRow)
          ingredient.name = this.getIngredientName(getRow[0]).toString()
          ingredient.amount = this.getAmount(getRow[0]).toString()
          element.ingredients.push(ingredient)
        } else{
          ingredient.name = this.getIngredientName(subRow[j]).toString()
          ingredient.amount = this.getAmount(subRow[j]).toString()
          element.ingredients.push(ingredient)
        }
      }
      result.push(element)
    }
    return result
  }

  removeName(string){
    return string[0].split(' = ').splice(1)
  }

  getAmount(string){
    return string.split(' : ').splice(0,1)
  }

  getIngredientName(string){
    return string.split(' : ').splice(1,1)
  }


}

class PeanutButter extends Cookies{
  constructor(peanutButterProperties) {
    super(peanutButterProperties)
    this.type = peanutButterProperties.type
    this.overCookingAt = peanutButterProperties.overCookingAt || 10
    this.ingredients = peanutButterProperties.ingredients
  }
}

class ChocoChip extends Cookies{
  constructor(chocoChipProperties) {
    super(chocoChipProperties)
    this.overCookingAt = chocoChipProperties.overCookingAt || 10
    this.type = chocoChipProperties.type
    this.ingredients = chocoChipProperties.ingredients
  }
}

class OtherCookie extends Cookies{
  constructor(otherCookieProperties) {
    super(otherCookieProperties)
    this.type = otherCookieProperties.type
    this.overCookingAt = otherCookieProperties.overCookingAt || 10
    this.ingredients = otherCookieProperties.ingredients
  }
}

class CookieFactory{
  constructor(cookieFactoryProperties){
    this.cookieList = []
    this.dataFromParsedFile = []
    this.fileName = cookieFactoryProperties.fileName
  }

  parse(){
    let ingredient = new Ingredient(this.fileName)
    let parsedData = ingredient.parseIngredientFile()
    this.dataFromParsedFile = ingredient.splitting(parsedData)
  }

  assignment(){
    for (var i = 0; i < this.dataFromParsedFile.length; i++) {
      switch (this.dataFromParsedFile[i].name) {
        case 'peanut butter':
          this.cookieList.push(new PeanutButter({
            type: this.dataFromParsedFile[i].name,
            ingredients: this.dataFromParsedFile[i].ingredients
          }))
          break;
        case 'chocolate chip':
          this.cookieList.push(new ChocoChip({
            type: this.dataFromParsedFile[i].name,
            ingredients: this.dataFromParsedFile[i].ingredients
          }))
          break
        default:
          this.cookieList.push(new OtherCookie({
            type: this.dataFromParsedFile[i].name,
            ingredients: this.dataFromParsedFile[i].ingredients
          }))
      }
    }
    return this.cookieList
  }

  display(){
    return this.cookieList
  }

  cookieRecomendation(){
    let withoutSugar = []
    for (let i = 0; i < this.cookieList.length; i++) {
      let isContainSugar = false
      for (let j = 0; j < this.cookieList[i].ingredients.length; j++) {
        if (this.cookieList[i].ingredients[j].name == 'sugar') {
          isContainSugar = true
        }
      }
      if(isContainSugar == false){
        withoutSugar.push(this.cookieList[i])
      }
    }

    return withoutSugar
  }
}

let peanutButterProperties = {
  type: 'peanut butter',
  overCookingAt: 25
}

let chocoChipProperties = {
  type: 'Choco Chip',
  overCookingAt: 15
}

let otherCookieProperties = {
  type: 'Other Cookie',
  overCookingAt: 20
}

let cookieStore = new CookieFactory({fileName: 'cookies.txt'})
cookieStore.parse()
cookieStore.assignment()
console.log('======= DISPLAY ALL ==========');
console.log(cookieStore.display());
console.log('======== Without Sugar ==========');
console.log(cookieStore.cookieRecomendation('thuesday'));
