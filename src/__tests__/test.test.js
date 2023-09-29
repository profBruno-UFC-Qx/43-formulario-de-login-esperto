const fs = require('fs');
import {screen, fireEvent} from '@testing-library/dom'

beforeEach(() => {
  const fileContent = fs.readFileSync('src/index.html', 'utf8');
  const cssContent = fs.readFileSync('src/css/estilo.css', 'utf-8')
  

  const style = document.createElement("style")
  style.innerHTML = cssContent

  
  document.head.appendChild(style)

  document.body.innerHTML = fileContent
  
  const jsContent = fs.readFileSync('src/js/script.js', 'utf-8')
  const f = new Function('', `${jsContent}`)
  f()

});

afterEach(() => {
  // cleanup on exiting
   document.body.innerHTML = ""
   document.head.innerHTML = ""
});



test('O campo para o nome do usuário existe', () => {
  const emailInput = screen.getByRole("textbox");
  expect(emailInput).toBeDefined()
})

test('O campo para a senha do usuário existe', () => {
  const passwordInput = document.querySelector("[type='password']");
  expect(passwordInput).toBeDefined()
})

test('O botão de submit existe', () => {
  const button = document.querySelector("[type='submit']");
  expect(button).toBeDefined()
})

test('O campo para o nome do usuário deve ser obrigatorio', () => {
  const emailInput = screen.getByRole("textbox");
  expect(emailInput.required).toBe(true)
})

test('O campo para a senha do usuário deve ser obrigatório', () => {
  const passwordInput = document.querySelector("[type='password']");
  expect(passwordInput.required).toBe(true)
})

test('O login do usuário deve ser um email válido', () => {
  const emailInput = screen.getByRole("textbox");
  expect(emailInput.type).toBe("email")
})

test('O tamanho mínino da senha deve ser de 6 caracteres', () => {
  const passwordInput = document.querySelector("[type='password']");
  expect(passwordInput.minLength).toBe(6)
})

test('O botão de submit deve estar inicialmente desabilitado', () => {
  const button = document.querySelector("[type='submit']");
  expect(button.disabled).toBeDefined()
})

test('Ao preencher ambos os campos, o botão de submit deve ser ativado', () => {
  const emailInput = screen.getByRole("textbox");
  const passwordInput = document.querySelector("[type='password']");
  const button = document.querySelector("[type='submit']");

  fireEvent.input(emailInput, { target: { value: 'brunomateus@mail.com'}})
  expect(button.disabled).toBeDefined()

  fireEvent.input(passwordInput, { target: { value: '123456'}})
  expect(button.disabled).toBeFalsy()
})