// PasswordInput.js
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
    id,
    label,
    value,
    onChange,
    onFocus,
    showPassword,
    setShowPassword,
    isPasswordValid = true,
    validationMessage = "",
    className = "",
}) => {
    return (
        <div className={`block col-span-2 relative ${className}`}>
            <label htmlFor={id} className="block">{label}</label>
            <input
                type={showPassword ? "text" : "password"}
                id={id}
                value={value}
                required
                onChange={onChange}
                onFocus={onFocus}
                placeholder="• • • • • • • •"
                className="w-full border-2 rounded-[3px] p-2 mt-[3px] border-main outline-none"
            />
            <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-[42px] right-2 cursor-pointer"
            >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
            {!isPasswordValid && (
                <div className="mt-2 text-red-500 text-xs">
                    {validationMessage}
                </div>
            )}
        </div>
    );
};

export default PasswordInput;
