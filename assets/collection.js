'use strict';

var AddBusinessDays = function AddBusinessDays(n) {
  var d = new Date();
  var day = d.getDay();
  d.setDate(d.getDate() + n + (day === 6 ? 2 : +!day) + Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2);
  return d;
};

var FormatDate = function FormatDate(date) {
  var showYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var year = date.getFullYear().toString().substr(-2);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (day < 10) {
    day = '0' + day;
  };
  if (month < 10) {
    month = '0' + month;
  };
  return day + '-' + month + (showYear ? '-' + year : '');
};

function updateSingleEDD(product) {
  let thumbShipFrom = product.querySelector('.thumb-ship-from');
  let from = thumbShipFrom.dataset.shipFrom;
  let ship = window.Countries.shippingWidget.find(function(s) {
    return s.from == from;
  });

  var thumbProductEdd = product.querySelector('.thumb-product-edd');
  if (thumbProductEdd) {
    thumbProductEdd.innerHTML = ship ? FormatDate(AddBusinessDays(ship.ranges[0].min), false) : 'DD-MM';
  }
  var thumbProductLdd = product.querySelector('.thumb-product-ldd');
  if (thumbProductLdd) {
    thumbProductLdd.innerHTML = ship ? FormatDate(AddBusinessDays(ship.ranges[0].max), false) : 'DD-MM';
  }
}

document.addEventListener('page:loaded', function() {
  console.log('page:loaded')
  var shipProducts = document.querySelectorAll('.Ship__product');
  shipProducts.forEach(function(product) {
    updateSingleEDD(product);
  });
});

document.addEventListener('collection:reloaded', function() {
  console.log('collection:reloaded')
  var shipProducts = document.querySelectorAll('.card-information__wrapper .Ship__product');
  shipProducts.forEach(function(product) {
    updateSingleEDD(product);
  });
});