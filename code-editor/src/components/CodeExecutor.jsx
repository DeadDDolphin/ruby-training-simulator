import { Button } from './Button'

export const CodeExecutor = ({srcDoc}) => (
  <div className='code-executor'>
    <iframe
      srcDoc={srcDoc}
      title='output'
      sandbox='allow-scripts'
      className='code-frame'
    />
  </div>
)
