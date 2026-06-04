export default class haloSetMegaMenu{
    constructor() {}

    menuItem(num) {
        return {
            setMegaMenu(param) {
                param = Object.assign({
                    disabled: false,
                    label: '',
                    labelType: '',
                    images: '',
                    menuClass: ''
                }, param);

                const scope = document.querySelector(`.navPages-list:not(.navPages-list--user) > li:nth-child(${num})`);
                if (!scope) {
                    return this;
                }

                if (!scope.classList.contains('navPages-item-toggle')) {
                    const subMegaMenu = scope.querySelector('.container');
                    const navPageSubMenu = scope.querySelector('.navPage-subMenu');

                    if (!param.disabled) {
                        if (!subMegaMenu || !navPageSubMenu) {
                            return this;
                        }

                        scope.classList.add('has-megamenu');
                        navPageSubMenu.classList.remove('navPage-subMenu-horizontal');

                        if (param.menuClass) {
                            param.menuClass.split(' ').forEach((className) => {
                                if (className) {
                                    navPageSubMenu.classList.add(className);
                                }
                            });
                        }

                        if (!subMegaMenu.querySelector('.imageArea')) {
                            subMegaMenu.insertAdjacentHTML('beforeend', param.images);
                        }

                        subMegaMenu.classList.add('haloCustomScrollbar');
                    } else {
                        const navPagesAction = scope.querySelector('.navPages-action');
                        const navPagesActionText = navPagesAction && navPagesAction.querySelector('.text');
                        if (!navPagesActionText) {
                            return this;
                        }

                        if (param.labelType === 'new') {
                            navPagesActionText.insertAdjacentHTML('beforeend', `<span class="navPages-label new-label">${param.label}</span>`);
                        } else if (param.labelType === 'sale') {
                            navPagesActionText.insertAdjacentHTML('beforeend', `<span class="navPages-label sale-label">${param.label}</span>`);
                        } else if (param.labelType === 'hot') {
                            navPagesActionText.insertAdjacentHTML('beforeend', `<span class="navPages-label hot-label">${param.label}</span>`);
                        }
                    }
                }

                return this;
            }
        };
    }
}
