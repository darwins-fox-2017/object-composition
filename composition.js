"use strict"

const fs = require('fs')

class Cookie {
  constructor(name, ingredient) {
    this.name       = name
    this.ingredient = ingredient
    this.status     = "Mentah"
  }

  bake(name, amount) {
    this.status     = "Sudah dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient)
    this.peanutbutter_count = 100
  }

  bake() {
    super.bake()
  }

  ingredients() {
    this.ingredient.push(new Ingredient(name, amount))
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient)
    this.chocolatechip_count = 200
  }

  bake() {
    super.bake()
  }

  ingredients() {
    this.ingredient.push(new Ingredient(name, amount))
  }
}

class ChocolateCheese extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient)
    this.chocolatechesse_count = 250
  }

  bake() {
    super.bake()
  }

  ingredients() {
    this.ingredient.push(new Ingredient(name, amount))
  }
}

class ChocolateButter extends Cookie {
  constructor(name, ingredient) {
    super(name, ingredient)
    this.chocolatebutter_count = 300
  }

  bake() {
    super.bake()
  }

  ingredients() {
    this.ingredient.push(new Ingredient(name, amount))
  }
}

let peanutButter = new PeanutButter();
peanutButter.bake();
let chocolateChip = new ChocolateChip();
chocolateChip.bake();
let chocolateCheese = new ChocolateCheese();
chocolateCheese.bake();
let chocolateButter = new ChocolateButter();
chocolateButter.bake();

class Ingredient {
  constructor(name, composition){
    this.name         = name
    this.composition  = composition
  }
}

class CookieFactory {
  constructor() {
    this.cookiesList = []
  }

  create(data) {
    let cookies    = fs.readFileSync(data, "utf-8").trim().split('\n')
    let get        = []
    let name       = []
    let component  = []
    let value      = []
    let qty        = []
    let ingredient = []

    for (let i = 0; i < cookies.length; i++) {
      get.push(cookies[i].split(' = '))
      component.push(get[i][1].split(', '));
      name.push(get[i][0])
      let arr = []
      value.push(arr)
      let arr2 = []
      qty.push(arr2)
      let arr3 = []
      ingredient.push(arr3)
        for(let j = 0; j < component[i].length; j++){
          value[i].push(component[i][j].split(' : '))
          qty[i].push(value[i][j][0]);
          ingredient[i].push(value[i][j][1])
        }
    }

    let ingredients = [];
    for(let i = 0; i < ingredient.length; i++){
      let arr = []
      ingredients.push(arr);
      for (let j = 0; j < ingredient[i].length; j++) {
        ingredients[i].push({
          ingredient  : ingredient[i][j],
          composition : qty[i][j]
        })
      }
    }

    for(let i = 0; i < name.length; i++){
      if(name[i] === "peanut butter"){
        this.cookiesList.push(new PeanutButter(name[i], ingredient[i]))
      } else if(name[i] === "chocolate chip"){
        this.cookiesList.push(new ChocolateChip(name[i], ingredient[i]))
      } else if(name[i] === "chocolate cheese"){
        this.cookiesList.push(new ChocolateCheese(name[i], ingredient[i]))
      } else if(name[i] === "chocolate butter"){
        this.cookiesList.push(new ChocolateButter(name[i], ingredient[i]))
      }
    }
    return this.cookiesList
  }

  cookieRecommendation(){
    for(let i = 0; i < this.cookiesList.length; i++){
      for(let j = 0; j < this.cookiesList[i].ingredient.length; j++){
        if(this.cookiesList[i].ingredient[j]['ingredient'] === 'gluten free flour'){
          return this.cookiesList[i].name
        }
      }
    }
  }
}

let cookieFactory = new CookieFactory();
let new_cookies   = cookieFactory.create('cookies.txt');
console.log(new_cookies);

let menu_tuesday  = cookieFactory.cookieRecommendation();
console.log("Menu for tuesday is :");
console.log(menu_tuesday)

// let chocolateCheese = new ChocolateCheese();
// chocolateCheese.bake();
//
// class Ingredients {
//   constructor(bahan, komposisi) {
//     this.bahan = bahan
//     this.komposisi = komposisi
//   }
// }
//
//
// class CookieFactory {
//   constructor() {
//     this.cookies = [];
//   }
//
//   create(filename){
//     let cookieList = fs.readFileSync(filename, 'utf-8').trim().split("\n")
//     let get = [];
//     let nama = [];
//     let component = [];
//     let value = []
//     let jumlah = [];
//     let bahan = []
//
//     for (let i = 0; i < cookieList.length; i++) {
//       get.push(cookieList[i].split(' = '))
//       component.push(get[i][1].split(', '));
//       nama.push(get[i][0])
//       let arr = []
//       value.push(arr)
//       let arr2 = []
//       jumlah.push(arr2)
//       let arr3 = []
//       bahan.push(arr3)
//       for(let j = 0; j < component[i].length; j++){
//         value[i].push(component[i][j].split(' : '))
//         jumlah[i].push(value[i][j][0]);
//         bahan[i].push(value[i][j][1])
//       }
//     }
//
//     let ingredients = [];
//     for(let i = 0; i < bahan.length; i++){
//       let arr = []
//       ingredients.push(arr);
//       for (let j = 0; j < bahan[i].length; j++) {
//         ingredients[i].push({
//           bahan: bahan[i][j],
//           komposisi: jumlah[i][j]
//         })
//       }
//     }
//
//     for(let i = 0; i < nama.length; i++){
//       if(nama[i] === "peanut butter"){
//         this.cookies.push(new PeanutButter(nama[i], ingredients[i]))
//       } else if(nama[i] === "chocolate chip"){
//         this.cookies.push(new ChocolateChip(nama[i], ingredients[i]))
//       } else if(nama[i] === "chocolate cheese"){
//         this.cookies.push(new ChocolateCheese(nama[i], ingredients[i]))
//       } else if(nama[i] === "chocolate butter"){
//         this.cookies.push(new ChocolateButter(nama[i], ingredients[i]))
//       }
//     }
//     return this.cookies
//   }
//
//   // Cari Bahan yang gluten free
//   cookieRecommendation(){
//     for(let i = 0; i < this.cookies.length; i++){
//       for(let j = 0; j < this.cookies[i].bahan.length; j++){
//         if(this.cookies[i].bahan[j]['bahan'] === 'gluten free flour'){
//           return this.cookies[i].nama
//         }
//       }
//     }
//   }
//
// }
//
//
// let cookieFactory = new CookieFactory();
// let batch_of_cookies = cookieFactory.create('cookies.txt');
// console.log(batch_of_cookies);
//
// let tuesdayFoods = cookieFactory.cookieRecommendation();
// console.log("food for tuesday is :");
// console.log(tuesdayFoods)
