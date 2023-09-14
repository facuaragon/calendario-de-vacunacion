"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import EyeOnIcon from "../icons/Eye-On";
import EyeOffIcon from "../icons/Eye-Off";
export default function InputField({
  label,
  name,
  type,
  value,
  error,
  handleChange,
}) {
  const [visible, setVisible] = useState(false);
  const handleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{label}:</label>
        <div className={styles.group}>
          {type === "date" ? (
            <>
              <input
                className={styles.input}
                id={name}
                name={name}
                // placeholder={label}
                type={
                  type === "password" ? (visible ? "text" : "password") : type
                }
                value={value}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
              />
            </>
          ) : type === "file" ? (
            <>
              <input
                className={styles.input}
                id={name}
                name={name}
                // placeholder={label}
                type={
                  type === "password" ? (visible ? "text" : "password") : type
                }
                // value={value}
                onChange={handleChange}
                accept="image/*"
              />
            </>
          ) : (
            <>
              <input
                className={styles.input}
                id={name}
                name={name}
                // placeholder={label}
                type={
                  type === "password" ? (visible ? "text" : "password") : type
                }
                value={value}
                onChange={handleChange}
              />
              {type === "password" && (
                <div className={styles.icon} onClick={handleVisibility}>
                  {value ? (
                    visible ? (
                      <EyeOnIcon width={15} height={15} color={"#000"} />
                    ) : (
                      <EyeOffIcon width={15} height={15} color={"#000"} />
                    )
                  ) : null}
                </div>
              )}
            </>
          )}
        </div>
        <span className={styles.error}>{error}</span>
      </div>
    </>
  );
}
