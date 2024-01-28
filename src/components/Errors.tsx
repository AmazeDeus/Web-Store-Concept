import { FC, useState, useEffect } from "react";
import { useCart } from "./AppContext";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";

const Errors: FC = () => {
  const { setError, error } = useCart();
  const [close, setClose] = useState<boolean>(false);

  useEffect(() => {
    if (close) {
      setTimeout(() => {
        setError(null);
        setClose(false);
      }, 1600);
    }
  }, [close, error]);

  /* useEffect(() => {
    if (close && !error) {
      setClose(false)
    }
  }, [error]); */

  const clickHandler = () => {
    if (error) {
      setClose(true);
    }
  };

  let content = <></>;

  if (error) {
    content = (
      <div className={`${close ? "minimize" : ""} errmsg-collection`}>
        {!close && (
          <span>
            <IoMdClose onClick={clickHandler} />
          </span>
        )}
        {Object.entries(error).map(([field, errors], index) => (
          <div key={index} className="text-center errmsg-wrapper">
            <div className="errmsg">
              <header className="errmsg-i">Errors for {field}:</header>
              {Array.isArray(errors) ? (
                errors.map((err, i) => (
                  <div key={i} className="errmsg-i">
                    {err}
                  </div>
                ))
              ) : (
                <div>{errors}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return content;
};

export default Errors;
