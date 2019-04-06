/**
 * Для VK Coins
 * Расчет оптимальных покупок для определенной суммы
 */

const PRICE   = 0; // Индекс в массиве, где хранится цена
const PROFIT  = 1; // Индекс в массиве, где хранится прибыль
const RATIO   = 2; // Индекс в массиве, где хранится отношение прибыли к цене
const COUNT   = 3; // Индекс в массиве, где хранится количество покупок
const NAME    = 4; // Индекс в массиве, где хранится название

let price = 0; // Сколько денег было потрачено

let balance = parseInt(process.argv[2]); // Максимальное количество денег для траты
if (!Number.isInteger(balance)) {
	console.log("Используйте: 'node purchases.js <баланс>");
	return;
}

// Для каждого ускорения храним цену, доход, отношение прибыли к цене и сколько позиций нужно купить
let data = [
	[   0.051, 0.001, null, 0, 'Курсор'             ],
	[   0.100, 0.003, null, 0, 'Видеокарта'         ],
	[   1.000, 0.010, null, 0, 'Стойка видеокарт'   ],
	[  10.000, 0.030, null, 0, 'Суперкомпьютер'     ],
	[  50.000, 0.100, null, 0, 'Сервер ВКонтакте'   ],
	[ 200.000, 0.500, null, 0, 'Квантовый компьютер'],
	[5000.000, 1.000, null, 0, 'Датацентр'          ]
]

/**
 * Функция обновляет отношение прибыли к цене
 * @param index индекс обновляемого элемента
 *              если null, то обновляем все
 */
const updateRatio = function(index = null) {
	if (index != null) {
		data[index][RATIO] = data[index][PROFIT] / data[index][PRICE];
	}else {
		// Обновляем отношение прибыли к цене у каждого элемента
		for (index = 0; index < data.length; index++) {
			updateRatio(index);
		}
	}
}

/**
 * Получаем индекс лучшего товара по отношении прибыли к цене
 */
const getBestProduct = function() {
	let best_index = 0;               // Индекс лучшего товара
	let best_profit = data[0][RATIO]; // Отношение прибыли к цене у лучшего товара

	data.forEach(function(product, index) {
		if (product[RATIO] > best_profit) {
			best_index  = index;
			best_profit = product[PROFIT];
		}
	})

	return best_index;
}

/*
 * Покупаем продукт
 * @param index - индекс продукта
 */
const buyProduct = function(index) {
	price += data[index][PRICE]; // Увеличиваем сумму трат

	data[index][PRICE] *= 1.3;   // Увеличиваем цену в 1.3 раза
	data[index][COUNT] += 1;     // Увеличиваем количество

	updateRatio(index); // Обновляем соотношение цены к прибыли
}


updateRatio(); // Инициализируем отношение цены к прибыли у всех товаров


for (let i = 0; i < 1000; i++) {
	if (data.length == 0) break;

	let index = getBestProduct();

	// Хватает ли денег для покупки
	if (price + data[index][PRICE] > balance) {
		break;
	}
	
	buyProduct(index);
}


let profit = 0; // Доход со всех товаров

// Список купленных предметов
data.forEach(function(element) {
	console.log(`${element[NAME]}: ${element[COUNT]}`);
	profit += element[COUNT] * element[PROFIT];
})
console.log('');
console.log(`Потрачено: ${price}`);
console.log(`Прибыль: ${profit}`);
