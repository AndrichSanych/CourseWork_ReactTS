import { Button, Modal } from "antd"
import CategoryView from "../category-view-h"
import { useEffect, useState } from "react";
import CategoriesGrid from "../categories-grid";
import { CategoryModel } from "../../../models/CategoryModel";
import { categoryService } from "../../../services/categoryService";

interface CategorySelectorProps {
    category?: CategoryModel
    onChange?:Function
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ category,onChange = ()=>{} }) => {
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);

    useEffect(() => {
        (async () => {
            var result = await categoryService.getAll();
            if (result.status === 200) {
                setCategories(result.data)
            }
        })()

    }, [])

    const showModal = () => {
        setIsCategoryModalOpen(true);
    };

    const handleClick = (id: number) => {
        setIsCategoryModalOpen(false);
        onChange(categories.find(x => x.id === id))
    };

    const handleClose = () => {
        setIsCategoryModalOpen(false);
    };
    return (
        <>
            <div className={`${category ? '' : 'p-4'} gap-3  rounded-2 d-inline-flex bg-secondary-subtle`}>
                {category ? <CategoryView category={category} /> : <h5>Оберіть категорію</h5>}
                <Button className='fs-6 align-self-center' onClick={showModal} type='link'>Змінити</Button>
            </div>
            <Modal
                centered
                closable
                title={<h4>Категорії</h4>}
                open={isCategoryModalOpen}
                onClose={handleClose}
                onCancel={handleClose}
                width={'80%'}
                okButtonProps={{ hidden: true }} >

                <CategoriesGrid categories={categories} handleClick={handleClick} />
            </Modal>
        </>
    )
}

export default CategorySelector