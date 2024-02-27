type Constraint = {
  max: number,
  min: number
}

type Constraints = {
  user: {[field: string]: Constraint},
  product: {[field: string]: Constraint}
}

export const validationConstraints : Constraints = {
  user: {
    name: {max: 15, min: 1},
    password: {max: 12, min: 1},
  },
  product: {
    name: {max: 100, min: 10},
    description: {max: 1024, min: 20},
    article: {max: 40, min: 5},
    price: {max: 1000000, min: 100},
  }
}
