export const producerPath = {
  get: {
    tags: ['Producers'],
    summary: 'API para obter produtores',
    description: '',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  min: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        producer: {
                          type: 'string'
                        },
                        interval: {
                          type: 'number'
                        },
                        previousWin: {
                          type: 'number'
                        },
                        followingWin: {
                          type: 'number'
                        }
                      },
                      required: ['producer', 'interval', 'previousWin', 'followingWin']
                    }
                  },
                  max: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        producer: {
                          type: 'string'
                        },
                        interval: {
                          type: 'number'
                        },
                        previousWin: {
                          type: 'number'
                        },
                        followingWin: {
                          type: 'number'
                        }
                      },
                      required: ['producer', 'interval', 'previousWin', 'followingWin']
                    }
                  }
                },
                required: ['min', 'max']
              }
            }
          }
        }
      }
    }
  }
}
