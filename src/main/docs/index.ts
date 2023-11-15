import { producerPath } from '@/main/docs/paths'
export default {
  openapi: '3.0.0',
  info: {
    title: 'Golden Raspberry Awards',
    description: 'API desenvolvida para listar os indicadores e vencedores da categoria Pior Filme',
    version: '1.0.0'
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Producers',
    description: 'Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que obteve dois prêmios mais rápido'
  }],
  paths: {
    '/': producerPath
  }
}
