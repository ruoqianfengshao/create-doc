const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const moment = require('moment')

const createComponent = () => {
  // 唤起用户输入框
  const inputOptions = {
    placeHolder: '组件英文名(小驼峰)-组件中文名-[可选]组件分类(分类默认为0-常规组件)',
  }
  vscode.window.showInputBox(inputOptions)
  .then(handleUserInput)

  // vscode.window.showInformationMessage('create component - ' + input)
}

const handleUserInput = (val) => {
  // 如果用户没有输入，那么就退出插件
  if (!val) return
  // 分离用户输入的字符串为英文组件名，中文组件名以及分类（分类默认为0[常规组件]）
  const args = val.split('-')
  const name = args[0]
  const name_cn = args[1];
  const order = args[2] || 0;
  // 文件夹根目录
  const rootPath = vscode.workspace.workspaceFolders
  const { uri: { fsPath } } = rootPath[0]
  vscode.window.showInformationMessage(`新建组件:${name}[${name_cn}],分类:${order}`);

  // 组件目录
  const componentPath = path.join(fsPath, '/src/components/')
  // 读取文件并判断
  handleReadComponentFolder(componentPath, name, name_cn)
  // 新建文件夹
  handleCreateComponentFolder(componentPath, name, name_cn, order)

  vscode.window.showInformationMessage(`组件${name_cn}文件夹初始化完成!`)
}

const handleReadComponentFolder = (filePath, componentName, componentName_cn) => {
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
    vscode.window.showErrorMessage(`[error]已经存在一个同名组件-${componentName_cn}`)
    return 0
  }
}

const handleCreateComponentFolder = (filePath, componentName, componentName_cn, order) => {
  const compoenntPath = path.join(filePath, componentName)
  const demoPath = path.join(compoenntPath, 'demo')
  const now = moment().format('YYYY-MM-DD')

  /**
   * 写入文件的文本信息
   * indexMdText: 组件的描述文件
   * demoBasicMdText: 组件的默认例子描述文件
   * componentInit: 组件入口文件初始化
  */
  const upperCapital = componentName.toString().toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  const indexMdText = `---\ntitle: ${componentName_cn}\ntitle_en: ${componentName}\nname: ${componentName}\npublishDate: ${now}\ncategory: 1\norder: ${order}\ndescription: 请输入您对组件的描述\n---\n\n## 何时使用\n请在这里输入使用场景\n\n##参数\n请在此输入参数配置\n\n###API\n这块输入API配置`
  const demoBasicMdText = `---\ntitle: ${componentName} 的基本用法\ntitle_en: ${componentName} basic usage\ncategory: 2\n---`
  const compoenntInit = `import React from 'react'\n\nclass ${upperCapital} extends React.Component {\n  render () {\n    return <div>component ${componentName}</div>\n  }\n}\nexport default ${upperCapital}\n`

  const mdErrorHint = (err, fileName) => {
    if (err) {
      console.log(`[error]${err}`)
      vscode.window.showErrorMessage(`[error]写入${fileName}文件出现问题`)
      return 0
    }
  }

  // 新建组件目录
  fs.mkdirSync(path.join(filePath, componentName))
  // 新建组件目录下的demo目录
  fs.mkdir(path.join(compoenntPath, 'demo'))
  // 新建index.md文件并写入头信息
  fs.writeFile(path.join(compoenntPath, 'index.md'), indexMdText, err => mdErrorHint(err, 'index.md'))
  fs.writeFile(path.join(compoenntPath, 'index.js'), compoenntInit, err => mdErrorHint(err, 'index.js'))
  fs.writeFile(path.join(demoPath, 'basic.md'), demoBasicMdText, err => mdErrorHint(err, 'basic.md'))
}

module.exports = createComponent