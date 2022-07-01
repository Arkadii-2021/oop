const products = {product: []};
let _basketAmount = [];

products.product.push({id: 0, name: 'ФУТБОЛКА ANTISOCIAL BASIC ФИОЛЕТОВЫЙ', description: 'Футболка выполнена из 100% хлопка.', sizes: [], price: 1650, available: 1});
products.product.push({id: 1, name: 'ШТАНЫ СПОРТИВНЫЕ ПРЯМЫЕ ANTISOCIAL STRIPE ЧЕРНЫЙ', description: 'Прямой крой, стандартная посадка, передние карманы на молнии, эластичный пояс со шнурком, лампасы', sizes: [], price: 3520, available: 1});
products.product.push({id: 2, name: 'РУБАШКА URBAN CLASSICS CHECKED ROOTS SHIRT DARKBLUE/WHITE', description: 'Клетчатая рубашка свободного покроя из тонкой фланели.', sizes: [], price: 6990, available: 1});
products.product.push({id: 3, name: 'ОЛИМПИЙКА ANTISOCIAL STRIPE СЕРЫЙ', description: 'Слегка зауженный крой, минималистичный логотип на груди, лампасы на рукавах, два боковых кармана на замках', sizes: [], price: 3740, available: 1});
products.product.push({id: 4, name: 'РЮКЗАК ЯКОРЬ МПА ПРОДВИНУТАЯ БАЗА ВС ТЕМНО-СИНИЙ НЕЙЛОН-1000', description: 'Описание отсутствует', sizes: [], price: 5050, available: 1});

class Good {
	constructor (id, name, description, sizes, price, available) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.sizes = sizes;
		this.price = price;
		this.available = available;
	};
};
	

class GoodsList {
	constructor (filter, sortPrice, sortDir) {
		this.goods = [];
		this.goodsFiltered = [];
		this.filter = filter;
		this.sortPrice = sortPrice;
		this.sortDir = sortDir;	
	};
	
	sortedPrice (sortPrice, sortDir) {
		this.sortPrice = sortPrice;
		this.sortDir = sortDir;
		let logbar = ['Сортировка по возрастанию', 'Сортировка по убыванию', 'Сортировка выключена'];
		if (sortPrice == true && sortDir == true) {
			document.write(logbar[0]);
			f1.goodsFiltered.sort((a, b) => a.price - b.price);
		} else if (sortPrice == true && sortDir == false) {
			document.write(logbar[1]);
			f1.goodsFiltered.sort((a, b) => b.price - a.price);
		} else document.write(logbar[2]);
	
};
	
	filterName (filter) {
		this.filter = filter;
		this.goods.forEach(function (good, indexIdReal) {
			let str = good.name;
			let re = new RegExp(filter, 'i');
			let found = str.match(re);
			if (found) {
				f1.goodsFiltered.push(f1.goods[indexIdReal]);
	}})};	

	add (id) {
		this.goods.push(products.product[id]);
	};
	
	remove (productId) {
		this.goods.forEach(function (good, indexIdReal) {
			if (good.id === productId) {
			this.goods.splice(indexIdReal, 1);
			}
		})
	};

	get list() {
		return f1.goodsFiltered;
	}
};


class BasketGood extends GoodsList {
	constructor (id, name, description, sizes, price, available, amount, goods) {
		super(id, name, description, sizes, price, available);
		this.basket = [];
	};	
}


class Basket extends BasketGood {
	constructor (id, name, description, sizes, price, available, amount, goods) {
		super(id, name, description, sizes, price, available, amount, goods);
	};
		
	add (ids, amount) {
		f1.goods.forEach(function (goodsID, indexIdReal) {
			if (goodsID.id === ids && goodsID.available == 1){
			b1.basket.push(f1.goods[ids]);
			goodsID.amount = amount;
			};
		});
	};
	
	remove (basketIDS) {
		this.basket.forEach(function (basketID, indexIdReal) {
			if (basketID.id === basketIDS) {
			b1.basket.splice(indexIdReal, 1);
			}
		});	
	};

	clear() {
		this.basket.length = 0;
	}
	
	get totalAmount() {
		const amountTotal = this.basket.reduce((amountAll, goodAmount) => {
			return amountAll + goodAmount.amount
		}, 0);
		return amountTotal;
	}
	
	get totalSum() {
		const sumTotal = this.basket.reduce((priceAll, goodPrice) => {
			return priceAll + goodPrice.price
		}, 0);
		return sumTotal;
	}	
	
}

/* b1 - экземпляр класса GoodsList*/
const f1 = new GoodsList();

/* Добавление товаров в массив goods */
f1.add(0);
f1.add(1);
f1.add(2);
f1.add(3);
f1.add(4);

/* f1.add(2, 'ШТАНЫ СПОРТИВНЫЕ ПРЯМЫЕ ANTISOCIAL STRIPE ЧЕРНЫЙ', '– Прямой крой, стандартная посадка, передние карманы на молнии, эластичный пояс со шнурком, лампасы', [], 3520, 1);
f1.add(3, 'РУБАШКА URBAN CLASSICS CHECKED ROOTS SHIRT DARKBLUE/WHITE', 'Клетчатая рубашка свободного покроя из тонкой фланели.', [], 6990, 1);
f1.add(4, 'ОЛИМПИЙКА ANTISOCIAL STRIPE СЕРЫЙ', 'Слегка зауженный крой, минималистичный логотип на груди, лампасы на рукавах, два боковых кармана на замках', [], 3740, 1);
f1.add(5, 'РЮКЗАК ЯКОРЬ МПА ПРОДВИНУТАЯ БАЗА ВС ТЕМНО-СИНИЙ НЕЙЛОН-1000', 'Описание отсутствует', [], 5050, 1); */

/* фильтрация, сортировка, удаление товаров и вывод в консоль массива*/
f1.filterName('STRIPE');
f1.sortedPrice(true, false);
/* f1.remove(3); */

/* b1 - экземпляр класса корзины*/
const b1 = new Basket();

/* добавление/удаление товаров в корзину/из корзины с указанием количества*/
b1.add(2, 1);
b1.add(5, 3);
b1.add(4, 2);
b1.add(2, 5);
/* b1.remove(2); */

/* очистка корзины*/
/* b1.clear(); */

/* Вывод результата в консоль */
console.log(f1);
console.log(b1);
console.log(f1.list);
console.log(`Общее количество товаров: ${b1.totalAmount}`);
console.log(`Общая сумма = ${b1.totalSum}`);
console.log(_basketAmount);
