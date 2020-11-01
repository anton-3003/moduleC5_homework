// кнопка 
const buttonCheck = document.querySelector("#jsCheck");
// поле вывода сообщения 
const messageArea = document.querySelector(".j-message");
// шаблон XHR
let urlBase = "https://picsum.photos";

const min = 100;
const max = 300;

function checkValueAndShowResult() {
	// строчка1 на входе
	const value1 = Number(document.querySelector(".j-first-input").value);
	// строчка2 на входе
	const value2 = Number(document.querySelector(".j-second-input").value);
	if(isFinite(value1) && isFinite(value2) && ((value1 >= min && value1 <= max) && (value2 >= min && value2 <= max))) {
		
		let urlString = `${urlBase}/${value1}/${value2}`;
		messageArea.innerHTML = `<img src=${urlString}/>`;

		useRequest(urlString)

	} else {
		messageArea.innerHTML = "одно из чисел вне диапазона от 100 до 300";
	}
}

function useRequest(url) {
	console.log('=== useRequest ===')
	fetch(url)
			.then((response) => {
				console.log(response);
				const result = response.json();
				console.log(result);
				return result;
			})
			.then((data) => {
				console.log(data);
			})
			.catch(() => {console.log('error');})
}

buttonCheck.addEventListener("click", () => {checkValueAndShowResult()});