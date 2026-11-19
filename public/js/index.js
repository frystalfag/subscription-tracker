const list = document.querySelector('#subscription-list');
const errorBox = document.querySelector('#error');

function createCard(subscription) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h2');
  title.textContent = subscription.name;

  const price = document.createElement('p');
  const cycle = subscription.billingCycle === 'monthly' ? 'kk' : 'vuosi';
  price.textContent = `${subscription.price} € / ${cycle}`;

  const date = document.createElement('p');
  const formattedDate = new Date(subscription.nextPaymentDate).toLocaleDateString("fi-FI");
  date.textContent = `Seuraava maksu: ${formattedDate}`;

  // кнопка меню, popover открывается сам через popovertarget, js не нужен
  const btn = document.createElement('button');
  btn.textContent = '⋮';
  btn.classList.add('menu-btn');
  btn.setAttribute('aria-label', 'Valikko');
  btn.setAttribute('popovertarget', 'menu-' + subscription.id);

  // само меню, id у каждой карточки свой
  const menu = document.createElement('div');
  menu.id = 'menu-' + subscription.id;
  menu.setAttribute('popover', '');
  menu.classList.add('menu');

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Muokkaa';

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Poista';

  menu.append(editBtn, delBtn);

  card.append(btn, title, price, date, menu);
  return card;
}

// add a card for subscription in list
function showSubscriptions(subscriptions) {
    list.innerHTML = '';
    subscriptions.forEach(function(subscription) {
        list.append(createCard(subscription));
    });
}

async function init() {
  try {
    const subscriptions = await fetchSubscriptions();
    showSubscriptions(subscriptions);
  } catch (error) {
    // server is off or answered with error
    errorBox.textContent = 'Palvelimeen ei saada yhteyttä. Käynnistä palvelin ja päivitä sivu.';
    errorBox.hidden = false;
  }
}

init();

const form = document.querySelector('#add-form');

form.addEventListener('submit', async function(event) {
  event.preventDefault(); // dont reload the page

  const newSubscription = {
    name: document.querySelector('#name').value,
    category: document.querySelector('#category').value,
    price: Number(document.querySelector('#price').value),
    billingCycle: document.querySelector('#cycle').value,
    nextPaymentDate: document.querySelector('#date').value
  };

  try {
    const saved = await createSubscription(newSubscription);
    list.append(createCard(saved));
    form.reset();
  } catch (error) {
    errorBox.textContent = 'Tilauksen lisääminen epäonnistui.';
    errorBox.hidden = false;
  }
});
