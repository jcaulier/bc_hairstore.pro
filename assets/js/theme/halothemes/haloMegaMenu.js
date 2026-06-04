import haloSetMegaMenu from './haloSetMegaMenu';
import haloMegaMenuCards from './haloMegaMenu.config';
    window.haloSetMegaMenu = haloSetMegaMenu;

export default function (context) {
	var haloSetMegaMenu = new window.haloSetMegaMenu();
	const globalBlock = document.querySelector('.halo-global-block');
	if (!globalBlock) {
		return;
	}
	const urlStoreHash = globalBlock.getAttribute('data-store-hash-image') || '';
	const themeImageBase = (globalBlock.getAttribute('data-theme-img-base') || '').replace(/loading\.svg$/, '');

	var mega_position1 = context.themeSettings.mega_position1,
		mega_position2 = context.themeSettings.mega_position2,
		mega_position3 = context.themeSettings.mega_position3,
		mega_position4 = context.themeSettings.mega_position4,
		mega_position5 = context.themeSettings.mega_position5,
		mega_position6 = context.themeSettings.mega_position6,
		mega_position7 = context.themeSettings.mega_position7,
		mega_position8 = context.themeSettings.mega_position8,
		mega_position9 = context.themeSettings.mega_position9,
		mega_position10 = context.themeSettings.mega_position10;

	var arr1 = (mega_position1 || '').split(','),
		arr2 = (mega_position2 || '').split(','),
		arr3 = (mega_position3 || '').split(','),
		arr4 = (mega_position4 || '').split(','),
		arr5 = (mega_position5 || '').split(','),
		arr6 = (mega_position6 || '').split(','),
		arr7 = (mega_position7 || '').split(','),
		arr8 = (mega_position8 || '').split(','),
		arr9 = (mega_position9 || '').split(','),
		arr10 = (mega_position10 || '').split(',');

	var megaList = [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10];
	const desktopMedia = window.matchMedia('(min-width: 1025px)');
	const navItemSelector = '.navPages-list-megamenu > li:not(.navPages-item-toggle)';

	function escapeHtml(value) {
		return String(value || '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function getConfiguredMegaMenu(position) {
		return haloMegaMenuCards.find((item) => parseInt(item.position, 10) === position);
	}

	function getMegaMenuImageSrc(image) {
		if (!image) {
			return '';
		}

		if (/^(https?:)?\/\//.test(image)) {
			return image;
		}

		if (image.startsWith('img/')) {
			return `${themeImageBase}${image.replace(/^img\//, '')}`;
		}

		return `${urlStoreHash}${image}`;
	}

	function buildConfiguredMegaMenu(config) {
		if (!config || !Array.isArray(config.items) || !config.items.length) {
			return '';
		}

		const cards = config.items.map((item) => {
			const imageSrc = getMegaMenuImageSrc(item.image);
			const ctaUrl = item.ctaUrl || item.url || '#';
			const title = item.title
				? `<span class="mega-menu-card-title">${escapeHtml(item.title)}</span>`
				: '';
			const cta = item.ctaText
				? `<span class="mega-menu-card-cta">${escapeHtml(item.ctaText)}</span>`
				: '';

			if (!imageSrc) {
				return '';
			}

			return `
				<a class="mega-menu-card" href="${escapeHtml(ctaUrl)}">
					<span class="mega-menu-card-image">
						<img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(item.alt || item.title || '')}" width="300" height="425"/>
					</span>
					${title}
					${cta}
				</a>`;
		}).join('');

		if (!cards) {
			return '';
		}

		return `
			<div class="imageArea mega-menu-card-area">
				<div class="mega-menu-card-grid">
					${cards}
				</div>
			</div>`;
	}

	function getNavItems() {
		return Array.from(document.querySelectorAll(navItemSelector));
	}

	function getNavItemIndex(target) {
		if (!target || !target.parentElement) {
			return 0;
		}

		const parentChildren = Array.from(target.parentElement.children);

		return parentChildren.indexOf(target) + 1;
	}

	function setItemMegaMenu() {
		const navItems = getNavItems();

		// Assure les visuels des mega-menus (desktop) dès le chargement pour éviter une
		// dépendance exclusive au survol qui pouvait empêcher l'affichage selon le contexte.
		if (desktopMedia.matches) {
			navItems.forEach(function (item) {
				if (!item.classList.contains('has-megamenu')) {
					loadMegaMenu(item, getNavItemIndex(item));
				}

				item.addEventListener('mouseover', handleMouseOver);
				item.addEventListener('focusin', handleMouseOver);
				item.addEventListener('mouseout', handleMouseOut);
				item.addEventListener('focusout', handleMouseOut);
			});
		}

		desktopMedia.addEventListener('change', () => {
			if (!desktopMedia.matches) {
				return;
			}

			getNavItems().forEach(function (item) {
				if (!item.classList.contains('has-megamenu')) {
					loadMegaMenu(item, getNavItemIndex(item));
				}

				item.addEventListener('mouseover', handleMouseOver);
				item.addEventListener('focusin', handleMouseOver);
				item.addEventListener('mouseout', handleMouseOut);
				item.addEventListener('focusout', handleMouseOut);
			});
		});
		
		function handleMouseOver(event) {
			const target = event.currentTarget;
			const subMenu = target.querySelector('.navPage-subMenu');
			const numberItem = getNavItemIndex(target);

			if(subMenu) {
				target.classList.add('is-open');
				subMenu.classList.add('is-open');
			
				if (!target.classList.contains('has-megamenu')) {
					loadMegaMenu(target, numberItem);
				}
			}
		}
		
		function handleMouseOut(event) {
			const target = event.currentTarget;
			const subMenu = target.querySelector('.navPage-subMenu');

			if(subMenu) {
				target.classList.remove('is-open');
				subMenu.classList.remove('is-open');
			}
		}		

			const menuSidebar = document.querySelector('#halo-menu-sidebar');
			menuSidebar && menuSidebar.addEventListener('click', function(event) {
	            if (event.target.matches('.navPages-list:not(.navPages-list--user) .navPages-action:not(.no-subMenu)')) {
					event.preventDefault();

	                const target = event.target.closest('li');
	                if (!target) {
	                    return;
	                }
	                const numberItem = getNavItemIndex(target);
	                if (!numberItem) {
	                    return;
	                }

                if (!target.classList.contains('has-megamenu')) {
                    loadMegaMenu(target, numberItem);
                }
            }
        });
	}

	function loadMegaMenu(target, numberItem) {
		if (!target || !target.classList) {
			return;
		}

		const normalizedIndex = parseInt(numberItem, 10) || 0;
		if (!normalizedIndex) {
			return;
		}

		if (desktopMedia.matches) {
			const configuredMegaMenu = getConfiguredMegaMenu(normalizedIndex);
			const configuredMegaMenuHtml = buildConfiguredMegaMenu(configuredMegaMenu);
			if (configuredMegaMenuHtml) {
				target.classList.add('has-image');
				haloSetMegaMenu.menuItem(normalizedIndex).setMegaMenu({
					images: configuredMegaMenuHtml,
					menuClass: configuredMegaMenu.className,
				});

				return;
			}
		}
	
		let mega_image = '';
	
		for (let i = 0; i < megaList.length; i++) {
			const [position, image, link] = megaList[i];
		
			if (parseInt(position, 10) === normalizedIndex) {
				if (image && link) {
					const megaImageSrc = getMegaMenuImageSrc(image);

					mega_image = `
						<div class="imageArea">
							<div class="megamenu-right-item">
								<div class="image d-inline-block">
									<a href="${link}" class="d-block w-100 o-h">
										<img src="${megaImageSrc}" alt="${image}" title="${image}"/>
									</a>
								</div>
							</div>
						</div>`;
		
					target.classList.add('has-image');
				}
		
				if (!image && !link) {
					target.classList.add('no-image');
				}
		
				haloSetMegaMenu.menuItem(position).setMegaMenu({ images: mega_image });
			}
		}
	}

	function megaMenuLabel() {
		const { mega_menu_new_label, mega_menu_new_label_text, mega_menu_hot_label, mega_menu_hot_label_text, mega_menu_sale_label, mega_menu_sale_label_text } = context.themeSettings;
	
		if (mega_menu_new_label && mega_menu_new_label_text) {
			haloSetMegaMenu.menuItem(mega_menu_new_label).setMegaMenu({
				label: mega_menu_new_label_text,
				labelType: "new",
				disabled: true
			});
		}
	
		if (mega_menu_hot_label && mega_menu_hot_label_text) {
			haloSetMegaMenu.menuItem(mega_menu_hot_label).setMegaMenu({
				label: mega_menu_hot_label_text,
				labelType: "hot",
				disabled: true
			});
		}
	
		if (mega_menu_sale_label && mega_menu_sale_label_text) {
			haloSetMegaMenu.menuItem(mega_menu_sale_label).setMegaMenu({
				label: mega_menu_sale_label_text,
				labelType: "sale",
				disabled: true
			});
		}
	}

	megaMenuLabel();

	if (document.readyState === 'complete') {
		setItemMegaMenu();
	} else {
		window.addEventListener('load', setItemMegaMenu);
	}
}
