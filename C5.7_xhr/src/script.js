
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
		// Если все параметры ОК - приступаем к запросу и выводу результата на экран
		let urlReq = `https://picsum.photos/v2/list?page=${pageNumValue}&limit=${limitValue}`;
		return urlReq;	
	}
}

 // запрос
function useRequest(url, callback) {
	let requestUrl = isValue();
	let xhr = new XMLHttpRequest();
	xhr.open('GET', requestUrl, true);
	xhr.onload = function() {
		if (xhr.status != 200) {
          console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
              callback(result);
            }
          }
	};

	xhr.onerror = function() {
		console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
};

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



reqBtn.addEventListener("click", () => {
	useRequest(isValue(), showResult);
});