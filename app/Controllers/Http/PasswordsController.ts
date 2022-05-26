import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForgotPassword from 'App/Validators/ForgotPasswordValidator'

export default class PasswordsController {
  public async forgotPassword({ request, response }: HttpContextContract) {
    const { email } = await request.validate(ForgotPassword)

    Mail.send((message) => {
      message
        .from('no-reply@roleplay.com')
        .to(email)
        .subject('Roleplay: Recuperação de senha')
        .text('Clique no link abaixo para redefinir a sua senha.')
    })

    return response.noContent()
  }
}
