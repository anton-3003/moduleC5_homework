
// Строка GET-запроса
const requestStr = "https://picsum.photos/v2/list?limit=";
// Блок для вывода результата
const messageArea = document.querySelector('.j-message');
// Кнопка запроса
const buttonCheck = document.querySelector('.j-btn-check');


function useRequest(url, callback) {
  // значение input'а
  const limitValue = document.querySelector(".j-input-text").value;

  if( !isNaN(parseInt(limitValue)) ) {
    if (parseInt(limitValue) < 1 || parseInt(limitValue) > 10) {
      messageArea.innerHTML = "Число вне диапазона 1-10";
    } else {
      let urlReq = `${requestStr}${limitValue}`;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', urlReq, true);
  
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
    }
  } else {
      alert("Вводите только цифры!")
    }
};

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
}

buttonCheck.addEventListener('click', () => {
  useRequest(requestStr, showResult);
});