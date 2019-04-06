const { exec } = require('child_process');

const FROM = 1;
const TO   = 10000000;



(async function() {
	for (let balance = FROM; balance < TO;) {
		await new Promise(function (resolve, reject) {
			exec(`node purchases.js ${balance.toFixed(5)}`, (err, stdout, stderr) => {
				 const regexp = /Потрачено: (.*)\nПрибыль: (.*)/
				 const result = stdout.match(regexp);

				 console.log(result[2], result[1]);
				 resolve();
			})
		})
		if (balance > 1000000) balance *= 1.05;
		else  balance *= 1.1
	}
})()