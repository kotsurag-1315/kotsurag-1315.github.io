// Оформление туров отдельно от анонсов: для обновления поездок меняйте tours-data.js.
function renderToursV2(page) {
  const ru = STATE.lang === 'ru';
  const tr = (r, e) => ru ? r : e;
  const safe = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
  const contact = 'https://t.me/qitour_stuff';
  const tours = Array.isArray(window.KM_TOURS) ? window.KM_TOURS : [];
  const openFirstByDefault = window.innerWidth < 650;
  page.classList.add('tours-v2');

  const cards = tours.map((tour, index) => {
    const id = safe(tour.id);
    const title = safe(ru ? tour.title : (tour.titleEn || tour.title));
    const headerDates = safe((ru ? tour.headerDates : (tour.headerDatesEn || tour.headerDates)) || tr('Даты уточняются', 'Dates to be confirmed'));
    const artist = safe(ru ? tour.artist : (tour.artistEn || tour.artist));
    const month = safe(ru ? tour.month : (tour.monthEn || tour.month));
    const city = safe(ru ? tour.city : (tour.cityEn || tour.city));
    const description = safe(ru ? tour.description : (tour.descriptionEn || tour.description));
    const isDemo = tour.demo === true;
    const groupSize = Number.isInteger(tour.groupSize) && tour.groupSize > 0 ? tour.groupSize : 7;
    const remainingSeats = Number.isInteger(tour.remainingSeats) && tour.remainingSeats >= 0 && tour.remainingSeats <= groupSize ? tour.remainingSeats : null;
    const soldOut = !isDemo && remainingSeats === 0;
    const seatsWord = remainingSeats === 1 ? 'место' : remainingSeats >= 2 && remainingSeats <= 4 ? 'места' : 'мест';
    const seatsLabel = isDemo || remainingSeats === null ? '' : soldOut ? 'SOLD OUT' : tr(`Осталось ${remainingSeats} ${seatsWord}`, `${remainingSeats} ${remainingSeats === 1 ? 'seat' : 'seats'} left`);
    const highlights = ru ? tour.highlights : (tour.highlightsEn || tour.highlights);
    const fromPrice = safe(ru ? tour.fromPrice : (tour.fromPriceEn || tour.fromPrice));
    const detail = (key, fallbackEn) => ru ? tour[key] : (tour[key + 'En'] || fallbackEn);
    const groupInfo = tr(`• В группе максимум ${groupSize} человек`, `• Maximum ${groupSize} people in the group`);
    const fields = [
      [tr('Даты поездки', 'Trip dates'), detail('dates', 'To be confirmed')],
      [tr('Стоимость', 'Price'), detail('price', 'To be announced')],
      [tr('Что включено', 'Included'), `${groupInfo}\n${detail('included', 'Services will be listed later')}`],
      [tr('Что не включено', 'Not included'), detail('excluded', 'Will be stated before booking')],
      [tr('Программа', 'Program'), detail('program', 'Day-by-day plan coming soon')],
      [tr('Бронирование', 'Booking'), soldOut ? tr('Набор в эту группу завершён. О следующих турах можно узнать у нас.', 'This group is full. Contact us about upcoming trips.') : detail('booking', 'Terms will be published with the price')]
    ];
    return `
      <article class="tv-tour${index === 0 && openFirstByDefault ? ' is-open' : ''}${tour.poster ? ' tv-tour--poster' : ''}" data-tour="${id}">
        <button class="tv-tour-head" type="button" aria-expanded="${index === 0 && openFirstByDefault}" aria-controls="tv-preview-${id}">
          <span class="tv-date" aria-label="${isDemo ? tr('Пример оформления', 'Layout preview') : month}">${isDemo ? tr('ДЕМО', 'DEMO') : month.slice(0, 3)}</span>
          <span class="tv-tour-heading"><span class="tv-tour-title-line"><strong>${title}</strong><span class="tv-tour-dates">${headerDates}</span></span><small>${isDemo ? tr('Пример оформления', 'Layout preview') : month} · ${city} · ${tr('групповой тур', 'group tour')}</small>${seatsLabel ? `<span class="tv-seat-status tv-seat-status--header${soldOut ? ' tv-seat-status--sold-out' : ''}">${safe(seatsLabel)}</span>` : ''}</span>
          <span class="tv-open-label">${index === 0 && openFirstByDefault ? tr('Свернуть ↑', 'Close ↑') : tr('Превью ↓', 'Preview ↓')}</span>
        </button>
        <div class="tv-preview" id="tv-preview-${id}" ${index === 0 && openFirstByDefault ? '' : 'hidden'}>
          <div class="tv-preview-grid">
            <div class="tv-tour-photo${tour.poster ? ' tv-tour-photo--poster' : ''}"><img src="${safe(tour.image)}" alt="${tour.poster ? tr('Афиша тура на концерт The Weeknd', 'The Weeknd concert tour poster') : tr('Иллюстративное фото концерта', 'Illustrative concert photo')}" loading="lazy">${tour.poster ? '' : `<span>${tr('Иллюстративное фото', 'Illustrative photo')}</span>`}</div>
            <div class="tv-preview-copy">
              <small>${tr('Концерт', 'Concert')} · ${city}</small>
              <h3>${artist}</h3>
              <p>${description}</p>
              ${Array.isArray(highlights) ? `<div class="tv-highlights">${highlights.map(item => `<span>${safe(item)}</span>`).join('')}</div>` : ''}
              ${fromPrice || seatsLabel ? `<div class="tv-price-row">${fromPrice ? `<div class="tv-from-price">${fromPrice}</div>` : ''}${seatsLabel ? `<span class="tv-seat-status${soldOut ? ' tv-seat-status--sold-out' : ''}">${safe(seatsLabel)}</span>` : ''}</div>` : ''}
              <button class="tv-details-toggle" type="button" aria-expanded="false" aria-controls="tv-details-${id}">${tr('Узнать о туре ↓', 'Tour details ↓')}</button>
            </div>
          </div>
          <div class="tv-details" id="tv-details-${id}" hidden>
            <h3>${tr('Подробная информация о туре', 'Tour information')}</h3>
            <div class="tv-fields">${fields.map(([label, value]) => `<div class="tv-field"><span>${safe(label)}</span><strong>${safe(value)}</strong></div>`).join('')}</div>
            <div class="tv-details-footer"><p>${isDemo ? tr('Это пример оформления: бронь не открыта. О реальных поездках расскажем после подтверждения деталей.', 'This is a layout preview, not a bookable trip. Real trip details will follow after confirmation.') : soldOut ? tr('Места закончились. Напишите нам, чтобы узнать о следующих поездках.', 'This group is full. Contact us about upcoming trips.') : tr('Есть вопросы по поездке? Напишите нам — расскажем об условиях бронирования.', 'Questions about this trip? Contact us for booking details.')}</p><a href="${contact}" target="_blank" rel="noopener noreferrer">${tr('Написать нам ↗', 'Contact us ↗')}</a></div>
          </div>
        </div>
      </article>`;
  }).join('');

  page.innerHTML = `
    <div class="tv-shell">
      <header class="tv-intro"><span>${tr('Путешествия с KoreaMate', 'Travel with KoreaMate')}</span><h1>${tr('Поехали вместе ✨', 'Travel together ✨')}</h1><p>${tr('Групповые поездки на концерты и события — и индивидуальные путешествия, созданные под вас.', 'Group trips to concerts and events, plus trips tailored to you.')}</p><small>${tr('Выберите тур по душе — и поехали за впечатлениями ✨', 'Find a trip you love — and let’s go make memories ✨')}</small></header>
      <div class="tv-layout">
        <section class="tv-main" aria-label="${tr('Предстоящие туры', 'Upcoming tours')}">
          <div class="tv-section-title"><h2>${tr('Предстоящие туры', 'Upcoming tours')}</h2><span>${tr('Выберите, что интересно', 'Choose what interests you')}</span></div>
          <div class="tv-tour-list">${cards}</div>
        </section>
        <aside class="tv-aside">
          <section class="tv-about"><img src="assets/tours-team.webp" alt="Люба и Артём — команда KoreaMate" loading="lazy"><div><h2>${STATE.lang === 'ko' ? '여러분, 안녕하세요👋' : tr('Ёробун, аннёнхасэё👋', 'Yeoreobun, annyeonghaseyo👋')}</h2><p>${tr('Мы Люба и Артём. Любим путешествовать и помогаем другим открывать Южную Корею и новые места 🩷', 'We are Lyuba and Artyom. We love travelling and helping others discover South Korea and new places 🩷')}</p></div></section>
          <section class="tv-individual"><h2>${tr('Индивидуальный тур ✨', 'Individual tour ✨')}</h2><p>${tr('Поездка под ваши интересы, даты и темп — с подготовкой и поддержкой от KoreaMate.', 'A trip around your interests, dates and pace, with KoreaMate planning and support.')}</p><button type="button" class="tv-individual-toggle" aria-expanded="false" aria-controls="tv-individual-details">${tr('Что входит ↓', 'What is included ↓')}</button><div class="tv-individual-details" id="tv-individual-details" hidden><h3>✓ ${tr('Включено', 'Included')}</h3><ul><li>${tr('Маршрут по дням', 'Day-by-day itinerary')}</li><li>${tr('Помощь с бронированием', 'Booking help')}</li><li>${tr('Помощь с K-ETA и страховкой при необходимости', 'Help with K-ETA and insurance if needed')}</li><li>${tr('Поддержка во время поездки', 'Trip support')}</li><li>${tr('Доступ к гиду KoreaMate', 'KoreaMate guide access')}</li></ul><h3>✕ ${tr('Не включено', 'Not included')}</h3><ul><li>${tr('Авиабилеты — подберём, оплатите сами', 'Flights — we help find, you pay')}</li><li>${tr('Отель — подберём, оплатите сами', 'Hotel — we help find, you pay')}</li><li>${tr('Личное сопровождение на месте', 'In-person accompaniment')}</li></ul><small>${tr('Состав услуг — пример; уточним перед бронированием.', 'Services shown are examples; confirm before booking.')}</small></div></section>
          <section class="tv-contact"><h2>${tr('Есть вопрос по поездке?', 'Have a trip question?')}</h2><p>${tr('Напишите нам напрямую — откроется личный чат в Telegram.', 'Write to us directly in Telegram.')}</p><a href="${contact}" target="_blank" rel="noopener noreferrer">${tr('Написать нам ↗', 'Contact us ↗')}</a></section>
        </aside>
      </div>
    </div>`;

  const tourCards = Array.from(page.querySelectorAll('.tv-tour'));
  const setTourOpen = (card, open) => {
    const head = card.querySelector('.tv-tour-head');
    const preview = card.querySelector('.tv-preview');
    const details = card.querySelector('.tv-details');
    const detailsButton = card.querySelector('.tv-details-toggle');
    preview.hidden = !open;
    card.classList.toggle('is-open', open);
    head.setAttribute('aria-expanded', String(open));
    head.querySelector('.tv-open-label').textContent = open ? tr('Свернуть ↑', 'Close ↑') : tr('Превью ↓', 'Preview ↓');
    if (!open) {
      details.hidden = true;
      detailsButton.setAttribute('aria-expanded', 'false');
      detailsButton.textContent = tr('Узнать о туре ↓', 'Tour details ↓');
    }
  };
  tourCards.forEach(card => {
    const head = card.querySelector('.tv-tour-head');
    const preview = card.querySelector('.tv-preview');
    const details = card.querySelector('.tv-details');
    const detailsButton = card.querySelector('.tv-details-toggle');
    head.addEventListener('click', () => {
      const open = preview.hidden;
      if (open) tourCards.forEach(other => {
        if (other !== card) setTourOpen(other, false);
      });
      setTourOpen(card, open);
      if (open) head.scrollIntoView({ block: 'nearest' });
    });
    detailsButton.addEventListener('click', () => {
      const open = details.hidden;
      details.hidden = !open;
      detailsButton.setAttribute('aria-expanded', String(open));
      detailsButton.textContent = open ? tr('Скрыть подробности ↑', 'Hide details ↑') : tr('Узнать о туре ↓', 'Tour details ↓');
    });
  });
  const individualButton = page.querySelector('.tv-individual-toggle');
  const individualDetails = page.querySelector('.tv-individual-details');
  individualButton.addEventListener('click', () => {
    const open = individualDetails.hidden;
    individualDetails.hidden = !open;
    individualButton.setAttribute('aria-expanded', String(open));
    individualButton.textContent = open ? tr('Свернуть ↑', 'Close ↑') : tr('Что входит ↓', 'What is included ↓');
  });
}
