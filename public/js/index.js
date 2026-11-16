const list = document.querySelector('#subscription-list');

function createCard(subscription) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h2');
  title.textContent = subscription.name;

  const price = document.createElement('p');
  const cycle = subscription.cycle === 'monthly' ? 'kk' : 'vuosi';
  price.textContent = `${subscription.price} € / ${cycle}`;

  const date = document.createElement('p');
  const formattedDate = new Date(subscription.startDate).toLocaleDateString("fi-FI");
  date.textContent = `Seuraaava maksu: ${formattedDate}`;

  card.append(title, price, date);
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
    const subscriptions = await getSubscriptions();
    showSubscriptions(subscriptions);
}

init();


