const MenuList = ({ menuList, deleteMenu, editMenu }) => {
  return (
    <ul>
      {menuList.map((item) => (
        <li key={item.menuId} style={{ margin: '4px 0' }}>
          {item.name} - {item.price} baht {item.isBestSeller && '🏅'}
          {' '}[{item.type == null ? ' - ' : item.type.name}]
          <button onClick={() => editMenu(item)}>Edit</button>
          <button onClick={() => deleteMenu(item.menuId)}>Del</button>
        </li>
      ))}
    </ul>
  )
}

export default MenuList
