import React, { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { TextField } from '@mui/material';
import { CustomButton as Button } from '../../components/Button';
import { Container } from './style';

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register: React.FC = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const validateName = (name: string): string => {
        if (!name) {
            return 'Name is required';
        }
        return '';
    };

    const validateEmail = (email: string): string => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'Email is required';
        } else if (!regex.test(email)) {
            return 'Enter a valid email';
        }
        return '';
    };

    const validatePassword = (password: string): string => {
        if (!password) {
            return 'password is required';
        } else if (password.length < 4) {
            return 'password must be at least 4 characters long';
        }
        return '';
    };

    const validateConfirmPassword = (password: string, confirmPassword: string): string => {
        if (!confirmPassword) {
            return 'confirm password is required';
        } else if (password !== confirmPassword) {
            return 'passwords do not match';
        }
        return '';
    };

    const handleChange = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>): void => {
        setFormValues({ ...formValues, [field]: event.target.value });
    };

    const handleBlur = (field: keyof FormValues) => (event: FocusEvent<HTMLInputElement>): void => {
        let error = '';

        switch (field) {
            case 'name':
                error = validateName(formValues.name);
                break;
            case 'email':
                error = validateEmail(formValues.email);
                break;
            case 'password':
                error = validatePassword(formValues.password);
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(formValues.password, formValues.confirmPassword);
                break;
            default:
                break;
        }

        setFormErrors({ ...formErrors, [field]: error });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const nameError = validateName(formValues.name);
        const emailError = validateEmail(formValues.email);
        const passwordError = validatePassword(formValues.password);
        const confirmPasswordError = validateConfirmPassword(formValues.password, formValues.confirmPassword);

        if (nameError || emailError || passwordError || confirmPasswordError) {
            setFormErrors({
                name: nameError,
                email: emailError,
                password: passwordError,
                confirmPassword: confirmPasswordError,
            });
        } else {
            console.log('Form submitted successfully');
        }
    };

    const isFormInvalid = (): boolean => {
        return (
            Object.values(formErrors).some((error) => error !== '') ||
            Object.values(formValues).some((value) => value === '')
        );
    };

    return (
        <Container>
            <h3>register</h3>
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <TextField
                        label="name"
                        type="text"
                        color="secondary"
                        className="input nameInput"
                        value={formValues.name}
                        onChange={handleChange('name')}
                        onBlur={handleBlur('name')}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="email"
                        type="email"
                        className="input emailInput"
                        value={formValues.email}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="password"
                        type="password"
                        className="input passwordInput"
                        value={formValues.password}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="confirm your password"
                        type="password"
                        className="input confirmPasswordInput"
                        value={formValues.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                        required
                        fullWidth
                        margin="normal"
                    />
                </div>
                <Button disabled={isFormInvalid()} className="btnSubmit" type="submit" variant="outlined" color="secondary" fullWidth>
                    register
                </Button>
            </form>
        </Container>
    );
};