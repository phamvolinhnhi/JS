//Styled components
import {StyledTextInput, StyledFormArea, StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink} 
from './../components/Style';

import Logo from './../assets/shortcuticon.png';


//formik
import {Formik, Form} from 'formik';
import { TextInput } from '../components/FormLib';
import * as Yup from 'yup';

//icons
import {FiMail, FiLock} from 'react-icons/fi';

//Loader
import {ThreeDots} from 'react-loader-spinner';

//auth & redux
import {connect} from 'react-redux';
import {loginUser} from "./../auth/actions/userActions";
import {useNavigate, useParams} from "react-router-dom";

const Login = ({loginUser}) => {
    const history = useNavigate();
    const {userEmail} = useParams();
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo}/>
                <StyledTitle size={30} color={colors.theme}>
                    Member Login</StyledTitle>
                <Formik
                    initialValues={{
                        email: userEmail,
                        password: "",
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string()
                                .email("Invalid email address!")
                                .required("Required"),
                            password: Yup.string()
                                .min(6, "Password is too short")
                                .max(30, "Password is too long")
                                .required("Required"),
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        console.log(values);
                        loginUser(values, history, setFieldError, setSubmitting)
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="olga1@example.com"
                                icon={<FiMail/>}
                            />
                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="******"
                                icon={<FiLock/>}
                            />
                            <ButtonGroup>
                                {!isSubmitting &&<StyledFormButton type="submit">
                                    Login
                                </StyledFormButton>}
                                {isSubmitting && (
                                    <ThreeDots
                                        color={colors.theme}
                                        height={49}
                                        width={100}
                                    />
                                )}
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                    New here? <TextLink to="/signup">Signup</TextLink>
                </ExtraText>
            </StyledFormArea>
    
        </div>
    )
}

export default connect(null,{loginUser})(Login);