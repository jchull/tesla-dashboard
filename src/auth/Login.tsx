import React, {ChangeEvent} from 'react';
import {AuthenticationService} from '@service/AuthenticationService';


export const LoginComponent: React.FC = () => {

    const [credentials, setCredentials] = React.useState({username:'', password:''});
    const authService = new AuthenticationService();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {username, password} = Object.assign({}, credentials, {[event.target.name]: event.target.value});
        setCredentials({username,password})
    }

    async function handleSubmit(event: any){
        event.preventDefault();
        const{username, password} = credentials;
        await authService.login(username, password);

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

