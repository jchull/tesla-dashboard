import React from 'react';


export const LoginComponent: React.FC = () => {


    function handleChange() {
        console.log("changed login info");
    }

    return (
        <div>
            <div className="login">
                <h3>Login</h3>
                <form>
                    <input
                        placeholder="Username"
                        name="username"
                        type="text"
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />
                    <input
                        className="form-submit"
                        value="SUBMIT"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
};

