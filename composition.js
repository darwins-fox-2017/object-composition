"use strict"
const fs = require('fs')
let data = fs.readFileSync('cookies.txt', 'utf-8').trim().split('\n');

class Cookie{
  constructor(ingredients){
    this.status = "Mentah"
    this.ingredients = ingredients
  }
  baku(){
    this.status = "Selesai dimasak"
  }
}
class PeanutButter extends Cookie{
  constructor(ingredients){
    super(ingredients)
    this.peanut_count = 100
  }
}
class ChocolateChip extends Cookie{
  constructor(ingredients){
    super(ingredients)
    this.choc_chip_count = 200
  }
}
class ChocolateCheese extends Cookie{
  constructor(ingredients){
  super(ingredients)
  this.choc_chip_count = 200
  }
}
class ChocolateButter extends Cookie{
  constructor(ingredients){
  super(ingredients)
  }
}
class Ingredients {
  constructor(options) {
      this.name = options['name']
      this.amount = options['amount']
      this.has_gluten = options['has_gluten']
  }
}
class Oven{
    static create(hasilReadfile){

      let tampungCookies = []
        for (let i = 0; i < data.length; i++) {
         let name = hasilReadfile[i].split("=")[0].trim()
         let ingredients = hasilReadfile[i].split("=")[1].trim().split(',')

         let bahanKue =[]
         for (var j = 0; j < ingredients.length; j++) {
           bahanKue.push(new Ingredients({
             name : ingredients[j].split(':')[1].trim(),
             amount : ingredients[j].split(':')[0].trim(),
             has_gluten : ingredients[j].includes('gluten')
           }))
         }
        //  console.log(bahanKue);
         switch(name){
           case "peanut butter":
              tampungCookies.push(new PeanutButter(bahanKue))
              break;

          case "chocolate chip":
              tampungCookies.push(new ChocolateChip(bahanKue))
              break;

          case "chocolate cheese":
              tampungCookies.push(new ChocolateCheese(bahanKue))
              break;

          case "chocolate butter":
              tampungCookies.push(new ChocolateButter(bahanKue))
              break;
         }
       }
       return tampungCookies

     }
     static freeSugar(tampungCookies){
       let hasil = []
       for (var i = 0; i < tampungCookies.length; i++) {
        let ingredientsArr = []
          for (var j = 0; j < tampungCookies[i].ingredients.length; j++) {
            ingredientsArr.push(tampungCookies[i].ingredients[j]['name'])
          }
          if(ingredientsArr.indexOf('sugar') == -1){
            hasil.push(tampungCookies[i])
          }
       }
       console.log(hasil)
     }
   }
let tampungCookies = Oven.create(data)
Oven.freeSugar(tampungCookies)
