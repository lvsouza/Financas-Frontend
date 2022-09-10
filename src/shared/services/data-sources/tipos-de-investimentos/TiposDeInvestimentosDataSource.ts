import { AxiosError } from 'axios'

import { DataSourceResult } from '../DataSourceResult'
import { Environment } from '../../../environment'
import { Api } from '../../api/axios-config'

export interface IListagemTipoDeInvestimento {
  id: string;
  nome: string;
}

export interface IDetalheTipoDeInvestimento {
  id: string;
  nome: string;
}

type TTiposDeInvestimentosComTotalCount = {
  data: IListagemTipoDeInvestimento[];
  totalCount: number;
}

const getAll = async (page = 1, limit = Environment.LIMITE_DE_LINHAS, filter = '', id = 0): Promise<TTiposDeInvestimentosComTotalCount | Error> => {
  try {
    const urlRelativa = `/tipos-de-investimentos?page=${page}&limit=${limit}&filter=${filter}&id=${id}`

    const { data } = await Api().get<DataSourceResult<IListagemTipoDeInvestimento>>(urlRelativa)

    if (data) {
      return {
        data: data.data,
        totalCount: Number(data.meta.total || Environment.LIMITE_DE_LINHAS)
      }
    }

    return new Error('Erro ao listar os registros.')
  } catch (error) {
    console.error(error)
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao listar os registros.')
  }
}

const getById = async (id: string): Promise<IDetalheTipoDeInvestimento | Error> => {
  try {
    const { data } = await Api().get(`/tipos-de-investimentos/${id}`)

    if (data) {
      return data
    }

    return new Error('Erro ao consultar o registro.')
  } catch (error) {
    console.error(error)
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao consultar o registro.')
  }
}

const create = async (dados: Omit<IDetalheTipoDeInvestimento, 'id'>): Promise<string | Error> => {
  try {
    const { data } = await Api().post<string>('/tipos-de-investimentos', dados)

    if (data) {
      return data
    }

    return new Error('Erro ao criar o registro.')
  } catch (error) {
    console.error(error)
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao criar o registro.')
  }
}

const updateById = async (id: string, dados: IDetalheTipoDeInvestimento): Promise<void | Error> => {
  try {
    await Api().put(`/tipos-de-investimentos/${id}`, dados)
  } catch (error) {
    console.error(error)
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao atualizar o registro.')
  }
}

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await Api().delete(`/tipos-de-investimentos/${id}`)
  } catch (error) {
    return new Error((error as AxiosError).response?.data.errors.default || 'Erro ao apagar o registro.')
  }
}

export const TiposDeInvestimentosDataSource = {
  getAll,
  create,
  getById,
  updateById,
  deleteById
}
