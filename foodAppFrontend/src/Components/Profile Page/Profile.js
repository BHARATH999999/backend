import React, { useState } from 'react';
import '../Styles/profile.css';
import { useAuth } from '../Context/AuthProvider';
import axios from 'axios';

function Profile() {
    const { user } = useAuth();
    const [password, passwordSet] = useState(user.password)
    const [passwordCnf, passwordCnfSet] = useState(user.password)
    const [email, emailSet] = useState(user.email);
    const [name, nameSet] = useState(user.name);
    // const nameEdit = async () => {
    //     await axios.patch('/api/users/login');
    // }

    const handleClick = async () => {
        try {
            const data = await axios.patch("/api/v1/user",
                {
                    _id: user?._id,
                    email,
                    name,
                    password,
                    confirmPassword: passwordCnf,
                    // pic : "undefined"
                    // role: user.user.role,
                });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(user);
    return (
        <div className="container-grey">

            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>Profile</h1>\
                    <div className="line"></div>
                    <div className="profileImage">
                        <img src={user.profileImage} />
                    </div>
                </div>
                <div className="loginBox">
                    <div className="entryBox">
                        <form action="/api/v1/user/profilepic" method="post" enctype="multipart/form-data">
                            <input type="file" name="avatar" />
                        </form>
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input" type="email" value={email} onChange={(e) => emailSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="text" value={password} onChange={(e) => passwordSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Confirm Password</div>
                        <input className="password input" type="text" value={passwordCnf} onChange={(e) => passwordCnfSet(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Name</div>
                        <input className="password input" type="text" value={name} onChange={(e) => nameSet(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleClick}>
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile
