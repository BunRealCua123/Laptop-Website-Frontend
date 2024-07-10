import './inputform.css';
import Input from 'antd/es/input/Input';
function InputForm({ placeholder = 'nhập text', type, onChange1, value, ...rests }) {
    // const { placeholder = 'Nhập text' } = props
    const handleOnchangeInput = (e) => {
        onChange1(e.target.value);
    };

    return (
        <Input
            className="inputForm"
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={handleOnchangeInput}
            {...rests}
        />
    );
}

export default InputForm;
