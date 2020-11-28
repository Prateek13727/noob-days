const calls = [
  {
    host: {
      name: "Ankit",
      id: 1
    },
    host_calls: [],
    customer: "Prateek",
    customer_calls: [],
    duration: 200
  },
  {
    host: {
      name: "Prateek",
      id: 2
    },
    host_calls: [],
    customer: "Prateek",
    customer_calls: [],
    duration: 200
  },
  {
    host: {
      name: "Anmol",
      id: 3
    },
    host_calls: [],
    customer: "Prateek",
    customer_calls: [],
    duration: 200
  }
]

export const getCalls = () => {
  return new Promise((resolve, reject) => {
    resolve(calls)
  })
}
