/* eslint-disable no-param-reassign */

import React, { useEffect, useState } from 'react'

import CluiStore from '../../store/cluiStore'
import { CommandType } from './commands'

const CustomComp = (props: any) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(count + 1)
    CluiStore.updateRun(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (count) {
      // After data has loaded, call `next` to show next child (which is another Prompt)
      props.item.next()
    }
    // eslint-disable-next-line
  }, [count])
  return props.ui || 'No ui was provided'
}
const generateCommands = (array: Array<CommandType>) =>
  array.reduce((cur, nex) => {
    // @ts-ignore
    cur[nex.command] = {
      description: nex.description
    }
    if (nex.child && nex.child.length) {
      // @ts-ignore
      cur[nex.command].commands = () =>
        generateCommands(nex.child as Array<CommandType>)
    } else {
      // @ts-ignore
      // eslint-disable-next-line react/display-name
      cur[nex.command].run = () => <CustomComp ui={nex.ui} />
    }
    return cur
  }, {})
const getFormattedOutput = (data: Array<CommandType>) => ({
  commands: generateCommands(data)
})

export default getFormattedOutput
