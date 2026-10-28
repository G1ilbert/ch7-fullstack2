import { useState } from 'react'

const emptyInputs = { name: '', price: '', isBestSeller: 'true', typeId: '' }

const MenuForm = ({ typeList, editItem, addMenu, updateMenu, cancelEdit }) => {
  // โหมดแก้ไข → เริ่มจากค่าเดิมของเมนูนั้น
  const [inputs, setInputs] = useState(
    editItem
      ? {
          name: editItem.name,
          price: String(editItem.price),
          isBestSeller: String(editItem.isBestSeller),
          typeId: editItem.typeId ?? '',
        }
      : emptyInputs
  )

  function handleChange(e) {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: inputs.name,
      price: Number(inputs.price),
      isBestSeller: inputs.isBestSeller === 'true',
      typeId: inputs.typeId === '' ? null : Number(inputs.typeId),
    }
    if (editItem) {
      await updateMenu(editItem.menuId, data)
    } else {
      await addMenu(data)
    }
    setInputs(emptyInputs)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editItem ? `Edit Food: ${editItem.name}` : 'New Food'}</h3>
      <label>
        name : <input type="text" name="name" value={inputs.name} onChange={handleChange} />
      </label>
      <label>
        price : <input type="number" name="price" value={inputs.price} onChange={handleChange} />
      </label>
      <label>
        type :{' '}
        <select name="typeId" value={inputs.typeId} onChange={handleChange}>
          <option value="">-- เลือกประเภท --</option>
          {typeList.map((t) => (
            <option key={t.typeId} value={t.typeId}>{t.name}</option>
          ))}
        </select>
      </label>
      <label>
        Best Seller :{' '}
        <select name="isBestSeller" value={inputs.isBestSeller} onChange={handleChange}>
          <option value="true">BestSeller</option>
          <option value="false">Normal</option>
        </select>
      </label>
      <button type="submit" disabled={inputs.name.trim() === '' || inputs.price === ''}>
        {editItem ? 'Save' : 'Add menu'}
      </button>
      {editItem && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  )
}

export default MenuForm
