import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useState } from 'react'
import { Link } from 'react-router-dom'

const RegForm = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        fio: '',
        phone: '',
        email: ''
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

        const response = await fetch("http://localhost:5000/reg", {
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
            alert(`Успешная регистрация`)
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

                <Form.Group >
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control data-testid="reg-fullname"
                        type="text" placeholder="ФИО" required title='ФИО должно быть не менее 6 символов, кириллица'
                        pattern='[А-Яа-яёЁ\s]+' name='fio' value={formData.fio} onChange={onInputChange} minLength={6} />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control data-testid="reg-phone"
                        type="tel" placeholder="8(xxx)xxx-xx-xx" required title='Телефон может использовать только цифры' pattern='8\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}'
                        name='phone' value={formData.phone} onChange={onInputChange} />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Почта</Form.Label>
                    <Form.Control data-testid="reg-email"
                        type="email" placeholder="Почта" required title='Почта должна быть не менее 6 символов, латиница и цифры'
                        name='email' value={formData.email} onChange={onInputChange} />
                </Form.Group>


                <Button variant="primary" type="submit" data-testid="reg-submit" id='btn'>
                    Создать пользователя
                </Button>

            </Form>
            <Link href="/log">Есть аккаунт? Войти</Link>
        </>
    )
}

export default RegForm;