import fs from 'fs'
import path from "path"

export const emailTemplatePath = path.join(__dirname, 'email.html')
export const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8')
