import s from './FormReg.module.css'
import React, { useState } from 'react'
import validator from 'validator'

const FormReg = props => {

    let validName, validEmail, validNum, mainValid = false

    const [isDrop, setIsDrop] = useState(false)
    
    const langs = ['Русский', 'Английский', 'Китайский', 'Испанский']

    const choose = e => {
        const lang = document.querySelector('#langId')
        lang.innerHTML = e.target.innerHTML
        setIsDrop(!isDrop)
    }

    const toggleDropdown = () => {
        const lang = document.querySelector('#langId')
        if (!isDrop) {
            lang.classList.add(s.text)
        } else {
            lang.classList.remove(s.text)
        }
        setIsDrop(!isDrop)
    }

    const validateName = () => {
        const input = document.querySelector('#name')
        const error = document.querySelector('#nameError')
        let str = input.value
        for(let i = 0; i < str.length; i++) {
            if(!/[a-zA-Zа-яА-Я]|-|\s/.test(str[i])) {
                validName = false
                if (!validName) {
                    error.classList.add(s.visible)
                }
                validateBTN()
                return false
            }
        }
        validName = true
        if (validName) {
            error.classList.remove(s.visible)
        }
        validateBTN()

    }

    const validateEmail = () => {
        const input = document.querySelector('#email')
        const error = document.querySelector('#emailError')
        validEmail = validator.isEmail(input.value)
        if (validEmail) {
            error.classList.remove(s.visible)
        } else {
            error.classList.add(s.visible)
        }
        validateBTN()

    }

    const validateNumber = () => {
        const input = document.querySelector('#num')
        const error = document.querySelector('#numError')
        validNum = validator.isMobilePhone(input.value, ['ru-RU'])
        if (validNum) {
            error.classList.remove(s.visible)
        } else {
            error.classList.add(s.visible)
        }
        validateBTN()
    }

    const validateBTN = () => {
        mainValid = !!validEmail && !!validName && !!validNum
        const btn = document.querySelector('#btn')
        if (mainValid) {
            btn.removeAttribute('disabled')
        } else {
            btn.setAttribute('disabled', 'true')
        }
        console.log(mainValid);
    }

    return (
    <div className={s.form}>
        <h1 className={s.form__title}>Регистрация</h1>
        <div className={s.login}>
            <p className={s.login__que}>Уже есть аккаунт?</p> <a className={s.login__link} href='#'>Войти</a>
        </div>
        <div className={s.nameInput}>
            <label className={s.labelText}>Имя</label>
            <div className={s.inputBorder}>
                <input id='name' onChange={validateName} className={s.input} placeholder='Введите Ваше имя'/>
            </div>
            <div id='nameError' className={s.error}>Введено не корректное значение</div>
        </div>
        <div className={s.emailInput}>
            <label className={s.labelText}>Еmail</label>
            <div className={s.inputBorder}>
                <input id='email' onChange={validateEmail} className={s.input} placeholder='Введите ваш email'/>
            </div>
            <div id='emailError' className={s.error}>Введено не корректное значение</div>
        </div>
        <div className={s.numberInput}>
            <label className={s.labelText}>Номер телефона</label>
            <div className={s.inputBorder}>
                <input id='num' onChange={validateNumber} className={s.input} placeholder='Введите номер телефона'/>
            </div>
            <div id='numError' className={s.error}>Введено не корректное значение</div>
        </div>
        <div className={s.langInput}>
            <p className={s.labelText}>Язык</p>
            <label htmlFor='dropdown' className={s.inputBorder + ' ' + s.dropdown}>
                <label id='langId' className={s.dropdown__text}>Язык</label>
                <button id='dropdown' onClick={toggleDropdown} className={s.dropdown__btn}></button>
            </label>
            {isDrop ?
            <div id='dropdownLang' className={s.dropPostition}>
                <div className={s.inputBorder + ' ' + s.chLang}>
                    {langs.map((lang) => {
                        return (
                            <div onClick={choose} className={s.lang}>
                                {lang}
                            </div>
                        )
                    })}
                </div>
            </div> 
        :null}
        </div>
        <div className={s.checkBoxInput}>
            <input type='checkbox' id='checkbox' className={s.checkBox}/>
            <label className={s.checkBox__text} htmlFor='checkbox'><span>Принимаю <a href='#' className={s.checkBox__link}>условия</a> использования</span></label>
        </div>
        <div className={s.reg}>
            <button disabled id='btn' className={s.regBtn}>Зарегистрироваться</button>
        </div>
    </div>
    )
}

export default FormReg