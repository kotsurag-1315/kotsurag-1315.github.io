// A lightweight photo story from real KoreaMate trips. Source HEIC/JPG files stay untouched.
(function () {
  const root = 'assets/photos/tour-gallery/';
  const photo = (id, ru, en, shape = '') => ({ id, ru, en, shape });
  const chapters = [
    {
      number: '01', kicker: ['Компания', 'The group'],
      title: ['Собрались и поехали', 'We got together and went'],
      lead: ['Сначала все знакомятся, а через пару дней уже зовут друг друга на кофе и фоткаются вместе.', 'At first everyone is new. A couple of days later, we are getting coffee and taking photos together.'],
      photos: [
        photo('2366-2', 'Вот наша группа. Почти все влезли в кадр.', 'Here is our group. Almost everyone made it into the frame.', 'hero'),
        photo('3741', 'Сфоткались у дворца.', 'A group photo by the palace.', 'tall'),
        photo('5030', 'Ещё одно фото всей компанией.', 'Another photo with the whole group.', 'small'),
        photo('2689', 'Такие фото потом приятно пересматривать.', 'This is one to look back at later.', 'small'),
        photo('6550', 'Сходили к HYBE, сделали фото у входа.', 'Stopped by HYBE and took a photo outside.', 'wide'),
        photo('9528', 'Ну и без покупок не обошлось.', 'And yes, we did some shopping.', 'small')
      ]
    },
    {
      number: '02', kicker: ['Весна', 'Spring'],
      title: ['Пошли смотреть сакуру', 'Out to see the blossoms'],
      lead: ['Весной тут сложно идти без остановок. То кофе возьмём, то опять хочется сфоткаться.', 'In spring we keep stopping: coffee, another photo, then another photo.'],
      photos: [
        photo('1447', 'Вот ради таких улиц и идём смотреть цветение.', 'This is why we came to see the blossoms.', 'hero'),
        photo('0654', 'Взяли кофе и пошли дальше.', 'Grabbed coffee and kept walking.', 'small'),
        photo('0840', 'Фото под сакурой — куда без него.', 'Of course we took a photo under the blossoms.', 'tall'),
        photo('1304', 'Цветёт буквально всё.', 'Everything seems to be blooming.', 'small'),
        photo('5734', 'Тут мы шли медленно. Сами видите почему.', 'We walked slowly here. You can see why.', 'wide'),
        photo('5758', 'Ещё немного сакуры. Её много не бывает.', 'More blossoms. No complaints.', 'small')
      ]
    },
    {
      number: '03', kicker: ['Природа', 'Outdoors'],
      title: ['Иногда идём в горы', 'Sometimes we head into the hills'],
      lead: ['После городских прогулок хочется сменить картинку. Идём на тропу, смотрим на виды, у водопада надеваем дождевики.', 'After a few days in the city, we head for the trails, the views and a waterfall.'],
      photos: [
        photo('5439', 'Поднялись наверх. Вид того стоил.', 'We made it to the top. Worth it.', 'hero'),
        photo('4919', 'У водопада без дождевика никак.', 'Raincoats were a good idea by the waterfall.', 'small'),
        photo('8222', 'По пути заглянули в храм.', 'Stopped by a temple on the way.', 'tall'),
        photo('9262', 'Гуляем, смотрим на город.', 'Walking and looking out over the city.', 'wide'),
        photo('9456', 'Остановились передохнуть.', 'Took a little break.', 'small')
      ]
    },
    {
      number: '04', kicker: ['Город', 'The city'],
      title: ['Гуляем по городу', 'Walking around the city'],
      lead: ['Идём куда-то по плану, потом сворачиваем в переулок — и там тоже интересно. Так что иногда просто гуляем.', 'We have a plan, take a turn down a side street, and find something else to see. Sometimes we just walk.'],
      photos: [
        photo('3073', 'Намсан видно даже между домами.', 'You can spot Namsan between the buildings.', 'hero'),
        photo('8087', 'Обычный день в Сеуле.', 'Just another day in Seoul.', 'small'),
        photo('2354', 'Вид на Намсан прямо у 7-Eleven.', 'A Namsan view right by 7-Eleven.', 'tall'),
        photo('4873', 'Вечером вышли ещё погулять.', 'Went out for another walk in the evening.', 'small'),
        photo('8090', 'Вывески горят, людей полно — Сеул вечером.', 'Bright signs and busy streets. Seoul at night.', 'wide'),
        photo('8228', 'Свернули в переулок, а там такой вид.', 'Turned down a side street and found this view.', 'small'),
        photo('8218', 'Не удержались, сфоткали небо.', 'Had to take a photo of that sky.', 'small'),
        photo('8225', 'Посидели у воды.', 'Spent some time by the water.', 'wide'),
        photo('7179', 'Посмотрели на ночной город сверху.', 'Saw the city lights from above.', 'small')
      ]
    },
    {
      number: '05', kicker: ['Еда и вечер', 'Food and evenings'],
      title: ['Поесть тоже успеваем', 'There is always time to eat'],
      lead: ['Между прогулками пьём кофе, ищем что-нибудь вкусное и иногда задерживаемся до вечера.', 'Between walks we get coffee, find something good to eat and sometimes stay out late.'],
      photos: [
        photo('2190', 'Взяли кофе перед прогулкой.', 'Coffee before the walk.', 'hero'),
        photo('1969', 'Перекусили на стадионе.', 'A snack at the stadium.', 'small'),
        photo('8216', 'Рамен — всегда хороший вариант.', 'Ramen is always a good call.', 'tall'),
        photo('4558', 'С едой на сегодня точно всё хорошо.', 'Food was sorted for the day.', 'wide'),
        photo('3996', 'И салют застали.', 'We caught the fireworks too.', 'small'),
        photo('5884', 'А вечером вышли к морю.', 'And in the evening, we went to the sea.', 'wide')
      ]
    }
  ];

  function render(lang, safe) {
    const ru = lang === 'ru';
    const pick = pair => pair[ru ? 0 : 1];
    const img = id => root + 'img_' + id + '.webp';
    const chapterHtml = chapters.map(chapter => `
      <section class="tg-chapter" aria-labelledby="tg-chapter-${chapter.number}">
        <div class="tg-chapter-intro">
          <span class="tg-chapter-kicker">${chapter.number} / ${safe(pick(chapter.kicker))}</span>
          <h2 id="tg-chapter-${chapter.number}">${safe(pick(chapter.title))}</h2>
          <p>${safe(pick(chapter.lead))}</p>
        </div>
        <div class="tg-photos">
          ${chapter.photos.map((item, index) => `
            <figure class="tg-photo tg-photo--${item.shape || (index % 2 ? 'small' : 'tall')}">
              <img src="${img(item.id)}" alt="${safe(ru ? item.ru : item.en)}" loading="lazy" decoding="async">
              <figcaption>${safe(ru ? item.ru : item.en)}</figcaption>
            </figure>`).join('')}
        </div>
      </section>`).join('');
    return {
      hero: `<button type="button" class="tg-entry" aria-label="${ru ? 'Смотреть фото с наших поездок' : 'View photos from our trips'}">
        <span class="tg-entry-collage" aria-hidden="true">
          <img src="${img('2366-2')}" alt="" decoding="async">
          <img src="${img('1447')}" alt="" decoding="async">
          <img src="${img('5439')}" alt="" decoding="async">
        </span>
        <span class="tg-entry-copy">
          <span class="tg-entry-eyebrow">${ru ? 'ФОТО С НАШИХ ПОЕЗДОК' : 'PHOTOS FROM OUR TRIPS'}</span>
          <strong>${ru ? 'Как мы путешествуем' : 'See how we travel'}</strong>
          <span>${ru ? 'Группа, сакура, прогулки и еда. Показываем, как всё было.' : 'Our group, blossoms, walks and food. See how it went.'}</span>
          <em>${ru ? 'Смотреть фото' : 'View photos'} <span aria-hidden="true">↗</span></em>
        </span>
      </button>`,
      story: `<div class="tg-story" hidden>
        <div class="tg-story-top"><button type="button" class="tg-back">← ${ru ? 'К турам' : 'Back to tours'}</button><span>KoreaMate / ${ru ? 'Наши поездки' : 'Our trips'}</span></div>
        <header class="tg-story-hero">
          <span class="tg-story-eyebrow">${ru ? 'ФОТО С НАШИХ ПОЕЗДОК' : 'PHOTOS FROM OUR TRIPS'}</span>
          <h1>${ru ? 'Вот как мы ездим' : 'Here is how we travel'}</h1>
          <p>${ru ? 'Погуляли, посмотрели город, сходили в горы, поели. Вот несколько фото с наших поездок.' : 'We walked around, explored the city, went hiking and ate well. Here are some photos from our trips.'}</p>
          <img src="${img('2366-2')}" alt="${ru ? 'Группа путешественников KoreaMate вместе на прогулке' : 'KoreaMate travel group together on a walk'}" decoding="async">
          <span class="tg-scroll-cue">${ru ? 'ЛИСТАЙТЕ ВНИЗ ↓' : 'SCROLL DOWN ↓'}</span>
        </header>
        <div class="tg-story-chapters">${chapterHtml}</div>
        <footer class="tg-story-end"><span>✳</span><h2>${ru ? 'Это ещё не все фото' : 'There are more photos to come'}</h2><p>${ru ? 'В следующей поездке наснимаем ещё.' : 'We will take plenty more on the next trip.'}</p><button type="button" class="tg-back tg-back--end">${ru ? 'Посмотреть туры ↑' : 'See upcoming tours ↑'}</button></footer>
      </div>`
    };
  }

  function init(page) {
    const entry = page.querySelector('.tg-entry');
    const shell = page.querySelector('.tv-shell');
    const story = page.querySelector('.tg-story');
    if (!entry || !story) return;
    entry.addEventListener('click', () => {
      shell.hidden = true;
      story.hidden = false;
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
    page.querySelectorAll('.tg-back').forEach(button => button.addEventListener('click', () => {
      story.hidden = true;
      shell.hidden = false;
      window.scrollTo({ top: 0, behavior: 'auto' });
      entry.focus({ preventScroll: true });
    }));
  }

  window.KM_TOUR_GALLERY = { render, init };
})();
