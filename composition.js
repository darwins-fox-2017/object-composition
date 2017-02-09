'use strict'

const fs = require('fs') 



class Ingredient {
    constructor(ingredients) {
       this.name       = ingredients.name 
       this.amount     = ingredients.amount
       this.has_gluten = ingredients.has_gluten
    }
}

class Cookie {
    constructor(name, ingredients) {
        this.name        = name
        this.status      = 'mentah' 
        this.ingredients = ingredients
    }

    bake(ingre) {
        this.status = 'selesai dimasak'
            
    }
}

class PeanutButter extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, ingredients) {
       super(name, ingredients)
       this.choc_chip_count = 200 
    }
}

class OtherCookie extends Cookie {
    constructor(name, ingredients) {
        super(name, ingredients)
        this.other_count = 150
    }
}

class CookieFactory {
    constructor () {
        this.cookiesList
    }

    static create(options) {
        let list = []
        let cookies = fs.readFileSync('cookies.txt').toString().split('\n') 
        for (let i = 0; i < cookies.length; i++) {
            let cookiesData     = cookies[i].toString().split(' = ')
            let product         = cookiesData[0]
            let ingredientsData = cookiesData[1].split(', ')
            let ingredients     = []
            for (let j = 0; j < ingredientsData.length; j++) {
                let ingredient            = ingredientsData[j].split(' : ')
                let name                  = ingredient[1] 
                let amount                = ingredient[0]
                let hasGluten             = /gluten/g.test(ingredient[1])

                let ingData = {name: name, amount: amount, has_gluten: hasGluten}

                ingredients.push(new Ingredient(ingData))
            }

            switch (product) {
                case 'peanut butter':
                    list.push(new PeanutButter(product, ingredients))
                    break;
                case 'chocolate chip':
                    list.push(new ChocolateChip(product, ingredients)) 
                    break;
                default:
                    list.push(new OtherCookie(product, ingredients))
            }
        }
        this.cookiesList = list
        console.log(this.cookiesList);
    }

    checkGluten(ingredient) {
        return /gluten/g.test(ingredient)

    }

    convertToClassName(name) {
        let split = name.split(' ')
        let result = ''
        for (let i = 0; i < split.length; i++) {
            let word = split[i].split('') 
            word[0] = word[0].toUpperCase()
            result += word.join('')
        }
        return result
    }

}


const fact = new CookieFactory()
// fact.convertToClass('danang aji')
CookieFactory.create()

