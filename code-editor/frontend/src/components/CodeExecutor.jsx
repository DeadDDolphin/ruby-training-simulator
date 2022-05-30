import { Button } from './Button'

export const CodeExecutor = ({srcDoc}) => (
  <div className='code-executor'>
    <p class ="iframe">
    {console.log(srcDoc)}
      {srcDoc}
    </p>
  </div>
)
