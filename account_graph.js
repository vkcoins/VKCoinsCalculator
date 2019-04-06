const { exec } = require('child_process');

const balance = 6000000;
const users   = 100; 

(async function() {
	for (let count = 1; count < users; count++) {
		let money = balance / count;
		await new Promise(function (resolve, reject) {
			exec(`node purchases.js ${money.toFixed(5)}`, (err, stdout, stderr) => {
				 const regexp = /Потрачено: (.*)\nПрибыль: (.*)/
				 const result = stdout.match(regexp);

				 console.log(count, result[2] * count);
				 resolve();
			})
		})
	}
})()