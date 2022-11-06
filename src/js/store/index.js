const storage = {
    setStorageItem(menu){
      localStorage.setItem("menu",JSON.stringify(menu));
    },
    getStorageItem(){
      return JSON.parse(localStorage.getItem("menu"));
    }
};

export default storage;