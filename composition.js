"use strict"

let fs = require('fs')
let data = fs.readFileSync('cookies.txt', 'utf-8').trim().split('\n')

class Cookie {
	constructor(ingredients) {
		this.status = "Mentah"
		this.ingredients = ingredients
	}

	bake() {
		this.status = "Selesai dimasak"
	}
}

class PeanutButter extends Cookie {
	
	constructor(ingredients) {
		super(ingredients)
		this.peanut_count = 100
	}
}

class ChocholateChip extends Cookie {
	
	constructor(ingredients) {
		super(ingredients)
		this.choc_chip_count = 200
	}
}

class chocolateCheese extends Cookie {
	
	constructor(ingredients) {
		super(ingredients)
		this.chocolateCheese_count = 200
	}
}

class chocolateButter extends Cookie {
	
	constructor(ingredients) {
		super(ingredients)
		this.chocolate_butter_count = 200
	}
}

class Ingredients {
	constructor(options) {
		this.name = options['name']
		this.amount = options['amount']
		this.has_gluten = options['has_gluten']
	}
}


class CookieFactory {
	static create(resultData) {
		let tmp_cookies = []

		for(let i = 0; i < data.length; i++) {
			let name = resultData[i].split("=")[0].trim()
         	let ingredients = resultData[i].split("=")[1].trim().split(',')
			// console.log(ingredients)
			let composisiCookie = [] 
			for(let j = 0; j < ingredients.length; j++) {
				composisiCookie.push(new Ingredients ({
					name : ingredients[j].split(':')[1].trim(),
					amount : ingredients[j].split(':')[0].trim(),
					has_gluten : ingredients[j].includes('gluten')
				}))
			}
			//
			if(name == 'peanut butter') {
				tmp_cookies.push(new PeanutButter(composisiCookie))
			} else if(name == 'chocolate chip') {
				tmp_cookies.push(new chocolateCheese(composisiCookie))
			} else if(name == 'chocolate cheese') {
				tmp_cookies.push(new ChocholateChip(composisiCookie))
			} else if(name == 'chocolate butter') {
				tmp_cookies.push(new chocolateButter(composisiCookie))
			}
		}
		return tmp_cookies
	}
	static withoutSugar(tmp_cookies) {
		let hasil = []
		for(let i = 0; i < tmp_cookies.length; i++) {
			let ingredientsArr = []

			for(let j = 0; j < tmp_cookies[i].ingredients.length; j++) {
				ingredientsArr.push(tmp_cookiesp[i].ingredients[j]['name'])
			}

			if(ingredientsArr.indexOf('sugar') == -1) {
				hasil.puhs(tmp_cookiesp[i])
			}
		}
		console.log(hasil)
	}
}

let batch_of_cookies = CookieFactory.create(data)
batch_of_cookies.withoutSugar(tmp_cookies)
