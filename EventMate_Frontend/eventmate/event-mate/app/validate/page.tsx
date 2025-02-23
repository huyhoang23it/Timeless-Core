"use client";

import React, { useState } from "react";  
import validator from "validator";  

const App = () => {  
    const [emailError, setEmailError] = useState("");  

    // Update the parameter's type for TypeScript  
    const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {  
        const email = e.target.value;  

        if (validator.isEmail(email)) {  
            setEmailError("Valid Email :)");  
        } else {  
            setEmailError("Enter valid Email!");  
        }
        
    };  

    return (  
        <div  
            style={{  
                margin: "auto",  
                marginLeft: "300px"  
            }}  
        >  
            <pre>  
                <h2>Validating Email in ReactJS</h2>  
                <span>Enter Email: </span>  
                <input  
                    type="text"  
                    id="userEmail"  
                    onChange={validateEmail} // No need for an arrow function here  
                ></input>{" "}  
                <br />  
                <span  
                    style={{  
                        fontWeight: "bold",  
                        color: "red"  
                    }}  
                >  
                    {emailError}  
                </span>  
            </pre>  
        </div>  
    );  
};  

export default App;