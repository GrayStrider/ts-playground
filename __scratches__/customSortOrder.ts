interface Task {
  id: number,
  title: string,
  status: Status
}

const status_ = ['done', 'todo', 'inProgress'] as const
type Status = typeof status_[number]

const tasks: Task[] = [
  { id: 1, title: 'Job A', status: 'done' },
  { id: 2, title: 'Job B', status: 'inProgress' },
  { id: 3, title: 'Job C', status: 'todo' },
  { id: 4, title: 'Job D', status: 'inProgress' },
  { id: 5, title: 'Job E', status: 'todo' }
]

const sortBy = ['inProgress', 'todo', 'done'] as const
type SortBy = typeof sortBy

const customSort = (data: Task[], sortBy: SortBy, sortField: keyof Task) => {
  const sortByObject = sortBy.reduce(
    (obj: { [key: string]: number }, item, index) => ({
      ...obj,
      [item]: index
    }), (<{ [p: string]: number }>{}))
  return data.sort(
    (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]])
}

console.log(customSort(tasks, sortBy, 'status'))
