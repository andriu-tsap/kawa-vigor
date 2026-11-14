'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Formularze demonstracyjne zatrzymują poprawne zgłoszenia w przeglądarce.
document.addEventListener('submit', event => {
  if (!event.target.matches('.demo')) return;
  event.preventDefault();
  const status = $('[role=status]', event.target);
  if (status) status.textContent = document.documentElement.lang === 'de'
    ? 'Demo – es werden keine Daten gesendet.'
    : 'Dane poprawne. demo – formularz nie wysyła danych';
});
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.filter(entry => entry.isIntersecting).forEach(entry => {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    });
  }, {threshold: 0.08});
  $$('.section').forEach(section => observer.observe(section));
}
function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* Zmiany pozostają w bieżącej sesji. */ }
}

const language=$('[name=language]'), currency=$('[name=currency]');
const options={0:['Jednorazowo','Einmalig'],2:['Co 2 tygodnie','Alle 2 Wochen'],4:['Co 4 tygodnie','Alle 4 Wochen']};
const dict=$$('[data-de]').map(node=>({node,pl:node.textContent}));
const info=$('#checkout p');
let cart=readStorage('vigor-cart',{});
language.value=readStorage('vigor-lang','pl');
currency.value=readStorage('vigor-currency','PLN');
const de=()=>language.value==='de';
const price=plan=>plan==='0'?46:41.4;
const format=amount=>new Intl.NumberFormat(de()?'de-DE':'pl-PL',{style:'currency',currency:currency.value}).format(currency.value==='EUR'?amount/4.3:amount);
function render(){
  document.documentElement.lang=language.value;
  dict.forEach(({node,pl})=>node.textContent=de()?node.dataset.de:pl);
  info.textContent=de()?'Demo – dieses Formular sendet keine Daten.':'demo – formularz nie wysyła danych';
  $('#price').textContent=format(price($('[name=plan]:checked').value));
  const box=$('#cart'); box.replaceChildren();
  let total=0;
  Object.entries(cart).filter(([key])=>key in options).forEach(([key,qty])=>{
    const row=document.createElement('div'); row.className='actions';
    const line=document.createElement('span'); line.textContent=qty+' × '+options[key][Number(de())]+' · '+format(qty*price(key));
    const remove=document.createElement('button'); remove.className='button'; remove.textContent=de()?'Entfernen':'Usuń';
    remove.onclick=()=>{delete cart[key];save();};
    row.append(line,remove);box.append(row);total+=qty*price(key);
  });
  const sum=document.createElement('strong');
  sum.textContent=total?(de()?'Summe: ':'Suma: ')+format(total):(de()?'Der Warenkorb ist leer.':'Koszyk jest pusty.');
  box.append(sum);$('#checkout button').disabled=!total;
}
function save(){writeStorage('vigor-cart',cart);render();}
language.onchange=()=>{writeStorage('vigor-lang',language.value);render();};
currency.onchange=()=>{writeStorage('vigor-currency',currency.value);render();};
$$('[name=plan]').forEach(radio=>radio.onchange=render);
$('#add').onclick=()=>{
  const key=$('[name=plan]:checked').value;
  cart[key]=(cart[key]||0)+1;save();
  $('#cart-status').textContent=de()?'Zum Warenkorb hinzugefügt.':'Dodano do koszyka.';
};
render();
