const ekleBtn = document.querySelector('#ekle-btn');
const harcamaInput = document.querySelector('#harcama');
const fiyatInput = document.querySelector('#fiyat');
const durumInput = document.querySelector('#durum');
const list = document.querySelector('.list');
const toplamSpan = document.querySelector('#toplam');

// butonu izler > tıklanma
ekleBtn.addEventListener('click', addExpense);
// listeyi izler > tıklanma
list.addEventListener('click', handleClick);

// toplam değerini tanımlama
let toplam = 0;

//  listeye ekleme
function addExpense(event) {
  event.preventDefault();

  //   inpuların içininin boş olmadığını kontrol etme
  if (!fiyatInput.value || !harcamaInput.value) {
    alert('Kutuları Doldurun');
    return;
  }
  // elemanı oluştur
  const listItem = document.createElement('div');

  //   class ekleme
  listItem.classList.add('list-item');

  if (durumInput.checked) {
    listItem.classList.add('odendi');
  }

  // içeriği değiştirme
  listItem.innerHTML = `
          <h1>${harcamaInput.value}</h1>
          <h2> <span> ${fiyatInput.value} </span> &#8378; </h2>
          <div class="buttons">
            <img id="delete" src="images/delete.png" />
            <img id="payment" src="images/payment.png" />
          </div>  
  `;
  //   htmle gönderme
  list.appendChild(listItem);

  //    toplamı güncelleme
  toplam += parseInt(fiyatInput.value);
  //   jsdeki toplam değerini ekrana basma
  toplamSpan.innerText = toplam;
  //   inputları  sıfırlama
  fiyatInput.value = '';
  harcamaInput.value = '';
}

// SİLME VE EDİT İŞLEMİ

function handleClick(e) {
  const eleman = e.target;
  if (eleman.id === 'delete') {
    // tıklaan butonun kapsayıcısını alma
    const harcamaDiv = eleman.parentElement.parentElement;

    // tıklanan elemanın fiyatını alma
    var silinenFiyat = harcamaDiv.querySelector('span').innerText;

    // jsdeki toplam değerini güncelledik
    toplam -= parseInt(silinenFiyat);

    // yeni değeri htmle göndericez
    toplamSpan.innerText = toplam;

    // animasyon ekleme
    harcamaDiv.classList.add('fall');

    // animasyonun bitişini bekleme
    harcamaDiv.addEventListener('transitionend', () => {
      // htmlden kaldırma
      harcamaDiv.remove();
    });
  }
}
