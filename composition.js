class Cookies {
    constructor(nameOfCookie, ingredients) {
        this.name = nameOfCookie
        this.status = 'mentah'
        this.ingredients = ingredients

    }

    bake() {
        this.status = "cooked"
    }
}

class Ingredients {
    constructor(options) {
        this.name = options['name'] // name of bahan
        this.amount = options['amount']
        this.has_gluten = options['has_gluten']
    }
}

class PeanutButter extends Cookies {
    constructor(nameOfCookie, ingredients) {
        super(nameOfCookie, ingredients)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookies {
    constructor(ingredients) {
        super(nameOfCookie, ingredients)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookies {
    constructor(nameOfCookie, ingredients) {
        super(nameOfCookie, ingredients)
        this.other_count = 150
    }
}

class CookiesFactory {
    constructor() {
        this.lists = []
    }

    create(file) {
        for (let i = 0; i < file.length; i++) {

            let list = file[i].split("=")
            let nameOfCookie = list[0].trim() // nama kue
            let ingredients = list[1].trim().split(",") // nama2 bahan
            let bahan = [] // bahan dalam bentuk objek?
            let glutenfree = false

            for (let j = 0; j < ingredients.length; j++) {
                if (ingredients[j].includes('(gluten)')) {
                    glutenfree = true
                } else {
                    glutenfree = false
                }
                // console.log(ingredients[0])
                ingredients[j] = ingredients[j].split(":")
                bahan.push(new Ingredients({
                    'name': ingredients[j][1].trim(),
                    'amount': ingredients[j][0].trim(),
                    'has_gluten': glutenfree,
                }))
            }
            console.log(ingredients);

            switch (nameOfCookie) {
                case "choco chip":
                    this.lists.push(new ChocolateChip(nameOfCookie, bahan))
                    break;
                case "peanut butter":
                    this.lists.push(new PeanutButter(nameOfCookie, bahan))
                    break;
                default:
                    this.lists.push(new OtherCookie(nameOfCookie, bahan))
            }
        }
        // console.log(this.lists);
        return this.lists
    }

    noSugar(cookiesDetails) {
        let SugarCookies = []
        let freeSugarCookies = []
        console.log("Sugar free cookies");
        console.log("==================");
        for (let i = 0; i < cookiesDetails.length; i++) {
            var temp = cookiesDetails[i].ingredients
            for (var j = 0; j < temp.length; j++) {
                if (temp[j].name == 'sugar') {
                    SugarCookies.push(cookiesDetails[i].name)
                    break
                }
            }
            console.log(SugarCookies);
            if (!SugarCookies.includes(cookiesDetails[i].name)) {
                console.log(`- ${cookiesDetails[i].name}`);
            }
        }
    }

    checkAmount(cookiesDetails, nameOfCookie, Ingredients) {
        let detailsAmount = []
        for (let i = 0; i < cookiesDetails.length; i++) {
            if (cookiesDetails[i].name == nameOfCookie) {
                var temp = cookiesDetails[i].ingredients
                for (var j = 0; j < temp.length; j++) {
                    if (temp[j].name == Ingredients) {
                        console.log(`this ${cookiesDetails[i].name} cookie contains ${temp[j].amount} of ${temp[j].name}`);
                        break
                    }
                }
            }
        }
    }
}

let fs = require('fs')
let data = fs.readFileSync("cookies.txt", "utf-8").trim().split("\n")
let Factory = new CookiesFactory()
let batch_of_cookies = Factory.create(data)

// console.log(batch_of_cookies);
// Factory.noSugar(batch_of_cookies)
// Factory.checkAmount(batch_of_cookies,'peanut butter','butter')
