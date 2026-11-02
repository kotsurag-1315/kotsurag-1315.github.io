/* SimplePay: payment is reconciled by the owner; this file never grants access. */
function mountPremiumPayment(overlay) {
  const ru = STATE.lang === 'ru';
  const user = KM_AUTH?.currentUser;
  const slot = overlay.querySelector('[data-payment-slot]');
  if (!slot || !user) return;
  if (STATE.premium) {
    slot.textContent = ru ? 'Premium уже активен в этом аккаунте.' : 'Premium is already active on this account.';
    return;
  }
  if (!user.emailVerified || !user.email) {
    slot.textContent = ru ? 'Перед оплатой подтвердите email по ссылке в письме и обновите страницу.' : 'Before paying, verify your email using the link in your inbox and reload this page.';
    const resend = document.createElement('button');
    resend.type = 'button';
    resend.className = 'paywall-btn-secondary';
    resend.textContent = ru ? 'Отправить письмо ещё раз' : 'Resend verification email';
    resend.onclick = async () => {
      resend.disabled = true;
      try { await user.sendEmailVerification(); toast(ru ? 'Письмо отправлено. Проверьте также спам.' : 'Email sent. Please also check spam.'); }
      catch { toast(ru ? 'Не удалось отправить письмо. Попробуйте позже.' : 'Could not send email. Please try again later.'); }
      finally { resend.disabled = false; }
    };
    slot.append(resend);
    return;
  }
  slot.innerHTML = `
    <form class="km-payment-form" action="https://yookassa.ru/integration/simplepay/payment" method="post" accept-charset="utf-8">
      <label class="km-payment-email">${ru ? 'Доступ для аккаунта' : 'Access for this account'}<input name="cps_email" type="email" readonly required aria-label="Email"></label>
      <input name="shopId" type="hidden" value="1513834">
      <input name="sum" type="hidden" value="1490">
      <input name="customerNumber" type="hidden" value="Доступ к онлайн-гиду KoreaMate Premium на 12 месяцев. Разовый платёж, без автоматического продления.">
      <input name="shopSuccessURL" type="hidden" value="https://koreamate.ru/?payment=success#tab/profile">
      <input name="shopFailURL" type="hidden" value="https://koreamate.ru/?payment=failed#tab/profile">
      <p class="km-payment-note">${ru ? 'После оплаты платёж проверяется вручную. Доступ активируется в течение 24 часов после подтверждения оплаты. 12 месяцев отсчитываются с активации. Повторных списаний нет. Для другого аккаунта сначала выйдите и войдите с нужной почтой.' : 'Payments are checked manually. Access is activated within 24 hours of payment confirmation. Your 12 months start at activation. No recurring charges. To use another account, sign out and sign in with that email first.'}</p>
      <label class="km-payment-check"><input type="checkbox" required name="offerAccepted" value="2026-11-01"><span>${ru ? 'Принимаю' : 'I accept the'} <a href="offer.html" target="_blank" rel="noopener">${ru ? 'оферту' : 'offer terms (Russian)'}</a> ${ru ? 'и условия ручной активации в течение 24 часов. Информация об обработке данных — в' : 'and manual activation within 24 hours. Data processing is described in the'} <a href="privacy.html" target="_blank" rel="noopener">${ru ? 'политике конфиденциальности' : 'privacy policy (Russian)'}</a>.</span></label>
      <p class="km-payment-error" role="alert" hidden></p>
      <button class="paywall-btn-primary" type="submit">${ru ? 'Оплатить 1 490 ₽ через ЮKassa' : 'Pay RUB 1,490 via YooKassa'}</button>
      <p class="km-payment-note">${ru ? 'Вопросы по оплате и доступу:' : 'Payment and access support:'} <a href="mailto:kotsur.a.g@gmail.com">kotsur.a.g@gmail.com</a></p>
    </form>`;
  const form = slot.querySelector('form');
  form.elements.cps_email.value = user.email;
  form.addEventListener('submit', event => {
    const current = KM_AUTH?.currentUser;
    if (authCheckPending || !current || current.uid !== user.uid || !current.emailVerified || current.email !== user.email || STATE.premium) {
      event.preventDefault();
      const error = form.querySelector('[role="alert"]');
      error.hidden = false;
      error.textContent = ru ? 'Статус аккаунта изменился или ещё проверяется. Закройте это окно и откройте оплату снова.' : 'Your account status changed or is still being checked. Close this window and open payment again.';
      return;
    }
    // Restore the expected values immediately before the standard HTML POST.
    form.elements.cps_email.value = current.email;
    form.elements.sum.value = '1490';
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    // A failed navigation or Back from checkout must not strand the button.
    setTimeout(() => { button.disabled = false; }, 5000);
  });
}

function renderPaymentReturn(page) {
  const result = new URLSearchParams(location.search).get('payment');
  if (!['success', 'failed'].includes(result)) return;
  const ru = STATE.lang === 'ru';
  const notice = document.createElement('section');
  notice.className = 'km-payment-return';
  notice.setAttribute('role', 'status');
  const heading = document.createElement('h3');
  const message = document.createElement('p');
  if (STATE.premium) {
    heading.textContent = ru ? 'Premium активен' : 'Premium is active';
    message.textContent = ru ? 'Срок доступа указан в профиле.' : 'Your access expiry date is shown in your profile.';
  } else if (result === 'success') {
    heading.textContent = ru ? 'Вы вернулись со страницы оплаты' : 'You have returned from checkout';
    message.textContent = ru ? 'Если платёж прошёл, я проверю его и открою Premium в течение 24 часов. Повторно оплачивать не нужно. Войдите с той же почтой, которую указали при оплате. Если доступ не появился через 24 часа — напишите в поддержку.' : 'If your payment went through, I will verify it and activate Premium within 24 hours. Please do not pay again. Sign in with the email used for payment. If access is missing after 24 hours, contact support.';
  } else {
    heading.textContent = ru ? 'Оплата не завершена' : 'Payment was not completed';
    message.textContent = ru ? 'Если деньги списались, не платите повторно: напишите в поддержку. Если списания не было, можно снова открыть оплату.' : 'If you were charged, do not pay again: contact support. If you were not charged, you can open checkout again.';
  }
  const support = document.createElement('a');
  support.href = 'mailto:kotsur.a.g@gmail.com';
  support.textContent = ru ? 'Написать в поддержку' : 'Contact support';
  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.textContent = ru ? 'Понятно' : 'Dismiss';
  dismiss.onclick = () => { const url = new URL(location.href); url.searchParams.delete('payment'); history.replaceState(null, '', url); notice.remove(); };
  notice.append(heading, message, support, dismiss);
  page.prepend(notice);
}
