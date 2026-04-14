"use strict";
(self["webpackChunkHalo"] = self["webpackChunkHalo"] || []).push([["assets_js_theme_product_js"],{

/***/ "./assets/js/theme/halothemes/haloBundleProducts.js"
/*!**********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloBundleProducts.js ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object.defineProperty(__WEBPACK_DEFAULT_EXPORT__, "name", { value: "default", configurable: true });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _haloCalculateFreeShipping__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./haloCalculateFreeShipping */ "./assets/js/theme/halothemes/haloCalculateFreeShipping.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__($scope, context) {
  var thisProuctId = parseInt(context.productId),
    $relatedTab = $('#halo-related-products'),
    $bundle = $('#halo-bundle-products'),
    $bundleList = $bundle.find('.halo-product-list .bundle-product-wrapper');
  var currency = context.money;
  showBundle();
  $(document).on('click', '.halo-toggle-options', function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    $('.halo-toggle-options').not($target).removeClass('is-focus');
    $('.halo-detail-options').not($target.next('.halo-detail-options')).removeClass('is-open');
    if (!$target.next('.halo-detail-options').hasClass('is-open')) {
      $target.addClass('is-focus');
      $target.next('.halo-detail-options').addClass('is-open');
    } else {
      $target.next('.halo-detail-options').removeClass('is-open');
      $target.removeClass('is-focus');
    }
  });
  $(document).on('click', '[data-halo-option-close]', function (event) {
    event.preventDefault();
    $('.halo-detail-options').removeClass('is-open');
    $('.halo-toggle-options').removeClass('is-focus');
  });
  $(document).on('click', function (event) {
    if ($('.halo-detail-options').hasClass('is-open')) {
      if ($(event.target).closest('.halo-detail-options').length === 0 && $(event.target).closest('.halo-toggle-options').length === 0) {
        $('.halo-detail-options').removeClass('is-open');
        $('.halo-toggle-options').removeClass('is-focus');
      }
    }
  });
  $(document).on('change', '.halo-detail-checkbox', function (event) {
    var $target = $(event.currentTarget),
      id = $target.attr('id').replace('fbt_product', ''),
      product = $('.halo-product-item[data-product-id="' + id + '"]');
    if ($target.is(':checked') == false) {
      product.removeClass('isChecked');
      product.find('.status').addClass('disable').text('This item');
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    } else {
      product.addClass('isChecked');
      product.find('.status').removeClass('disable').text('Selected');
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    }
    totalPrice();
  });
  $(document).on('click', '#halo-addAll', function (event) {
    event.preventDefault();
    var $form = $('form', $bundle);
    var arrPro = new Array();
    $('.halo-detail-checkbox').each(function (index, val) {
      if ($(val).is(':checked')) {
        arrPro.push(index);
      }
    });
    var check = false;
    if (arrPro.length > 0) {
      check = checkProduct($form, arrPro);
    }
    if (check) {
      if (arrPro.length > 0) {
        var k = arrPro.length;
        $bundle.find('.loadingOverlay').show();
        addToCart($form, 0, arrPro, k);
      }
    } else {
      var errorMessage = 'Please make sure all options have been filled in.';
      if (errorMessage) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_1__.showAlertModal)(tmp.textContent || tmp.innerText);
      }
    }
    event.preventDefault();
  });
  function showBundle() {
    var options = {
      template: 'halothemes/product/halo-bundle-products-tmp'
    };
    var prodBundleId = [],
      totalBlock = '';
    firstItem();
    if ($bundle.hasClass('halo-bundle-login')) {
      totalBlock = '<div class="halo-product-total">\
                            <a class="button button--primary button--small halo-product-total-button m-0" disabled href="#"><span>Log in for pricing</span></a>\
                        </div>';
    } else {
      totalBlock = '<div class="halo-product-total d-flex d-block-tb a-i-start j-c-between">\
                            <div class="total-price">\
                                <span class="text"><span>Price Total</span></span>\
                                <span class="price price-sale"></span>\
                                <span class="price"></span>\
                            </div>\
                            <a class="button button--primary button--small halo-product-total-button m-0" id="halo-addAll" href="#"><span>Add <span class="number">all</span> item(s) to bag</span></a>\
                        </div>';
    }
    $bundle.find('.bundle-product-right').append(totalBlock);
    $.each(context.productCustomFields, function (index, obj) {
      if (obj.name == '__bundleid') {
        prodBundleId = JSON.parse('[' + obj.value + ']');
      }
    });
    prodBundleId = $.grep(prodBundleId, function (value) {
      return value != thisProuctId;
    });
    if ($bundle.length > 0 && prodBundleId.length == 0) {
      var num = 0,
        list = [];
      $relatedTab.find('.card').each(function (index, val) {
        list.push({
          index: index,
          data: ""
        });
        var pId = $(val).data('product-id');
        if (pId != undefined) {
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(pId, options, function (err, response) {
            if (err) {
              return '';
            }
            list.forEach(function (element) {
              if (element.index == index) {
                element.data = response;
              }
            });
            num++;
            if (num == $relatedTab.find('.card').length) {
              showList(list);
            }
          });
        }
      });
    } else if ($bundle.length > 0 && prodBundleId.length > 0) {
      var num = 0,
        list = [];
      $.each(prodBundleId, function (i, val) {
        list.push({
          i: i,
          data: ""
        });
        var pId = prodBundleId[i];
        if (pId != undefined) {
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(pId, options, function (err, response) {
            if (err) {
              return false;
            }
            list.forEach(function (element) {
              if (element.i == i) {
                element.data = response;
              }
            });
            num++;
            if (num == prodBundleId.length) {
              showList(list);
            }
          });
        }
      });
    }
  }
  function firstItem() {
    var firstItem = $bundleList.find('.halo-product-itemFirst'),
      pId = firstItem.data('product-id'),
      form = firstItem.find('form'),
      hasOptions = form.find('[data-fbt-option-change]').length,
      hasDefaultOptions = form.find('[data-default]').length;
    if (hasDefaultOptions && hasOptions) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.productAttributes.optionChange(pId, form.serialize(), 'products/bulk-discount-rates', function (err, response) {
        var attributesData = response.data || {};
        var attributesContent = response.content || {};
        updateProductAttributes(form, attributesData);
        if (hasDefaultOptions) {
          updateView(form, attributesData, attributesContent);
        } else {
          updateDefaultAttributesForOOS(attributesData);
        }
      });
    }
  }
  function showList(list) {
    list.forEach(function (element) {
      var response = element.data;
      if (response != undefined && response != null && response != '') {
        $bundleList.append(response);
        if ($(response).find('.halo-toggle-options').length) {
          var pId = $(response).data('product-id'),
            $form = $bundleList.find('.halo-product-item[data-product-id="' + pId + '"] form');
          var $productOptionsElement = $('[data-fbt-option-change]', $form);
          var hasOptions = $productOptionsElement.html().trim().length;
          var hasDefaultOptions = $(response).find('[data-default]').length;
          if (hasDefaultOptions && hasOptions) {
            _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.productAttributes.optionChange(pId, $form.serialize(), 'products/bulk-discount-rates', function (err, response) {
              if (response != undefined) {
                var attributesData = response.data || {};
                var attributesContent = response.content || {};
                updateProductAttributes($form, attributesData);
                if (hasDefaultOptions) {
                  updateView($form, attributesData, attributesContent);
                } else {
                  updateDefaultAttributesForOOS(attributesData);
                }
              }
            });
          }
          setProductVariant();
        }
      }
    });
    $('.halo-product-item', $scope).each(function (index, element) {
      $(element).on('click', '[data-quantity-fbt-change] button', function (event) {
        event.preventDefault();
        var $target = $(event.currentTarget);
        var currentItemProId = $target.closest('.halo-product-item').data('product-id');
        var $input = $(".halo-product-item[data-product-id=\"" + currentItemProId + "\"] [name=fbtqty\\[\\]]", $scope);
        var quantityMin = parseInt($input.data('quantityMin'), 10);
        var quantityMax = parseInt($input.data('quantityMax'), 10);
        var qty = _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].numbersOnly($input.val()) ? parseInt($input.val(), 10) : quantityMin;
        if ($target.data('action') === 'inc') {
          qty = _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].validateIncreaseAgainstMaxBoundary(qty, quantityMax);
        } else if (qty > 1) {
          qty = _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].validateDecreaseAgainstMinBoundary(qty, quantityMin);
        }
        $input.attr('value', qty);
        $input.val(qty);
      });
    });
    productOptions();
    if (!$bundle.hasClass('halo-bundle-login')) {
      totalPrice();
    }
    $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    $bundle.removeClass('halo-block-disable');
  }
  function checkProduct(form, arrPro) {
    var check = true;
    for (var i = 0; i < arrPro.length; i++) {
      var k = arrPro[i],
        $form = $(form[k]);
      if ($form.find('[data-fbt-option-change]').length) {
        check = checkBeforeAdd($form);
        if (check == false) {
          return false;
        }
      }
    }
    return check;
  }
  function checkBeforeAdd($attributes) {
    var check = true,
      att = "";
    $attributes.find('input:text, input:password, input:file, textarea').each(function (index, element) {
      if (!$(element).prop('required')) {} else {
        if ($(element).val()) {} else {
          $(element).focus();
          check = false;
        }
      }
    });
    $attributes.find('select').each(function (index, element) {
      if (!$(element).prop('required')) {} else {
        if ($(element).val()) {} else {
          $(element).focus();
          check = false;
        }
      }
    });
    $attributes.find('input:radio, input:checkbox').each(function (index, element) {
      if (att != $(element).attr("name")) {
        att = $(element).attr("name");
        if (!$(element).prop('required')) {
          if ($(element).attr("type") == "checkbox") {
            if ($("[name='" + att + "']:checked").val()) {}
          }
          if ($(element).attr("type") == "radio") {
            if ($("[name='" + att + "']:checked").val()) {}
          }
        } else {
          if ($(element).attr("type") == "checkbox") {
            if ($("[name='" + att + "']:checked").val()) {} else {
              check = false;
            }
          }
          if ($(element).attr("type") == "radio") {
            if ($("[name='" + att + "']:checked").val()) {} else {
              check = false;
            }
          }
        }
      }
    });
    return check;
  }
  function addToCart(form, i, arrP, k) {
    if (window.FormData === undefined) {
      return;
    }
    var prod = arrP[i];
    var formData = new FormData(form[prod]);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.itemAdd(filterEmptyFilesFromForm(formData), function (err, response) {
      var errorMessage = err || response.data.error;
      var productsItem = $('.halo-product-item');
      productsItem.each(function (index, productItem) {
        var quantityData = $('[name=fbtqty\\[\\]]', productItem).val();
        $(productItem).find('[name=qty\\[\\]]').attr('value', quantityData);
      });
      if (errorMessage) {
        var tmp = document.createElement('DIV');
        tmp.innerHTML = errorMessage;
        alert(tmp.textContent || tmp.innerText);
        k = k - 1;
      }
      i++;
      if (i >= arrP.length) {
        $bundle.find('.loadingOverlay').hide();
        if (context.themeSettings.haloAddToCartAction === 'sidebar') {
          var options = {
            template: 'common/cart-preview'
          };
          var loadingClass = 'is-loading';
          var $body = $('body');
          var $cartDropdown = $('#halo-cart-sidebar .halo-sidebar-wrapper');
          var $cartLoading = $('<div class="loadingOverlay"></div>');
          $body.addClass('openCartSidebar');
          $cartDropdown.addClass(loadingClass).html($cartLoading);
          $cartLoading.show();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.cart.getContent(options, function (err, response) {
            $cartDropdown.removeClass(loadingClass).html(response);
            $cartLoading.hide();
            var quantity = $(response).find('[data-cart-quantity]').data('cartQuantity') || 0;
            $body.trigger('cart-quantity-update', quantity);
            (0,_haloCalculateFreeShipping__WEBPACK_IMPORTED_MODULE_2__["default"])(context);
          });
        } else {
          redirectTo(context.urls.cart);
        }
        return;
      }
      addToCart(form, i, arrP, k);
    });
  }
  function isRunningInIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  function redirectTo(url) {
    if (isRunningInIframe() && !window.iframeSdk) {
      window.top.location = url;
    } else {
      window.location = url;
    }
  }
  function totalPrice() {
    var total = 0,
      totalSale = 0,
      symbol,
      symbolChange,
      decimalPlaces,
      decimalSeparator,
      thousandsSeparator,
      symbolLocation,
      curr,
      token1,
      token2,
      length;
    decimalPlaces = currency.decimal_places;
    decimalSeparator = currency.decimal_token;
    thousandsSeparator = currency.thousands_token;
    symbolLocation = currency.currency_location;
    symbol = currency.currency_token;
    $bundleList.find('.halo-product-item.isChecked').each(function (index, val) {
      var price = parseFloat($(val).find('.halo-detail-price').attr('data-price-value')),
        priceSale = parseFloat($(val).find('.halo-detail-price').attr('data-price-sale-value'));
      total = total + price;
      totalSale = totalSale + priceSale;
    });
    if (total == totalSale) {
      $('.halo-product-total .price-sale').hide();
      $('.halo-product-total').removeClass('has-price-sale');
    } else {
      $('.halo-product-total .price-sale').show();
      $('.halo-product-total').addClass('has-price-sale');
    }
    if ($('.productView-price > .price-section > .price.price--withTax', $scope).length) {
      curr = $('.productView-price > .price-section > .price.price--withTax', $scope).data('value-price');
    } else {
      curr = $('.productView-price > .price-section > .price.price--withoutTax', $scope).data('value-price');
    }
    symbolChange = curr.replace(/[0-9]/g, "").replace(".", "").replace(",", "");
    if (symbol != symbolChange) {
      symbol = symbolChange;
      token1 = curr.indexOf('.');
      token2 = curr.indexOf(',');
      length = curr.length - 1;
      if (curr.indexOf(symbol) != -1) {
        symbolLocation = curr.indexOf(symbol);
      }
      if (token1 < token2) {
        thousandsSeparator = '.';
        decimalSeparator = ',';
        if (symbolLocation == 0 || symbolLocation == "left") {
          decimalPlaces = length - token2;
        } else {
          decimalPlaces = length - token2 - 1;
        }
      } else {
        thousandsSeparator = ',';
        decimalSeparator = '.';
        if (symbolLocation == 0 || symbolLocation == "left") {
          decimalPlaces = length - token1;
        } else {
          decimalPlaces = length - token1 - 1;
        }
      }
    }
    if (total == 0) {
      $bundle.find('#halo-addAll').attr('disabled', true);
    } else {
      $bundle.find('#halo-addAll').attr('disabled', false);
    }
    total = formatMoney(total, decimalPlaces, decimalSeparator, thousandsSeparator);
    totalSale = formatMoney(totalSale, decimalPlaces, decimalSeparator, thousandsSeparator);
    if (symbolLocation == "left" || symbolLocation == 0) {
      total = symbol + total;
      totalSale = symbol + totalSale;
    } else {
      total = total + symbol;
      totalSale = totalSale + symbol;
    }
    $bundle.find('.halo-product-total .price').html(total);
    $bundle.find('.halo-product-total .price-sale').html(totalSale);
  }
  function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }
  ;
  function productOptions() {
    if (!$bundle.hasClass('halo-bundle-login')) {
      totalPrice();
    }
    var $form = $('form', $bundle),
      $productOptionsElement = $('[data-fbt-option-change]', $form);
    setProductVariant();
    $(document).on('change', $productOptionsElement, function (event) {
      productOptionsChanged(event);
      setProductVariant();
    });
  }
  function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $('.halo-product-item').each(function (index, item) {
      var valueOptions = [];
      $(item).find('[data-fbt-option-change] [data-product-attribute]').each(function (_, value) {
        var optionLabel = $(value).find('label').text();
        var optionTitle = optionLabel.split(':')[0].trim();
        var required = optionLabel.toLowerCase().includes('required');
        var type = $(value).data('product-attribute');
        if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
          unsatisfiedRequiredFields.push(value);
        } else if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
          unsatisfiedRequiredFields.push(value);
        } else if (type === 'date') {
          var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
            return select.selectedIndex !== 0;
          });
          if (isSatisfied) {
            var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
              return x.value;
            }).join('-');
            options.push(optionTitle + ":" + dateString);
            return;
          }
          if (required) {
            unsatisfiedRequiredFields.push(value);
          }
        } else if (type === 'set-select') {
          var select = value.querySelector('select');
          var selectedIndex = select.selectedIndex;
          if (selectedIndex !== 0) {
            options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
            $(value.children[0]).find('[data-option-value]').text(select.options[selectedIndex].innerText);
            valueOptions.push(select.options[selectedIndex].innerText.trim());
            return;
          }
          if (required) {
            unsatisfiedRequiredFields.push(value);
          }
        } else if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
          var checked = value.querySelector(':checked');
          if (checked) {
            if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
              var label = checked.labels[0].innerText;
              if (label) {
                options.push(optionTitle + ":" + label);
                $(value.children[0]).find('[data-option-value]').text(label);
                valueOptions.push(label.trim());
              }
            }
            if (type === 'swatch') {
              var _label = checked.labels[0].children[0];
              if (_label) {
                options.push(optionTitle + ":" + _label.title);
                $(value.children[0]).find('[data-option-value]').text(_label.title);
                valueOptions.push(_label.title.trim());
              }
            }
            if (type === 'input-checkbox') {
              options.push(optionTitle + ":Yes");
            }
            return;
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":No");
          }
          if (required) {
            unsatisfiedRequiredFields.push(value);
          }
        }
      });
      if (valueOptions != '') {
        $(item).find('.halo-toggle-options .text').text(valueOptions.join(' / '));
      }
    });
  }
  function productOptionsChanged(event) {
    var $changedOption = $(event.target);
    var $form = $changedOption.parents('form');
    var productId = $('[name="product_id"]', $form).val();
    if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
      return;
    }
    if ($changedOption.attr('id') === 'fbt_product' + productId) {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', function (err, response) {
      var productAttributesData = response.data || {};
      var productAttributesContent = response.content || {};
      updateProductAttributes($form, productAttributesData);
      updateView($form, productAttributesData, productAttributesContent);
      if (!$bundle.hasClass('halo-bundle-login')) {
        totalPrice();
      }
    });
    return false;
  }
  function updateProductAttributes(data) {
    var behavior = data.out_of_stock_behavior;
    var inStockIds = data.in_stock_attributes;
    var outOfStockDefaultMessage = context.outOfStockDefaultMessage;
    var outOfStockMessage = data.out_of_stock_message;
    if (behavior !== 'hide_option' && behavior !== 'label_option') {
      return;
    }
    if (outOfStockMessage) {
      outOfStockMessage = " (" + outOfStockMessage + ")";
    } else {
      outOfStockMessage = " (" + outOfStockDefaultMessage + ")";
    }
    $('[data-product-attribute-value]', $scope).each(function (i, attribute) {
      var $attribute = $(attribute);
      var attrId = parseInt($attribute.data('productAttributeValue'), 10);
      if (inStockIds.indexOf(attrId) !== -1) {
        enableAttribute($attribute, behavior, outOfStockMessage);
      } else {
        disableAttribute($attribute, behavior, outOfStockMessage);
      }
    });
  }
  function disableAttribute($attribute, behavior, outOfStockMessage) {
    if (getAttributeType($attribute) === 'set-select') {
      return disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.hide(0);
    } else {
      $attribute.addClass('unavailable');
    }
  }
  function disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    var $select = $attribute.parent();
    if (behavior === 'hide_option') {
      $attribute.toggleOption(false);
      // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
      if ($select.val() === $attribute.attr('value')) {
        $select[0].selectedIndex = 0;
      }
    } else {
      $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
    }
  }
  function enableAttribute($attribute, behavior, outOfStockMessage) {
    if (getAttributeType($attribute) === 'set-select') {
      return enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
    }
    if (behavior === 'hide_option') {
      $attribute.show();
    } else {
      $attribute.removeClass('unavailable');
    }
  }
  function enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
    if (behavior === 'hide_option') {
      $attribute.toggleOption(true);
    } else {
      $attribute.html($attribute.html().replace(outOfStockMessage, ''));
    }
  }
  function getAttributeType($attribute) {
    var $parent = $attribute.closest('[data-product-attribute]');
    return $parent ? $parent.data('productAttribute') : null;
  }
  function updateView($scope, data, content) {
    if (content === void 0) {
      content = null;
    }
    var viewModel = getViewModel($scope);
    showMessageBox(data.stock_message || data.purchasing_message, $scope);
    if (data.price instanceof Object) {
      updatePriceView(viewModel, data.price);
    }
    var productId = $('[name="product_id"]', $scope).val(),
      product = $bundleList.find('.halo-product-item[data-product-id="' + productId + '"]'),
      productCheckbox = product.find('.halo-detail-checkbox');
    if (!data.purchasable || !data.instock) {
      product.removeClass('isChecked hasOptions--selected');
      product.find('.status').addClass('disable').text('This item');
      productCheckbox.prop('checked', false).prop('disabled', true);
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    } else {
      product.addClass('isChecked');
      product.find('.status').removeClass('disable').text('Selected');
      productCheckbox.prop('checked', true).prop('disabled', false);
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
      if ($scope.find('[data-fbt-option-change]').length > 0) {
        var check = checkBeforeAdd($scope);
        if (check == true) {
          product.addClass('hasOptions--selected');
        }
      }
    }
  }
  function updateDefaultAttributesForOOS($scope, data) {
    var productId = $('[name="product_id"]', $scope).val(),
      product = $bundleList.find('.halo-product-item[data-product-id="' + productId + '"]'),
      productCheckbox = product.find('.halo-detail-checkbox');
    if (!data.purchasable || !data.instock) {
      product.removeClass('isChecked hasOptions--selected');
      product.find('.status').addClass('disable').text('This item');
      productCheckbox.prop('checked', false).prop('disabled', true);
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
    } else {
      product.addClass('isChecked');
      product.find('.status').removeClass('disable').text('Selected');
      productCheckbox.prop('checked', true).prop('disabled', false);
      $('#halo-addAll').find('.number').text($('.halo-product-item.isChecked').length);
      if ($scope.find('[data-fbt-option-change]').length > 0) {
        var check = checkBeforeAdd($scope);
        if (check == true) {
          product.addClass('hasOptions--selected');
        }
      }
    }
  }
  function getViewModel($scope) {
    return {
      $priceValue: $('.halo-detail-price', $scope),
      $priceWithTax: $('[data-product-price-with-tax]', $scope),
      $priceWithoutTax: $('[data-product-price-without-tax]', $scope),
      rrpWithTax: {
        $div: $('.rrp-price--withTax', $scope),
        $span: $('[data-product-rrp-with-tax]', $scope)
      },
      rrpWithoutTax: {
        $div: $('.rrp-price--withoutTax', $scope),
        $span: $('[data-product-rrp-price-without-tax]', $scope)
      },
      nonSaleWithTax: {
        $div: $('.non-sale-price--withTax', $scope),
        $span: $('[data-product-non-sale-price-with-tax]', $scope)
      },
      nonSaleWithoutTax: {
        $div: $('.non-sale-price--withoutTax', $scope),
        $span: $('[data-product-non-sale-price-without-tax]', $scope)
      },
      priceSaved: {
        $div: $('.price-section--saving', $scope),
        $span: $('[data-product-price-saved]', $scope)
      },
      priceNowLabel: {
        $span: $('.price-now-label', $scope)
      },
      priceLabel: {
        $span: $('.price-label', $scope)
      },
      $weight: $('.productView-info [data-product-weight]', $scope),
      $increments: $('.form-field--increments :input', $scope),
      $addToCart: $('#form-action-addToCart', $scope),
      $wishlistVariation: $('[data-wishlist-add] [name="variation_id"]', $scope),
      stock: {
        $container: $('.form-field--stock', $scope),
        $input: $('[data-product-stock]', $scope)
      },
      sku: {
        $label: $('.sku-label', $scope),
        $value: $('[data-product-sku]', $scope)
      },
      upc: {
        $label: $('.upc-label', $scope),
        $value: $('[data-product-upc]', $scope)
      },
      quantity: {
        $text: $('.incrementTotal', $scope),
        $input: $('[name=fbtqty\\[\\]]', $scope)
      },
      $bulkPricing: $('.productView-info-bulkPricing', $scope),
      $walletButtons: $('[data-add-to-cart-wallet-buttons]', $scope)
    };
  }
  function showMessageBox(message, $scope) {
    var $messageBox = $('.productAttributes-message', $scope);
    if (message) {
      $('.alertBox-message', $messageBox).text(message);
      $messageBox.show();
    } else {
      $messageBox.hide();
    }
  }
  function clearPricingNotFound(viewModel) {
    viewModel.rrpWithTax.$div.hide();
    viewModel.rrpWithoutTax.$div.hide();
    viewModel.nonSaleWithTax.$div.hide();
    viewModel.nonSaleWithoutTax.$div.hide();
    viewModel.priceSaved.$div.hide();
    viewModel.priceNowLabel.$span.hide();
    viewModel.priceLabel.$span.hide();
  }
  function updatePriceView(viewModel, price) {
    clearPricingNotFound(viewModel);
    if (price.with_tax) {
      var updatedPrice = price.price_range ? price.price_range.min.with_tax.formatted + " - " + price.price_range.max.with_tax.formatted : price.with_tax.formatted;
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithTax.html(updatedPrice);
      viewModel.$priceValue.attr('data-price-value', price.with_tax.value);
    }
    if (price.without_tax) {
      var _updatedPrice = price.price_range ? price.price_range.min.without_tax.formatted + " - " + price.price_range.max.without_tax.formatted : price.without_tax.formatted;
      viewModel.priceLabel.$span.show();
      viewModel.$priceWithoutTax.html(_updatedPrice);
      viewModel.$priceValue.attr('data-price-value', price.without_tax.value);
    }
    if (price.rrp_with_tax) {
      viewModel.rrpWithTax.$div.show();
      viewModel.rrpWithTax.$span.html(price.rrp_with_tax.formatted);
      viewModel.$priceValue.attr('data-price-value', price.rrp_with_tax.value);
    }
    if (price.rrp_without_tax) {
      viewModel.rrpWithoutTax.$div.show();
      viewModel.rrpWithoutTax.$span.html(price.rrp_without_tax.formatted);
      viewModel.$priceValue.attr('data-price-value', price.rrp_without_tax.value);
    }
    if (price.saved) {
      viewModel.priceSaved.$div.show();
      viewModel.priceSaved.$span.html(price.saved.formatted);
    }
    if (price.non_sale_price_with_tax) {
      viewModel.priceLabel.$span.hide();
      viewModel.nonSaleWithTax.$div.show();
      viewModel.priceNowLabel.$span.show();
      viewModel.nonSaleWithTax.$span.html(price.non_sale_price_with_tax.formatted);
      viewModel.$priceValue.attr('data-price-sale-value', price.non_sale_price_with_tax.value);
    }
    if (price.non_sale_price_without_tax) {
      viewModel.priceLabel.$span.hide();
      viewModel.nonSaleWithoutTax.$div.show();
      viewModel.priceNowLabel.$span.show();
      viewModel.nonSaleWithoutTax.$span.html(price.non_sale_price_without_tax.formatted);
      viewModel.$priceValue.attr('data-price-sale-value', price.non_sale_price_without_tax.value);
    }
  }
  function filterEmptyFilesFromForm(formData) {
    try {
      for (var _iterator = _createForOfIteratorHelperLoose(formData), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
          key = _step$value[0],
          val = _step$value[1];
        if (val instanceof File && !val.name && !val.size) {
          formData["delete"](key);
        }
      }
    } catch (e) {
      console.error(e);
    }
    return formData;
  }
}

/***/ },

/***/ "./assets/js/theme/halothemes/haloRecentViewedProducts.js"
/*!****************************************************************!*\
  !*** ./assets/js/theme/halothemes/haloRecentViewedProducts.js ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object.defineProperty(__WEBPACK_DEFAULT_EXPORT__, "name", { value: "default", configurable: true });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _haloAddOptionForProduct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./haloAddOptionForProduct */ "./assets/js/theme/halothemes/haloAddOptionForProduct.js");
/* harmony import */ var _haloProductImageHover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./haloProductImageHover */ "./assets/js/theme/halothemes/haloProductImageHover.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  var list = getlistItems();
  var $this = document.querySelector('#halo-recent-viewed-products');
  var $wrapper = $this.querySelector('.swiper-wrapper');
  var options = {
    template: 'halothemes/product/halo-product-template'
  };
  var num = 0;
  if (list.length == 0) $this.style.display = 'none';
  load();
  function load() {
    var handleIntersection = function handleIntersection(entries, observer) {
      if (!entries[0].isIntersecting) return;
      observer.unobserve($this);
      getProduct(num);
    };
    new IntersectionObserver(handleIntersection.bind($this), {
      rootMargin: '0px 0px 400px 0px'
    }).observe($this);
  }
  function getlistItems() {
    var productId = parseInt(document.querySelector('[name="product_id"]').value);
    var listItems = JSON.parse(localStorage.getItem('_halo_recently_viewed') || '[]');
    if (productId && listItems.includes(parseInt(productId))) listItems.splice(listItems.indexOf(parseInt(productId)), 1);
    return listItems;
  }
  function getProduct() {
    var productId = list[num];
    if (!productId) return;
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.product.getById(productId, options, function (err, response) {
      if (err) return;
      $wrapper.insertAdjacentHTML('beforeend', response);
      num++;
      if (num + 1 < Number($this.dataset.limit)) getProduct(num);
      (0,_haloProductImageHover__WEBPACK_IMPORTED_MODULE_2__["default"])();
      (0,_haloAddOptionForProduct__WEBPACK_IMPORTED_MODULE_1__["default"])(context, 'halo-recent-viewed-products');
    });
  }
}

/***/ },

/***/ "./assets/js/theme/halothemes/haloStickyAddToCart.js"
/*!***********************************************************!*\
  !*** ./assets/js/theme/halothemes/haloStickyAddToCart.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
Object.defineProperty(__WEBPACK_DEFAULT_EXPORT__, "name", { value: "default", configurable: true });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  if ($('#form-action-addToCart').length) {
    var scroll = $('#form-action-addToCart').offset(),
      scrollTop = scroll.top;
    $(window).scroll(function () {
      if ($(window).scrollTop() > scrollTop + 400) {
        if (!$('#halo_sticky_addToCart').hasClass('show_sticky')) {
          $('#halo_sticky_addToCart').addClass('show_sticky');
          if ($(window).width() > 550) {
            $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
          } else {
            if ($('#halo_sticky_addToCart').length) {
              $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 30);
            } else {
              $('#recently_bought_list').css("bottom", 30);
            }
          }
        }
      } else {
        $('#halo_sticky_addToCart').removeClass('show_sticky');
        $('.pop-up-option').removeClass('is-open');
        $('body').removeClass('openPopupOption');
        $('.choose_options_add').removeClass('is-active');
        $('#recently_bought_list').css("bottom", 30);
      }
    });
    $(document).on('click', '.choose_options_add', function (event) {
      $(this).toggleClass('is-active');
      $('.pop-up-option').toggleClass('is-open');
      $('body').addClass('openPopupOption');
    });
    $(document).on('click', '.pop-up-option .close', function (event) {
      $(".pop-up-option").removeClass('is-open');
      $('body').removeClass('openPopupOption');
      $('.choose_options_add').removeClass('is-active');
    });
    $(document).on('click', function (event) {
      if ($('body').hasClass('openPopupOption')) {
        if ($(event.target).closest('#halo_sticky_addToCart').length === 0) {
          $('.pop-up-option').removeClass('is-open');
          $('body').removeClass('openPopupOption');
          $('.choose_options_add').removeClass('is-active');
        }
      }
    });
    window.onload = function () {
      if ($(window).scrollTop() > scrollTop + 400) {
        if (!$('#halo_sticky_addToCart').hasClass('show_sticky')) {
          $('#halo_sticky_addToCart').addClass('show_sticky');
          if ($(window).width() > 550) {
            $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 40);
          } else {
            if ($('#halo_sticky_addToCart').length) {
              $('#recently_bought_list').css("bottom", $('#halo_sticky_addToCart').outerHeight() + 30);
            } else {
              $('#recently_bought_list').css("bottom", 30);
            }
          }
        }
      }
    };
  }
}

/***/ },

/***/ "./assets/js/theme/product.js"
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var sortablejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sortablejs */ "./node_modules/sortablejs/modular/sortable.esm.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _halothemes_haloSwiperProductImage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./halothemes/haloSwiperProductImage */ "./assets/js/theme/halothemes/haloSwiperProductImage.js");
/* harmony import */ var _halothemes_haloBundleProducts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./halothemes/haloBundleProducts */ "./assets/js/theme/halothemes/haloBundleProducts.js");
/* harmony import */ var _halothemes_haloRecentViewedProducts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./halothemes/haloRecentViewedProducts */ "./assets/js/theme/halothemes/haloRecentViewedProducts.js");
/* harmony import */ var _halothemes_haloStickyAddToCart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./halothemes/haloStickyAddToCart */ "./assets/js/theme/halothemes/haloStickyAddToCart.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }













var Product = /*#__PURE__*/function (_PageManager) {
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_8__["default"])('#modal-review-form')[0];
    return _this;
  }
  _inheritsLoose(Product, _PageManager);
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_halothemes_haloSwiperProductImage__WEBPACK_IMPORTED_MODULE_9__["default"])();
    (0,_halothemes_haloBundleProducts__WEBPACK_IMPORTED_MODULE_10__["default"])($('.halo-productView'), this.context);
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_5__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    if (this.context.themeSettings.halo_stickyAddToCart) {
      (0,_halothemes_haloStickyAddToCart__WEBPACK_IMPORTED_MODULE_12__["default"])();
      this.productDetails.setProductVariant2();
    }
    (0,_product_video_gallery__WEBPACK_IMPORTED_MODULE_6__["default"])();
    this.bulkPricingHandler();
    this.videoPopup();
    this.soldProduct($('.productView-soldProduct'));
    this.countDownProduct($('.productView-countDown'));
    this.compareColors();
    this.askAnExpert();
    this.checkTabActive();
    this.checkProduct();
    window.matchMedia('(min-width: 768px)').addEventListener('change', function () {
      _this2.checkTabActive();
    });
    var isRecentViewedProducts = this.context.themeSettings.prodRecentViewed;
    if (isRecentViewedProducts) {
      (0,_halothemes_haloRecentViewedProducts__WEBPACK_IMPORTED_MODULE_11__["default"])(this.context);
      this.setRecentViewedProducts();
    }
    var $reviewForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_3__["default"]({
      $reviewForm: $reviewForm
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  _proto.videoPopup = function videoPopup() {
    if ($('.halo-productVideo-link').length > 0) {
      $(document).on('click', '.halo-productVideo-link', function (e) {
        e.preventDefault();
        $('.videoGallery-list .videoGallery-item:first-child >a').trigger('click');
      });
    }
  };
  _proto.soldProduct = function soldProduct($wrapper) {
    if ($wrapper.length > 0) {
      var numbersProduct_text = this.context.themeSettings.product_soldProduct_products,
        numbersHours_text = this.context.themeSettings.product_soldProduct_hours,
        soldProductText = this.context.themeSettings.product_soldProduct_text;
      var numbersProductList = JSON.parse("[" + numbersProduct_text + "]"),
        numbersProductItem = Math.floor(Math.random() * numbersProductList.length),
        numbersHoursList = JSON.parse("[" + numbersHours_text + "]"),
        numbersHoursItem = Math.floor(Math.random() * numbersHoursList.length);
      $wrapper.html('<svg class="icon d-inline-block v-a-middle"><use xlink:href="#icon-fire"/></svg><span class="text d-inline-block v-a-middle">' + numbersProductList[numbersProductItem] + " " + soldProductText + " " + numbersHoursList[numbersHoursItem] + 'h</span>');
      $wrapper.show();
    }
  };
  _proto.countDownProduct = function countDownProduct($wrapper) {
    if ($wrapper.length > 0) {
      var countDown = $wrapper.data('countdown'),
        countDownDate = new Date(countDown).getTime(),
        seft = $wrapper;
      var countdownfunction = setInterval(function () {
        var now = new Date().getTime(),
          distance = countDownDate - now;
        if (distance < 0) {
          clearInterval(countdownfunction);
          seft.remove();
        } else {
          var days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
            minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60)),
            seconds = Math.floor(distance % (1000 * 60) / 1000),
            strCountDown = '<div class="item"><span class="num">' + days + '</span><span class="text color-secondary f-size-small"> days</span></div>\
                                        <div class="item"><span class="num">' + hours + '</span><span class="text color-secondary f-size-small"> hours</span></div>\
                                        <div class="item"><span class="num">' + minutes + '</span><span class="text color-secondary f-size-small"> mins</span></div>\
                                        <div class="item"><span class="num">' + seconds + '</span><span class="text color-secondary f-size-small"> secs</span></div>';
          seft.html(strCountDown);
          $wrapper.removeClass('d-none');
        }
      }, 1000);
    }
  };
  _proto.compareColors = function compareColors() {
    var $swatchWrapper = $('.halo-compareColors-swatch'),
      $imageWrapper = $('.halo-compareColors-image'),
      $textWrapper = $('.halo-compareColors-text');
    $('.form-option', $swatchWrapper).on('click', function (event) {
      var $this = $(event.currentTarget);
      $this.toggleClass('show-color');
      var title = $this.find('.form-option-variant').attr('title'),
        id = $this.data('product-swatch-value'),
        $color,
        $color2,
        $color3,
        $img,
        $pattern;
      if ($this.hasClass('show-color')) {
        if ($this.find('.form-option-variant--color').length) {
          $color = $this.find('.form-option-variant--color').attr('style');
          $imageWrapper.append('<div class="item item-color item-' + id + '"><span class="color" style="' + $color + ';"></span><span class="title">' + title + '</span></div>');
        } else if ($this.find('.form-option-variant--color2').length) {
          $color = $this.find('.form-option-variant--color2 .color1').attr('style');
          $color2 = $this.find('.form-option-variant--color2 .color2').attr('style');
          $('.halo-compareColors-image').append('<div class="item item-color item-' + id + '"><span class="color color2"><span style="' + $color + ';"></span><span style="' + $color2 + ';"></span></span><span class="title">' + title + '</span></div>');
        } else if ($this.find('.form-option-variant--color3').length) {
          $color = $this.find('.form-option-variant--color3 .color1').attr('style');
          $color2 = $this.find('.form-option-variant--color3 .color2').attr('style');
          $color3 = $this.find('.form-option-variant--color3 .color3').attr('style');
          $imageWrapper.append('<div class="item item-color item-' + id + '"><span class="color color3"><span style="' + $color + ';"></span><span style="' + $color2 + ';"></span><span style="' + $color3 + ';"></span></span><span class="title">' + title + '</span></div>');
        } else if ($this.find('.form-option-variant--pattern').length) {
          $img = $this.find('.form-option-variant--pattern').attr('style');
          $pattern = $this.find('.form-option-variant--pattern').attr('data-pattern');
          $imageWrapper.append('<div class="item item-partern item-' + id + '"><span class="image"><img src=' + $pattern + ' alt=' + title + ' title=' + title + '></span><span class="title">' + title + '</span></div>');
        }
      } else {
        $('.item-' + id + '', $imageWrapper).remove();
      }
      if ($imageWrapper.children().length > 0) {
        $textWrapper.hide();
      } else {
        $textWrapper.show();
      }
      if ($(window).width() >= 1025) {
        var el = document.getElementById('color-swatch-image');
        new sortablejs__WEBPACK_IMPORTED_MODULE_1__["default"](el, {
          animation: 150
        });
      }
    });
  };
  _proto.askAnExpert = function askAnExpert() {
    var message;
    var url = this.context.themeSettings.halo_ask_an_expert_pagelink;
    $(document).ready(function () {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["default"].api.getPage(url, {
        template: 'halothemes/product/halo-ask-an-expert-form'
      }, function (err, response) {
        if (err) return;
        $('.hl-form-field-wrapper').html(response);
      });
    });
    $(document).on('click', '.ask-an-expert-link', function (event) {
      event.preventDefault();
      $('body').addClass('has-askAnExpert');
    });
    $(document).on('click', function (event) {
      if ($(event.target).closest('.ask-an-expert-link').length === 0) {
        $('body').removeClass('has-askAnExpert');
      }
    });
    $('.halo-ask-an-expert-form').on('submit', function (event) {
      event.preventDefault();
      var typeContact = $('.halo-ask-an-expert-form input[name=type_contact]:checked').val(),
        typePackage = $('.halo-ask-an-expert-form input[name=type_package]:checked').val(),
        customerMessage = $('.halo-ask-an-expert-form textarea[name=contact_comment_area]').val(),
        recaptcha = $('.halo-ask-an-expert-form #g-recaptcha-response').val(),
        title = $('.halo-ask-an-expert-form[data-product-ask-title]').attr('data-product-ask-title'),
        sku = $('.halo-ask-an-expert-form[data-product-ask-sku]').attr('data-product-ask-sku'),
        url = $('.halo-ask-an-expert-form[data-product-ask-url]').attr('data-product-ask-url');
      if (recaptcha == '') {
        var error = 'The captcha you entered is incorrect. Please try again.';
        $('#halo-ask-an-expert-results').html('<div class="alertBox alertBox--error">' + error + '</div>');
        return;
      }
      if (typeContact != '' && typePackage != '' && customerMessage != '' && recaptcha != '') {
        message = "\n                    1. Do you need: " + typePackage + " \n                    2. What can I help you with today: " + customerMessage + "\n                    3. How would you like me to contact you?: " + typeContact + "\n                    4. Product Name: " + title + "\n                    5. Product SKU: " + sku + "\n                    6. Product Link: " + url + "\n                ";
      }
      $('#contact_question').val(message);
      $.ajax({
        type: 'POST',
        url: '/pages.php?action=sendContactForm',
        data: $('.halo-ask-an-expert-form').serialize(),
        success: function success() {
          $('.halo-ask-an-expert-form').hide();
          $('#halo-ask-an-expert-results').html('<div class="alertBox alertBox--success">Thank you. We\'ve received your feedback and will respond shortly.</div>');
        }
      });
    });
  };
  _proto.checkTabActive = function checkTabActive() {
    var tab = document.querySelectorAll('[data-tab] .tab');
    var tabFirst = document.querySelector('[data-tab] .tab:first-child');
    var tabContent = document.querySelectorAll('.tabs-contents .tab-content');
    var tabContentFirst = document.querySelector('.tabs-contents .tab-content:first-child');
    if (window.matchMedia('(min-width: 768px)').matches) {
      removeTabActive();
      if (tabFirst) tabFirst.classList.add('is-active');
      if (tabContentFirst) tabContentFirst.classList.add('is-active');
    } else {
      removeTabActive();
    }
    function removeTabActive() {
      if (tab) {
        tab.forEach(function (content) {
          content.classList.remove('is-active');
        });
      }
      if (tabContent) {
        tabContent.forEach(function (content) {
          content.classList.remove('is-active');
        });
      }
    }
  };
  _proto.checkProduct = function checkProduct() {
    var relatedProducts = $('#halo-related-products'),
      similarProducts = $('#halo-similar-products');
    if (relatedProducts.find('.swiper-wrapper').text().trim() == '') {
      relatedProducts.hide();
    }
    if (similarProducts.find('.swiper-wrapper').text().trim() == '') {
      similarProducts.hide();
    }
  };
  _proto.setRecentViewedProducts = function setRecentViewedProducts() {
    var name = '_halo_recently_viewed';
    var productId = parseInt(document.querySelector('[name="product_id"]').value);
    var recentlyViewed = document.querySelector('#halo-recent-viewed-products');
    var listItems = JSON.parse(localStorage.getItem(name) || '[]');
    if (!productId) return;
    if (listItems.includes(productId)) listItems = listItems.filter(function (id) {
      return id !== productId;
    });
    listItems.unshift(productId);
    localStorage.setItem(name, JSON.stringify(listItems.slice(0, Number(recentlyViewed.dataset.limit))));
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ },

/***/ "./assets/js/theme/product/video-gallery.js"
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoGallery: () => (/* binding */ VideoGallery),
/* harmony export */   "default": () => (/* binding */ videoGallery)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}

/***/ }

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9wcm9kdWN0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0M7QUFDRTtBQUNtQjtBQUN6QjtBQUUzQyw2QkFBZSxvQ0FBU0ksTUFBTSxFQUFFQyxPQUFPLEVBQUU7RUFDckMsSUFBTUMsWUFBWSxHQUFHQyxRQUFRLENBQUNGLE9BQU8sQ0FBQ0csU0FBUyxDQUFDO0lBQzVDQyxXQUFXLEdBQUdDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQztJQUN6Q0MsT0FBTyxHQUFHRCxDQUFDLENBQUMsdUJBQXVCLENBQUM7SUFDcENFLFdBQVcsR0FBR0QsT0FBTyxDQUFDRSxJQUFJLENBQUMsNENBQTRDLENBQUM7RUFFNUUsSUFBSUMsUUFBUSxHQUFHVCxPQUFPLENBQUNVLEtBQUs7RUFFNUJDLFVBQVUsQ0FBQyxDQUFDO0VBRVpOLENBQUMsQ0FBQ08sUUFBUSxDQUFDLENBQUNDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsVUFBQUMsS0FBSyxFQUFJO0lBQ3JEQSxLQUFLLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBRXRCLElBQUlDLE9BQU8sR0FBR1gsQ0FBQyxDQUFDUyxLQUFLLENBQUNHLGFBQWEsQ0FBQztJQUVwQ1osQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNhLEdBQUcsQ0FBQ0YsT0FBTyxDQUFDLENBQUNHLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDOURkLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDYSxHQUFHLENBQUNGLE9BQU8sQ0FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQ0QsV0FBVyxDQUFDLFNBQVMsQ0FBQztJQUUxRixJQUFJLENBQUNILE9BQU8sQ0FBQ0ksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUNDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtNQUMzREwsT0FBTyxDQUFDTSxRQUFRLENBQUMsVUFBVSxDQUFDO01BQzVC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QUlWLFlBQVksQ0FBQ1ksR0FBRyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxDQUFDO0FBQ04sQyIsInNvdXJjZXMiOlsid2VicGFjazovL0hhbG8vLi9hc3NldHMvanMvdGhlbWUvaGFsb3RoZW1lcy9oYWxvQnVuZGxlUHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vSGFsby8uL2Fzc2V0cy9qcy90aGVtZS9oYWxvdGhlbWVzL2hhbG9SZWNlbnRWaWV3ZWRQcm9kdWN0cy5qcyIsIndlYnBhY2s6Ly9IYWxvLy4vYXNzZXRzL2pzL3RoZW1lL2hhbG90aGVtZXMvaGFsb1N0aWNreUFkZFRvQ2FydC5qcyIsIndlYnBhY2s6Ly9IYWxvLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vSGFsby8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3ZpZGVvLWdhbGxlcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBoYWxvQ2FsY3VsYXRlRnJlZVNoaXBwaW5nIGZyb20gJy4vaGFsb0NhbGN1bGF0ZUZyZWVTaGlwcGluZyc7XG5pbXBvcnQgZm9ybXMgZnJvbSAnLi4vY29tbW9uL21vZGVscy9mb3Jtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRzY29wZSwgY29udGV4dCkge1xuICAgIGNvbnN0IHRoaXNQcm91Y3RJZCA9IHBhcnNlSW50KGNvbnRleHQucHJvZHVjdElkKSxcbiAgICAgICAgJHJlbGF0ZWRUYWIgPSAkKCcjaGFsby1yZWxhdGVkLXByb2R1Y3RzJyksXG4gICAgICAgICRidW5kbGUgPSAkKCcjaGFsby1idW5kbGUtcHJvZHVjdHMnKSxcbiAgICAgICAgJGJ1bmRsZUxpc3QgPSAkYnVuZGxlLmZpbmQoJy5oYWxvLXByb2R1Y3QtbGlzdCAuYnVuZGxlLXByb2R1Y3Qtd3JhcHBlcicpO1xuXG4gICAgdmFyIGN1cnJlbmN5ID0gY29udGV4dC5tb25leTtcblxuICAgIHNob3dCdW5kbGUoKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaGFsby10b2dnbGUtb3B0aW9ucycsIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgJCgnLmhhbG8tdG9nZ2xlLW9wdGlvbnMnKS5ub3QoJHRhcmdldCkucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XG4gICAgICAgICQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykubm90KCR0YXJnZXQubmV4dCgnLmhhbG8tZGV0YWlsLW9wdGlvbnMnKSkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcblxuICAgICAgICBpZiAoISR0YXJnZXQubmV4dCgnLmhhbG8tZGV0YWlsLW9wdGlvbnMnKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAkdGFyZ2V0LmFkZENsYXNzKCdpcy1mb2N1cycpO1xuICAgICAgICAgICAgJHRhcmdldC5uZXh0KCcuaGFsby1kZXRhaWwtb3B0aW9ucycpLmFkZENsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkdGFyZ2V0Lm5leHQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICR0YXJnZXQucmVtb3ZlQ2xhc3MoJ2lzLWZvY3VzJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1oYWxvLW9wdGlvbi1jbG9zZV0nLCBldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJCgnLmhhbG8tZGV0YWlsLW9wdGlvbnMnKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAkKCcuaGFsby10b2dnbGUtb3B0aW9ucycpLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBpZiAoJCgnLmhhbG8tZGV0YWlsLW9wdGlvbnMnKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICBpZiAoKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuaGFsby1kZXRhaWwtb3B0aW9ucycpLmxlbmd0aCA9PT0gMCkgJiYgKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuaGFsby10b2dnbGUtb3B0aW9ucycpLmxlbmd0aCA9PT0gMCkpe1xuICAgICAgICAgICAgICAgICQoJy5oYWxvLWRldGFpbC1vcHRpb25zJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkKCcuaGFsby10b2dnbGUtb3B0aW9ucycpLnJlbW92ZUNsYXNzKCdpcy1mb2N1cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJy5oYWxvLWRldGFpbC1jaGVja2JveCcsIGV2ZW50ID0+IHtcbiAgICAgICAgdmFyICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLFxuICAgICAgICAgICAgaWQgPSAkdGFyZ2V0LmF0dHIoJ2lkJykucmVwbGFjZSgnZmJ0X3Byb2R1Y3QnLCcnKSxcbiAgICAgICAgICAgIHByb2R1Y3QgPSAkKCcuaGFsby1wcm9kdWN0LWl0ZW1bZGF0YS1wcm9kdWN0LWlkPVwiJyArIGlkICsgJ1wiXScpO1xuXG4gICAgICAgIGlmKCR0YXJnZXQuaXMoJzpjaGVja2VkJykgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByb2R1Y3QucmVtb3ZlQ2xhc3MoJ2lzQ2hlY2tlZCcpO1xuICAgICAgICAgICAgcHJvZHVjdC5maW5kKCcuc3RhdHVzJykuYWRkQ2xhc3MoJ2Rpc2FibGUnKS50ZXh0KCdUaGlzIGl0ZW0nKTtcbiAgICAgICAgICAgICQoJyNoYWxvLWFkZEFsbCcpLmZpbmQoJy5udW1iZXInKS50ZXh0KCQoJy5oYWxvLXByb2R1Y3QtaXRlbS5pc0NoZWNrZWQnKS5sZW5ndGgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9kdWN0LmFkZENsYXNzKCdpc0NoZWNrZWQnKTtcbiAgICAgICAgICAgIHByb2R1Y3QuZmluZCgnLnN0YXR1cycpLnJlbW92ZUNsYXNzKCdkaXNhYmxlJykudGV4dCgnU2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICQoJyNoYWxvLWFkZEFsbCcpLmZpbmQoJy5udW1iZXInKS50ZXh0KCQoJy5oYWxvLXByb2R1Y3QtaXRlbS5pc0NoZWNrZWQnKS5sZW5ndGgpXG4gICAgICAgIH1cblxuICAgICAgICB0b3RhbFByaWNlKCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2hhbG8tYWRkQWxsJywgZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJCgnZm9ybScsICRidW5kbGUpO1xuICAgICAgICB2YXIgYXJyUHJvID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgJCgnLmhhbG8tZGV0YWlsLWNoZWNrYm94JykuZWFjaCgoaW5kZXgsIHZhbCkgPT4ge1xuICAgICAgICAgICAgaWYgKCQodmFsKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIGFyclByby5wdXNoKGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGNoZWNrID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGFyclByby5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjaGVjayA9IGNoZWNrUHJvZHVjdCgkZm9ybSwgYXJyUHJvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGVjaykge1xuICAgICAgICAgICAgaWYgKGFyclByby5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGsgPSBhcnJQcm8ubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgJGJ1bmRsZS5maW5kKCcubG9hZGluZ092ZXJsYXknKS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICBhZGRUb0NhcnQoJGZvcm0sIDAsIGFyclBybywgayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnUGxlYXNlIG1ha2Ugc3VyZSBhbGwgb3B0aW9ucyBoYXZlIGJlZW4gZmlsbGVkIGluLic7XG5cbiAgICAgICAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICAgICAgICB0bXAuaW5uZXJIVE1MID0gZXJyb3JNZXNzYWdlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzaG93QnVuZGxlKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnaGFsb3RoZW1lcy9wcm9kdWN0L2hhbG8tYnVuZGxlLXByb2R1Y3RzLXRtcCdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgdmFyIHByb2RCdW5kbGVJZCA9IFtdLFxuICAgICAgICAgICAgdG90YWxCbG9jayA9ICcnO1xuXG4gICAgICAgIGZpcnN0SXRlbSgpO1xuXG4gICAgICAgIGlmKCRidW5kbGUuaGFzQ2xhc3MoJ2hhbG8tYnVuZGxlLWxvZ2luJykpe1xuICAgICAgICAgICAgdG90YWxCbG9jayA9ICc8ZGl2IGNsYXNzPVwiaGFsby1wcm9kdWN0LXRvdGFsXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXByaW1hcnkgYnV0dG9uLS1zbWFsbCBoYWxvLXByb2R1Y3QtdG90YWwtYnV0dG9uIG0tMFwiIGRpc2FibGVkIGhyZWY9XCIjXCI+PHNwYW4+TG9nIGluIGZvciBwcmljaW5nPC9zcGFuPjwvYT5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+JztcbiAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgdG90YWxCbG9jayA9ICc8ZGl2IGNsYXNzPVwiaGFsby1wcm9kdWN0LXRvdGFsIGQtZmxleCBkLWJsb2NrLXRiIGEtaS1zdGFydCBqLWMtYmV0d2VlblwiPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvdGFsLXByaWNlXCI+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+PHNwYW4+UHJpY2UgVG90YWw8L3NwYW4+PC9zcGFuPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2UgcHJpY2Utc2FsZVwiPjwvc3Bhbj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByaWNlXCI+PC9zcGFuPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ1dHRvbiBidXR0b24tLXByaW1hcnkgYnV0dG9uLS1zbWFsbCBoYWxvLXByb2R1Y3QtdG90YWwtYnV0dG9uIG0tMFwiIGlkPVwiaGFsby1hZGRBbGxcIiBocmVmPVwiI1wiPjxzcGFuPkFkZCA8c3BhbiBjbGFzcz1cIm51bWJlclwiPmFsbDwvc3Bhbj4gaXRlbShzKSB0byBiYWc8L3NwYW4+PC9hPlxcXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgJGJ1bmRsZS5maW5kKCcuYnVuZGxlLXByb2R1Y3QtcmlnaHQnKS5hcHBlbmQodG90YWxCbG9jayk7XG5cbiAgICAgICAgJC5lYWNoKGNvbnRleHQucHJvZHVjdEN1c3RvbUZpZWxkcywgZnVuY3Rpb24oaW5kZXgsIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5uYW1lID09ICdfX2J1bmRsZWlkJykge1xuICAgICAgICAgICAgICAgIHByb2RCdW5kbGVJZCA9IEpTT04ucGFyc2UoJ1snK29iai52YWx1ZSsnXScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBwcm9kQnVuZGxlSWQgPSAkLmdyZXAocHJvZEJ1bmRsZUlkLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPSB0aGlzUHJvdWN0SWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkYnVuZGxlLmxlbmd0aCA+IDAgJiYgcHJvZEJ1bmRsZUlkLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB2YXIgbnVtID0gMCxcbiAgICAgICAgICAgICAgICBsaXN0ID0gW107XG5cbiAgICAgICAgICAgICRyZWxhdGVkVGFiLmZpbmQoJy5jYXJkJykuZWFjaCgoaW5kZXgsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogXCJcIlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBJZCA9ICQodmFsKS5kYXRhKCdwcm9kdWN0LWlkJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAocElkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkKHBJZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuaW5kZXggPT0gaW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGEgPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtKys7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG51bSA9PSAkcmVsYXRlZFRhYi5maW5kKCcuY2FyZCcpLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0xpc3QobGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCRidW5kbGUubGVuZ3RoID4gMCAmJiBwcm9kQnVuZGxlSWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIG51bSA9IDAsXG4gICAgICAgICAgICAgICAgbGlzdCA9IFtdO1xuXG4gICAgICAgICAgICAkLmVhY2gocHJvZEJ1bmRsZUlkLCBmdW5jdGlvbihpLCB2YWwpe1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaCh7aTppLCBkYXRhOiBcIlwifSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcElkID0gcHJvZEJ1bmRsZUlkW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBJZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3QuZ2V0QnlJZChwSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuaSA9PSBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5kYXRhID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSsrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihudW0gPT0gcHJvZEJ1bmRsZUlkLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0xpc3QobGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlyc3RJdGVtKCl7XG4gICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9ICRidW5kbGVMaXN0LmZpbmQoJy5oYWxvLXByb2R1Y3QtaXRlbUZpcnN0JyksXG4gICAgICAgICAgICBwSWQgPSBmaXJzdEl0ZW0uZGF0YSgncHJvZHVjdC1pZCcpLFxuICAgICAgICAgICAgZm9ybSA9IGZpcnN0SXRlbS5maW5kKCdmb3JtJyksXG4gICAgICAgICAgICBoYXNPcHRpb25zID0gZm9ybS5maW5kKCdbZGF0YS1mYnQtb3B0aW9uLWNoYW5nZV0nKS5sZW5ndGgsXG4gICAgICAgICAgICBoYXNEZWZhdWx0T3B0aW9ucyA9IGZvcm0uZmluZCgnW2RhdGEtZGVmYXVsdF0nKS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGhhc0RlZmF1bHRPcHRpb25zICYmIGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocElkLCBmb3JtLnNlcmlhbGl6ZSgpLCAncHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlcycsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlc0RhdGEgPSByZXNwb25zZS5kYXRhIHx8IHt9O1xuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXNDb250ZW50ID0gcmVzcG9uc2UuY29udGVudCB8fCB7fTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGZvcm0sIGF0dHJpYnV0ZXNEYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmIChoYXNEZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVWaWV3KGZvcm0sIGF0dHJpYnV0ZXNEYXRhLCBhdHRyaWJ1dGVzQ29udGVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MoYXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd0xpc3QobGlzdCl7XG4gICAgICAgIGxpc3QuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gZWxlbWVudC5kYXRhO1xuXG4gICAgICAgICAgICBpZihyZXNwb25zZSAhPSB1bmRlZmluZWQgJiYgcmVzcG9uc2UgIT0gbnVsbCAmJiByZXNwb25zZSAhPSAnJyl7XG4gICAgICAgICAgICAgICAgJGJ1bmRsZUxpc3QuYXBwZW5kKHJlc3BvbnNlKTtcblxuICAgICAgICAgICAgICAgIGlmICgkKHJlc3BvbnNlKS5maW5kKCcuaGFsby10b2dnbGUtb3B0aW9ucycpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcElkID0gJChyZXNwb25zZSkuZGF0YSgncHJvZHVjdC1pZCcpLFxuICAgICAgICAgICAgICAgICAgICAkZm9ybSA9ICRidW5kbGVMaXN0LmZpbmQoJy5oYWxvLXByb2R1Y3QtaXRlbVtkYXRhLXByb2R1Y3QtaWQ9XCInICsgcElkICsgJ1wiXSBmb3JtJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLWZidC1vcHRpb24tY2hhbmdlXScsICRmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzT3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuaHRtbCgpLnRyaW0oKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc0RlZmF1bHRPcHRpb25zID0gJChyZXNwb25zZSkuZmluZCgnW2RhdGEtZGVmYXVsdF0nKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0RlZmF1bHRPcHRpb25zICYmIGhhc09wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlICE9IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXNEYXRhID0gcmVzcG9uc2UuZGF0YSB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlc0NvbnRlbnQgPSByZXNwb25zZS5jb250ZW50IHx8IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKCRmb3JtLCBhdHRyaWJ1dGVzRGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0RlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWaWV3KCRmb3JtLCBhdHRyaWJ1dGVzRGF0YSwgYXR0cmlidXRlc0NvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MoYXR0cmlidXRlc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBzZXRQcm9kdWN0VmFyaWFudCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmhhbG8tcHJvZHVjdC1pdGVtJywgJHNjb3BlKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgJChlbGVtZW50KS5vbignY2xpY2snLCAnW2RhdGEtcXVhbnRpdHktZmJ0LWNoYW5nZV0gYnV0dG9uJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudEl0ZW1Qcm9JZCA9ICR0YXJnZXQuY2xvc2VzdCgnLmhhbG8tcHJvZHVjdC1pdGVtJykuZGF0YSgncHJvZHVjdC1pZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoYC5oYWxvLXByb2R1Y3QtaXRlbVtkYXRhLXByb2R1Y3QtaWQ9XCIke2N1cnJlbnRJdGVtUHJvSWR9XCJdIFtuYW1lPWZidHF0eVxcXFxbXFxcXF1dYCwgJHNjb3BlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBxdWFudGl0eU1pbiA9IHBhcnNlSW50KCRpbnB1dC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVhbnRpdHlNYXggPSBwYXJzZUludCgkaW5wdXQuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICAgICAgICAgIGxldCBxdHkgPSBmb3Jtcy5udW1iZXJzT25seSgkaW5wdXQudmFsKCkpID8gcGFyc2VJbnQoJGlucHV0LnZhbCgpLCAxMCkgOiBxdWFudGl0eU1pbjtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoJHRhcmdldC5kYXRhKCdhY3Rpb24nKSA9PT0gJ2luYycpIHtcbiAgICAgICAgICAgICAgICAgICAgcXR5ID0gZm9ybXMudmFsaWRhdGVJbmNyZWFzZUFnYWluc3RNYXhCb3VuZGFyeShxdHksIHF1YW50aXR5TWF4KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHF0eSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcXR5ID0gZm9ybXMudmFsaWRhdGVEZWNyZWFzZUFnYWluc3RNaW5Cb3VuZGFyeShxdHksIHF1YW50aXR5TWluKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAkaW5wdXQuYXR0cigndmFsdWUnLHF0eSk7XG4gICAgICAgICAgICAgICAgJGlucHV0LnZhbChxdHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb2R1Y3RPcHRpb25zKCk7XG5cbiAgICAgICAgaWYoISRidW5kbGUuaGFzQ2xhc3MoJ2hhbG8tYnVuZGxlLWxvZ2luJykpe1xuICAgICAgICAgICAgdG90YWxQcmljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnI2hhbG8tYWRkQWxsJykuZmluZCgnLm51bWJlcicpLnRleHQoJCgnLmhhbG8tcHJvZHVjdC1pdGVtLmlzQ2hlY2tlZCcpLmxlbmd0aCk7XG4gICAgICAgIFxuICAgICAgICAkYnVuZGxlLnJlbW92ZUNsYXNzKCdoYWxvLWJsb2NrLWRpc2FibGUnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1Byb2R1Y3QoZm9ybSwgYXJyUHJvKSB7XG4gICAgICAgIHZhciBjaGVjayA9IHRydWU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJQcm8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBrID0gYXJyUHJvW2ldLFxuICAgICAgICAgICAgICAgICRmb3JtID0gJChmb3JtW2tdKTtcblxuICAgICAgICAgICAgaWYgKCRmb3JtLmZpbmQoJ1tkYXRhLWZidC1vcHRpb24tY2hhbmdlXScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNoZWNrID0gY2hlY2tCZWZvcmVBZGQoJGZvcm0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrID09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGVjaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0JlZm9yZUFkZCgkYXR0cmlidXRlcykge1xuICAgICAgICB2YXIgY2hlY2sgPSB0cnVlLFxuICAgICAgICAgICAgYXR0ID0gXCJcIjtcblxuICAgICAgICAkYXR0cmlidXRlcy5maW5kKCdpbnB1dDp0ZXh0LCBpbnB1dDpwYXNzd29yZCwgaW5wdXQ6ZmlsZSwgdGV4dGFyZWEnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEkKGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJykpIHt9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgkKGVsZW1lbnQpLnZhbCgpKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGF0dHJpYnV0ZXMuZmluZCgnc2VsZWN0JykuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghJChlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcpKSB7fSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJChlbGVtZW50KS52YWwoKSkge30gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRhdHRyaWJ1dGVzLmZpbmQoJ2lucHV0OnJhZGlvLCBpbnB1dDpjaGVja2JveCcpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoYXR0ICE9ICQoZWxlbWVudCkuYXR0cihcIm5hbWVcIikpIHtcbiAgICAgICAgICAgICAgICBhdHQgPSAkKGVsZW1lbnQpLmF0dHIoXCJuYW1lXCIpO1xuICAgICAgICAgICAgICAgIGlmICghJChlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGVsZW1lbnQpLmF0dHIoXCJ0eXBlXCIpID09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCJbbmFtZT0nXCIgKyBhdHQgKyBcIiddOmNoZWNrZWRcIikudmFsKCkpIHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoZWxlbWVudCkuYXR0cihcInR5cGVcIikgPT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIltuYW1lPSdcIiArIGF0dCArIFwiJ106Y2hlY2tlZFwiKS52YWwoKSkge31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGVsZW1lbnQpLmF0dHIoXCJ0eXBlXCIpID09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoXCJbbmFtZT0nXCIgKyBhdHQgKyBcIiddOmNoZWNrZWRcIikudmFsKCkpIHt9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoZWxlbWVudCkuYXR0cihcInR5cGVcIikgPT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChcIltuYW1lPSdcIiArIGF0dCArIFwiJ106Y2hlY2tlZFwiKS52YWwoKSkge30gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvQ2FydChmb3JtLCBpLCBhcnJQLCBrKSB7XG4gICAgICAgIGlmICh3aW5kb3cuRm9ybURhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHByb2QgPSBhcnJQW2ldO1xuICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybVtwcm9kXSk7XG5cbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbUFkZChmaWx0ZXJFbXB0eUZpbGVzRnJvbUZvcm0oZm9ybURhdGEpLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyIHx8IHJlc3BvbnNlLmRhdGEuZXJyb3I7XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0c0l0ZW0gPSAkKCcuaGFsby1wcm9kdWN0LWl0ZW0nKTtcblxuICAgICAgICAgICAgcHJvZHVjdHNJdGVtLmVhY2goKGluZGV4LCBwcm9kdWN0SXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5RGF0YSA9ICQoJ1tuYW1lPWZidHF0eVxcXFxbXFxcXF1dJywgcHJvZHVjdEl0ZW0pLnZhbCgpO1xuICAgICAgICAgICAgICAgICQocHJvZHVjdEl0ZW0pLmZpbmQoJ1tuYW1lPXF0eVxcXFxbXFxcXF1dJykuYXR0cigndmFsdWUnLHF1YW50aXR5RGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgICAgICAgICAgIHRtcC5pbm5lckhUTUwgPSBlcnJvck1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgYWxlcnQodG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQpO1xuICAgICAgICAgICAgICAgIGsgPSBrIC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaSsrO1xuXG4gICAgICAgICAgICBpZiAoaSA+PSBhcnJQLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRidW5kbGUuZmluZCgnLmxvYWRpbmdPdmVybGF5JykuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvQWRkVG9DYXJ0QWN0aW9uID09PSAnc2lkZWJhcicpe1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6ICdjb21tb24vY2FydC1wcmV2aWV3J1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRpbmdDbGFzcyA9ICdpcy1sb2FkaW5nJztcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRjYXJ0RHJvcGRvd24gPSAkKCcjaGFsby1jYXJ0LXNpZGViYXIgLmhhbG8tc2lkZWJhci13cmFwcGVyJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRjYXJ0TG9hZGluZyA9ICQoJzxkaXYgY2xhc3M9XCJsb2FkaW5nT3ZlcmxheVwiPjwvZGl2PicpO1xuXG4gICAgICAgICAgICAgICAgICAgICRib2R5LmFkZENsYXNzKCdvcGVuQ2FydFNpZGViYXInKTtcblxuICAgICAgICAgICAgICAgICAgICAkY2FydERyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MobG9hZGluZ0NsYXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwoJGNhcnRMb2FkaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgJGNhcnRMb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjYXJ0RHJvcGRvd25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MobG9hZGluZ0NsYXNzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5odG1sKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRjYXJ0TG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJChyZXNwb25zZSkuZmluZCgnW2RhdGEtY2FydC1xdWFudGl0eV0nKS5kYXRhKCdjYXJ0UXVhbnRpdHknKSB8fCAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkYm9keS50cmlnZ2VyKCdjYXJ0LXF1YW50aXR5LXVwZGF0ZScsIHF1YW50aXR5KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaGFsb0NhbGN1bGF0ZUZyZWVTaGlwcGluZyhjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RUbyhjb250ZXh0LnVybHMuY2FydCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhZGRUb0NhcnQoZm9ybSwgaSwgYXJyUCwgayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzUnVubmluZ0luSWZyYW1lKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5zZWxmICE9PSB3aW5kb3cudG9wO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZGlyZWN0VG8odXJsKSB7XG4gICAgICAgIGlmIChpc1J1bm5pbmdJbklmcmFtZSgpICYmICF3aW5kb3cuaWZyYW1lU2RrKSB7XG4gICAgICAgICAgICB3aW5kb3cudG9wLmxvY2F0aW9uID0gdXJsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG90YWxQcmljZSgpIHtcbiAgICAgICAgdmFyIHRvdGFsID0gMCxcbiAgICAgICAgICAgIHRvdGFsU2FsZSA9IDAsXG4gICAgICAgICAgICBzeW1ib2wsXG4gICAgICAgICAgICBzeW1ib2xDaGFuZ2UsXG4gICAgICAgICAgICBkZWNpbWFsUGxhY2VzLFxuICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvcixcbiAgICAgICAgICAgIHRob3VzYW5kc1NlcGFyYXRvcixcbiAgICAgICAgICAgIHN5bWJvbExvY2F0aW9uLFxuICAgICAgICAgICAgY3VycixcbiAgICAgICAgICAgIHRva2VuMSxcbiAgICAgICAgICAgIHRva2VuMixcbiAgICAgICAgICAgIGxlbmd0aDtcblxuICAgICAgICBkZWNpbWFsUGxhY2VzID0gY3VycmVuY3kuZGVjaW1hbF9wbGFjZXM7XG4gICAgICAgIGRlY2ltYWxTZXBhcmF0b3IgPSBjdXJyZW5jeS5kZWNpbWFsX3Rva2VuO1xuICAgICAgICB0aG91c2FuZHNTZXBhcmF0b3IgPSBjdXJyZW5jeS50aG91c2FuZHNfdG9rZW47XG4gICAgICAgIHN5bWJvbExvY2F0aW9uID0gY3VycmVuY3kuY3VycmVuY3lfbG9jYXRpb247XG4gICAgICAgIHN5bWJvbCA9IGN1cnJlbmN5LmN1cnJlbmN5X3Rva2VuO1xuXG4gICAgICAgICRidW5kbGVMaXN0LmZpbmQoJy5oYWxvLXByb2R1Y3QtaXRlbS5pc0NoZWNrZWQnKS5lYWNoKChpbmRleCwgdmFsKSA9PiB7XG4gICAgICAgICAgICB2YXIgcHJpY2UgPSBwYXJzZUZsb2F0KCQodmFsKS5maW5kKCcuaGFsby1kZXRhaWwtcHJpY2UnKS5hdHRyKCdkYXRhLXByaWNlLXZhbHVlJykpLFxuICAgICAgICAgICAgICAgIHByaWNlU2FsZSA9IHBhcnNlRmxvYXQoJCh2YWwpLmZpbmQoJy5oYWxvLWRldGFpbC1wcmljZScpLmF0dHIoJ2RhdGEtcHJpY2Utc2FsZS12YWx1ZScpKTtcblxuICAgICAgICAgICAgdG90YWwgPSB0b3RhbCArIHByaWNlO1xuICAgICAgICAgICAgdG90YWxTYWxlID0gdG90YWxTYWxlICsgcHJpY2VTYWxlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodG90YWwgPT0gdG90YWxTYWxlKSB7XG4gICAgICAgICAgICAkKCcuaGFsby1wcm9kdWN0LXRvdGFsIC5wcmljZS1zYWxlJykuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmhhbG8tcHJvZHVjdC10b3RhbCcpLnJlbW92ZUNsYXNzKCdoYXMtcHJpY2Utc2FsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmhhbG8tcHJvZHVjdC10b3RhbCAucHJpY2Utc2FsZScpLnNob3coKTtcbiAgICAgICAgICAgICQoJy5oYWxvLXByb2R1Y3QtdG90YWwnKS5hZGRDbGFzcygnaGFzLXByaWNlLXNhbGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkKCcucHJvZHVjdFZpZXctcHJpY2UgPiAucHJpY2Utc2VjdGlvbiA+IC5wcmljZS5wcmljZS0td2l0aFRheCcsICRzY29wZSkubGVuZ3RoKSB7XG4gICAgICAgICAgICBjdXJyID0gJCgnLnByb2R1Y3RWaWV3LXByaWNlID4gLnByaWNlLXNlY3Rpb24gPiAucHJpY2UucHJpY2UtLXdpdGhUYXgnLCAkc2NvcGUpLmRhdGEoJ3ZhbHVlLXByaWNlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyID0gJCgnLnByb2R1Y3RWaWV3LXByaWNlID4gLnByaWNlLXNlY3Rpb24gPiAucHJpY2UucHJpY2UtLXdpdGhvdXRUYXgnLCAkc2NvcGUpLmRhdGEoJ3ZhbHVlLXByaWNlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzeW1ib2xDaGFuZ2UgPSBjdXJyLnJlcGxhY2UoL1swLTldL2csIFwiXCIpLnJlcGxhY2UoXCIuXCIsIFwiXCIpLnJlcGxhY2UoXCIsXCIsIFwiXCIpO1xuXG4gICAgICAgIGlmKHN5bWJvbCAhPSBzeW1ib2xDaGFuZ2Upe1xuICAgICAgICAgICAgc3ltYm9sID0gc3ltYm9sQ2hhbmdlO1xuICAgICAgICAgICAgdG9rZW4xID0gKGN1cnIuaW5kZXhPZignLicpKTtcbiAgICAgICAgICAgIHRva2VuMiA9IChjdXJyLmluZGV4T2YoJywnKSk7XG4gICAgICAgICAgICBsZW5ndGggPSBjdXJyLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIGlmIChjdXJyLmluZGV4T2Yoc3ltYm9sKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgIHN5bWJvbExvY2F0aW9uID0gY3Vyci5pbmRleE9mKHN5bWJvbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0b2tlbjEgPCB0b2tlbjIpIHtcbiAgICAgICAgICAgICAgICB0aG91c2FuZHNTZXBhcmF0b3IgPSAnLic7XG4gICAgICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvciA9ICcsJztcblxuICAgICAgICAgICAgICAgIGlmIChzeW1ib2xMb2NhdGlvbiA9PSAwIHx8IHN5bWJvbExvY2F0aW9uID09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxQbGFjZXMgPSBsZW5ndGggLSB0b2tlbjI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVjaW1hbFBsYWNlcyA9IGxlbmd0aCAtIHRva2VuMiAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aG91c2FuZHNTZXBhcmF0b3IgPSAnLCc7XG4gICAgICAgICAgICAgICAgZGVjaW1hbFNlcGFyYXRvciA9ICcuJztcbiAgICAgICAgICAgICAgICBpZiAoc3ltYm9sTG9jYXRpb24gPT0gMCB8fCBzeW1ib2xMb2NhdGlvbiA9PSBcImxlZnRcIikge1xuICAgICAgICAgICAgICAgICAgICBkZWNpbWFsUGxhY2VzID0gbGVuZ3RoIC0gdG9rZW4xO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2ltYWxQbGFjZXMgPSBsZW5ndGggLSB0b2tlbjEgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRvdGFsID09IDApe1xuICAgICAgICAgICAgJGJ1bmRsZS5maW5kKCcjaGFsby1hZGRBbGwnKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAkYnVuZGxlLmZpbmQoJyNoYWxvLWFkZEFsbCcpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG90YWwgPSBmb3JtYXRNb25leSh0b3RhbCwgZGVjaW1hbFBsYWNlcywgZGVjaW1hbFNlcGFyYXRvciwgdGhvdXNhbmRzU2VwYXJhdG9yKTtcbiAgICAgICAgdG90YWxTYWxlID0gZm9ybWF0TW9uZXkodG90YWxTYWxlLCBkZWNpbWFsUGxhY2VzLCBkZWNpbWFsU2VwYXJhdG9yLCB0aG91c2FuZHNTZXBhcmF0b3IpO1xuXG4gICAgICAgIGlmIChzeW1ib2xMb2NhdGlvbiA9PSBcImxlZnRcIiB8fCBzeW1ib2xMb2NhdGlvbiA9PSAwKXtcbiAgICAgICAgICAgIHRvdGFsID0gc3ltYm9sICsgdG90YWw7XG4gICAgICAgICAgICB0b3RhbFNhbGUgPSBzeW1ib2wgKyB0b3RhbFNhbGU7XG4gICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIHRvdGFsID0gdG90YWwgKyBzeW1ib2w7XG4gICAgICAgICAgICB0b3RhbFNhbGUgPSB0b3RhbFNhbGUgKyBzeW1ib2w7XG4gICAgICAgIH1cblxuICAgICAgICAkYnVuZGxlLmZpbmQoJy5oYWxvLXByb2R1Y3QtdG90YWwgLnByaWNlJykuaHRtbCh0b3RhbCk7XG4gICAgICAgICRidW5kbGUuZmluZCgnLmhhbG8tcHJvZHVjdC10b3RhbCAucHJpY2Utc2FsZScpLmh0bWwodG90YWxTYWxlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JtYXRNb25leShuLCBjLCBkLCB0KSB7XG4gICAgICAgIHZhciBjID0gaXNOYU4oYyA9IE1hdGguYWJzKGMpKSA/IDIgOiBjLFxuICAgICAgICAgICAgZCA9IGQgPT0gdW5kZWZpbmVkID8gXCIuXCIgOiBkLFxuICAgICAgICAgICAgdCA9IHQgPT0gdW5kZWZpbmVkID8gXCIsXCIgOiB0LFxuICAgICAgICAgICAgcyA9IG4gPCAwID8gXCItXCIgOiBcIlwiLFxuICAgICAgICAgICAgaSA9IFN0cmluZyhwYXJzZUludChuID0gTWF0aC5hYnMoTnVtYmVyKG4pIHx8IDApLnRvRml4ZWQoYykpKSxcbiAgICAgICAgICAgIGogPSAoaiA9IGkubGVuZ3RoKSA+IDMgPyBqICUgMyA6IDA7XG5cbiAgICAgICAgcmV0dXJuIHMgKyAoaiA/IGkuc3Vic3RyKDAsIGopICsgdCA6IFwiXCIpICsgaS5zdWJzdHIoaikucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csIFwiJDFcIiArIHQpICsgKGMgPyBkICsgTWF0aC5hYnMobiAtIGkpLnRvRml4ZWQoYykuc2xpY2UoMikgOiBcIlwiKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJvZHVjdE9wdGlvbnMoKSB7XG4gICAgICAgIGlmKCEkYnVuZGxlLmhhc0NsYXNzKCdoYWxvLWJ1bmRsZS1sb2dpbicpKXtcbiAgICAgICAgICAgIHRvdGFsUHJpY2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJ2Zvcm0nLCAkYnVuZGxlKSxcbiAgICAgICAgICAgICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQgPSAkKCdbZGF0YS1mYnQtb3B0aW9uLWNoYW5nZV0nLCAkZm9ybSk7XG5cbiAgICAgICAgc2V0UHJvZHVjdFZhcmlhbnQoKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJHByb2R1Y3RPcHRpb25zRWxlbWVudCwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgcHJvZHVjdE9wdGlvbnNDaGFuZ2VkKGV2ZW50KTtcbiAgICAgICAgICAgIHNldFByb2R1Y3RWYXJpYW50KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFByb2R1Y3RWYXJpYW50KCkge1xuICAgICAgICBjb25zdCB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzID0gW107XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICAgICAgICAkKCcuaGFsby1wcm9kdWN0LWl0ZW0nKS5lYWNoKChpbmRleCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVPcHRpb25zID0gW107XG5cbiAgICAgICAgICAgICQoaXRlbSkuZmluZCgnW2RhdGEtZmJ0LW9wdGlvbi1jaGFuZ2VdIFtkYXRhLXByb2R1Y3QtYXR0cmlidXRlXScpLmVhY2goKF8sIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSAkKHZhbHVlKS5maW5kKCdsYWJlbCcpLnRleHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25UaXRsZSA9IG9wdGlvbkxhYmVsLnNwbGl0KCc6JylbMF0udHJpbSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gb3B0aW9uTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gJCh2YWx1ZSkuZGF0YSgncHJvZHVjdC1hdHRyaWJ1dGUnKTtcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoKHR5cGUgPT09ICdpbnB1dC1maWxlJyB8fCB0eXBlID09PSAnaW5wdXQtdGV4dCcgfHwgdHlwZSA9PT0gJ2lucHV0LW51bWJlcicpICYmIHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPT09ICcnICYmIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndGV4dGFyZWEnICYmIHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJykudmFsdWUgPT09ICcnICYmIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTYXRpc2ZpZWQgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5ldmVyeSgoc2VsZWN0KSA9PiBzZWxlY3Quc2VsZWN0ZWRJbmRleCAhPT0gMCk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLm1hcCgoeCkgPT4geC52YWx1ZSkuam9pbignLScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2RhdGVTdHJpbmd9YCk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gdmFsdWUucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSBzZWxlY3Quc2VsZWN0ZWRJbmRleDtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtzZWxlY3Qub3B0aW9uc1tzZWxlY3RlZEluZGV4XS5pbm5lclRleHR9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHZhbHVlLmNoaWxkcmVuWzBdKS5maW5kKCdbZGF0YS1vcHRpb24tdmFsdWVdJykudGV4dChzZWxlY3Qub3B0aW9uc1tzZWxlY3RlZEluZGV4XS5pbm5lclRleHQpO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVPcHRpb25zLnB1c2goc2VsZWN0Lm9wdGlvbnNbc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0LnRyaW0oKSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAnc3dhdGNoJyB8fCB0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrZWQgPSB2YWx1ZS5xdWVyeVNlbGVjdG9yKCc6Y2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gY2hlY2tlZC5sYWJlbHNbMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodmFsdWUuY2hpbGRyZW5bMF0pLmZpbmQoJ1tkYXRhLW9wdGlvbi12YWx1ZV0nKS50ZXh0KGxhYmVsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZU9wdGlvbnMucHVzaChsYWJlbC50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzd2F0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBjaGVja2VkLmxhYmVsc1swXS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsLnRpdGxlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHZhbHVlLmNoaWxkcmVuWzBdKS5maW5kKCdbZGF0YS1vcHRpb24tdmFsdWVdJykudGV4dChsYWJlbC50aXRsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZU9wdGlvbnMucHVzaChsYWJlbC50aXRsZS50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Olllc2ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpOb2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh2YWx1ZU9wdGlvbnMgIT0gJycpIHtcbiAgICAgICAgICAgICAgICAkKGl0ZW0pLmZpbmQoJy5oYWxvLXRvZ2dsZS1vcHRpb25zIC50ZXh0JykudGV4dCh2YWx1ZU9wdGlvbnMuam9pbignIC8gJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcm9kdWN0T3B0aW9uc0NoYW5nZWQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgJGNoYW5nZWRPcHRpb24gPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGNvbnN0ICRmb3JtID0gJGNoYW5nZWRPcHRpb24ucGFyZW50cygnZm9ybScpO1xuICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKCdbbmFtZT1cInByb2R1Y3RfaWRcIl0nLCAkZm9ybSkudmFsKCk7XG5cbiAgICAgICAgaWYgKCRjaGFuZ2VkT3B0aW9uLmF0dHIoJ3R5cGUnKSA9PT0gJ2ZpbGUnIHx8IHdpbmRvdy5Gb3JtRGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJGNoYW5nZWRPcHRpb24uYXR0cignaWQnKSA9PT0gJ2ZidF9wcm9kdWN0JyArIHByb2R1Y3RJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksICdwcm9kdWN0cy9idWxrLWRpc2NvdW50LXJhdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSA9IHJlc3BvbnNlLmRhdGEgfHwge307XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0QXR0cmlidXRlc0NvbnRlbnQgPSByZXNwb25zZS5jb250ZW50IHx8IHt9O1xuICAgICAgICAgICAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoJGZvcm0sIHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSk7XG4gICAgICAgICAgICB1cGRhdGVWaWV3KCRmb3JtLCBwcm9kdWN0QXR0cmlidXRlc0RhdGEsIHByb2R1Y3RBdHRyaWJ1dGVzQ29udGVudCk7XG5cbiAgICAgICAgICAgIGlmKCEkYnVuZGxlLmhhc0NsYXNzKCdoYWxvLWJ1bmRsZS1sb2dpbicpKXtcbiAgICAgICAgICAgICAgICB0b3RhbFByaWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSkge1xuICAgICAgICBjb25zdCBiZWhhdmlvciA9IGRhdGEub3V0X29mX3N0b2NrX2JlaGF2aW9yO1xuICAgICAgICBjb25zdCBpblN0b2NrSWRzID0gZGF0YS5pbl9zdG9ja19hdHRyaWJ1dGVzO1xuICAgICAgICBjb25zdCBvdXRPZlN0b2NrRGVmYXVsdE1lc3NhZ2UgPSBjb250ZXh0Lm91dE9mU3RvY2tEZWZhdWx0TWVzc2FnZTtcbiAgICAgICAgbGV0IG91dE9mU3RvY2tNZXNzYWdlID0gZGF0YS5vdXRfb2Zfc3RvY2tfbWVzc2FnZTtcblxuICAgICAgICBpZiAoYmVoYXZpb3IgIT09ICdoaWRlX29wdGlvbicgJiYgYmVoYXZpb3IgIT09ICdsYWJlbF9vcHRpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgICAgIG91dE9mU3RvY2tNZXNzYWdlID0gYCAoJHtvdXRPZlN0b2NrTWVzc2FnZX0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dE9mU3RvY2tNZXNzYWdlID0gYCAoJHtvdXRPZlN0b2NrRGVmYXVsdE1lc3NhZ2V9KWA7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZS12YWx1ZV0nLCAkc2NvcGUpLmVhY2goKGksIGF0dHJpYnV0ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGF0dHJpYnV0ZSA9ICQoYXR0cmlidXRlKTtcbiAgICAgICAgICAgIGNvbnN0IGF0dHJJZCA9IHBhcnNlSW50KCRhdHRyaWJ1dGUuZGF0YSgncHJvZHVjdEF0dHJpYnV0ZVZhbHVlJyksIDEwKTtcblxuXG4gICAgICAgICAgICBpZiAoaW5TdG9ja0lkcy5pbmRleE9mKGF0dHJJZCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgZW5hYmxlQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc2FibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzYWJsZUF0dHJpYnV0ZSgkYXR0cmlidXRlLCBiZWhhdmlvciwgb3V0T2ZTdG9ja01lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGdldEF0dHJpYnV0ZVR5cGUoJGF0dHJpYnV0ZSkgPT09ICdzZXQtc2VsZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5oaWRlKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5hZGRDbGFzcygndW5hdmFpbGFibGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2FibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkYXR0cmlidXRlLnBhcmVudCgpO1xuXG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS50b2dnbGVPcHRpb24oZmFsc2UpO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGF0dHJpYnV0ZSBpcyB0aGUgc2VsZWN0ZWQgb3B0aW9uIGluIGEgc2VsZWN0IGRyb3Bkb3duLCBzZWxlY3QgdGhlIGZpcnN0IG9wdGlvbiAoTUVSQy02MzkpXG4gICAgICAgICAgICBpZiAoJHNlbGVjdC52YWwoKSA9PT0gJGF0dHJpYnV0ZS5hdHRyKCd2YWx1ZScpKSB7XG4gICAgICAgICAgICAgICAgJHNlbGVjdFswXS5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUuaHRtbCgkYXR0cmlidXRlLmh0bWwoKS5yZXBsYWNlKG91dE9mU3RvY2tNZXNzYWdlLCAnJykgKyBvdXRPZlN0b2NrTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmFibGVBdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKSB7XG4gICAgICAgIGlmIChnZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpID09PSAnc2V0LXNlbGVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmFibGVTZWxlY3RPcHRpb25BdHRyaWJ1dGUoJGF0dHJpYnV0ZSwgYmVoYXZpb3IsIG91dE9mU3RvY2tNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiZWhhdmlvciA9PT0gJ2hpZGVfb3B0aW9uJykge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkYXR0cmlidXRlLnJlbW92ZUNsYXNzKCd1bmF2YWlsYWJsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5hYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlKCRhdHRyaWJ1dGUsIGJlaGF2aW9yLCBvdXRPZlN0b2NrTWVzc2FnZSkge1xuICAgICAgICBpZiAoYmVoYXZpb3IgPT09ICdoaWRlX29wdGlvbicpIHtcbiAgICAgICAgICAgICRhdHRyaWJ1dGUudG9nZ2xlT3B0aW9uKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJGF0dHJpYnV0ZS5odG1sKCRhdHRyaWJ1dGUuaHRtbCgpLnJlcGxhY2Uob3V0T2ZTdG9ja01lc3NhZ2UsICcnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBdHRyaWJ1dGVUeXBlKCRhdHRyaWJ1dGUpIHtcbiAgICAgICAgY29uc3QgJHBhcmVudCA9ICRhdHRyaWJ1dGUuY2xvc2VzdCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVdJyk7XG5cbiAgICAgICAgcmV0dXJuICRwYXJlbnQgPyAkcGFyZW50LmRhdGEoJ3Byb2R1Y3RBdHRyaWJ1dGUnKSA6IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlVmlldygkc2NvcGUsIGRhdGEsIGNvbnRlbnQgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHZpZXdNb2RlbCA9IGdldFZpZXdNb2RlbCgkc2NvcGUpO1xuXG4gICAgICAgIHNob3dNZXNzYWdlQm94KGRhdGEuc3RvY2tfbWVzc2FnZSB8fCBkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSwgJHNjb3BlKTtcblxuICAgICAgICBpZiAoZGF0YS5wcmljZSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgdXBkYXRlUHJpY2VWaWV3KHZpZXdNb2RlbCwgZGF0YS5wcmljZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJvZHVjdElkID0gJCgnW25hbWU9XCJwcm9kdWN0X2lkXCJdJywgJHNjb3BlKS52YWwoKSxcbiAgICAgICAgICAgIHByb2R1Y3QgPSAkYnVuZGxlTGlzdC5maW5kKCcuaGFsby1wcm9kdWN0LWl0ZW1bZGF0YS1wcm9kdWN0LWlkPVwiJyArIHByb2R1Y3RJZCArICdcIl0nKSxcbiAgICAgICAgICAgIHByb2R1Y3RDaGVja2JveCA9IHByb2R1Y3QuZmluZCgnLmhhbG8tZGV0YWlsLWNoZWNrYm94Jyk7XG5cbiAgICAgICAgaWYgKCFkYXRhLnB1cmNoYXNhYmxlIHx8ICFkYXRhLmluc3RvY2spIHtcbiAgICAgICAgICAgIHByb2R1Y3QucmVtb3ZlQ2xhc3MoJ2lzQ2hlY2tlZCBoYXNPcHRpb25zLS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgcHJvZHVjdC5maW5kKCcuc3RhdHVzJykuYWRkQ2xhc3MoJ2Rpc2FibGUnKS50ZXh0KCdUaGlzIGl0ZW0nKTtcbiAgICAgICAgICAgIHByb2R1Y3RDaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAkKCcjaGFsby1hZGRBbGwnKS5maW5kKCcubnVtYmVyJykudGV4dCgkKCcuaGFsby1wcm9kdWN0LWl0ZW0uaXNDaGVja2VkJykubGVuZ3RoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaXNDaGVja2VkJyk7XG4gICAgICAgICAgICBwcm9kdWN0LmZpbmQoJy5zdGF0dXMnKS5yZW1vdmVDbGFzcygnZGlzYWJsZScpLnRleHQoJ1NlbGVjdGVkJyk7XG4gICAgICAgICAgICBwcm9kdWN0Q2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIHRydWUpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgJCgnI2hhbG8tYWRkQWxsJykuZmluZCgnLm51bWJlcicpLnRleHQoJCgnLmhhbG8tcHJvZHVjdC1pdGVtLmlzQ2hlY2tlZCcpLmxlbmd0aClcblxuICAgICAgICAgICAgaWYgKCRzY29wZS5maW5kKCdbZGF0YS1mYnQtb3B0aW9uLWNoYW5nZV0nKS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgY2hlY2sgPSBjaGVja0JlZm9yZUFkZCgkc2NvcGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdC5hZGRDbGFzcygnaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVEZWZhdWx0QXR0cmlidXRlc0Zvck9PUygkc2NvcGUsIGRhdGEpIHtcbiAgICAgICAgdmFyIHByb2R1Y3RJZCA9ICQoJ1tuYW1lPVwicHJvZHVjdF9pZFwiXScsICRzY29wZSkudmFsKCksXG4gICAgICAgICAgICBwcm9kdWN0ID0gJGJ1bmRsZUxpc3QuZmluZCgnLmhhbG8tcHJvZHVjdC1pdGVtW2RhdGEtcHJvZHVjdC1pZD1cIicgKyBwcm9kdWN0SWQgKyAnXCJdJyksXG4gICAgICAgICAgICBwcm9kdWN0Q2hlY2tib3ggPSBwcm9kdWN0LmZpbmQoJy5oYWxvLWRldGFpbC1jaGVja2JveCcpO1xuXG4gICAgICAgIGlmICghZGF0YS5wdXJjaGFzYWJsZSB8fCAhZGF0YS5pbnN0b2NrKSB7XG4gICAgICAgICAgICBwcm9kdWN0LnJlbW92ZUNsYXNzKCdpc0NoZWNrZWQgaGFzT3B0aW9ucy0tc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHByb2R1Y3QuZmluZCgnLnN0YXR1cycpLmFkZENsYXNzKCdkaXNhYmxlJykudGV4dCgnVGhpcyBpdGVtJyk7XG4gICAgICAgICAgICBwcm9kdWN0Q2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgJCgnI2hhbG8tYWRkQWxsJykuZmluZCgnLm51bWJlcicpLnRleHQoJCgnLmhhbG8tcHJvZHVjdC1pdGVtLmlzQ2hlY2tlZCcpLmxlbmd0aClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2R1Y3QuYWRkQ2xhc3MoJ2lzQ2hlY2tlZCcpO1xuICAgICAgICAgICAgcHJvZHVjdC5maW5kKCcuc3RhdHVzJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGUnKS50ZXh0KCdTZWxlY3RlZCcpO1xuICAgICAgICAgICAgcHJvZHVjdENoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICQoJyNoYWxvLWFkZEFsbCcpLmZpbmQoJy5udW1iZXInKS50ZXh0KCQoJy5oYWxvLXByb2R1Y3QtaXRlbS5pc0NoZWNrZWQnKS5sZW5ndGgpXG5cbiAgICAgICAgICAgIGlmICgkc2NvcGUuZmluZCgnW2RhdGEtZmJ0LW9wdGlvbi1jaGFuZ2VdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBjaGVjayA9IGNoZWNrQmVmb3JlQWRkKCRzY29wZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hlY2sgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9kdWN0LmFkZENsYXNzKCdoYXNPcHRpb25zLS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFZpZXdNb2RlbCgkc2NvcGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICRwcmljZVZhbHVlOiAkKCcuaGFsby1kZXRhaWwtcHJpY2UnLCAkc2NvcGUpLFxuICAgICAgICAgICAgJHByaWNlV2l0aFRheDogJCgnW2RhdGEtcHJvZHVjdC1wcmljZS13aXRoLXRheF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgJHByaWNlV2l0aG91dFRheDogJCgnW2RhdGEtcHJvZHVjdC1wcmljZS13aXRob3V0LXRheF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgcnJwV2l0aFRheDoge1xuICAgICAgICAgICAgICAgICRkaXY6ICQoJy5ycnAtcHJpY2UtLXdpdGhUYXgnLCAkc2NvcGUpLFxuICAgICAgICAgICAgICAgICRzcGFuOiAkKCdbZGF0YS1wcm9kdWN0LXJycC13aXRoLXRheF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJycFdpdGhvdXRUYXg6IHtcbiAgICAgICAgICAgICAgICAkZGl2OiAkKCcucnJwLXByaWNlLS13aXRob3V0VGF4JywgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICAkc3BhbjogJCgnW2RhdGEtcHJvZHVjdC1ycnAtcHJpY2Utd2l0aG91dC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub25TYWxlV2l0aFRheDoge1xuICAgICAgICAgICAgICAgICRkaXY6ICQoJy5ub24tc2FsZS1wcmljZS0td2l0aFRheCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJ1tkYXRhLXByb2R1Y3Qtbm9uLXNhbGUtcHJpY2Utd2l0aC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBub25TYWxlV2l0aG91dFRheDoge1xuICAgICAgICAgICAgICAgICRkaXY6ICQoJy5ub24tc2FsZS1wcmljZS0td2l0aG91dFRheCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJ1tkYXRhLXByb2R1Y3Qtbm9uLXNhbGUtcHJpY2Utd2l0aG91dC10YXhdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmljZVNhdmVkOiB7XG4gICAgICAgICAgICAgICAgJGRpdjogJCgnLnByaWNlLXNlY3Rpb24tLXNhdmluZycsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJ1tkYXRhLXByb2R1Y3QtcHJpY2Utc2F2ZWRdJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmljZU5vd0xhYmVsOiB7XG4gICAgICAgICAgICAgICAgJHNwYW46ICQoJy5wcmljZS1ub3ctbGFiZWwnLCAkc2NvcGUpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaWNlTGFiZWw6IHtcbiAgICAgICAgICAgICAgICAkc3BhbjogJCgnLnByaWNlLWxhYmVsJywgJHNjb3BlKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAkd2VpZ2h0OiAkKCcucHJvZHVjdFZpZXctaW5mbyBbZGF0YS1wcm9kdWN0LXdlaWdodF0nLCAkc2NvcGUpLFxuICAgICAgICAgICAgJGluY3JlbWVudHM6ICQoJy5mb3JtLWZpZWxkLS1pbmNyZW1lbnRzIDppbnB1dCcsICRzY29wZSksXG4gICAgICAgICAgICAkYWRkVG9DYXJ0OiAkKCcjZm9ybS1hY3Rpb24tYWRkVG9DYXJ0JywgJHNjb3BlKSxcbiAgICAgICAgICAgICR3aXNobGlzdFZhcmlhdGlvbjogJCgnW2RhdGEtd2lzaGxpc3QtYWRkXSBbbmFtZT1cInZhcmlhdGlvbl9pZFwiXScsICRzY29wZSksXG4gICAgICAgICAgICBzdG9jazoge1xuICAgICAgICAgICAgICAgICRjb250YWluZXI6ICQoJy5mb3JtLWZpZWxkLS1zdG9jaycsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJGlucHV0OiAkKCdbZGF0YS1wcm9kdWN0LXN0b2NrXScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2t1OiB7XG4gICAgICAgICAgICAgICAgJGxhYmVsOiAkKCcuc2t1LWxhYmVsJywgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICAkdmFsdWU6ICQoJ1tkYXRhLXByb2R1Y3Qtc2t1XScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBjOiB7XG4gICAgICAgICAgICAgICAgJGxhYmVsOiAkKCcudXBjLWxhYmVsJywgJHNjb3BlKSxcbiAgICAgICAgICAgICAgICAkdmFsdWU6ICQoJ1tkYXRhLXByb2R1Y3QtdXBjXScsICRzY29wZSksXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIHF1YW50aXR5OiB7XG4gICAgICAgICAgICAgICAgJHRleHQ6ICQoJy5pbmNyZW1lbnRUb3RhbCcsICRzY29wZSksXG4gICAgICAgICAgICAgICAgJGlucHV0OiAkKCdbbmFtZT1mYnRxdHlcXFxcW1xcXFxdXScsICRzY29wZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJGJ1bGtQcmljaW5nOiAkKCcucHJvZHVjdFZpZXctaW5mby1idWxrUHJpY2luZycsICRzY29wZSksXG4gICAgICAgICAgICAkd2FsbGV0QnV0dG9uczogJCgnW2RhdGEtYWRkLXRvLWNhcnQtd2FsbGV0LWJ1dHRvbnNdJywgJHNjb3BlKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93TWVzc2FnZUJveChtZXNzYWdlLCAkc2NvcGUpIHtcbiAgICAgICAgY29uc3QgJG1lc3NhZ2VCb3ggPSAkKCcucHJvZHVjdEF0dHJpYnV0ZXMtbWVzc2FnZScsICRzY29wZSk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICQoJy5hbGVydEJveC1tZXNzYWdlJywgJG1lc3NhZ2VCb3gpLnRleHQobWVzc2FnZSk7XG4gICAgICAgICAgICAkbWVzc2FnZUJveC5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkbWVzc2FnZUJveC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhclByaWNpbmdOb3RGb3VuZCh2aWV3TW9kZWwpIHtcbiAgICAgICAgdmlld01vZGVsLnJycFdpdGhUYXguJGRpdi5oaWRlKCk7XG4gICAgICAgIHZpZXdNb2RlbC5ycnBXaXRob3V0VGF4LiRkaXYuaGlkZSgpO1xuICAgICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhUYXguJGRpdi5oaWRlKCk7XG4gICAgICAgIHZpZXdNb2RlbC5ub25TYWxlV2l0aG91dFRheC4kZGl2LmhpZGUoKTtcbiAgICAgICAgdmlld01vZGVsLnByaWNlU2F2ZWQuJGRpdi5oaWRlKCk7XG4gICAgICAgIHZpZXdNb2RlbC5wcmljZU5vd0xhYmVsLiRzcGFuLmhpZGUoKTtcbiAgICAgICAgdmlld01vZGVsLnByaWNlTGFiZWwuJHNwYW4uaGlkZSgpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiB1cGRhdGVQcmljZVZpZXcodmlld01vZGVsLCBwcmljZSkge1xuICAgICAgICBjbGVhclByaWNpbmdOb3RGb3VuZCh2aWV3TW9kZWwpO1xuXG4gICAgICAgIGlmIChwcmljZS53aXRoX3RheCkge1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZFByaWNlID0gcHJpY2UucHJpY2VfcmFuZ2UgP1xuICAgICAgICAgICAgICAgIGAke3ByaWNlLnByaWNlX3JhbmdlLm1pbi53aXRoX3RheC5mb3JtYXR0ZWR9IC0gJHtwcmljZS5wcmljZV9yYW5nZS5tYXgud2l0aF90YXguZm9ybWF0dGVkfWBcbiAgICAgICAgICAgICAgICA6IHByaWNlLndpdGhfdGF4LmZvcm1hdHRlZDtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZUxhYmVsLiRzcGFuLnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kcHJpY2VXaXRoVGF4Lmh0bWwodXBkYXRlZFByaWNlKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kcHJpY2VWYWx1ZS5hdHRyKCdkYXRhLXByaWNlLXZhbHVlJywgcHJpY2Uud2l0aF90YXgudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlLndpdGhvdXRfdGF4KSB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkUHJpY2UgPSBwcmljZS5wcmljZV9yYW5nZSA/XG4gICAgICAgICAgICAgICAgYCR7cHJpY2UucHJpY2VfcmFuZ2UubWluLndpdGhvdXRfdGF4LmZvcm1hdHRlZH0gLSAke3ByaWNlLnByaWNlX3JhbmdlLm1heC53aXRob3V0X3RheC5mb3JtYXR0ZWR9YFxuICAgICAgICAgICAgICAgIDogcHJpY2Uud2l0aG91dF90YXguZm9ybWF0dGVkO1xuICAgICAgICAgICAgdmlld01vZGVsLnByaWNlTGFiZWwuJHNwYW4uc2hvdygpO1xuICAgICAgICAgICAgdmlld01vZGVsLiRwcmljZVdpdGhvdXRUYXguaHRtbCh1cGRhdGVkUHJpY2UpO1xuICAgICAgICAgICAgdmlld01vZGVsLiRwcmljZVZhbHVlLmF0dHIoJ2RhdGEtcHJpY2UtdmFsdWUnLCBwcmljZS53aXRob3V0X3RheC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2UucnJwX3dpdGhfdGF4KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwucnJwV2l0aFRheC4kZGl2LnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ycnBXaXRoVGF4LiRzcGFuLmh0bWwocHJpY2UucnJwX3dpdGhfdGF4LmZvcm1hdHRlZCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJHByaWNlVmFsdWUuYXR0cignZGF0YS1wcmljZS12YWx1ZScsIHByaWNlLnJycF93aXRoX3RheC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2UucnJwX3dpdGhvdXRfdGF4KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwucnJwV2l0aG91dFRheC4kZGl2LnNob3coKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5ycnBXaXRob3V0VGF4LiRzcGFuLmh0bWwocHJpY2UucnJwX3dpdGhvdXRfdGF4LmZvcm1hdHRlZCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwuJHByaWNlVmFsdWUuYXR0cignZGF0YS1wcmljZS12YWx1ZScsIHByaWNlLnJycF93aXRob3V0X3RheC52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJpY2Uuc2F2ZWQpIHtcbiAgICAgICAgICAgIHZpZXdNb2RlbC5wcmljZVNhdmVkLiRkaXYuc2hvdygpO1xuICAgICAgICAgICAgdmlld01vZGVsLnByaWNlU2F2ZWQuJHNwYW4uaHRtbChwcmljZS5zYXZlZC5mb3JtYXR0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByaWNlLm5vbl9zYWxlX3ByaWNlX3dpdGhfdGF4KSB7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VMYWJlbC4kc3Bhbi5oaWRlKCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhUYXguJGRpdi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwucHJpY2VOb3dMYWJlbC4kc3Bhbi5zaG93KCk7XG4gICAgICAgICAgICB2aWV3TW9kZWwubm9uU2FsZVdpdGhUYXguJHNwYW4uaHRtbChwcmljZS5ub25fc2FsZV9wcmljZV93aXRoX3RheC5mb3JtYXR0ZWQpO1xuICAgICAgICAgICAgdmlld01vZGVsLiRwcmljZVZhbHVlLmF0dHIoJ2RhdGEtcHJpY2Utc2FsZS12YWx1ZScsIHByaWNlLm5vbl9zYWxlX3ByaWNlX3dpdGhfdGF4LnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmljZS5ub25fc2FsZV9wcmljZV93aXRob3V0X3RheCkge1xuICAgICAgICAgICAgdmlld01vZGVsLnByaWNlTGFiZWwuJHNwYW4uaGlkZSgpO1xuICAgICAgICAgICAgdmlld01vZGVsLm5vblNhbGVXaXRob3V0VGF4LiRkaXYuc2hvdygpO1xuICAgICAgICAgICAgdmlld01vZGVsLnByaWNlTm93TGFiZWwuJHNwYW4uc2hvdygpO1xuICAgICAgICAgICAgdmlld01vZGVsLm5vblNhbGVXaXRob3V0VGF4LiRzcGFuLmh0bWwocHJpY2Uubm9uX3NhbGVfcHJpY2Vfd2l0aG91dF90YXguZm9ybWF0dGVkKTtcbiAgICAgICAgICAgIHZpZXdNb2RlbC4kcHJpY2VWYWx1ZS5hdHRyKCdkYXRhLXByaWNlLXNhbGUtdmFsdWUnLCBwcmljZS5ub25fc2FsZV9wcmljZV93aXRob3V0X3RheC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJFbXB0eUZpbGVzRnJvbUZvcm0oZm9ybURhdGEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsXSBvZiBmb3JtRGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBGaWxlICYmICF2YWwubmFtZSAmJiAhdmFsLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvcm1EYXRhO1xuICAgIH1cbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QgZnJvbSAnLi9oYWxvQWRkT3B0aW9uRm9yUHJvZHVjdCc7XG5pbXBvcnQgaGFsb1Byb2R1Y3RJbWFnZUhvdmVyIGZyb20gJy4vaGFsb1Byb2R1Y3RJbWFnZUhvdmVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb25zdCBsaXN0ID0gZ2V0bGlzdEl0ZW1zKCk7XG4gICAgY29uc3QgJHRoaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGFsby1yZWNlbnQtdmlld2VkLXByb2R1Y3RzJyk7XG4gICAgY29uc3QgJHdyYXBwZXIgPSAkdGhpcy5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXdyYXBwZXInKTtcbiAgICBjb25zdCBvcHRpb25zID0ge3RlbXBsYXRlOiAnaGFsb3RoZW1lcy9wcm9kdWN0L2hhbG8tcHJvZHVjdC10ZW1wbGF0ZSd9O1xuICAgIGxldCBudW0gPSAwO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09IDApICR0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgbG9hZCgpO1xuXG4gICAgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlSW50ZXJzZWN0aW9uID0gKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgIGlmICghZW50cmllc1swXS5pc0ludGVyc2VjdGluZykgcmV0dXJuO1xuICAgICAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKCR0aGlzKTtcbiAgICAgICAgICAgIGdldFByb2R1Y3QobnVtKTtcbiAgICAgICAgfTtcblxuICAgICAgICBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoaGFuZGxlSW50ZXJzZWN0aW9uLmJpbmQoJHRoaXMpLCB7IHJvb3RNYXJnaW46ICcwcHggMHB4IDQwMHB4IDBweCcgfSkub2JzZXJ2ZSgkdGhpcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0bGlzdEl0ZW1zKCkge1xuICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSBwYXJzZUludChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cInByb2R1Y3RfaWRcIl0nKS52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGxpc3RJdGVtcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19oYWxvX3JlY2VudGx5X3ZpZXdlZCcpIHx8ICdbXScpO1xuICAgICAgICBpZiAocHJvZHVjdElkICYmIGxpc3RJdGVtcy5pbmNsdWRlcyhwYXJzZUludChwcm9kdWN0SWQpKSkgbGlzdEl0ZW1zLnNwbGljZShsaXN0SXRlbXMuaW5kZXhPZihwYXJzZUludChwcm9kdWN0SWQpKSwgMSk7XG4gICAgICAgIHJldHVybiBsaXN0SXRlbXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvZHVjdCgpIHtcbiAgICAgICAgY29uc3QgcHJvZHVjdElkID0gbGlzdFtudW1dO1xuICAgICAgICBpZiAoIXByb2R1Y3RJZCkgcmV0dXJuO1xuICAgICAgICB1dGlscy5hcGkucHJvZHVjdC5nZXRCeUlkKHByb2R1Y3RJZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybjtcbiAgICAgICAgICAgICR3cmFwcGVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgbnVtKys7XG4gICAgICAgICAgICBpZiAobnVtKzEgPCBOdW1iZXIoJHRoaXMuZGF0YXNldC5saW1pdCkpIGdldFByb2R1Y3QobnVtKTtcbiAgICAgICAgICAgIGhhbG9Qcm9kdWN0SW1hZ2VIb3ZlcigpO1xuICAgICAgICAgICAgaGFsb0FkZE9wdGlvbkZvclByb2R1Y3QoY29udGV4dCwgJ2hhbG8tcmVjZW50LXZpZXdlZC1wcm9kdWN0cycpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBpZiAoJCgnI2Zvcm0tYWN0aW9uLWFkZFRvQ2FydCcpLmxlbmd0aCkge1xuICAgICAgICB2YXIgc2Nyb2xsID0gJCgnI2Zvcm0tYWN0aW9uLWFkZFRvQ2FydCcpLm9mZnNldCgpLFxuICAgICAgICAgICAgc2Nyb2xsVG9wID0gc2Nyb2xsLnRvcDtcblxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZigkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzY3JvbGxUb3AgKyA0MDApe1xuXG4gICAgICAgICAgICAgICAgaWYoISQoJyNoYWxvX3N0aWNreV9hZGRUb0NhcnQnKS5oYXNDbGFzcygnc2hvd19zdGlja3knKSl7XG4gICAgICAgICAgICAgICAgICAgICQoJyNoYWxvX3N0aWNreV9hZGRUb0NhcnQnKS5hZGRDbGFzcygnc2hvd19zdGlja3knKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA1NTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNyZWNlbnRseV9ib3VnaHRfbGlzdCcpLmNzcyhcImJvdHRvbVwiLCAkKCcjaGFsb19zdGlja3lfYWRkVG9DYXJ0Jykub3V0ZXJIZWlnaHQoKSArIDQwKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQoJyNoYWxvX3N0aWNreV9hZGRUb0NhcnQnKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNyZWNlbnRseV9ib3VnaHRfbGlzdCcpLmNzcyhcImJvdHRvbVwiLCAkKCcjaGFsb19zdGlja3lfYWRkVG9DYXJ0Jykub3V0ZXJIZWlnaHQoKSArIDMwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3JlY2VudGx5X2JvdWdodF9saXN0JykuY3NzKFwiYm90dG9tXCIsIDMwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAkKCcjaGFsb19zdGlja3lfYWRkVG9DYXJ0JykucmVtb3ZlQ2xhc3MoJ3Nob3dfc3RpY2t5Jyk7XG4gICAgICAgICAgICAgICAgJCgnLnBvcC11cC1vcHRpb24nKS5yZW1vdmVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnb3BlblBvcHVwT3B0aW9uJyk7XG5cbiAgICAgICAgICAgICAgICAkKCcuY2hvb3NlX29wdGlvbnNfYWRkJykucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgJCgnI3JlY2VudGx5X2JvdWdodF9saXN0JykuY3NzKFwiYm90dG9tXCIsIDMwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywnLmNob29zZV9vcHRpb25zX2FkZCcsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAgICAgJCgnLnBvcC11cC1vcHRpb24nKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdvcGVuUG9wdXBPcHRpb24nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywnLnBvcC11cC1vcHRpb24gLmNsb3NlJywgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgJChcIi5wb3AtdXAtb3B0aW9uXCIpLnJlbW92ZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ29wZW5Qb3B1cE9wdGlvbicpO1xuICAgICAgICAgICAgJCgnLmNob29zZV9vcHRpb25zX2FkZCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnb3BlblBvcHVwT3B0aW9uJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoKCQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcjaGFsb19zdGlja3lfYWRkVG9DYXJ0JykubGVuZ3RoID09PSAwKSl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5wb3AtdXAtb3B0aW9uJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdvcGVuUG9wdXBPcHRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNob29zZV9vcHRpb25zX2FkZCcpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2Nyb2xsVG9wICsgNDAwKXtcbiAgICAgICAgICAgICAgICBpZighJCgnI2hhbG9fc3RpY2t5X2FkZFRvQ2FydCcpLmhhc0NsYXNzKCdzaG93X3N0aWNreScpKXtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2hhbG9fc3RpY2t5X2FkZFRvQ2FydCcpLmFkZENsYXNzKCdzaG93X3N0aWNreScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDU1MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3JlY2VudGx5X2JvdWdodF9saXN0JykuY3NzKFwiYm90dG9tXCIsICQoJyNoYWxvX3N0aWNreV9hZGRUb0NhcnQnKS5vdXRlckhlaWdodCgpICsgNDApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJCgnI2hhbG9fc3RpY2t5X2FkZFRvQ2FydCcpLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3JlY2VudGx5X2JvdWdodF9saXN0JykuY3NzKFwiYm90dG9tXCIsICQoJyNoYWxvX3N0aWNreV9hZGRUb0NhcnQnKS5vdXRlckhlaWdodCgpICsgMzApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjcmVjZW50bHlfYm91Z2h0X2xpc3QnKS5jc3MoXCJib3R0b21cIiwgMzApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBTb3J0YWJsZSBmcm9tICdzb3J0YWJsZWpzJztcbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vcHJvZHVjdC9yZXZpZXdzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gJy4vcHJvZHVjdC92aWRlby1nYWxsZXJ5JztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IG1vZGFsRmFjdG9yeSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgaGFsb1N3aXBlclByb2R1Y3RJbWFnZSBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1N3aXBlclByb2R1Y3RJbWFnZSc7XG5pbXBvcnQgaGFsb0J1bmRsZVByb2R1Y3RzIGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvQnVuZGxlUHJvZHVjdHMnO1xuaW1wb3J0IGhhbG9SZWNlbnRWaWV3ZWRQcm9kdWN0cyBmcm9tICcuL2hhbG90aGVtZXMvaGFsb1JlY2VudFZpZXdlZFByb2R1Y3RzJztcbmltcG9ydCBoYWxvU3RpY2t5QWRkVG9DYXJ0IGZyb20gJy4vaGFsb3RoZW1lcy9oYWxvU3RpY2t5QWRkVG9DYXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB0aGlzLiRyZXZpZXdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nKTtcbiAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtYnVsay1wcmljaW5nXCJdJyk7XG4gICAgICAgIHRoaXMucmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoJyNtb2RhbC1yZXZpZXctZm9ybScpWzBdO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgZm91bmRhdGlvbiBtb2RhbCBjbG9zZSBldmVudHMgdG8gc2FuaXRpemUgVVJMIGFmdGVyIHJldmlldy5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Nsb3NlLmZuZHRuLnJldmVhbCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCB2YWxpZGF0b3I7XG5cbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZVxuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcbiAgICAgICAgaGFsb1N3aXBlclByb2R1Y3RJbWFnZSgpO1xuICAgICAgICBoYWxvQnVuZGxlUHJvZHVjdHMoJCgnLmhhbG8tcHJvZHVjdFZpZXcnKSwgdGhpcy5jb250ZXh0KTtcblxuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IFByb2R1Y3REZXRhaWxzKCQoJy5wcm9kdWN0VmlldycpLCB0aGlzLmNvbnRleHQsIHdpbmRvdy5CQ0RhdGEucHJvZHVjdF9hdHRyaWJ1dGVzKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscy5zZXRQcm9kdWN0VmFyaWFudCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbnRleHQudGhlbWVTZXR0aW5ncy5oYWxvX3N0aWNreUFkZFRvQ2FydCkge1xuICAgICAgICAgICAgaGFsb1N0aWNreUFkZFRvQ2FydCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscy5zZXRQcm9kdWN0VmFyaWFudDIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZGVvR2FsbGVyeSgpO1xuXG4gICAgICAgIHRoaXMuYnVsa1ByaWNpbmdIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMudmlkZW9Qb3B1cCgpO1xuICAgICAgICB0aGlzLnNvbGRQcm9kdWN0KCQoJy5wcm9kdWN0Vmlldy1zb2xkUHJvZHVjdCcpKTtcbiAgICAgICAgdGhpcy5jb3VudERvd25Qcm9kdWN0KCQoJy5wcm9kdWN0Vmlldy1jb3VudERvd24nKSk7XG4gICAgICAgIHRoaXMuY29tcGFyZUNvbG9ycygpO1xuICAgICAgICB0aGlzLmFza0FuRXhwZXJ0KCk7XG4gICAgICAgIHRoaXMuY2hlY2tUYWJBY3RpdmUoKTtcbiAgICAgICAgdGhpcy5jaGVja1Byb2R1Y3QoKTtcblxuICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogNzY4cHgpJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja1RhYkFjdGl2ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgaXNSZWNlbnRWaWV3ZWRQcm9kdWN0cyA9IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2RSZWNlbnRWaWV3ZWQ7XG4gICAgICAgIGlmIChpc1JlY2VudFZpZXdlZFByb2R1Y3RzKSB7XG4gICAgICAgICAgICBoYWxvUmVjZW50Vmlld2VkUHJvZHVjdHModGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVjZW50Vmlld2VkUHJvZHVjdHMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0ICRyZXZpZXdGb3JtID0gY2xhc3NpZnlGb3JtKCcud3JpdGVSZXZpZXctZm9ybScpO1xuXG4gICAgICAgIGlmICgkcmV2aWV3Rm9ybS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBjb25zdCByZXZpZXcgPSBuZXcgUmV2aWV3KHsgJHJldmlld0Zvcm0gfSk7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScsICgpID0+IHtcbiAgICAgICAgICAgIHZhbGlkYXRvciA9IHJldmlldy5yZWdpc3RlclZhbGlkYXRpb24odGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzKCRyZXZpZXdGb3JtKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHJldmlld0Zvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0UmV2aWV3SGFuZGxlcigpO1xuICAgIH1cblxuICAgIGFyaWFEZXNjcmliZVJldmlld0lucHV0cygkZm9ybSkge1xuICAgICAgICAkZm9ybS5maW5kKCdbZGF0YS1pbnB1dF0nKS5lYWNoKChfLCBpbnB1dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgICAgICAgICBjb25zdCBtc2dTcGFuSWQgPSBgJHskaW5wdXQuYXR0cignbmFtZScpfS1tc2dgO1xuXG4gICAgICAgICAgICAkaW5wdXQuc2libGluZ3MoJ3NwYW4nKS5hdHRyKCdpZCcsIG1zZ1NwYW5JZCk7XG4gICAgICAgICAgICAkaW5wdXQuYXR0cignYXJpYS1kZXNjcmliZWRieScsIG1zZ1NwYW5JZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb2R1Y3RSZXZpZXdIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI3dyaXRlX3JldmlldycpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy4kcmV2aWV3TGluay50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYnVsa1ByaWNpbmdIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignI2J1bGtfcHJpY2luZycpICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2aWRlb1BvcHVwKCkge1xuICAgICAgICBpZiAoJCgnLmhhbG8tcHJvZHVjdFZpZGVvLWxpbmsnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmhhbG8tcHJvZHVjdFZpZGVvLWxpbmsnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgJCgnLnZpZGVvR2FsbGVyeS1saXN0IC52aWRlb0dhbGxlcnktaXRlbTpmaXJzdC1jaGlsZCA+YScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNvbGRQcm9kdWN0KCR3cmFwcGVyKSB7XG4gICAgICAgIGlmKCR3cmFwcGVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBudW1iZXJzUHJvZHVjdF90ZXh0ID0gdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdF9zb2xkUHJvZHVjdF9wcm9kdWN0cyxcbiAgICAgICAgICAgICAgICBudW1iZXJzSG91cnNfdGV4dCA9IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLnByb2R1Y3Rfc29sZFByb2R1Y3RfaG91cnMsXG4gICAgICAgICAgICAgICAgc29sZFByb2R1Y3RUZXh0ID0gdGhpcy5jb250ZXh0LnRoZW1lU2V0dGluZ3MucHJvZHVjdF9zb2xkUHJvZHVjdF90ZXh0O1xuXG4gICAgICAgICAgICB2YXIgbnVtYmVyc1Byb2R1Y3RMaXN0ID0gIEpTT04ucGFyc2UoXCJbXCIgKyBudW1iZXJzUHJvZHVjdF90ZXh0ICsgXCJdXCIpLCBcbiAgICAgICAgICAgICAgICBudW1iZXJzUHJvZHVjdEl0ZW0gPSAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKm51bWJlcnNQcm9kdWN0TGlzdC5sZW5ndGgpKSxcbiAgICAgICAgICAgICAgICBudW1iZXJzSG91cnNMaXN0ID0gIEpTT04ucGFyc2UoXCJbXCIgKyBudW1iZXJzSG91cnNfdGV4dCArIFwiXVwiKSxcbiAgICAgICAgICAgICAgICBudW1iZXJzSG91cnNJdGVtID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpudW1iZXJzSG91cnNMaXN0Lmxlbmd0aCkpO1xuICAgICAgICAgXG4gICAgICAgICAgICAkd3JhcHBlci5odG1sKCc8c3ZnIGNsYXNzPVwiaWNvbiBkLWlubGluZS1ibG9jayB2LWEtbWlkZGxlXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZmlyZVwiLz48L3N2Zz48c3BhbiBjbGFzcz1cInRleHQgZC1pbmxpbmUtYmxvY2sgdi1hLW1pZGRsZVwiPicgKyBudW1iZXJzUHJvZHVjdExpc3RbbnVtYmVyc1Byb2R1Y3RJdGVtXSArIFwiIFwiICsgc29sZFByb2R1Y3RUZXh0ICsgXCIgXCIgKyBudW1iZXJzSG91cnNMaXN0W251bWJlcnNIb3Vyc0l0ZW1dICsgJ2g8L3NwYW4+Jyk7XG4gICAgICAgICAgICAkd3JhcHBlci5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb3VudERvd25Qcm9kdWN0KCR3cmFwcGVyKSB7XG4gICAgICAgIGlmKCR3cmFwcGVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBjb3VudERvd24gPSAkd3JhcHBlci5kYXRhKCdjb3VudGRvd24nKSxcbiAgICAgICAgICAgICAgICBjb3VudERvd25EYXRlID0gbmV3IERhdGUoY291bnREb3duKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgc2VmdCA9ICR3cmFwcGVyO1xuXG4gICAgICAgICAgICB2YXIgY291bnRkb3duZnVuY3Rpb24gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gY291bnREb3duRGF0ZSAtIG5vdztcblxuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudGRvd25mdW5jdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHNlZnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGRpc3RhbmNlIC8gKDEwMDAgKiA2MCAqIDYwICogMjQpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjAgKiAyNCkpIC8gKDEwMDAgKiA2MCAqIDYwKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW51dGVzID0gTWF0aC5mbG9vcigoZGlzdGFuY2UgJSAoMTAwMCAqIDYwICogNjApKSAvICgxMDAwICogNjApKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSBNYXRoLmZsb29yKChkaXN0YW5jZSAlICgxMDAwICogNjApKSAvIDEwMDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyQ291bnREb3duID0gJzxkaXYgY2xhc3M9XCJpdGVtXCI+PHNwYW4gY2xhc3M9XCJudW1cIj4nK2RheXMrJzwvc3Bhbj48c3BhbiBjbGFzcz1cInRleHQgY29sb3Itc2Vjb25kYXJ5IGYtc2l6ZS1zbWFsbFwiPiBkYXlzPC9zcGFuPjwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj48c3BhbiBjbGFzcz1cIm51bVwiPicraG91cnMrJzwvc3Bhbj48c3BhbiBjbGFzcz1cInRleHQgY29sb3Itc2Vjb25kYXJ5IGYtc2l6ZS1zbWFsbFwiPiBob3Vyczwvc3Bhbj48L2Rpdj5cXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCI+PHNwYW4gY2xhc3M9XCJudW1cIj4nK21pbnV0ZXMrJzwvc3Bhbj48c3BhbiBjbGFzcz1cInRleHQgY29sb3Itc2Vjb25kYXJ5IGYtc2l6ZS1zbWFsbFwiPiBtaW5zPC9zcGFuPjwvZGl2PlxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIj48c3BhbiBjbGFzcz1cIm51bVwiPicrc2Vjb25kcysnPC9zcGFuPjxzcGFuIGNsYXNzPVwidGV4dCBjb2xvci1zZWNvbmRhcnkgZi1zaXplLXNtYWxsXCI+IHNlY3M8L3NwYW4+PC9kaXY+JztcblxuICAgICAgICAgICAgICAgICAgICBzZWZ0Lmh0bWwoc3RyQ291bnREb3duKTtcbiAgICAgICAgICAgICAgICAgICAgJHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcGFyZUNvbG9ycygpe1xuICAgICAgICBjb25zdCAkc3dhdGNoV3JhcHBlciA9ICQoJy5oYWxvLWNvbXBhcmVDb2xvcnMtc3dhdGNoJyksXG4gICAgICAgICAgICAkaW1hZ2VXcmFwcGVyID0gJCgnLmhhbG8tY29tcGFyZUNvbG9ycy1pbWFnZScpLFxuICAgICAgICAgICAgJHRleHRXcmFwcGVyID0gJCgnLmhhbG8tY29tcGFyZUNvbG9ycy10ZXh0Jyk7XG5cbiAgICAgICAgJCgnLmZvcm0tb3B0aW9uJywgJHN3YXRjaFdyYXBwZXIpLm9uKCdjbGljaycsICBldmVudCA9PiB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICAkdGhpcy50b2dnbGVDbGFzcygnc2hvdy1jb2xvcicpO1xuXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudCcpLmF0dHIoJ3RpdGxlJyksXG4gICAgICAgICAgICAgICAgaWQgPSAkdGhpcy5kYXRhKCdwcm9kdWN0LXN3YXRjaC12YWx1ZScpLFxuICAgICAgICAgICAgICAgICRjb2xvciwgJGNvbG9yMiwgJGNvbG9yMywgJGltZywgJHBhdHRlcm47XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnc2hvdy1jb2xvcicpKXtcbiAgICAgICAgICAgICAgICBpZigkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3InKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAkY29sb3IgPSAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3InKS5hdHRyKCdzdHlsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICRpbWFnZVdyYXBwZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaXRlbSBpdGVtLWNvbG9yIGl0ZW0tJytpZCsnXCI+PHNwYW4gY2xhc3M9XCJjb2xvclwiIHN0eWxlPVwiJyskY29sb3IrJztcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPicrdGl0bGUrJzwvc3Bhbj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMicpLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICRjb2xvciA9ICR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjIgLmNvbG9yMScpLmF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICRjb2xvcjIgPSAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IyIC5jb2xvcjInKS5hdHRyKCdzdHlsZScpO1xuXG4gICAgICAgICAgICAgICAgICAgICQoJy5oYWxvLWNvbXBhcmVDb2xvcnMtaW1hZ2UnKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJpdGVtIGl0ZW0tY29sb3IgaXRlbS0nK2lkKydcIj48c3BhbiBjbGFzcz1cImNvbG9yIGNvbG9yMlwiPjxzcGFuIHN0eWxlPVwiJyskY29sb3IrJztcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCInKyRjb2xvcjIrJztcIj48L3NwYW4+PC9zcGFuPjxzcGFuIGNsYXNzPVwidGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjMnKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAkY29sb3IgPSAgJHRoaXMuZmluZCgnLmZvcm0tb3B0aW9uLXZhcmlhbnQtLWNvbG9yMyAuY29sb3IxJykuYXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbG9yMiA9ICAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tY29sb3IzIC5jb2xvcjInKS5hdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAkY29sb3IzID0gICR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1jb2xvcjMgLmNvbG9yMycpLmF0dHIoJ3N0eWxlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJGltYWdlV3JhcHBlci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJpdGVtIGl0ZW0tY29sb3IgaXRlbS0nK2lkKydcIj48c3BhbiBjbGFzcz1cImNvbG9yIGNvbG9yM1wiPjxzcGFuIHN0eWxlPVwiJyskY29sb3IrJztcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCInKyRjb2xvcjIrJztcIj48L3NwYW4+PHNwYW4gc3R5bGU9XCInKyRjb2xvcjMrJztcIj48L3NwYW4+PC9zcGFuPjxzcGFuIGNsYXNzPVwidGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1wYXR0ZXJuJykubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgJGltZyA9ICR0aGlzLmZpbmQoJy5mb3JtLW9wdGlvbi12YXJpYW50LS1wYXR0ZXJuJykuYXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgJHBhdHRlcm4gPSAkdGhpcy5maW5kKCcuZm9ybS1vcHRpb24tdmFyaWFudC0tcGF0dGVybicpLmF0dHIoJ2RhdGEtcGF0dGVybicpO1xuXG4gICAgICAgICAgICAgICAgICAgICRpbWFnZVdyYXBwZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaXRlbSBpdGVtLXBhcnRlcm4gaXRlbS0nK2lkKydcIj48c3BhbiBjbGFzcz1cImltYWdlXCI+PGltZyBzcmM9JyskcGF0dGVybisnIGFsdD0nK3RpdGxlKycgdGl0bGU9Jyt0aXRsZSsnPjwvc3Bhbj48c3BhbiBjbGFzcz1cInRpdGxlXCI+Jyt0aXRsZSsnPC9zcGFuPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICAkKCcuaXRlbS0nK2lkKycnLCAkaW1hZ2VXcmFwcGVyKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoJGltYWdlV3JhcHBlci5jaGlsZHJlbigpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICR0ZXh0V3JhcHBlci5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICAgICAgJHRleHRXcmFwcGVyLnNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDEwMjUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3Itc3dhdGNoLWltYWdlJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbmV3IFNvcnRhYmxlKGVsLCB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogMTUwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFza0FuRXhwZXJ0KCl7XG4gICAgICAgIHZhciBtZXNzYWdlO1xuXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuY29udGV4dC50aGVtZVNldHRpbmdzLmhhbG9fYXNrX2FuX2V4cGVydF9wYWdlbGluaztcblxuICAgICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHV0aWxzLmFwaS5nZXRQYWdlKHVybCwge3RlbXBsYXRlOiAnaGFsb3RoZW1lcy9wcm9kdWN0L2hhbG8tYXNrLWFuLWV4cGVydC1mb3JtJ30sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgJCgnLmhsLWZvcm0tZmllbGQtd3JhcHBlcicpLmh0bWwocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYXNrLWFuLWV4cGVydC1saW5rJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdoYXMtYXNrQW5FeHBlcnQnKVxuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5hc2stYW4tZXhwZXJ0LWxpbmsnKS5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaGFzLWFza0FuRXhwZXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5oYWxvLWFzay1hbi1leHBlcnQtZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciB0eXBlQ29udGFjdCA9ICQoJy5oYWxvLWFzay1hbi1leHBlcnQtZm9ybSBpbnB1dFtuYW1lPXR5cGVfY29udGFjdF06Y2hlY2tlZCcpLnZhbCgpLFxuICAgICAgICAgICAgICAgIHR5cGVQYWNrYWdlID0gJCgnLmhhbG8tYXNrLWFuLWV4cGVydC1mb3JtIGlucHV0W25hbWU9dHlwZV9wYWNrYWdlXTpjaGVja2VkJykudmFsKCksXG4gICAgICAgICAgICAgICAgY3VzdG9tZXJNZXNzYWdlID0gJCgnLmhhbG8tYXNrLWFuLWV4cGVydC1mb3JtIHRleHRhcmVhW25hbWU9Y29udGFjdF9jb21tZW50X2FyZWFdJykudmFsKCksXG4gICAgICAgICAgICAgICAgcmVjYXB0Y2hhID0gJCgnLmhhbG8tYXNrLWFuLWV4cGVydC1mb3JtICNnLXJlY2FwdGNoYS1yZXNwb25zZScpLnZhbCgpLFxuICAgICAgICAgICAgICAgIHRpdGxlID0gICQoJy5oYWxvLWFzay1hbi1leHBlcnQtZm9ybVtkYXRhLXByb2R1Y3QtYXNrLXRpdGxlXScpLmF0dHIoJ2RhdGEtcHJvZHVjdC1hc2stdGl0bGUnKSxcbiAgICAgICAgICAgICAgICBza3UgPSAkKCcuaGFsby1hc2stYW4tZXhwZXJ0LWZvcm1bZGF0YS1wcm9kdWN0LWFzay1za3VdJykuYXR0cignZGF0YS1wcm9kdWN0LWFzay1za3UnKSxcbiAgICAgICAgICAgICAgICB1cmwgPSAkKCcuaGFsby1hc2stYW4tZXhwZXJ0LWZvcm1bZGF0YS1wcm9kdWN0LWFzay11cmxdJykuYXR0cignZGF0YS1wcm9kdWN0LWFzay11cmwnKTtcblxuICAgICAgICAgICAgaWYgKHJlY2FwdGNoYSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gJ1RoZSBjYXB0Y2hhIHlvdSBlbnRlcmVkIGlzIGluY29ycmVjdC4gUGxlYXNlIHRyeSBhZ2Fpbi4nXG5cbiAgICAgICAgICAgICAgICAkKCcjaGFsby1hc2stYW4tZXhwZXJ0LXJlc3VsdHMnKS5odG1sKCc8ZGl2IGNsYXNzPVwiYWxlcnRCb3ggYWxlcnRCb3gtLWVycm9yXCI+JytlcnJvcisnPC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZUNvbnRhY3QgIT0gJycgJiYgdHlwZVBhY2thZ2UgIT0gJycgJiYgY3VzdG9tZXJNZXNzYWdlICE9ICcnICYmIHJlY2FwdGNoYSAhPSAnJykge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgXG4gICAgICAgICAgICAgICAgICAgIDEuIERvIHlvdSBuZWVkOiAke3R5cGVQYWNrYWdlfSBcbiAgICAgICAgICAgICAgICAgICAgMi4gV2hhdCBjYW4gSSBoZWxwIHlvdSB3aXRoIHRvZGF5OiAke2N1c3RvbWVyTWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgMy4gSG93IHdvdWxkIHlvdSBsaWtlIG1lIHRvIGNvbnRhY3QgeW91PzogJHt0eXBlQ29udGFjdH1cbiAgICAgICAgICAgICAgICAgICAgNC4gUHJvZHVjdCBOYW1lOiAke3RpdGxlfVxuICAgICAgICAgICAgICAgICAgICA1LiBQcm9kdWN0IFNLVTogJHtza3V9XG4gICAgICAgICAgICAgICAgICAgIDYuIFByb2R1Y3QgTGluazogJHt1cmx9XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCcjY29udGFjdF9xdWVzdGlvbicpLnZhbChtZXNzYWdlKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy5waHA/YWN0aW9uPXNlbmRDb250YWN0Rm9ybScsXG4gICAgICAgICAgICAgICAgZGF0YTogJCgnLmhhbG8tYXNrLWFuLWV4cGVydC1mb3JtJykuc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJy5oYWxvLWFzay1hbi1leHBlcnQtZm9ybScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2hhbG8tYXNrLWFuLWV4cGVydC1yZXN1bHRzJykuaHRtbCgnPGRpdiBjbGFzcz1cImFsZXJ0Qm94IGFsZXJ0Qm94LS1zdWNjZXNzXCI+VGhhbmsgeW91LiBXZVxcJ3ZlIHJlY2VpdmVkIHlvdXIgZmVlZGJhY2sgYW5kIHdpbGwgcmVzcG9uZCBzaG9ydGx5LjwvZGl2PicpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hlY2tUYWJBY3RpdmUoKSB7XG4gICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYl0gLnRhYicpO1xuICAgICAgICBjb25zdCB0YWJGaXJzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYl0gLnRhYjpmaXJzdC1jaGlsZCcpO1xuICAgICAgICBjb25zdCB0YWJDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYnMtY29udGVudHMgLnRhYi1jb250ZW50Jyk7XG4gICAgICAgIGNvbnN0IHRhYkNvbnRlbnRGaXJzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJzLWNvbnRlbnRzIC50YWItY29udGVudDpmaXJzdC1jaGlsZCcpO1xuXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogNzY4cHgpJykubWF0Y2hlcykge1xuICAgICAgICAgICAgcmVtb3ZlVGFiQWN0aXZlKClcbiAgICAgICAgICAgIGlmICh0YWJGaXJzdCkgdGFiRmlyc3QuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAodGFiQ29udGVudEZpcnN0KSB0YWJDb250ZW50Rmlyc3QuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVUYWJBY3RpdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlVGFiQWN0aXZlKCkge1xuICAgICAgICAgICAgaWYgKHRhYikge1xuICAgICAgICAgICAgICAgIHRhYi5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YWJDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGFiQ29udGVudC5mb3JFYWNoKGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrUHJvZHVjdCgpIHtcbiAgICAgICAgY29uc3QgcmVsYXRlZFByb2R1Y3RzID0gJCgnI2hhbG8tcmVsYXRlZC1wcm9kdWN0cycpLFxuICAgICAgICAgICAgc2ltaWxhclByb2R1Y3RzID0gJCgnI2hhbG8tc2ltaWxhci1wcm9kdWN0cycpO1xuXG4gICAgICAgIGlmKHJlbGF0ZWRQcm9kdWN0cy5maW5kKCcuc3dpcGVyLXdyYXBwZXInKS50ZXh0KCkudHJpbSgpID09ICcnKSB7XG4gICAgICAgICAgICByZWxhdGVkUHJvZHVjdHMuaGlkZSgpXG4gICAgICAgIH1cblxuICAgICAgICBpZihzaW1pbGFyUHJvZHVjdHMuZmluZCgnLnN3aXBlci13cmFwcGVyJykudGV4dCgpLnRyaW0oKSA9PSAnJykge1xuICAgICAgICAgICAgc2ltaWxhclByb2R1Y3RzLmhpZGUoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UmVjZW50Vmlld2VkUHJvZHVjdHMoKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSAnX2hhbG9fcmVjZW50bHlfdmlld2VkJztcbiAgICAgICAgY29uc3QgcHJvZHVjdElkID0gcGFyc2VJbnQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9XCJwcm9kdWN0X2lkXCJdJykudmFsdWUpO1xuICAgICAgICBjb25zdCByZWNlbnRseVZpZXdlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoYWxvLXJlY2VudC12aWV3ZWQtcHJvZHVjdHMnKTtcbiAgICAgICAgbGV0IGxpc3RJdGVtcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSkgfHwgJ1tdJyk7XG4gICAgICAgIGlmICghcHJvZHVjdElkKSByZXR1cm47XG4gICAgICAgIGlmIChsaXN0SXRlbXMuaW5jbHVkZXMocHJvZHVjdElkKSkgbGlzdEl0ZW1zID0gbGlzdEl0ZW1zLmZpbHRlcihpZCA9PiBpZCAhPT0gcHJvZHVjdElkKTtcbiAgICAgICAgbGlzdEl0ZW1zLnVuc2hpZnQocHJvZHVjdElkKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkobGlzdEl0ZW1zLnNsaWNlKDAsIE51bWJlcihyZWNlbnRseVZpZXdlZC5kYXRhc2V0LmxpbWl0KSkpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVmlkZW9HYWxsZXJ5IHtcbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1wbGF5ZXJdJyk7XG4gICAgICAgIHRoaXMuJHZpZGVvcyA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLWl0ZW1dJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvID0ge307XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNlbGVjdE5ld1ZpZGVvKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7XG4gICAgICAgICAgICBpZDogJHRhcmdldC5kYXRhKCd2aWRlb0lkJyksXG4gICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogJHRhcmdldCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNldE1haW5WaWRlbygpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVRodW1iKCk7XG4gICAgfVxuXG4gICAgc2V0TWFpblZpZGVvKCkge1xuICAgICAgICB0aGlzLiRwbGF5ZXIuYXR0cignc3JjJywgYC8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dGhpcy5jdXJyZW50VmlkZW8uaWR9YCk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlVGh1bWIoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvLiRzZWxlY3RlZFRodW1iLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3Mub24oJ2NsaWNrJywgdGhpcy5zZWxlY3ROZXdWaWRlby5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvR2FsbGVyeSgpIHtcbiAgICBjb25zdCBwbHVnaW5LZXkgPSAndmlkZW8tZ2FsbGVyeSc7XG4gICAgY29uc3QgJHZpZGVvR2FsbGVyeSA9ICQoYFtkYXRhLSR7cGx1Z2luS2V5fV1gKTtcblxuICAgICR2aWRlb0dhbGxlcnkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgJGVsID0gJChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgaXNJbml0aWFsaXplZCA9ICRlbC5kYXRhKHBsdWdpbktleSkgaW5zdGFuY2VvZiBWaWRlb0dhbGxlcnk7XG5cbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbC5kYXRhKHBsdWdpbktleSwgbmV3IFZpZGVvR2FsbGVyeSgkZWwpKTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJ1dGlscyIsInNob3dBbGVydE1vZGFsIiwiaGFsb0NhbGN1bGF0ZUZyZWVTaGlwcGluZyIsImZvcm1zIiwiJHNjb3BlIiwiY29udGV4dCIsInRoaXNQcm91Y3RJZCIsInBhcnNlSW50IiwicHJvZHVjdElkIiwiJHJlbGF0ZWRUYWIiLCIkIiwiJGJ1bmRsZSIsIiRidW5kbGVMaXN0IiwiZmluZCIsImN1cnJlbmN5IiwibW9uZXkiLCJzaG93QnVuZGxlIiwiZG9jdW1lbnQiLCJvbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCIkdGFyZ2V0IiwiY3VycmVudFRhcmdldCIsIm5vdCIsInJlbW92ZUNsYXNzIiwibmV4dCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJ0YXJnZXQiLCJjbG9zZXN0IiwibGVuZ3RoIiwiaWQiLCJhdHRyIiwicmVwbGFjZSIsInByb2R1Y3QiLCJpcyIsInRleHQiLCJ0b3RhbFByaWNlIiwiJGZvcm0iLCJhcnJQcm8iLCJBcnJheSIsImVhY2giLCJpbmRleCIsInZhbCIsInB1c2giLCJjaGVjayIsImNoZWNrUHJvZHVjdCIsImsiLCJzaG93IiwiYWRkVG9DYXJ0IiwiZXJyb3JNZXNzYWdlIiwidG1wIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0Iiwib3B0aW9ucyIsInRlbXBsYXRlIiwicHJvZEJ1bmRsZUlkIiwidG90YWxCbG9jayIsImZpcnN0SXRlbSIsImFwcGVuZCIsInByb2R1Y3RDdXN0b21GaWVsZHMiLCJvYmoiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwidmFsdWUiLCJncmVwIiwibnVtIiwibGlzdCIsImRhdGEiLCJwSWQiLCJ1bmRlZmluZWQiLCJhcGkiLCJnZXRCeUlkIiwiZXJyIiwicmVzcG9uc2UiLCJmb3JFYWNoIiwiZWxlbWVudCIsInNob3dMaXN0IiwiaSIsImZvcm0iLCJoYXNPcHRpb25zIiwiaGFzRGVmYXVsdE9wdGlvbnMiLCJwcm9kdWN0QXR0cmlidXRlcyIsIm9wdGlvbkNoYW5nZSIsInNlcmlhbGl6ZSIsImF0dHJpYnV0ZXNEYXRhIiwiYXR0cmlidXRlc0NvbnRlbnQiLCJjb250ZW50IiwidXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMiLCJ1cGRhdGVWaWV3IiwidXBkYXRlRGVmYXVsdEF0dHJpYnV0ZXNGb3JPT1MiLCIkcHJvZHVjdE9wdGlvbnNFbGVtZW50IiwiaHRtbCIsInRyaW0iLCJzZXRQcm9kdWN0VmFyaWFudCIsImN1cnJlbnRJdGVtUHJvSWQiLCIkaW5wdXQiLCJxdWFudGl0eU1pbiIsInF1YW50aXR5TWF4IiwicXR5IiwibnVtYmVyc09ubHkiLCJ2YWxpZGF0ZUluY3JlYXNlQWdhaW5zdE1heEJvdW5kYXJ5IiwidmFsaWRhdGVEZWNyZWFzZUFnYWluc3RNaW5Cb3VuZGFyeSIsInByb2R1Y3RPcHRpb25zIiwiY2hlY2tCZWZvcmVBZGQiLCIkYXR0cmlidXRlcyIsImF0dCIsInByb3AiLCJmb2N1cyIsImFyclAiLCJ3aW5kb3ciLCJGb3JtRGF0YSIsInByb2QiLCJmb3JtRGF0YSIsImNhcnQiLCJpdGVtQWRkIiwiZmlsdGVyRW1wdHlGaWxlc0Zyb21Gb3JtIiwiZXJyb3IiLCJwcm9kdWN0c0l0ZW0iLCJwcm9kdWN0SXRlbSIsInF1YW50aXR5RGF0YSIsImFsZXJ0IiwiaGlkZSIsInRoZW1lU2V0dGluZ3MiLCJoYWxvQWRkVG9DYXJ0QWN0aW9uIiwibG9hZGluZ0NsYXNzIiwiJGJvZHkiLCIkY2FydERyb3Bkb3duIiwiJGNhcnRMb2FkaW5nIiwiZ2V0Q29udGVudCIsInF1YW50aXR5IiwidHJpZ2dlciIsInJlZGlyZWN0VG8iLCJ1cmxzIiwiaXNSdW5uaW5nSW5JZnJhbWUiLCJzZWxmIiwidG9wIiwiZSIsInVybCIsImlmcmFtZVNkayIsImxvY2F0aW9uIiwidG90YWwiLCJ0b3RhbFNhbGUiLCJzeW1ib2wiLCJzeW1ib2xDaGFuZ2UiLCJkZWNpbWFsUGxhY2VzIiwiZGVjaW1hbFNlcGFyYXRvciIsInRob3VzYW5kc1NlcGFyYXRvciIsInN5bWJvbExvY2F0aW9uIiwiY3VyciIsInRva2VuMSIsInRva2VuMiIsImRlY2ltYWxfcGxhY2VzIiwiZGVjaW1hbF90b2tlbiIsInRob3VzYW5kc190b2tlbiIsImN1cnJlbmN5X2xvY2F0aW9uIiwiY3VycmVuY3lfdG9rZW4iLCJwcmljZSIsInBhcnNlRmxvYXQiLCJwcmljZVNhbGUiLCJpbmRleE9mIiwiZm9ybWF0TW9uZXkiLCJuIiwiYyIsImQiLCJ0IiwiaXNOYU4iLCJNYXRoIiwiYWJzIiwicyIsIlN0cmluZyIsIk51bWJlciIsInRvRml4ZWQiLCJqIiwic3Vic3RyIiwic2xpY2UiLCJwcm9kdWN0T3B0aW9uc0NoYW5nZWQiLCJ1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzIiwiaXRlbSIsInZhbHVlT3B0aW9ucyIsIl8iLCJvcHRpb25MYWJlbCIsIm9wdGlvblRpdGxlIiwic3BsaXQiLCJyZXF1aXJlZCIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJ0eXBlIiwicXVlcnlTZWxlY3RvciIsImlzU2F0aXNmaWVkIiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsInNlbGVjdCIsInNlbGVjdGVkSW5kZXgiLCJkYXRlU3RyaW5nIiwibWFwIiwieCIsImpvaW4iLCJjaGlsZHJlbiIsImNoZWNrZWQiLCJsYWJlbCIsImxhYmVscyIsInRpdGxlIiwiJGNoYW5nZWRPcHRpb24iLCJwYXJlbnRzIiwicHJvZHVjdEF0dHJpYnV0ZXNEYXRhIiwicHJvZHVjdEF0dHJpYnV0ZXNDb250ZW50IiwiYmVoYXZpb3IiLCJvdXRfb2Zfc3RvY2tfYmVoYXZpb3IiLCJpblN0b2NrSWRzIiwiaW5fc3RvY2tfYXR0cmlidXRlcyIsIm91dE9mU3RvY2tEZWZhdWx0TWVzc2FnZSIsIm91dE9mU3RvY2tNZXNzYWdlIiwib3V0X29mX3N0b2NrX21lc3NhZ2UiLCJhdHRyaWJ1dGUiLCIkYXR0cmlidXRlIiwiYXR0cklkIiwiZW5hYmxlQXR0cmlidXRlIiwiZGlzYWJsZUF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZVR5cGUiLCJkaXNhYmxlU2VsZWN0T3B0aW9uQXR0cmlidXRlIiwiJHNlbGVjdCIsInBhcmVudCIsInRvZ2dsZU9wdGlvbiIsImVuYWJsZVNlbGVjdE9wdGlvbkF0dHJpYnV0ZSIsIiRwYXJlbnQiLCJ2aWV3TW9kZWwiLCJnZXRWaWV3TW9kZWwiLCJzaG93TWVzc2FnZUJveCIsInN0b2NrX21lc3NhZ2UiLCJwdXJjaGFzaW5nX21lc3NhZ2UiLCJPYmplY3QiLCJ1cGRhdGVQcmljZVZpZXciLCJwcm9kdWN0Q2hlY2tib3giLCJwdXJjaGFzYWJsZSIsImluc3RvY2siLCIkcHJpY2VWYWx1ZSIsIiRwcmljZVdpdGhUYXgiLCIkcHJpY2VXaXRob3V0VGF4IiwicnJwV2l0aFRheCIsIiRkaXYiLCIkc3BhbiIsInJycFdpdGhvdXRUYXgiLCJub25TYWxlV2l0aFRheCIsIm5vblNhbGVXaXRob3V0VGF4IiwicHJpY2VTYXZlZCIsInByaWNlTm93TGFiZWwiLCJwcmljZUxhYmVsIiwiJHdlaWdodCIsIiRpbmNyZW1lbnRzIiwiJGFkZFRvQ2FydCIsIiR3aXNobGlzdFZhcmlhdGlvbiIsInN0b2NrIiwiJGNvbnRhaW5lciIsInNrdSIsIiRsYWJlbCIsIiR2YWx1ZSIsInVwYyIsIiR0ZXh0IiwiJGJ1bGtQcmljaW5nIiwiJHdhbGxldEJ1dHRvbnMiLCJtZXNzYWdlIiwiJG1lc3NhZ2VCb3giLCJjbGVhclByaWNpbmdOb3RGb3VuZCIsIndpdGhfdGF4IiwidXBkYXRlZFByaWNlIiwicHJpY2VfcmFuZ2UiLCJtaW4iLCJmb3JtYXR0ZWQiLCJtYXgiLCJ3aXRob3V0X3RheCIsInJycF93aXRoX3RheCIsInJycF93aXRob3V0X3RheCIsInNhdmVkIiwibm9uX3NhbGVfcHJpY2Vfd2l0aF90YXgiLCJub25fc2FsZV9wcmljZV93aXRob3V0X3RheCIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UiLCJfc3RlcCIsImRvbmUiLCJfc3RlcCR2YWx1ZSIsImtleSIsIkZpbGUiLCJzaXplIiwiY29uc29sZSIsImhhbG9BZGRPcHRpb25Gb3JQcm9kdWN0IiwiaGFsb1Byb2R1Y3RJbWFnZUhvdmVyIiwiZ2V0bGlzdEl0ZW1zIiwiJHRoaXMiLCIkd3JhcHBlciIsInN0eWxlIiwiZGlzcGxheSIsImxvYWQiLCJoYW5kbGVJbnRlcnNlY3Rpb24iLCJlbnRyaWVzIiwib2JzZXJ2ZXIiLCJpc0ludGVyc2VjdGluZyIsInVub2JzZXJ2ZSIsImdldFByb2R1Y3QiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImJpbmQiLCJyb290TWFyZ2luIiwib2JzZXJ2ZSIsImxpc3RJdGVtcyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzcGxpY2UiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJkYXRhc2V0IiwibGltaXQiLCJzY3JvbGwiLCJvZmZzZXQiLCJzY3JvbGxUb3AiLCJ3aWR0aCIsImNzcyIsIm91dGVySGVpZ2h0IiwidG9nZ2xlQ2xhc3MiLCJvbmxvYWQiLCJTb3J0YWJsZSIsIlBhZ2VNYW5hZ2VyIiwiUmV2aWV3IiwiY29sbGFwc2libGVGYWN0b3J5IiwiUHJvZHVjdERldGFpbHMiLCJ2aWRlb0dhbGxlcnkiLCJjbGFzc2lmeUZvcm0iLCJtb2RhbEZhY3RvcnkiLCJoYWxvU3dpcGVyUHJvZHVjdEltYWdlIiwiaGFsb0J1bmRsZVByb2R1Y3RzIiwiaGFsb1JlY2VudFZpZXdlZFByb2R1Y3RzIiwiaGFsb1N0aWNreUFkZFRvQ2FydCIsIlByb2R1Y3QiLCJfUGFnZU1hbmFnZXIiLCJfdGhpcyIsImNhbGwiLCJocmVmIiwiJHJldmlld0xpbmsiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCJfdGhpczIiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwicGF0aG5hbWUiLCJ2YWxpZGF0b3IiLCJwcm9kdWN0RGV0YWlscyIsIkJDRGF0YSIsInByb2R1Y3RfYXR0cmlidXRlcyIsImhhbG9fc3RpY2t5QWRkVG9DYXJ0Iiwic2V0UHJvZHVjdFZhcmlhbnQyIiwiYnVsa1ByaWNpbmdIYW5kbGVyIiwidmlkZW9Qb3B1cCIsInNvbGRQcm9kdWN0IiwiY291bnREb3duUHJvZHVjdCIsImNvbXBhcmVDb2xvcnMiLCJhc2tBbkV4cGVydCIsImNoZWNrVGFiQWN0aXZlIiwibWF0Y2hNZWRpYSIsImFkZEV2ZW50TGlzdGVuZXIiLCJpc1JlY2VudFZpZXdlZFByb2R1Y3RzIiwicHJvZFJlY2VudFZpZXdlZCIsInNldFJlY2VudFZpZXdlZFByb2R1Y3RzIiwiJHJldmlld0Zvcm0iLCJyZXZpZXciLCJyZWdpc3RlclZhbGlkYXRpb24iLCJhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJwcm9kdWN0UmV2aWV3SGFuZGxlciIsImlucHV0IiwibXNnU3BhbklkIiwic2libGluZ3MiLCJudW1iZXJzUHJvZHVjdF90ZXh0IiwicHJvZHVjdF9zb2xkUHJvZHVjdF9wcm9kdWN0cyIsIm51bWJlcnNIb3Vyc190ZXh0IiwicHJvZHVjdF9zb2xkUHJvZHVjdF9ob3VycyIsInNvbGRQcm9kdWN0VGV4dCIsInByb2R1Y3Rfc29sZFByb2R1Y3RfdGV4dCIsIm51bWJlcnNQcm9kdWN0TGlzdCIsIm51bWJlcnNQcm9kdWN0SXRlbSIsImZsb29yIiwicmFuZG9tIiwibnVtYmVyc0hvdXJzTGlzdCIsIm51bWJlcnNIb3Vyc0l0ZW0iLCJjb3VudERvd24iLCJjb3VudERvd25EYXRlIiwiRGF0ZSIsImdldFRpbWUiLCJzZWZ0IiwiY291bnRkb3duZnVuY3Rpb24iLCJzZXRJbnRlcnZhbCIsIm5vdyIsImRpc3RhbmNlIiwiY2xlYXJJbnRlcnZhbCIsInJlbW92ZSIsImRheXMiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyQ291bnREb3duIiwiJHN3YXRjaFdyYXBwZXIiLCIkaW1hZ2VXcmFwcGVyIiwiJHRleHRXcmFwcGVyIiwiJGNvbG9yIiwiJGNvbG9yMiIsIiRjb2xvcjMiLCIkaW1nIiwiJHBhdHRlcm4iLCJlbCIsImdldEVsZW1lbnRCeUlkIiwiYW5pbWF0aW9uIiwiaGFsb19hc2tfYW5fZXhwZXJ0X3BhZ2VsaW5rIiwicmVhZHkiLCJnZXRQYWdlIiwidHlwZUNvbnRhY3QiLCJ0eXBlUGFja2FnZSIsImN1c3RvbWVyTWVzc2FnZSIsInJlY2FwdGNoYSIsImFqYXgiLCJzdWNjZXNzIiwidGFiIiwidGFiRmlyc3QiLCJ0YWJDb250ZW50IiwidGFiQ29udGVudEZpcnN0IiwibWF0Y2hlcyIsInJlbW92ZVRhYkFjdGl2ZSIsImNsYXNzTGlzdCIsImFkZCIsInJlbGF0ZWRQcm9kdWN0cyIsInNpbWlsYXJQcm9kdWN0cyIsInJlY2VudGx5Vmlld2VkIiwiZmlsdGVyIiwidW5zaGlmdCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJkZWZhdWx0IiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsIiRzZWxlY3RlZFRodW1iIiwic2V0TWFpblZpZGVvIiwic2V0QWN0aXZlVGh1bWIiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiJGVsIiwiaXNJbml0aWFsaXplZCJdLCJzb3VyY2VSb290IjoiIn0=