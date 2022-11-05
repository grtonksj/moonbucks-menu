const $form = document.querySelector("#espresso-menu-form");
const $list = document.querySelector("#espresso-menu-list");
const $input = document.querySelector("#espresso-menu-name");
const $count = document.querySelector(".menu-count");
const $button = document.querySelector("#espresso-menu-submit-button");

const menuItemTemplate = (menuName) => {
    return `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuName}</span>
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
}

const addMenuName = () => {
    if($input.value){
        $list.insertAdjacentHTML("beforeend",menuItemTemplate($input.value));
        $input.value = '';
    }
    else alert("값을 입력해주세요.");

    updateMenuCount();
}

const updateMenuCount = () => {
    $count.innerText = `총 ${$list.querySelectorAll('li').length} 개`;
}

const removeItem = (e) => {
    e.target.closest('li').remove();
    updateMenuCount();
}

const updateMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('span');
    const updatedMenuName = (prompt('수정하세요', $menuName.innerText));
    $menuName.innerText = updatedMenuName;
}

function App(){
    $form.addEventListener('submit', e => {
        e.preventDefault();
        addMenuName();
    });

    $button.addEventListener('click', addMenuName);

    $list.addEventListener("click", e => {
        if(e.target.classList.contains('menu-edit-button')) updateMenuName(e);
        if(e.target.classList.contains('menu-remove-button')) removeItem(e);
    })
}

App();

