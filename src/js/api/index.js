const Base_Url = 'http://localhost:3000/api/category';
const MenuApi = {
  async getAllMenuByCategory(category){
    const response = await fetch(`${Base_Url}/${category}/menu`);
    if(!response.ok) alert("메뉴 불러오기 실패")
    return response.json();
  },
  async createMenuName(category,name){
    const response = await fetch(`${Base_Url}/${category}/menu`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name })
    })
    if(!response.ok) alert("저장에 실패");
  },
  async editMenuName(category,name,menuId){
    const response = await fetch(`${Base_Url}/${category}/menu/${menuId}`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name})
    });
    if(!response.ok) alert("수정에 실패");
    return response.json();
  },
  async toggleSoldOutMenu(category,menuId){
    const response = await fetch(`${Base_Url}/${category}/menu/${menuId}/soldout`,{
      method:"PUT",
    });
    if(!response.ok) alert("품절처리 실패");
  },
  async deleteMenu(category,menuId){
    const response = await fetch(`${Base_Url}/${category}/menu/${menuId}`,{
      method:"DELETE",
    });
    if(!response.ok) alert("삭제 실패");
  }
}

export default MenuApi;