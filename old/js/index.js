/*jslint browser: true */

(function ($) {
  'use strict';

  function addImages() {
    var images = [
      '035',
      '036',
      '038',
      '039',
      '040',
      '041',
      '027',
      '031',
      '032',
      '033',
      '034',
      '016',
      '017',
      '021',
      '020',
      '012',
      '013',
      '014',
      '015',
      '023',
      '022',
      '001',
      '002',
      '003',
      '004',
      '005',
      '006',
      '007',
      '008',
      '009',
      '010',
      '011',
      '018',
      '019',
      '024',
      '025',
      '026',
      '028',
      '029',
      '030',
      '037',
      '042'
    ],
      imageWrapper = document.querySelector('.swiper-wrapper'),
      imageName,
      imageElement,
      index;

    for (index = 0; index < images.length; index += 1) {
      imageName = images[index];
      imageElement = document.createElement('div');
      imageElement.setAttribute('class', 'swiper-slide');
      imageElement.innerHTML = '<a href="images/gallery/' + imageName + '.jpg" data-gallery><img src="images/gallery/thumbnails/' + imageName + '_thumbnail.jpg"></a>';

      imageWrapper.appendChild(imageElement);
    }
  }

  $(document).ready(function () {
    var gallery;

    addImages();

    gallery = $('.swiper-container').swiper({
      slidesPerView: 'auto',
      keyboardControl: true,
      mousewheelControl: true,
      freeModeFluid: true,
      momentumRatio: 4,
      //Scrollbar:
      scrollbar: {
        container: '.swiper-scrollbar',
        draggable: true,
        hide: false,
        snapOnRelease: true
      }
    });

    $('.slider-button.next').click(function () {
      gallery.swipeNext();
    });

    $('.slider-button.previous').click(function () {
      gallery.swipePrev();
    });

  });

}(window.jQuery));