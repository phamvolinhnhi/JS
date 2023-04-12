import {StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup, StyledFormArea, colors, ExtraText} 
from "./../components/Style";

//Logo
import Logo from "./../assets/shortcuticon.png";


//React router
import { useNavigate, useParams } from "react-router-dom";

const EmailSent = () => {
    const history = useNavigate();
    const {userEmail} = useParams();
    return (
        <div>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "transparent",
                width: "100%",
                padding: "15px",
                display: "flex",
                justifyContent: "flex-start"
            }}>
                <Avatar image={Logo}/>
            </div>
            <StyledFormArea bg={colors.dark2}>
                <StyledTitle size={65}>
                    Account Confirmation
                </StyledTitle>
                <ExtraText color={colors.light1}>
                    An email with your account confirmation link has been sent to your email:
                    <b style={{color: colors.primary}}>{userEmail}</b>
                </ExtraText>
                <ExtraText color={colors.light1}>
                    Check your email and come back to proceed! 
                </ExtraText>
                <ButtonGroup>
                <StyledButton to={`/login/${userEmail}`} >Proceed</StyledButton>
                </ButtonGroup>
            </StyledFormArea>
           
        </div>
    );
};


export default EmailSent;