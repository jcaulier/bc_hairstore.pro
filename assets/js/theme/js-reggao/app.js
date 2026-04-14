function initTabsIfNeeded() {
    if (document.body.dataset.pageType === 'product') {
        waitForDescriptionReady();
        initPaymentMultiplierChoiceWidget();
        initThumbnailNav();
        initReviewLink();
    }
}

document.addEventListener('DOMContentLoaded', initTabsIfNeeded);
window.addEventListener('pageshow', function(event) {
    console.log('pageshow triggered', event);
    initTabsIfNeeded();
});

// Ancre et ouverture d'onglet lors du clic sur le bouton d'avis
function initReviewLink() {
    const btn = document.getElementById('productReview_link');
    if (!btn) return;
    btn.addEventListener('click', function(e){
      e.preventDefault();

      document.querySelectorAll('ul.tabs li').forEach(li=> li.classList.remove('is-active'));
      const li = document.querySelector('ul.tabs a[href="#tab-reviews"]').closest('li');
      li.classList.add('is-active');

      document.querySelectorAll('.tabs-contents .tab-content')
        .forEach(tc => tc.classList.remove('is-active'));
      document.getElementById('tab-reviews').classList.add('is-active');

      setTimeout(()=> {
        const target = document.getElementById('tab-reviews');
        if (target) target.scrollIntoView({ behavior:'smooth' });
      }, 100);
    });
  }

  //Gestion des descriptions sur les pages produits
function waitForDescriptionReady() {
    const target = document.querySelector('#tab-description');
    if (!target) {
        console.warn('tab-description not found at DOMContentLoaded');
        return;
    }

    const observer = new MutationObserver(() => {
        const items = target.querySelectorAll('ol li');
        if (items.length > 0) {
            console.log('Description items detected by observer');
            clearTimeout(observerTimeout);
            observer.disconnect();
            manageProductDescriptionTabs();
        }
    });

    observer.observe(target, { childList: true, subtree: true });

    const observerTimeout = setTimeout(() => {
        console.warn('MutationObserver timeout, disconnecting');
        observer.disconnect();
    }, 3000);

    const items = target.querySelectorAll('ol li');
    if (items.length > 0) {
        console.log('Description items already present');
        clearTimeout(observerTimeout);
        observer.disconnect();
        manageProductDescriptionTabs();
    }
}




//Gestion des descriptions sur les pages produits
function manageProductDescriptionTabs() {

    console.log("Execution manageProductDescriptionTabs"); 
    // Initial setup
    const $article = $('.productView-description');
    const $descriptionTab = $article.find('#tab-description');
    const $descriptionItems = $descriptionTab.find('ol li');
    const $tabsList = $article.find('ul.tabs');
    const $tabsContents = $article.find('.tabs-contents');


    function nl2br(str) {
        return str
            .replace(/(?:\r\n|\r|\n)/g, '<br>')
            .replace(/(<br\s*\/?>\s*){3,}/g, '<br><br>');
    }

    function cleanHTML(html) {
        const allowedTags = ['P', 'BR', 'STRONG', 'A', 'IMG', 'IFRAME'];
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;

        function traverseAndClean(node) {
            const childNodes = Array.from(node.childNodes);

            childNodes.forEach((child) => {
                if (child.nodeType === 1) {
                    if (child.nodeName === 'H2' || child.nodeName === 'H3') {
                        const strong = document.createElement('strong');
                        while (child.firstChild) {
                            strong.appendChild(child.firstChild);
                        }
                        node.replaceChild(strong, child);
                        traverseAndClean(strong)
                    } else if (!allowedTags.includes(child.nodeName)) {
                        const fragment = document.createDocumentFragment();
                        while (child.firstChild) {
                            fragment.appendChild(child.firstChild);
                        }
                        node.replaceChild(fragment, child);
                    } else {
                        traverseAndClean(child);
                    }
                }
            });
        }

        traverseAndClean(wrapper);
        return wrapper.innerHTML;
    }


    $descriptionItems.each(function () {
        let content = $(this).html();
        content = cleanHTML(content);
        $(this).html(content);
    });
    

    const firstItem = $descriptionItems.first();
    const otherItems = $descriptionItems.slice(1);

    const mobileId = 'tab-description-mobile';

$descriptionTab.html(`
    <div class="toggle-title">
        <a class="toggleLink" data-collapsible href="#${mobileId}" aria-controls="${mobileId}" aria-expanded="true">
            <span class="text">Description</span>
            <span class="icon-plus">&nbsp;</span>
        </a>
    </div>
    <div class="toggle-content is-open" id="${mobileId}" aria-hidden="false">
        ${firstItem.html()}
    </div>
`);

//Gestion des descriptions sur les pages produits
    function createNewTab(index, title, content) {
        const tabId = `tab-custom-${index}`;
        const mobileId = `${tabId}-mobile`;
    
        if (!$(`#${tabId}`).length) {
            const newTab = $(`<li class="tab"><a class="tab-title" href="#${tabId}">${title}</a></li>`);
            $tabsList.append(newTab);
    
            const newTabContent = $(`
                <div class="tab-content b-r-24" id="${tabId}">
                    <div class="toggle-title">
                        <a class="toggleLink" data-collapsible href="#${mobileId}" aria-controls="${mobileId}" aria-expanded="false">
                            <span class="text">${title}</span>
                            <span class="icon-plus">&nbsp;</span>
                        </a>
                    </div>
                    <div class="toggle-content" id="${mobileId}" aria-hidden="true">
                        ${content.html()}
                    </div>
                </div>
            `);
    
            $tabsContents.append(newTabContent);
        }
    }
    

    if (otherItems.length > 0) {
        createNewTab(1, 'Détails', otherItems.eq(0));
    }

    if (otherItems.length > 1) {
        createNewTab(2, 'Nos Conseils', otherItems.eq(1));
    }

    otherItems.slice(2).each(function (index) {
        createNewTab(index + 3, `Vidéo`, $(this));
    });

    $tabsList.append($tabsList.find('a[href="#tab-reviews"]').closest('li'));
    $tabsContents.append($tabsContents.find('#tab-reviews'));

    $article.find('a[href="#tab-warranty"]').closest('li').hide();
    $article.find('#tab-warranty').closest('.tab-content').hide();

    $(document).foundation();

    
}

// Gestion du bloc Alma sur les pages produits
function applyNewPricePaymentMultiplierCalcul() {
    const numberId = 'product_payment_x_label_choice_number';
    const amountId = 'product_payment_x_label_choice_amount';

    const numberEl = document.getElementById(numberId);
    const amountEl = document.getElementById(amountId);
    if (!numberEl || !amountEl) return;

    const nbDivide = parseInt(numberEl.textContent);
    if (!nbDivide) return;

    const priceEl = document.querySelector('[data-product-price-with-tax]');
    if (!priceEl) return;

    let priceStr = priceEl.textContent.trim();
    let cleanedPrice = priceStr.replace(/\s/g, '').replace(',', '.').replace(/[^\d.]/g, '');
    const price = parseFloat(cleanedPrice);
    if (isNaN(price) || price <= 0) return;

    const perPayment = Math.round((price / nbDivide) * 100) / 100;
    const formatted = perPayment.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    });

    amountEl.textContent = formatted;
}

// Gestion du bloc Alma sur les pages produits
function initPaymentMultiplierChoiceWidget() {
    const numberEl = document.getElementById('product_payment_x_label_choice_number');
    if (!numberEl) return;

    applyNewPricePaymentMultiplierCalcul();

    const buttons = document.querySelectorAll('.product_payment_x');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const times = this.textContent.replace('X', '').trim();
            numberEl.textContent = times;

            buttons.forEach(b => b.classList.remove('selected', 'product_payment_x_hover'));
            this.classList.add('selected', 'product_payment_x_hover');

            applyNewPricePaymentMultiplierCalcul();
        });
    });

    const priceEl = document.querySelector('[data-product-price-with-tax]');
    if (priceEl && window.MutationObserver) {
        const observer = new MutationObserver(() => {
            setTimeout(applyNewPricePaymentMultiplierCalcul, 100);
        });
        observer.observe(priceEl, { childList: true, subtree: true });
    }
}

//Fleche de navigation sur les images miniatures des pages produits
function initThumbnailNav() {
    const prevBtn = document.querySelector('.productView-thumb-prev');
    const nextBtn = document.querySelector('.productView-thumb-next');
    const wrapper = document.querySelector('.productView-for .swiper-wrapper');

    if (!prevBtn || !nextBtn || !wrapper) return;

    const thumbnails = wrapper.querySelectorAll('.swiper-slide');
    const threshold = 4;

    if (thumbnails.length <= threshold) {

        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        return;
    }

    wrapper.style.transition = 'transform 0.3s ease';
    wrapper.style.willChange = 'transform';

    let currentX = 0;

    const getPageWidth = () => wrapper.clientWidth;
    const getMaxOffset = () => wrapper.scrollWidth - wrapper.clientWidth;

    prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const step = getPageWidth();
        currentX = Math.min(0, currentX + step);
        requestAnimationFrame(() => {
            wrapper.style.transform = `translateX(${currentX}px)`;
        });
    });

    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const step = getPageWidth();
        const maxOffset = getMaxOffset();
        if (maxOffset <= 0) return;
        currentX = Math.max(-maxOffset, currentX - step);
        requestAnimationFrame(() => {
            wrapper.style.transform = `translateX(${currentX}px)`;
        });
    });
}


//Gestion de la taille des cards si pas connecté
function markCardsRequiringLogin() {
    const pageType = document.body.dataset.pageType;
    const validPages = ['category', 'default'];

    if (!validPages.includes(pageType)) return;

    document.querySelectorAll('.login-price-link').forEach(link => {
        const card = link.closest('article.card');
        if (card) {
            card.classList.add('card--requires-login');
        }
    });
}

document.addEventListener('DOMContentLoaded', markCardsRequiringLogin);
window.addEventListener('pageshow', markCardsRequiringLogin);


// Titre en minuscule + maj au début de chaque mot
document.querySelectorAll('.nav-mega-subitem').forEach(el => {
    el.textContent = el.textContent
      .toLowerCase()
      .replace(/\p{L}+/gu, word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      );
  });
  

  // Gestion du champ SIRET sur la page de création de compte
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('page-type-createaccount')) return;

    const siretInput = document.getElementById('FormField_32_input');
    const form = document.querySelector('form[data-create-account-form]');

    if (!siretInput || !form) return;

    const parentField = siretInput.closest('.form-field');

    const label = parentField.querySelector('label');
    if (label && !label.innerHTML.includes('*')) {
        const labelText = label.textContent.trim().replace(/\s+$/, ''); 
            label.innerHTML = labelText + '<span style="color: #6e6e6e">*</span>';
    }


    function showSiretError() {
        const value = siretInput.value.trim();

        parentField.classList.remove('form-field--error');
        const existingError = parentField.querySelector('.form-inlineMessage');
        if (existingError) existingError.remove();

        if (value === '') {
            parentField.classList.add('form-field--error');

            const errorMessage = document.createElement('span');
            errorMessage.classList.add('form-inlineMessage');
            errorMessage.innerHTML = 'Veuillez saisir un numéro de SIRET.';
            parentField.appendChild(errorMessage);

            return true;
        }

        return false;
    }

    form.addEventListener('submit', function (event) {
        const hasError = showSiretError();
        if (hasError) {
            event.preventDefault();
            siretInput.focus();
        }
    });

    siretInput.addEventListener('blur', function () {
        showSiretError();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('page-type-createaccount')) return;

    const companyInput = document.getElementById('FormField_6_input');
    const form = document.querySelector('form[data-create-account-form]');

    if (!companyInput || !form) return;

    const companyField = companyInput.closest('.form-field');

    // Ajout d’un astérisque au label si absent
    const companyLabel = companyField.querySelector('label');
    if (companyLabel && !companyLabel.innerHTML.includes('*')) {
        const labelText = companyLabel.textContent.trim().replace(/\s+$/, '');
        companyLabel.innerHTML = labelText + '<span style="color: #6e6e6e">*</span>';
    }

    function showCompanyError() {
        const value = companyInput.value.trim();

        companyField.classList.remove('form-field--error');
        const existingError = companyField.querySelector('.form-inlineMessage');
        if (existingError) existingError.remove();

        if (value === '') {
            companyField.classList.add('form-field--error');

            const errorMessage = document.createElement('span');
            errorMessage.classList.add('form-inlineMessage');
            errorMessage.innerHTML = 'Veuillez saisir le nom de l\'entreprise.';
            companyField.appendChild(errorMessage);

            return true;
        }

        return false;
    }

    form.addEventListener('submit', function (event) {
        const hasError = showCompanyError();
        if (hasError) {
            event.preventDefault();
            companyInput.focus();
        }
    });

    companyInput.addEventListener('blur', function () {
        showCompanyError();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const siretField = document.getElementById('FormField_32');
    const companyField = document.getElementById('FormField_6');

    if (siretField && companyField && companyField.parentNode) {
        companyField.parentNode.insertBefore(siretField, companyField.nextSibling);
    }
});


