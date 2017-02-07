fs = require('fs');

class Cookies {
    constructor(cookiesProps) {
        this._name = cookiesProps.name;
        this._Ingredience = cookiesProps.ingredience;
        this._status = cookiesProps.status || 'mentah';
    }
}

class ChocoChips extends Cookies {
    constructor(cookiesProps) {
        super(cookiesProps);
        this._name = 'chocolate chip'
        this._ChocChipCount = 100;
    }
}

class PeanutButter extends Cookies {
    constructor(cookiesProps) {
        super(cookiesProps);
        this._name = 'peanut butter'
        this._PeanutCount = 200;
    }
}

class OthersCookie extends Cookies {
    constructor(cookiesProps) {
        super(cookiesProps);
        this._name = cookiesProps.name||'';
        this._otherCount = 150;
    }
}
class ArrToObj {
    //merubah file txt mejadi object dari cookies yang berupakan gabungan dari hampir semua method
    //ArrToObj ini
    GetIndridienceFromTxt(file) {
        let fileInString = this.TxtToArr(file);
        let filePerLine = this.GetValueEachLine(fileInString);
        //console.log(filePerLine);
        let arrObjekcookies = [];
        for (var i = 0; i < filePerLine.length; i++) {
            arrObjekcookies.push(this.IngredienceArrToObj(filePerLine[i]));
        }
      return arrObjekcookies;
    }
    // mengambil file txt dan menjadikannya string
    TxtToArr(file) {
        var sys = require('fs');
        var source = sys.readFileSync(file).toString();
        return source.match(/[^\n]+/g);
    }
    // merubah satu file string panjang menjadi perbaris
    GetValueEachLine(arrayIngredience) {
        let eachLine = [];
        for (var i = 0; i < arrayIngredience.length; i++) {
            let valueEacline = arrayIngredience[i].split(/\s[=,]\s/);
            valueEacline[1] = valueEacline[1].split(/[,]\s/)
            eachLine.push(valueEacline);
        }
        return eachLine;
    }

    //membuat objek cookies yang baru berdasarkan satu baris txt
    IngredienceArrToObj(IngriArr) {
        let saveObjToClass = {};
        let objectCookie
        switch (IngriArr[0]) {
            case 'chocolate chip':
                saveObjToClass['name'] = IngriArr[0];
                saveObjToClass['ingredience'] = this.getIngriObjk(IngriArr[1]);
                objectCookie = new ChocoChips(saveObjToClass);
                break;
            case 'peanut butter':
                saveObjToClass['name'] = IngriArr[0];
                saveObjToClass['ingredience'] = this.getIngriObjk(IngriArr[1]);
                objectCookie = new PeanutButter(saveObjToClass);

                break;
            default:
                saveObjToClass['name'] = IngriArr[0];
                saveObjToClass['ingredience'] = this.getIngriObjk(IngriArr[1]);
                objectCookie = new OthersCookie(saveObjToClass);
        }
        return objectCookie;
    }

    // mengambil ingridience dari txt kedalam object
    getIngriObjk(IngriArr1) {
        let objinggri = {};
        let arrObjIngri = [];
        for (let i = 0; i < IngriArr1.length; i++) {
            objinggri['name'] = this.getIngName(IngriArr1[i]);
            objinggri['quantity'] = this.getIngAmt(IngriArr1[i]);
            arrObjIngri.push(objinggri);
            objinggri = {};
        }
        return arrObjIngri;
    }
    // memisahkan kata dengan :
    seperateTwoDot(string) {
        return string.match(/[^:\s]+/g);
    }

    //mengambil nama nama ingridience dari file txt
    getIngName(ingAmtStr) {
        let inggriAmtARR = this.seperateTwoDot(ingAmtStr);
        let ingri = []
        for (var i = 2; i < inggriAmtARR.length; i++) {
            ingri.push(inggriAmtARR[i])
        }
        ingri = ingri.join(' ')
        return ingri
    }
    // mengambil nilai banyak ingridience dari array
    getIngAmt(ingAmtStr) {
        let inggriAmtARR = this.seperateTwoDot(ingAmtStr);
        let amt = []
        for (var i = 0; i < 2; i++) {
            amt.push(inggriAmtARR[i])
        }
        amt = amt.join(' ');
        return amt;
    }

}

class cookiesInggridience{
   constructor(){
     this.cookieInggObj;
   }

   getInggridienceTxt(file){
     let fileToObj = new ArrToObj();
     let inggri =fileToObj.GetIndridienceFromTxt(file);
     this.cookieInggObj=inggri;
     //console.log(inggri);
     return inggri;
   }
  getNonSugar(){
    let nonSugarCookies = [];
    for (var i = 0; i < this.cookieInggObj.length; i++) {
        if (!this.ceksugar(this.cookieInggObj[i]._Ingredience)) {
          nonSugarCookies.push(this.cookieInggObj[i]._name)
        }
    }
    return nonSugarCookies;
  }
  ceksugar(ingridience){
    for (var i = 0; i < ingridience.length; i++) {
      if (ingridience[i].name=='sugar') {
        return true
      }
    }
    return false
  }
}

class driver {
   static cookieslist(){
    let kue = new cookiesInggridience({});
    console.log(kue.getInggridienceTxt('cookies.txt'));
   }
  static ceksugar(){
    let kue = new cookiesInggridience({});
    let a = kue.getInggridienceTxt('cookies.txt');
    console.log(kue.getNonSugar());
   }
}

driver.ceksugar();
driver.cookieslist();
