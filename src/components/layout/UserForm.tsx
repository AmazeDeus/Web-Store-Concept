import { useState, FC, ChangeEvent } from "react";
import AddressInputs from "@/components/layout/AddressInput";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "@/components/UseProfile";
import { StreetAddress, UserFormProps } from "@/app/types/User";

const UserForm: FC<UserFormProps> = ({ user, onSave, ownProfile = false }) => {
  const [userName, setUserName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [image, setImage] = useState<string>(user?.image || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState<StreetAddress>(
    user?.streetAddress
      ? user.streetAddress
      : { streetName: "", houseNumber: "", stairwell: "", apartment: "" }
  );
  const [postalCode, setPostalCode] = useState<string>(user?.postalCode || "");
  const [city, setCity] = useState<string>(user?.city || "");
  const [admin, setAdmin] = useState<boolean>(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(
    propName: string,
    value: string,
    name?: string | StreetAddress
  ) {
    if (propName === "phone") setPhone(value as string);
    if (propName === "email") setEmail(value as string);
    if (propName === "streetAddress" && typeof name === "string") {
      setStreetAddress((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (propName === "postalCode") setPostalCode(value as string);
    if (propName === "city") setCity(value as string);
  }
  console.log(streetAddress);
  return (
    <div className="flex gap-4 form-wrapper">
      <div className="basis-1/4">
        <div className="p-2 rounded-lg relative max-w-[140px]">
          <EditableImage link={image} setLink={setImage} width="512px" height="512px" />
        </div>
      </div>
      <form
        className="grow md:mr-[15%] px-6"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            admin,
            streetAddress,
            city,
            postalCode,
            email,
          })
        }
      >
        <label>First and last name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setUserName(ev.target.value)
          }
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user?.email}
          placeholder={"email"}
        />
        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city }}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData?.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                  setAdmin(ev.target.checked)
                }
                disabled={ownProfile}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
