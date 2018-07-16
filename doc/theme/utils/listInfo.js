/**
 * deep定义菜单的层次
 */

module.exports = [
  {
    title: '端点科技 | Parkball',
    title_en: 'Terminus | Parkball',
    key: 'parkball',
    link: 'doc/parkball',
    deep: 1,
  }, {
    title: '快速上手',
    title_en: 'Quick Start',
    key: 'start',
    link: 'doc/start',
    deep: 1,
  }, {
    title: '定制主题',
    title_en: 'Custom Theme',
    key: 'theme',
    link: 'doc/theme',
    deep: 1,
  }, {
    title: '更新日志',
    title_en: 'Change Log',
    key: 'changelog',
    link: 'doc/changelog',
    deep: 1,
  }, {
    title: '组件列表',
    title_en: 'Components',
    key: 'components',
    deep: 3,
    list: [
      {
        title: '常规组件',
        title_en: 'General',
        key: 'general',
        order: 0,
        list: [],
      }, {
        title: '导航',
        title_en: 'Navigation',
        key: 'navigation',
        order: 1,
        list: [],
      }, {
        title: '数据相关',
        title_en: 'Data Analyse',
        key: 'data',
        order: 2,
        list: [],
      },
    ],
  },
]
