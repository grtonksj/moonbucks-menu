import storage from "./store/index.js";

export default function App($app){

const $form = $app.querySelector("#menu-form");
const $list = $app.querySelector("#menu-list");
const $input = $app.querySelector("#menu-name");
const $count = $app.querySelector(".menu-count");
const $nav = $app.querySelector("nav");
const $title = $app.querySelector('#category-title');

  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: []
  };
  this.currentCategory = 'espresso';
  this.init = () => {
    if(storage.getStorageItem())
      this.menu = storage.getStorageItem();
    render();
    initEventListeners();
  }

    const render = () => {
      const template = this.menu[this.currentCategory].map((item,index) => {
        return `
        <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${item.soldOut ? 'sold-out' : ''}">${item.name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
        </li>`
      }).join('');
      $list.innerHTML = template;

      $count.innerText = `총 ${this.menu[this.currentCategory].length} 개`;
    };
    
  const addMenuName = () => {
      if($input.value){
        this.menu[this.currentCategory].push({ name:$input.value });
        storage.setStorageItem(this.menu);
        render();
        $input.value = '';
      }
      else alert("값을 입력해주세요.");
  };

  const removeItem = (e) => {
    if(confirm("삭제하시겠습니까?")){
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu[this.currentCategory].splice(menuId,1);
      storage.setStorageItem(this.menu);
      render();
    }
  };

  const updateMenuName = (e) => {
      const menuId = e.target.closest('li').dataset.menuId;
      const $menuName = e.target.closest('li').querySelector('.menu-name');
      const updatedMenuName = (prompt('수정하세요', $menuName.innerText));
      this.menu[this.currentCategory][menuId].name = updatedMenuName;
      storage.setStorageItem(this.menu);
      render();
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest('li').dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut = !this.menu[this.currentCategory][menuId].soldOut;
    storage.setStorageItem(this.menu);
    render();
  }

  const initEventListeners = () => {
    $form.addEventListener('submit', e => {
      e.preventDefault();
      addMenuName();
    });
  
    $list.addEventListener("click", e => {
        if(e.target.classList.contains('menu-edit-button')) updateMenuName(e);
        else if(e.target.classList.contains('menu-remove-button')) removeItem(e);
        else if(e.target.classList.contains('menu-sold-out-button')) soldOutMenu(e);
    });
  
    $nav.addEventListener("click", (e) => {
      const isCategoryName = e.target.classList.contains('cafe-category-name');
      if(isCategoryName){
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $title.innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
    });
  }
}
