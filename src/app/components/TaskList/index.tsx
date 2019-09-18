import { getCurrentListTasks2 } from 'app/components/TaskList/selectors'
import { ITask, TTasks } from 'app/types/types'

import { map } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import Scrollbar from '../Scrollbar'
import Task from '../Task'
import { Wrapper } from './styles'

// function useObservable(observable, initialValue) {
//   const [value, setValue] = useState(initialValue);
//
//   useEffect(() => {
//     const subscription = observable.subscribe(newValue => {
//       setValue(newValue);
//     });
//     return () => subscription.unsubscribe();
//   }, []);
//
//   return value;
// }

interface Props {
  filteredTasks: TTasks
}

function TaskList(props: Props) {
  const { filteredTasks } = props

  // const asyncFiltered = async () => {
  //
  //   return await map(filteredTasks, (task) => <Task taskID={task.id} key={task.id}/>)
  // }

  // const promise = new Promise(asyncFiltered) //doest work. Go to sleep

  // const value = useObservable(interval(1000), 0);

  const ListWrapper = <>
    {
      map(filteredTasks,
        (task: ITask) => (
          <Task taskID={task.id} key={task.id}/>
        ))
    }
  </>
  return (
    <Wrapper>
      <Scrollbar style={{ height: '100%' }} autoHide>
        {ListWrapper}
      </Scrollbar>
    </Wrapper>
  )
}

const mapStateToProps = (state: import('../../../../../../../DATA/Coding_Projects/react-redux-typescript-boilerplate/src/app/reducers').RootState) => ({
  filteredTasks:  getCurrentListTasks2(state),
  filteredTasks2: getCurrentListTasks2(state)
})

export default connect(mapStateToProps, null)(TaskList)
