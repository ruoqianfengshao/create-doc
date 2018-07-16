#!/usr/bin/env node

const path = require('path');
const pkCli = require('commander');
const createComponent = require('./createComponent');
// const createPage = require('./createPage')
const dirname = path.dirname(__dirname)
const listInfo = require(path.resolve(dirname, './doc/theme/utils/listInfo'));

pkCli
.version(require('../package').version)
.usage('<command>');

// create component
pkCli
.command('new <componentName>')
.description('init component(lower camel case) folder in correct path, you can also define the category of this component')
.action(function(componentName) {
  const args = componentName.split(':');
  const name = args[0];
  const category = args[1] || 0;
  const categoryInfo = listInfo.filter(function(item) {
    return item.key === 'components';
  })[0].list[category];

  // 输出提示
  console.log('[INFO]creating folder ' + categoryInfo.title_en + '[' + categoryInfo.title + ']:' + name + ' ...');
  // 创建目录以及文件
  createComponent(name, category);
})

// create page
pkCli
.command('page  <pageName>', 'create static page to doc folder');

pkCli.parse(process.argv);