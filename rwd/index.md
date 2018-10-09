# Responsive Web Design
Отзывчивый дизайн (Responsive Web Design, RWD) сегодня — это необходимость. Верстка должна быть гибкой и не зависеть от экрана устройства.

## Основные принципы отзывчивого дизайна
* Тянущийся макет. Формообразующим блокам (около `300px` и больше) не задается фиксированная ширина.
* Тянущиеся картинки, видео и элементы со встраиваемым контентом (`iframe`, `object` и пр.)
* Вид макета на разных экранах определяется через `@media`-запросы по нарастающей (mobile first).

## Вьюпорт
Браузеры на мобильных по умолчанию пытаются отобразить сайт так, как будто они компьютеры среднего размера. Нам это не нужно. Чтобы сказать браузерам, что не нужно ничего эмулировать, используют [такой meta-тэг](https://developers.google.com/web/fundamentals/design-and-ux/responsive/#tldr_hide-from-toc) в разделе `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Этот пример можно считать минимально-рабочим, атрибут `content` может содержать дополнительные инструкции.

## Картинки
Картинкам и любым другим медиа-ресурсам указывают `max-width` вместо `width`.

Часто `max-width: 100%` указывают картинкам, вложенным другие теги. Так, при уменьшении ширины экрана картинка не вылезет за края родительского html-элемента.

Для загрузки разных вариантов картинок для узких и широких экранов используют тэг [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture). См. пример кода ниже, в разделе Progressive enhancement.

Фоновые картинки для разных экранов назначаются через @media-запросы по `min-width`:

```less
.banner {
    background: url(/img/banner_big.png) no-repeat; // исходный фон для узких экранов

    @media (min-width: 1024px) {
        background-image: url(/img/banner_big.png); // переопределяем для широких экранов
    }
}
```

См. курс [Responsive Images](https://www.udacity.com/course/responsive-images--ud882) на Udacity.

## Брекпойнты (контрольные точки)
По возможности добавляйте/переопределяйте стили от меньшего к большему через `@media (min-width: ...)` без привязки к конкретным девайсам.

Брекпойнты нужно выбирать [отталкиваясь от контента и дизайна](https://www.skillshare.com/classes/Vue.js-Build-a-Full-Stack-App-With-Firebase-Vuex-Vue-Router/1654744071?via=similar-classes). То есть мы (дизайнеры и верстальщики) сами решаем, при какой ширине экрана нужно переносить блок или добавлять сайдбар. Размеры девайсов для нас просто ориентиры.

Если сначала заверстать десктоп, указав формирующим блокам фиксированную ширину, то потом придется перебивать стили на нескольких брекпойнтах для планетов и мобильных по `max-width`. Если сначала писать стили для мобильных, а потом постепенно добавлять их для планшетов и десктопов по `min-width`, то будет проще и код будет чище и мы сможем охватить любую ширину экрана.

## Mobile first
Старайтесь наворачивать стили постепенно, от узкого экрана к широкому.

В общем случае подход mobile first подразумевает постепенное усложнение не только верстки, но и функционала, графики и вообще всего, что есть на сайте.

Сжатие файлов стилей, настройка gzip на сервере и грамотная загрузка файлов стилей для страниц (на главной грузим только то, что для главной) сводят преимущество вынесения стилей для разных ширин экранов в отдельные файлы к минимуму. Нас прежде всего интересует понятный код и возможность быстро вносить изменения, поэтому стили для всех экранов мы пишем в одном файле.

Мы используем БЭМ и храним стили для всех `@media` в блоке кода для селектора:

```less
.product-price {
    font-weight: bold;
    font-size: 1.4rem;

    @media only screen and (min-width: 768px) { // >= 768px (планшет и шире)
        font-size: 1.2em;    
    }

    @media only screen and (min-width: 992px) { // >= 992 (компьютер и шире)
        font-size: 1.5em;
    }

    // Иногда нужно жестко ограничить стили только для промежутка значений...
    @media only screen and (min-width: 320px) and (max-width: 767px) {
        background: #CCC; // от 320 до 768 (только мобильные)
    }

    // ...или до какого-то значения
    @media only screen and (max-width: 1444px) {
        border-bottom: 1px solid #000; // <= 1444 (до широких мониторов)
    }

    // ...но предпочтительно использовать добавление и переопределение стилей
    // по нарастающей, используя только `min-width` в `@media`-запросе.
}
```

Попробуйте написать эти же стили начиная с десктопа и вам станет ясно, что по нарастающей стили писать удобнее. Даже когда у вас на руках есть только десктопный макет, то все равно можно верстать помня о подходе mobile first.

Еще пример. Нужно показывать левую колонку только начиная с `768px` (планшет):

```less
.left-column {
    display: none; // колонка изначально скрыта

    @media only screen and (min-width: 768px) {
        display: block; // появится только на экранах от `768px`
        border: 2px solid #f00;
        border-radius: 10px;
        background: #CCC;
    }

    @media only screen and (min-width: 1024px) {
        box-shadow: 2px 4px #000; // а на широких экранах еще добавится тень
        font-size: 120%;          // и увеличится шрифт
    }
}
```

Можно было бы написать сразу все стили и скрыть `.left-column` через `max-width: 767px`, но так мы не получим слоеную структуру стилей, которые можно удалять и добавлять по мере необходимости.

## Преимущества `min-width` и mobile first
При использовании `max-width` макет будет адаптироваться под ширину экрана только по брекпойнтам. На рынке множество девайсов с разной шириной экрана, мы не сможем для всех задать контрольные точки.

Нас интересует именно резиновый макет, адаптирующийся под любую ширину экрана. Этого можно добиться, используя `min-width` в медиа-запросах. Так мы не будем привязаны к ширине устройства и при выходе нового Айфона не нужно будет ничего доделывать, все и так будет работать.

Основное правило адаптивной верстки — верстать так, чтобы не зависеть от ширины экрана. Да, у нас есть дизайн для мобильного и для планшета и дизайнер не всегда грамотно его делает. Но нужно стремиться сделать макет на столько гибким, на сколько это возможно и задавать стили по нарастающий, используя `min-width` в @media-запросах и проценты для задания ширины.

## Progressive Enhancement
Мобильники слабее по производительности, чем компьютеры. Сеть может быть 3G или даже хуже. Мы не должны грузить лишнего (картинки), не должны загружать его лишним процессами (анимация, вычисления).

Например, на десктопе можно сделать анимацию пересчета цены, а на мобильнике это не обязательно, потому что пользователь ее может даже не заметить. Или анимированное добавление товара в корзину тоже можно делать только для десктопов.

Девайсы, у которых больше мощности и лучше соединение с интернетом должны дополнять и переопределять стили, дополнять интерфейс анимацией и эффектами, подгружать дополнительные, более качественные ресурсы. Не наоборот.

Плохой пример. Всегда будут грузится две картинки, но одна из них будет скрыта в зависимости от размера экрана:

```html
<style>
    /* Это плохой пример */
    @media (max-width: 768px) {
        .hidden-on-mobile {
            display: none;
        }
    }

    @media (min-width: 769px) {
        .hidden-on-desktop {
            display: none;
        }
    }
</style>
<div class="banner">
    <img class="hidden-on-mobile" src="banner_big.jpg">
    <img class="hidden-on-desktop" src="banner_small.jpg">
    <!-- Браузер загрузит обе картинки и скроет одну в зависимости
         от ширины экрана. Визуально ок, но мы всегда грузим лишнее. -->
</div>
```

Хороший пример. Для разных экранов грузится только одна картинка:

```html
<!-- Это хороший пример -->
<picture>
    <source srcset="banner_big.jpg" media="(min-width: 769px)">
    <img src="banner_small.jpg">
    <!-- Браузер загрузит только одну картинку. -->
</picture>
```

См. курс [Responsive Images](https://www.udacity.com/course/responsive-images--ud882).

## Материалы
### Быстрый старт
* Небольшой (около часа) курс-введение в rwd и mobile first [Responsive Web Design: Mobile First Approach with HTML5 &amp; CSS3](https://www.skillshare.com/classes/Responsive-Web-Design-Mobile-First-Approach-with-HTML5-CSS3/1187417369). Интересное начинается с 8-го видео.
* Статья [Основы отзывчивого веб-дизайна](https://developers.google.com/web/fundamentals/design-and-ux/responsive/?hl=ru) от Гугля. Есть более подробный [курс на Udacity](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893) от этого же автора.
* Курс [Responsive Web Design](https://frontendmasters.com/courses/responsive-web-design/) на Frontend Masters.

### Более основательные материалы
* Книга [Responsive Web Design](https://abookapart.com/products/responsive-web-design), Ethan Marcotte. Автор придумал термин Responsive web design. Книга впервые издана в 2011-м, было несколько переизданий с дополнениями.
* [Responsive Typography](https://frontendmasters.com/courses/responsive-typography/) на Frontend Masters.
* [Responsive Images](https://www.udacity.com/course/responsive-images--ud882) курс про верстку адаптивных картинок. Тэг `<picture>`, несколько `src` у картинок и пр. полезные штуки.