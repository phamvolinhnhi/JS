//Styled components
import {StyledTextInput, StyledFormArea, StyledFormButton, StyledLabel, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink} 
from './../components/Style';

import Logo from './../assets/shortcuticon.png';


//formik
import {Formik, Form} from 'formik';
import { TextInput } from '../components/FormLib';
import * as Yup from 'yup';

//icons
import {FiMail, FiLock, FiUser, FiCalendar} from 'react-icons/fi';

//Loader
import {ThreeDots} from 'react-loader-spinner';

//auth & redux
import {connect} from 'react-redux';
import {signupUser} from "./../auth/actions/userActions";
import {useNavigate} from "react-router-dom";

const Signup = ({signupUser}) => {
    const history = useNavigate();
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo}/>
                <StyledTitle size={30} color={colors.theme}>
                    Member Signup</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        repeatPassword: "",
                        birthday: "",
                        // name: "",

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
                            // name: Yup.string()
                            //     .required("Required"),
                            repeatPassword: Yup.string()
                                .required("Required")
                                .oneOf([Yup.ref("password")], "Passwords must match"),
                            birthday: Yup.date().required("Required")
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        signupUser(values,history,setFieldError,setSubmitting)
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            {/* <TextInput
                                name="name"
                                type="text"
                                label="Full Name"
                                placeholder="Nguyen Van A"
                                icon={<FiUser/>}
                            /> */}
                             <TextInput
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="cobemuadong123@example.com"
                                icon={<FiMail/>}
                            />
                            <TextInput
                                name="birthday"
                                type="date"
                                label="Date of birth"
                                icon={<FiCalendar/>}
                            />
                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="******"
                                icon={<FiLock/>}
                            />
                             <TextInput
                                name="repeatPassword"
                                type="password"
                                label="Repeat Password"
                                placeholder="******"
                                icon={<FiLock/>}
                            />
                            <ButtonGroup>
                                {!isSubmitting &&<StyledFormButton type="submit">
                                    Signup
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
                    Already have an account? <TextLink to="/login">Login</TextLink>
                </ExtraText>
            </StyledFormArea>
    
        </div>
    )
}

export default connect(null,{signupUser})(Signup);