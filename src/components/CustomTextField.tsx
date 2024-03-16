import { TextField, TextFieldProps, styled } from "@mui/material";

const StyleTextField = styled(TextField)({
  "& .MuiFormHelperText-root": {
    position: "absolute",
    top: "100%",
  },
});
const CustomTextField = (props: TextFieldProps) => {
  return <StyleTextField size="small" {...props} />;
};

export default CustomTextField;
