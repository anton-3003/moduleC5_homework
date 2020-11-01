
const reqBtn = document.querySelector(".j-btn-request");
let messageArea = document.querySelector(".result-area");


 // проверка данных на число и параметры
function isPageValue(num) {
	if(typeof num == 'number' || +num >= 1 && +num <= 10) {
		return true;
	} else {
		return false;
	}
}


function isValue() {
	// получение и проверка данных из формы
	const pageNumValue = document.getElementById("j-page-input").value;
	const limitValue = document.getElementById("j-limit-input").value;
	let result;

	if(!isPageValue(pageNumValue) && !isPageValue(limitValue)) {
		result = "Номер страницы и лимит вне диапазона от 1 до 10";
		messageArea.innerHTML = result;

	} else if(!isPageValue(limitValue)) {
		result = "Лимит вне диапазона от 1 до 10";
		messageArea.innerHTML = result;
	
	} else if(!isPageValue(pageNumValue)) {
		result = "Номер страницы вне диапазона от 1 до 10";
		messageArea.innerHTML = result;
	
	} else {
		// Если все параметры ОК - формируем строку запроса и передаем как рез-т работы ф-ции.
		let urlReq = `https://picsum.photos/v2/list?page=${pageNumValue}&limit=${limitValue}`;
		useRequest(urlReq);	
	}
}


// отображение результата
function showResult(apiData) {
  let cards = '';
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  messageArea.innerHTML = cards;
};


 // запрос
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


reqBtn.addEventListener("click", () => {
	(isValue(), showResult);
});