import React, {ChangeEvent} from 'react';
import {authenticationService} from '@service/Services';


export const LoginComponent: React.FC = () => {

    const [credentials, setCredentials] = React.useState({username:'', password:''});

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {username, password} = Object.assign({}, credentials, {[event.target.name]: event.target.value});
        setCredentials({username,password})
    }

    async function handleSubmit(event: any){
        event.preventDefault();
        const{username, password} = credentials;
        const loggedIn = await authenticationService.login(username, password);
        if(loggedIn){
console.log("logged in!");
        }

    }

    return (
        <div>
            <div className="login">
                <h3>Login</h3>
                <form>
                    <input
                        placeholder="Username"
                        value={credentials.username}
                        name="username"
                        type="text"
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Password"
                        value={credentials.password}
                        name="password"
                        type="password"
                        onChange={handleChange}
                    />
                    <input
                        className="form-submit"
                        value="SUBMIT"
                        type="submit"
                        onClick={handleSubmit}
                    />
                </form>
            </div>
        </div>
    );
};

