import axios from 'axios';
import { sessionService } from 'redux-react-session';

const localUrl = "http://localhost:3001/";/// ĐÂY LÀ CODE THÊM NỮA///
const currentUrl = localUrl;

export const loginUser = (credentials, history, setFieldError, setSubmitting) =>  {
    return () => {
//Make checks and get some data
axios.post(`${currentUrl}user/signin`,
credentials,{
    headers: {"Content-Type": "application/json"}
})
    .then((response) => {
        const {data} = response;
        if(data.status === "FAILED") {
            const{message} = data;

            if(message.includes("credentials")){
                setFieldError("email",message);
                setFieldError("password",message);
            } else if (message.includes("password")){
                setFieldError("password", message);
            }
        }else if(data.status === "SUCCESS"){
            const userData = data.data[0];
            const token = userData._id;
            sessionService.saveSession(token).then(() => {
                sessionService.saveUser(userData).then(() =>{
                    history("/dashboard");
                }).catch(err => console.error(err))
            })
            .catch(err => alert(err))
        }

        setSubmitting(false);
    })
    .catch(err => alert(err));
    }
};

export const signupUser = (credentials, history, setFieldError, setSubmitting) => {  
    return (dispatch) => {
    axios.post(`${currentUrl}user/signup`, 
    credentials, 
    {
        headers: {"Content-Type": "application/json"}
    })
    .then((response) => {
        const {data} = response;
        if(data.status === "FAILED") {
            const{message} = data;
            if(message.includes("email")) {
                setFieldError("email", message);
            } else if (message.includes("date")) {
                setFieldError("birthday", message);
            } else if (message.includes("password")) {
                setFieldError("password", message);
            } else if (message.toLowerCase().includes("email")){
                setFieldError("email", message);
            }
            setSubmitting(false);
        }
        else if (data.status === "SUCCESS"){
            const {email, password} = credentials;
            dispatch(loginUser({email,password},history,setFieldError,setSubmitting));
        }
    }).catch(err => console.error(err));
}
};

export const logoutUser = (history) => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        history("/");
    }
}