import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import { useState } from 'react'
import { Link } from 'react-router-dom'

const LogForm = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/log", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),

        });

        const data = await response.json()
        if (!response.ok) {
            alert(data.message)
        } else {
            alert(`Успешно`)
        }
    }

    return (
        <>
            <Form onSubmit={onFormSubmit}>
                <Form.Group >
                    <Form.Label>Логин</Form.Label>
                    <Form.Control data-testid="reg-login"
                        type="text" placeholder="Логин" required title='Логин должен быть не менее 6 символов, латиница и цифры'
                        pattern='[A-Za-z0-9]{6,}' name='login' value={formData.login} onChange={onInputChange} />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control data-testid="reg-password"
                        type="password" placeholder="Пароль" required title='Пароль должен быть не менее 8 символов, латиница и цифры'
                        pattern='[A-Za-z0-9]+' name='password' value={formData.password} onChange={onInputChange} minLength={6} />
                </Form.Group>


                <Button variant="primary" type="submit" data-testid="reg-submit" id='btn'>
                    Войти
                </Button>

            </Form>
            <Link to="/">Еще не зарегистрированы? Регистрация</Link>
        </>
    )
}

export default LogForm;