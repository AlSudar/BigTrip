import AbstractView from '../framework/view/abstract-view.js';
import { getCurrentEventTypeIcon } from '../utils/getCurrentEventTypeIcon.js';
import dayjs from 'dayjs';

const createDataListWithDestinationsTemplate = (destinations) => `      <datalist id="destination-list-1">${destinations
  .map((item) => `<option value=${item.name}>${item.name}</option>`)
  .join('')}
  </datalist>`;

const createOfferTemplate = (offer, offersInEvent) => `        <div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${
  offer.id
}" type="checkbox" name="event-offer-luggage" ${
  offersInEvent.includes(offer.id) ? 'checked' : ''
}>
  <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
    <span class="event__offer-title">${offer.title}</span>
    +€&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;

const createDestinationTemplate = (destination) => `<section class="event__section  event__section--destination">
<h3 class="event__section-title  event__section-title--destination">Destination</h3>
<p class="event__destination-description">${destination.description}</p>
${
  destination.pictures
    ? `<div class="event__photos-container">
                <div class="event__photos-tape">
                  ${destination.pictures
    .map(
      (item) =>
        `<img class="event__photo" src=${item.src} alt=${item.description}>`
    )
    .join('')}
                </div>
              </div>`
    : ''
}
</section>`;

const createEventUpdateTemplate = (
  { id, basePrice, dateFrom, dateTo, offers, type },
  offer,
  allDesctinations,
  currentDestination
) => {
  const dateFromText = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const dateToText = dayjs(dateTo).format('DD/MM/YY HH:mm');

  return `
  <li class="trip-events__item" id={${id}}>
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${getCurrentEventTypeIcon(
    type
  )}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked="">
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
  currentDestination && currentDestination.name
    ? currentDestination.name
    : ''
}" list="destination-list-1">
      ${createDataListWithDestinationsTemplate(allDesctinations.destinations)}
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromText}">
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToText}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">${basePrice}</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${offer.offers.map((item) => createOfferTemplate(item, offers))}
      </div>
    </section>

    ${currentDestination ? createDestinationTemplate(currentDestination) : ''}
  </section>
</form></li>`;
};

export default class EventUpdate extends AbstractView {
  #event = null;
  #offer = null;
  #currentDestinations = null;
  #allDestinations = null;
  #onHanldlerClickRollupBtn = null;
  #onHanldlerClickSubmitBtn = null;
  #onHanldlerClickDeleteBtn = null;
  #rollupBtn = null;
  #submitBtn = null;
  #deleteBtn = null;

  constructor(
    event,
    offer,
    allDestinations,
    currentDestinations,
    onHanldlerClickRollupBtn,
    onHanldlerClickSubmitBtn,
    onHanldlerClickDeleteBtn
  ) {
    super();
    this.#event = event;
    this.#offer = offer;
    this.#allDestinations = allDestinations;
    this.#currentDestinations = currentDestinations;
    this.#onHanldlerClickRollupBtn = onHanldlerClickRollupBtn;
    this.#onHanldlerClickSubmitBtn = onHanldlerClickSubmitBtn;
    this.#onHanldlerClickDeleteBtn = onHanldlerClickDeleteBtn;
    this.#rollupBtn = this.element.querySelector('.event__rollup-btn');
    this.#submitBtn = this.element.querySelector('.event__save-btn');
    this.#deleteBtn = this.element.querySelector('.event__reset-btn');
    this.#rollupBtn.addEventListener('click', this.#handlerClickRollupBtn);
    this.#submitBtn.addEventListener('click', this.#handlerClickSubmitBtn);
    this.#deleteBtn.addEventListener('click', this.#handlerClickDeleteBtn);
  }

  get template() {
    return createEventUpdateTemplate(
      this.#event,
      this.#offer,
      this.#allDestinations,
      this.#currentDestinations
    );
  }

  #handlerClickRollupBtn = (e) => {
    e.preventDefault();
    this.#onHanldlerClickRollupBtn();
  };

  #handlerClickSubmitBtn = (e) => {
    e.preventDefault();
    this.#onHanldlerClickSubmitBtn();
  };

  #handlerClickDeleteBtn = (e) => {
    e.preventDefault();
    this.#onHanldlerClickDeleteBtn();
  };
}