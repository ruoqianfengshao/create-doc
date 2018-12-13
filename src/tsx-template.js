// index.tsx 模板
module.exports = ({name}) => {
  return (
    `import * as React from 'react'
import * as Proptypes from 'prop-types'

export type Props = {
  // 描述组件的 props
}

export type State = {
  // 描述组件的 state
}

class ${name} extends React.Component<Props, State> {
  static proptypes = {

  }

  static defaultProps = {

  }

  static getDerivedStateFromProps(props: Props, state: State) {
    // 组件实例化之后并且重新渲染组件之前
  }

  static getDerivedStateFromError(error: any) {
    // 捕获发生在 render 环节的错误
  }

  state = {

  }

  componentDidMount() {
    // 组件实例化完成之后
  }

  componentDidCatch () {
    // 捕获发生在非 render 节点的错误
  }

  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    // 获取的值会作为 shouldComponentUpdate 的第三个参数
  }

  componentDidUpdate() {
    // 组件更新之后
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    // 有新属性或新状态时触发，返回布尔值
    return true
  }

  componentWillUnmount() {
    // 组件销毁之前
  }

  render () {
    return (<div>这里是组件 view </div>)
  }
}

export default ${name}

    `
  )
}