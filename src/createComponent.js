const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const mdTemplate = require('./md-template')
const tsxTemplate = require('./tsx-template')
const demoTemplate = require('./demo-template')

const createComponent = () => {
  // 唤起用户输入框
  const inputOptions = {
    placeHolder: '组件英文名(小驼峰)-组件中文名-[可选]组件分类(默认为0-常规组件)',
  }
  vscode.window.showInputBox(inputOptions)
  .then(handleUserInput)

  // vscode.window.showInformationMessage('create component - ' + input)
}

const handleUserInput = (val) => {
  // 如果用户没有输入，那么就退出插件
  if (!val) return
  // 分离用户输入的字符串为英文组件名，中文组件名以及分类（分类默认为0[常规组件]）
  const [name, cnName = name, order = 0] = val.split("-")

  // 文件夹根目录
  const rootPath = vscode.workspace.workspaceFolders
  const { uri: { fsPath } } = rootPath[0]
  vscode.window.showInformationMessage(`新建组件:${name}[${cnName}],分类:${order}`);

  // 组件目录
  const componentPath = path.join(fsPath, '/src/components/')
  // 读取文件并判断
  handleReadComponentFolder(componentPath, name, cnName)
  // 新建文件夹
  handleCreateComponentFolder(componentPath, name, cnName, order)

  vscode.window.showInformationMessage(`组件${cnName}文件夹初始化完成!`)
}

const handleReadComponentFolder = (filePath, componentName, componentCnName) => {
  const files = fs.readdirSync(filePath, (err, files) => {
    if (err) {
      vscode.window.showErrorMessage('[error]读取文件路径失败,请确保Parkball项目src目录下存在components目录')
      return false
    }
    return files;
  })
  // 比对是否重名，如果重名，抛出错误
  const duplicated = files.filter(item => item === componentName)
  if (duplicated.length !== 0) {
    vscode.window.showErrorMessage(`[error]已经存在一个同名的${componentName}组件`)
    return 0
  }
}

const mdErrorHint = (err, fileName) => {
  if (err) {
    console.log(`[error]${err}`)
    vscode.window.showErrorMessage(`[error]写入${fileName}文件出现问题`)
    return 0
  }
}

const handleCreateComponentFolder = (filePath, componentName, componentCnName, order) => {
  const componentPath = path.join(filePath, componentName)
  const demoPath = path.join(componentPath, 'demo')
  const className = componentName.charAt(0).toUpperCase() + componentName.slice(1)

  // 新建组件目录
  fs.mkdirSync(path.join(filePath, componentName))

  // 新建组件目录下的demo目录
  fs.mkdir(path.join(componentPath, 'demo'))


  fs.writeFile(path.join(componentPath, 'index.md'), mdTemplate({name: className, cnName: componentCnName, order}), err => mdErrorHint(err, `${componentName}/index.md`))
  fs.writeFile(path.join(componentPath, 'index.tsx'), tsxTemplate({name: className}), err => mdErrorHint(err, `${componentName}/index.tsx`))
  fs.writeFile(path.join(demoPath, 'basic.md'), demoTemplate({name: className}), err => mdErrorHint(err, `${componentName}/demo/basic.md`))
}

module.exports = createComponent