import { getLists } from 'app/components/Lists/selectors'
import { RootState } from 'app/reducers'
import { ETabs, ICustomList, IList, ITag } from 'app/types/types'
import { map } from 'lodash'
import *  as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Grid, Icon, Input, Menu, Portal, Segment } from 'semantic-ui-react'
import { Lists, selectList, selectTab } from './actions'
import messages from './messages'
import { Wrapper } from './styles'

interface Props {
  selectedTab?: any;
  selectedList?: any;
  lists?: any;
  selectListAction?: any;
  selectTabAction?: any;
}

function Lists(props: Props) {
  const {
    selectedTab, selectedList, lists, selectListAction
  } = props

  const [addNewListModalisOpen, openAddNewListModal] = React.useState(false)
  const Tabs =

    <Menu pointing secondary inverted> {
      map(ETabs, (key) => (
        <Menu.Item
          key={key}
          active={key === selectedTab}
          onClick={() => props.selectTabAction(key)}>

          {messages[key]}
        </Menu.Item>
      ))}</Menu>
  const tabMenuLists =
    <Menu vertical inverted fluid>
      {map(lists[selectedTab], (list: ITag | IList | ICustomList) => (
        <Menu.Item
          key={list.id}
          active={list.id === selectedList.id}
          onClick={() => selectListAction({
            type: list.type,
            name: list.name,
            id:   list.id
          })}
        >
          <span><Icon name='list'/>{lists[selectedTab][list.id].name}</span>
        </Menu.Item>
      ))}

      <Menu.Item
        onClick={() => openAddNewListModal(!addNewListModalisOpen)}
        active={false}>
        <span><Icon name='plus'/>Add new {selectedTab}</span>
      </Menu.Item>
    </Menu>
  return (
    <Wrapper>
      {Tabs}
      <Grid.Row className='lists_and_filters'>
        {tabMenuLists}
        <Portal
          onClose={() => openAddNewListModal(!addNewListModalisOpen)}
          open={addNewListModalisOpen}>
          <Segment style={{
            left:     '40%',
            position: 'fixed',
            top:      '50%',
            zIndex:   1000
          }}>
            <Input placeholder={`${selectedTab} name:`}/>
          </Segment>
        </Portal>
      </Grid.Row>
    </Wrapper>
  )
}

const mapStateToProps = (state: RootState) => ({
  selectedTab:  state.ticktick.ui.selectedTab,
  selectedList: state.ticktick.ui.selectedList,
  lists:        getLists(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectTabAction:  (payload: ETabs) => dispatch(selectTab(payload)),
  selectListAction: (index: Lists) => dispatch(selectList(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
