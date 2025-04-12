(function(d, w, c) {
    w.ChatraID = 'DCzY84YMjDgcpL2LB';
    var s = d.createElement('script');
    w[c] = w[c] || function() {
      (w[c].q = w[c].q || []).push(arguments);
    };
    s.async = true;
    s.src = 'https://call.chatra.io/chatra.js';
    if (d.head) d.head.appendChild(s);
  })(document, window, 'Chatra');

const images = document.querySelectorAll('.picture_box img');
const imageBoxes = document.querySelectorAll('.picture_box');
const modal = document.getElementById('myModal');
const modalImg = document.getElementById("modalImage");
const modalText = document.getElementById("modalText"); // Получаем элемент для текста
const closeBtn = document.querySelector(".close-button");
const arrowLeft = document.querySelector(".arrow.left");
const arrowRight = document.querySelector(".arrow.right");
let currentImageIndex = 0;
imageBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    modal.style.display = "block";
    currentImageIndex = index;
    updateModalImage();
  });
});
closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
arrowLeft.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateModalImage();
});
arrowRight.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateModalImage();
});

function updateModalImage() {
  modalImg.src = images[currentImageIndex].src;
  modalImg.alt = images[currentImageIndex].alt;
  modalText.textContent = imageBoxes[currentImageIndex].querySelector('p').textContent; // Добавляем текст
}

document.addEventListener('contextmenu', function (event) {
  // Предотвращаем появление стандартного контекстного меню
  event.preventDefault();
  // Создаем новый элемент (квадрат)
  const square = document.createElement('div');
  // Задаем стили для квадрата
  square.style.width = '1px';
  square.style.height = '1px';
  square.style.backgroundColor = 'white';
  square.style.position = 'fixed'; // Фиксированное позиционирование, чтобы он всегда был на экране
  square.style.top = event.clientY + 'px'; // Позиционируем по вертикали относительно курсора
  square.style.left = event.clientX + 'px'; // Позиционируем по горизонтали относительно курсора
  square.style.zIndex = '10000'; // Убедимся, что он поверх всего
  // Добавляем квадрат на страницу
  document.body.appendChild(square);
  // Функция для удаления квадрата
  function removeSquare() {
    if (square && document.body.contains(square)) { // Проверка на существование и наличие в DOM
      document.body.removeChild(square);
    }
    // Удаляем обработчик событий (важно для избежания утечек памяти)
    document.removeEventListener('mousemove', mouseMoveHandler);
  }
  // Обработчик события mousemove для отслеживания движения курсора
  function mouseMoveHandler(e) {
    // Получаем координаты курсора относительно квадрата
    const rect = square.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Если курсор находится вне квадрата, удаляем его
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      removeSquare();
    }
  }
  // Добавляем обработчик события mousemove
  document.addEventListener('mousemove', mouseMoveHandler);
  // Альтернативный способ: удаление по нажатию левой кнопки мыши
  // (удобнее, чем отводить курсор, особенно если квадрат маленький)
  document.addEventListener('mousedown', function removeOnClick(e) {
    removeSquare();
    document.removeEventListener('mousedown', removeOnClick);
  });
  // Альтернативный способ: удаление по потере фокуса окна
  // (если переключились на другое окно или вкладку)
  window.addEventListener('blur', function removeOnBlur() {
    removeSquare();
    window.removeEventListener('blur', removeOnBlur);
  });
});

(function () {
  'use strict';
  // Функция для защиты от clickjacking
  function protectFromClickjacking() {
    // Проверка наличия iframe
    if (window.self !== window.top) {
      // Перенаправление на верхний уровень, если находимся во фрейме
      window.top.location.href = window.self.location.href;
      // Альтернативный способ: скрытие элемента
      document.documentElement.style.display = 'none';
    }
  }
  // Защита при загрузке страницы
  protectFromClickjacking();
  // Дополнительная защита при изменении истории браузера (например, SPA)
  window.addEventListener('popstate', protectFromClickjacking);

  function addRandomIdToBody() {
    const randomId = 'clickjacking-protection-' + Math.random().toString(36).substring(2, 15);
    document.body.id = randomId;
    // Также можно добавить случайный класс
    document.body.classList.add('clickjacking-protection-class-' + Math.random().toString(36).substring(2, 15));
  }
  addRandomIdToBody();
})();

// mime-sniffing-protection.js
(function () {
  // Функция для установки заголовка X-Content-Type-Options: nosniff
  function applyNosniffHeader() {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'X-Content-Type-Options';
    meta.content = 'nosniff';
    // Вставляем тег meta в <head>, если он существует
    const head = document.head || document.getElementsByTagName('head')[0];
    if (head) {
      head.appendChild(meta);
    } else {
      // Если head отсутствует, пытаемся добавить в <body>
      const body = document.body || document.getElementsByTagName('body')[0];
      if (body) {
        body.appendChild(meta);
      } else {
        console.warn("Не удалось добавить мета-тег X-Content-Type-Options: nosniff. Отсутствуют элементы head и body.");
      }
    }
  }
  // Функция для добавления обработчиков для  изображений, скриптов и стилей
  function protectResources() {
    // Защита скриптов
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      if (script.src && !script.type) { // Если src есть, но type отсутствует
        script.type = 'text/javascript'; // Явно задаем MIME-тип
      }
    }
    // Защита стилей
    const stylesheets = document.getElementsByTagName('link');
    for (let i = 0; i < stylesheets.length; i++) {
      const stylesheet = stylesheets[i];
      if (stylesheet.rel === 'stylesheet' && !stylesheet.type) {
        stylesheet.type = 'text/css'; // Явно задаем MIME-тип
      }
    }
    // Защита изображений (попытка предотвратить исполнение как JS)
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      // Здесь сложнее, так как нельзя просто установить тип.  Необходимо полагаться на правильный MIME-тип,
      // отдаваемый сервером.  Альтернативно, можно добавить атрибуты безопасности, такие как
      // `sandbox` в iframe (если изображение загружается в iframe).  Однако, это не является прямой защитой от сниффинга.
      // В качестве примера, можно попробовать заблокировать загрузку не-изображений как изображения
      img.onerror = function () {
        console.warn("Ошибка загрузки изображения. Возможно, неверный MIME-тип.");
        this.style.display = 'none'; // Скрываем изображение, если произошла ошибка загрузки
      };
    }
  }
  // Проверяем, не был ли заголовок уже установлен на сервере.  Это лучший способ защиты.
  function checkServerHeader() {
    // Проверка невозможна полностью на стороне клиента, так как для этого требуется AJAX запрос,
    // что может создать циклическую зависимость, если этот скрипт вызывается до завершения загрузки.
    // В реальной рабочей среде убедитесь, что заголовок `X-Content-Type-Options: nosniff` отправляется сервером.
    // В качестве индикатора, можно проверить наличие заголовка Content-Type у текущего документа.
    // Это не совсем надежно, но может дать некоторое представление.
    if (document.contentType && !document.contentType.includes('html')) {
      console.info("Предполагается, что заголовок X-Content-Type-Options уже установлен сервером.");
      return true; // Предполагаем, что заголовок уже есть
    }
    return false;
  }
  // Основная логика
  if (!checkServerHeader()) {
    applyNosniffHeader();
  }
  protectResources();
  console.log("MIME Sniffing Protection applied.");
})();

(function () {
  'use strict';
  // Функция для отображения предупреждения (можно изменить, если это необходимо)
  function showAlert(message) {
    alert('[Security Alert] ' + message); // Используйте более нативные нотификации по желанию
  }
  // Функция для перенаправления на страницу ошибки (можно настраивать)
  function redirectToErrorPage() {
    window.location.href = '/error.html'; // Замените на ваш URL страницы ошибки
  }
  // 1. Предотвращение XSS (Cross-Site Scripting) попыток через URL параметры
  function sanitizeURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries()) {
      if (/[<>"'/]/.test(value)) { // Проверяем на наличие опасных символов
        showAlert('Dangerous characters detected in URL parameter: ' + key);
        redirectToErrorPage();
        return; // Завершаем обработку
      }
    }
  }
  // 2. Защита от кликджекинга (Clickjacking)
  function preventClickjacking() {
    if (window.self === window.top) {
      document.documentElement.style.display = 'block'; // Показать сайт, если он не во фрейме
    } else {
      window.top.location = window.self.location; // Перенаправить из фрейма, если он есть
    }
  }
  // 3. Предотвращение использования сайта во фреймах на других доменах (альтернатива X-Frame-Options)
  function preventFraming() {
    document.addEventListener('DOMContentLoaded', function () {
      if (window.location !== window.parent.location) {
        window.parent.location = window.location.href;
      }
    });
  }
  // 4. Отключение контекстного меню (по желанию, может раздражать пользователей)
  function disableContextMenu() {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      showAlert('Context menu is disabled.');
    });
  }
  // 5. Отключение выбора текста (по желанию, может раздражать пользователей)
  function disableTextSelection() {
    document.addEventListener('selectstart', function (e) {
      e.preventDefault();
      showAlert('Text selection is disabled.');
    });
  }
  // 6. Проверка Referer (будьте осторожны, может ломать обычное поведение некоторых сайтов)
  function checkReferer() {
    const validReferers = [window.location.origin, 'https://yourdomain.com']; // Добавьте разрешенные Referer
    const referer = document.referrer;
    if (referer && !validReferers.includes(new URL(referer).origin)) {
      showAlert('Unauthorized access detected based on Referer.');
      redirectToErrorPage();
    }
  }
  // 7. Предотвращение вывода в консоль (крайне неэффективно, легко обходится)
  function preventConsoleOutput() {
    // Этот пример - скорее placeholder.  Реально защититься от вывода в консоль довольно сложно.
    console.log = function () {
      // Не делаем ничего.  Альтернативно, можно выводить бессмысленные сообщения.
      console.warn("Console output is disabled for security reasons."); // Пример
    };
    console.clear();
  }
  // 8. Защита от атак перебора (brute-force) при отправке форм (только клиентская часть, нужна серверная валидация!)
  function protectFromBruteForce(formId) {
    const form = document.getElementById(formId);
    if (!form) {
      console.warn("Form with ID " + formId + " not found.");
      return;
    }
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitButton) {
      console.warn("No submit button found in form " + formId);
      return;
    }
    let submitAttempts = 0;
    const maxAttempts = 5; // Максимальное количество попыток
    const lockOutTime = 60000; // Время блокировки в миллисекундах (1 минута)
    let isLockedOut = false;
    form.addEventListener('submit', function (event) {
      if (isLockedOut) {
        event.preventDefault();
        showAlert("Too many attempts.  Please try again later.");
        return;
      }
      submitAttempts++;
      if (submitAttempts > maxAttempts) {
        event.preventDefault();
        isLockedOut = true;
        submitButton.disabled = true;
        showAlert("Too many attempts.  You are temporarily locked out.");
        setTimeout(function () {
          isLockedOut = false;
          submitButton.disabled = false;
          submitAttempts = 0;
          showAlert("Your account is now unlocked.");
        }, lockOutTime);
      }
    });
  }
  // Вызываем функции защиты
  sanitizeURLParams();
  preventClickjacking();
  preventFraming();
  // disableContextMenu(); // Опционально
  // disableTextSelection(); // Опционально
  checkReferer();
  // preventConsoleOutput(); // Малоэффективно.
  // Пример использования защиты от brute-force для формы с id "loginForm"
  protectFromBruteForce("loginForm");
})();
