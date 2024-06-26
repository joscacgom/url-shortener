import React from 'react'
import styles from './styles.module.css'
import { type ButtonProps } from '@/interfaces'

const typeToClassName: Record<ButtonProps['type'], string> = {
  submit: styles.submitButton,
  edit: styles.editButton,
  delete: styles.deleteButton,
  signUp: styles.signupButton,
  login: styles.loginButton,
  copy: styles.copyButton
}

const Button = ({ text, handleClick, type = 'submit' }: ButtonProps): JSX.Element => {
  const onClickHandler = (): void => {
    if (handleClick) {
      handleClick()
    }
  }

  return (
        <button className={`${styles.buttonBase} ${typeToClassName[type]}`} onClick={onClickHandler}>
            {text}
        </button>
  )
}

export default Button
