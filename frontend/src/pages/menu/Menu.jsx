import { useState, useEffect } from 'react'
import { menuApi } from '../../services/menuApi'
import { typeApi } from '../../services/typeApi'
import MenuList from './MenuList'
import MenuForm from './MenuForm'

function Menu() {
  const [menuList, setMenuList] = useState([])
  const [typeList, setTypeList] = useState([])
  const [editItem, setEditItem] = useState(null) // null = เพิ่มใหม่, มีค่า = กำลังแก้ไขเมนูนั้น

  // fetchMenus
  const fetchMenus = async () => {
    try {
      const data = await menuApi.getAll()
      setMenuList(data)
    } catch (error) {
      console.error('Failed to fetch menus:', error)
    }
  }

  // fetchTypes
  const fetchTypes = async () => {
    try {
      const data = await typeApi.getAll()
      setTypeList(data)
    } catch (error) {
      console.error('Failed to fetch types:', error)
    }
  }

  // load menuList typeList
  useEffect(() => {
    const fetchData = async () => {
      await fetchMenus()
      await fetchTypes()
    }
    fetchData()
  }, [])

  // delete menu
  const deleteMenu = async (id) => {
    try {
      await menuApi.delete(id)
      setMenuList((menuList) => menuList.filter((menu) => menu.menuId !== id))
    } catch (error) {
      console.error('Failed to delete menu:', error)
    }
  }

  // add menu
  const addMenu = async (newMenu) => {
    try {
      await menuApi.create(newMenu)
      await fetchMenus()
    } catch (error) {
      console.error('Failed to add menu:', error)
    }
  }

  // update menu
  const updateMenu = async (id, data) => {
    try {
      await menuApi.update(id, data)
      setEditItem(null)
      await fetchMenus()
    } catch (error) {
      console.error('Failed to update menu:', error)
    }
  }

  return (
    <>
      <h2>Our Menu</h2>
      <MenuList menuList={menuList} deleteMenu={deleteMenu} editMenu={setEditItem} />
      <MenuForm
        key={editItem ? editItem.menuId : 'new'}
        typeList={typeList}
        editItem={editItem}
        addMenu={addMenu}
        updateMenu={updateMenu}
        cancelEdit={() => setEditItem(null)}
      />
    </>
  )
}

export default Menu
