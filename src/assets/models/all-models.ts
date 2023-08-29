import { EUserType } from '@/assets/models/all-enums.ts'

export class AuthDto {
  cpf: string
  password: string
}

export class DefaultResponseDto<T> {
  data: T
  status: string
  message: string
}

export class AuthResponseDto {
  id: number
  partido: string
  dataEntrada: Date
  dataSaida: Date
  nome: string
  cpf: string
  salario: number
  userType: EUserType
}

export class Politico {
  id: number
  partido: string
  dataEntrada: Date
  dataSaida: Date
  nome: string
  cpf: string
  password: string
  salario: number
}

export class Ministro extends Politico {
  idMinisterio: number
  ministerio?: Ministerio
}

export class Ministerio {
  idMinistro: number
  id: number
  nome: string
  orcamento: number
  totalFuncionarios: number
  secretarias: Secretarias[]
  ministro: Ministro
}

export class Secretarias {
  id: number
  nome: string
  orcamento: number
  totalFuncionarios: number
  idMinisterio: number
  ministerio: Ministerio
}
