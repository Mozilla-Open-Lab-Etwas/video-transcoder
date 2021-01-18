import platform from 'platform'

import ComponentStore from '../store/componentStore'
import { HardwareDataType } from '../types/hardwareData'

const { HardwareStore, CluiStore, FileStore, UserStore } = ComponentStore

const { updateHardwareData, sendHardwareData } = HardwareStore

const { configuration } = CluiStore

const getThreads = () => {
  const threads = window.navigator.hardwareConcurrency
  return threads < 8 ? threads : 8
}

const getBrowser = () => `${platform.name}:${platform.version} `
const getOs = () => (platform.os ? platform.os.toString() : 'Not Found')
const getNavigator = () => platform.description

const updateData = (encodeTime: number) => {
  const testerDom = document.getElementById('tester') as HTMLInputElement
  console.info(testerDom)
  let tester = ''
  if (testerDom && testerDom.value) {
    tester = `This is from an automated puppeteer tester, please check git actions for more details. Video duration ${testerDom.value}`
    console.info(tester)
  }

  /** Gets data parameters */
  const threadsData = getThreads()
  const os = getOs()
  const navigator = getNavigator()
  const browserData = getBrowser()
  const encodeTimeData = encodeTime
  const inputFileData = JSON.stringify(FileStore.fileData)

  const currentData: HardwareDataType = {
    uuid: UserStore.uuid,
    inputFileData,
    encodeTime: encodeTimeData,
    threads: threadsData,
    configuration: JSON.stringify(configuration),
    browser: browserData,
    os,
    navigator: navigator || 'Not Found'
  }
  if (tester) {
    currentData.tester = tester
  }
  updateHardwareData(currentData)
  sendHardwareData()
}

export { getThreads, updateData }
