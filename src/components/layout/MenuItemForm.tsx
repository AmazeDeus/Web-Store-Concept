import { useEffect, useState, FC, ChangeEvent, FormEvent } from "react";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import { Category, MenuItemFormProps } from "@/app/types/Product";

const MenuItemForm: FC<MenuItemFormProps> = ({ onSubmit, menuItem }) => {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || 0);
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );

  const getIfNotFallback = (value: any, fallback: any) => {
    if (Array.isArray(value) && value.length === 0) {
      return undefined;
    }
    return value !== fallback ? value : undefined;
  };

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((categories: Category[]) => {
        setCategories(categories);
      });
  }, []);

  useEffect(() => {
    if (!category && categories.length > 0) {
      setCategory(categories[0]._id);
    }
  }, [category, categories]);

  return (
    <form
      onSubmit={(ev) => {
        const data = {
          image: getIfNotFallback(image, ""),
          name: getIfNotFallback(name, ""),
          description: getIfNotFallback(description, ""),
          basePrice: getIfNotFallback(basePrice, 0),
          sizes: getIfNotFallback(sizes, []),
          category: getIfNotFallback(category, ""),
          extraIngredientPrices: getIfNotFallback(extraIngredientPrices, []),
        };
        onSubmit(ev, data);
      }}
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} width="512px" height="512px" />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setName(ev.target.value)
            }
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setDescription(ev.target.value)
            }
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(ev: ChangeEvent<HTMLSelectElement>) =>
              setCategory(ev.target.value)
            }
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
          <label>Base price</label>
          <input
            type="number"
            value={basePrice}
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setBasePrice(Number(ev.target.value))
            }
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;
