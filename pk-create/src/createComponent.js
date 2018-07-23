const vscode = require('vscode');
const path = require('path');

const createComponent = () => {
  // 唤起用户输入框
  const inputOptions = {
    placeHolder: '组件英文名(小驼峰)-组件中文名-[可选]组件分类(分类默认为0-常规组件)',
  }
  vscode.window.showInputBox(inputOptions)
  .then(handleUserInput)

  // vscode.window.showInformationMessage('create component - ' + input);
}

const handleUserInput = (val) => {
  if (!val) return;
  const args = val.split('-');
  const name = args[0];
  const name_cn = args[1];
  const category = args[2] || 0;
  console.log(path.basename(__dirname));
  vscode.window.showInformationMessage('新建组件:' + name + '[' + name_cn + ']' + ',分类：' + category);
}

module.exports = createComponent;